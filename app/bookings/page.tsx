import { getServerSession } from "next-auth";
import Header from "../_components/ui/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  // recuperar a session do usuario (ver se ele ta logado ou nao)

  const session = await getServerSession(authOptions);
  //se ele nao estiver logado, redirecionar para pagina de login
  if (!session?.user) {
    return redirect("/");
  }

  //filter para booking confirmados e finalizados
  //Consulta no banco para buscar a data Atual do agendamento
  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  // const confirmedBookings = bookings.filter((booking) => isFuture(booking.date));
  // const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Confirmado
        </h2>

        <div className="flex flex-col gap-3">
          {confirmedBookings.map((bookig) => (
            <BookingItem key={bookig.id} booking={bookig} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400">
          Finalizado
        </h2>

        <div className="flex flex-col gap-3">
          {finishedBookings.map((bookig) => (
            <BookingItem key={bookig.id} booking={bookig} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
