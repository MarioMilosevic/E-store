import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <NavigationMenu className="border-b-neutral-200 border-b max-w-full">
      <NavigationMenuList className="">
        <NavigationMenuItem className="flex gap-2 w-full">
          <FloatingLabelInput className="w-full"/>
          <Button variant={"outline"}>Search</Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
