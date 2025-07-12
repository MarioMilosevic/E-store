"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { productBidSchema } from "@/lib/zodSchemas";

type ProductBidType = {
  title: string;
  price: number;
};

export default function ProductBid({ title, price }: ProductBidType) {
  const currentBidForm = useForm<z.infer<typeof productBidSchema>>({
    resolver: zodResolver(productBidSchema),
    defaultValues: {
      currentBid: 0,
    },
  });
  const submitHandler = () => {
    console.log("radi");
  };

  return (
    <Form {...currentBidForm}>
      onSubmit={currentBidForm.handleSubmit(submitHandler)}
      <form className="border border-black">
        <h1 className="font-semibold text-xl">{title}</h1>
        <h3 className="border border-black flex items-center justify-between">
          Current bid: <span>{price}$</span>
        </h3>
        <FloatingLabelInput id="currentBid" />
      </form>
    </Form>
  );
}
