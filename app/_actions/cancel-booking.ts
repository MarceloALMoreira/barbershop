"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const cancelBooking = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  //faz o next recaregar a pagina e remover o cach
  revalidatePath("/");
  revalidatePath("/bookings");
};
