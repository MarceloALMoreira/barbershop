import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/ui/header";
import { db } from "../_lib/prisma";

//http://localhost:3000/barbershops?search=vintage -- exemplo
interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}
const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="mt-3 grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarberShopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
