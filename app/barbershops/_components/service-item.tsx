"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}
const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn();
    }

    // TODO abrir modal de agendamento
  };
  return (
    <Card>
      <CardContent className="w-full p-3">
        <div className="flex w-full items-center gap-4">
          <div className="max-h-[110px ] mix-h-[110px] relative min-w-[110px] max-w-[110px] ">
            <img
              src={service.imageUrl}
              alt={service.name}
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div className="flex w-full flex-col">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant="secondary" onClick={handleBookingClick}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
