import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import logo from "../public/logo/logo.avif";
import Image from "next/image";

export default function Navigation() {
  return (
    <NavigationMenu className="border-b-neutral-200 border-b max-w-full">
      <Image src={logo} alt="logo" />
      <FloatingLabelInput className="w-full">Search</FloatingLabelInput>
      <Button variant={"outline"}>Search</Button>
      {/* <NavigationMenuList className="w-1/2 bg-red-500">
        <NavigationMenuItem className="flex gap-2 w-full">
          <FloatingLabelInput className="w-full" />
          <Button variant={"outline"}>Search</Button>
        </NavigationMenuItem>
      </NavigationMenuList> */}
    </NavigationMenu>
  );
}
