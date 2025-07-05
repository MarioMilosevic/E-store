import { categories } from "@/lib/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TypographyH4 } from "@/typography/h4";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <>
      {categories.map((category) => (
        <Link href={category.id} key={category.id}>
          <Card className="h-[250px] cursor-pointer py-0 hover:scale-105 duration-300 transition-all">
            <CardContent className="relative w-full h-3/4 p-0 rounded-xl">
              <Image
                src={category.imageSrc}
                alt={category.label}
                fill={true}
                sizes="(max-width:300px)"
                priority
                className="object-cover h-full rounded-t-xl"
              />
            </CardContent>
            <CardFooter className="justify-center pb-4">
              <TypographyH4>{category.label}</TypographyH4>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}
