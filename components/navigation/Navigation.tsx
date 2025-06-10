import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import logo from "../../public/logo/e-store.jpg";
import Image from "next/image";

export default function Navigation() {
  return (
    <NavigationMenu className="border-b-neutral-200 border-b max-w-full flex justify-between items-center px-12 h-[100px] gap-8 mb-12">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={150}
          className="h-[50px] object-cover cursor-pointer"
        />
      </Link>
      <div className="flex gap-4 items-center">
        <Link href={"/profile"}>
          <CircleUserRound size={30} className="cursor-pointer" />
        </Link>
        <Link href={"/login"}>
          <Button>Log In</Button>
        </Link>
      </div>
    </NavigationMenu>
  );
}
