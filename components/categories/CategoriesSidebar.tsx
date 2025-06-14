import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
                  <AccordionItem value="condition">
                    <AccordionTrigger>Condition</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue="any">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="any" id="any" />
                          <Label htmlFor="any">Any Condition</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">New</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="used" id="used" />
                          <Label htmlFor="used">Used</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center gap-2">
                        <Price>Min</Price>
                        <Price>Max</Price>
                        <Button variant="outline" size="icon">
                          <ArrowRight />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="location">
                    <AccordionTrigger>Item Location</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue="default">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="default" id="default" />
                          <Label htmlFor="default">Default</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="US" id="US" />
                          <Label htmlFor="US">US Only</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value="North America"
                            id="northAmerica"
                          />
                          <Label htmlFor="northAmerica">North America</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="Europe" id="europe" />
                          <Label htmlFor="europe">Europe</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="Asia" id="asia" />
                          <Label htmlFor="asia">Asia</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <p>Standard Shipping (10-30 days)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox />
                        <p>Fast Shipping (1-2 days)</p>
                      </div>
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
