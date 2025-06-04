import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function CategoriesSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Filter</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Accordion type="single" collapsible>
                  <AccordionItem value="items-1">
                    <AccordionTrigger>Condition</AccordionTrigger>
                    <AccordionContent>
                      <p>Any Condition</p>
                      <p>New</p>
                      <p>Used</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="items-2">
                    <AccordionTrigger>Product condition</AccordionTrigger>
                    <AccordionContent>
                      <p>Brand new</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="items-3">
                    <AccordionTrigger>Product condition</AccordionTrigger>
                    <AccordionContent>
                      <p>Brand new</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
