"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

type CarouselWithProgressType = {
    images: {
        imageUrl:string
    }[]
}

export default function CarouselWithProgress({ images }:CarouselWithProgressType) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const progress = (current * 100) / count;
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="mx-auto max-w-xs py-4  border border-black">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {images?.map((img, index) => (
            <CarouselItem key={index} className="relative w-[300px] h-[300px]">
              <Image
                src={img.imageUrl}
                alt={img.imageUrl}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                priority
                className="object-cover rounded-t-xl mb-4"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
       
        <CarouselPrevious className="top-[calc(100%+0.5rem)] translate-y-0 left-0" />
        <CarouselNext className="top-[calc(100%+0.5rem)] translate-y-0 left-2 translate-x-full" />
      </Carousel>
      <Progress value={progress} className="mt-4 w-24 ml-auto" />
    </div>
  );
}
