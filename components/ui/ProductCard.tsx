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
  categoryId:string
};

export default function ProductCard({ data, categoryId }: EstoreCardProps) {
  console.log("ovo je data sto dobijm", data);
  const {
    description,
    id,
    location,
    price,
    singleImage,
    title,
  } = data;
  return (
    <Card className="w-[300px]">
      <Link href={`${categoryId}/${id}`} className="cursor-pointer">
        <CardHeader>
          <Image
            src={singleImage}
            alt={singleImage}
            height={300}
            width={300}
            priority
            className="object-cover rounded-t-xl w-[300px] h-[300px] mb-4"
          />
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
      <CardContent>
        <p className="font-semibold text-xl">${price}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p>But it now</p>
        <p>Located in {location}</p>
      </CardFooter>
    </Card>
  );
}
