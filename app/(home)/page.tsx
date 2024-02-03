import { format } from "date-fns";
import Header from "../_components/ui/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // chamar prisma e pegar barbearias
  const barbarshops = await db.barbershop.findMany({});

  //Logica se temos usuer na session ele busca, se nao temos uma lista vazia
  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
    : [];

  // Promisse All
  // const [barbarshops, confirmedbookings] = await Promise.all([
  //   db.booking.findMany({}),
  //   session?.user
  //     ? db.booking.findMany({
  //         where: {
  //           userId: (session.user as any).id,
  //           date: {
  //             gte: new Date(),
  //           },
  //         },
  //         include: {
  //           service: true,
  //           barbershop: true,
  //         },
  //       })
  //     : Promise.resolve([]),
  // ]);
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 pl-5 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <div className=" mt-6 flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbarshops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6 px-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbarshops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
