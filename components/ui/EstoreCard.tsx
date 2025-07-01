import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProductType } from "@/lib/globalTypes";

type EstoreCardProps = {
  data: ProductType;
};

export default function EstoreCard({ data }: EstoreCardProps) {
  console.log("ovo je data sto dobijm", data);
  const {
    auctionEndsAt,
    buyerId,
    category,
    condition,
    createdAt,
    currentBid,
    description,
    id,
    location,
    price,
    sellingMethod,
    shippingOption,
    singleImage,
    status,
    title,
    userId,
  } = data;
  return (
    <Link href={id} key={id}>
      <Card className="w-[300px] cursor-pointer py-0 hover:scale-105 duration-300 transition-all">
        <CardHeader>
          <Image
            src={singleImage}
            alt={singleImage}
            height={300}
            width={300}
            priority
            className="object-cover rounded-t-xl"
          />
        </CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="relative w-full h-3/4 p-0 rounded-xl">
          {price}
        </CardContent>
        <CardFooter className="justify-center pb-4">
          {/* <TypographyH4>{data.singleImage}</TypographyH4> */}
        </CardFooter>
      </Card>
    </Link>
  );
}
