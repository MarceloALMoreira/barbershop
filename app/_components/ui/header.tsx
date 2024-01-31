"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import logo from "../../../public/Logo.png";
import { Button } from "./button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./avatar";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => signOut();

  const handleLoginClick = () => signIn();
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5  py-8">
        <Image src={logo} alt="logo-barber-shop" width={120} height={18} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex items-center justify-between px-5 py-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>

                  <h2 className="font-bold">{data.user.name}</h2>
                </div>

                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center gap-2">
                  <UserIcon size={32} />
                  <h2 className="font-bold">Olá, fala seu login!</h2>
                </div>
                <Button
                  className="w-full justify-start"
                  variant="secondary"
                  onClick={handleLoginClick}
                >
                  <LogInIcon className="mr-2" size={18} />
                  Fazer Login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button className="justify-start" variant="outline" asChild>
                <Link href="/">
                  <HomeIcon className="mr-2" size={18} />
                  Inicio
                </Link>
              </Button>

              {data?.user && (
                <Button className="justify-start" variant="outline" asChild>
                  <Link href="/bookings">
                    <CalendarIcon className="mr-2" size={18} />
                    Agendamentos
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};
// 1:21

export default Header;
