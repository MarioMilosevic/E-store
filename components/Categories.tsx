import { categories } from "@/lib/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TypographyH4 } from "@/typography/h4";
import Image from "next/image";

export default function Categories() {
  return (
    <>
      {categories.map((category) => (
        <Card key={category.id} className="max-h-[300px] h-full">
          <CardContent className="relative w-full h-[300px] p-0">
            <Image
              src={category.imageSrc}
              alt={category.label}
              fill
              className="object-cover h-full"
            />
          </CardContent>
          <CardFooter className="text-sm font-medium p-2">
            <TypographyH4>{category.label}</TypographyH4>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
