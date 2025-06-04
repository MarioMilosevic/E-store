import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Price from "@/components/ui/Price";

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
                      <RadioGroup defaultValue="any">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="any" id="r1" />
                          <Label htmlFor="r1">Any Condition</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="new" id="r2" />
                          <Label htmlFor="r2">New</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="used" id="r3" />
                          <Label htmlFor="r3">Used</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="items-2">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center gap-2">
                        <Price>Min</Price>
                        <Price>Max</Price>
                        <Button variant="secondary" size="icon">
                          <ArrowRight />
                        </Button>
                      </div>
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
