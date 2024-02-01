import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "../_components/barbershop-info";
import ServiceItem from "../_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbaershopDetailsPageProps {
  params: any;
}
const BarberShopDetailsPage = async ({
  params,
}: BarbaershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO, redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO, redirecionar para home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex gap-4 px-5 py-6">
        <Button>Serviços</Button>
        <Button variant="outline">Informações</Button>
      </div>

      <div className="flex flex-col gap-3 px-5 pb-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
};

export default BarberShopDetailsPage;
