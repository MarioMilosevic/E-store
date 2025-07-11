import { ProductType } from "@/lib/globalTypes";
import CarouselWithProgress from "./CarouselWithProgress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SingleProductProps = {
  data: ProductType;
};

export default function SingleProduct({ data }: SingleProductProps) {
  console.log("ovo me zanima", data);
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
    status,
    title,
    userId,
    images,
  } = data;
  console.log(images);
  return (
    <div className="flex justify-between">
      <CarouselWithProgress images={images} />
      <section className="border border-black">
        <h1 className="font-semibold text-xl">{title}</h1>
        <h3 className="border border-black flex items-center justify-between">
          Current bid: <span>{price}$</span>
        </h3>
      </section>

      <section>
        <h2>{title}</h2>
      </section>
    </div>
  );
}
