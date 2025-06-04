import { NavigationMenu } from "@/components/ui/navigation-menu";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from 'lucide-react'
import Link from "next/link";
import logo from "../../public/logo/e-store.jpg";
import Image from "next/image";

export default function Navigation() {
  return (
    <NavigationMenu className="border-b-neutral-200 border-b max-w-full h-[100px] gap-8">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={150}
          className="h-[50px] object-cover cursor-pointer"
        />
      </Link>
      <FloatingLabelInput className="w-2/3">
        Search for anything
      </FloatingLabelInput>
      <div className="flex gap-4 items-center">
        <Button variant={"outline"}>Search</Button>
        <CircleUserRound size={30} className="cursor-pointer" />
      </div>
    </NavigationMenu>
  );
}
