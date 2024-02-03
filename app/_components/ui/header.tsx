"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import logo from "../../../public/Logo.png";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideMenu from "../side-menu";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5  py-8">
        <Link href="/">
          <Image src={logo} alt="logo-barber-shop" width={120} height={18} />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};
// 1:21

export default Header;
