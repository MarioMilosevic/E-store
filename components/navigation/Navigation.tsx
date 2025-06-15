import { NavigationMenu } from "@/components/ui/navigation-menu";
import UserMenu from "@/components/navigation/UserMenu";
import Link from "next/link";
import logo from "../../public/logo/e-store.jpg";
import Image from "next/image";

export default function Navigation() {
  return (
    <NavigationMenu className="border-b-neutral-200 bg-white border-b max-w-full fixed top-0 left-0 w-full z-30 flex justify-between items-center px-12 h-[75px] mb-12">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={150}
          className="h-[50px] object-cover cursor-pointer"
        />
      </Link>
      <UserMenu />
    </NavigationMenu>
  );
}
