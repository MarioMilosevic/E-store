import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <NavigationMenu className="border border-black max-w-full">
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2">
          <FloatingLabelInput />
          <Button variant={"outline"}>Search</Button>
          <NavigationMenuContent>
            {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
