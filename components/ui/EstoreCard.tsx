import { TypographyH4 } from "@/typography/h4";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ProductType } from "@/lib/globalTypes";

type EstoreCardProps = {
  data: ProductType;
};

export default function EstoreCard({ data }: EstoreCardProps) {
  console.log('ovo je data sto dobijm', data)
    return (
    <Link href={data.id} key={data.id}>
      <Card className="h-[250px] cursor-pointer py-0 hover:scale-105 duration-300 transition-all">
        <CardContent className="relative w-full h-3/4 p-0 rounded-xl">
          <Image
            src={data.singleImage}
            alt={data.singleImage}
            fill={true}
            sizes="(max-width:300px)"
            priority
            className="object-cover h-full rounded-t-xl"
          />
        </CardContent>
        <CardFooter className="justify-center pb-4">
          <TypographyH4>{data.singleImage}</TypographyH4>
        </CardFooter>
      </Card>
    </Link>
  );
}
