"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import logo from "../../../public/Logo.png";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5  py-8">
        <Image src={logo} alt="logo-barber-shop" width={120} height={18} />

        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};
// 1:21

export default Header;
