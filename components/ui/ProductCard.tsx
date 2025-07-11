import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/lib/globalTypes";
import Image from "next/image";

type EstoreCardProps = {
  data: ProductType;
  categoryId: string;
};

export default function ProductCard({ data, categoryId }: EstoreCardProps) {
  const { description, id, location, price, singleImage, title } = data;
  return (
    <Card className="w-[300px]">
      <Link href={`${categoryId}/${id}`} className="cursor-pointer">
        <CardHeader className="relative w-full h-[300px]">
          <Image
            src={singleImage}
            alt={singleImage}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            priority
            className="object-cover rounded-t-xl mb-4"
          />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
      <CardContent>
        <p className="font-semibold text-xl">${price}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p>Buy it now</p>
        <p className="capitalize">Located in {location}</p>
      </CardFooter>
    </Card>
  );
}
