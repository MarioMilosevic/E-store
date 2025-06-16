"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProductFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { z } from "zod";
import { toast } from "sonner";
import { TypographyH3 } from "@/typography/h3";
import { AutosizeTextarea } from "../ui/AutosizeTextarea";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";

export default function AddProduct() {
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      condition: "any",
      category: "electronics",
      itemLocation: "any",
      price: 0,
      sellingType: "auction",
      shippingCost: "free",
    },
  });

  function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>
          Fill out the form below to add a new product to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              key={"title"}
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FloatingLabelInput field={field} type="text" id="title">
                      Title
                    </FloatingLabelInput>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              key={"description"}
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <AutosizeTextarea
                      id={field.name}
                      placeholder="Description"
                      maxHeight={200}
                    />
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
      {/* <TypographyH3>Add Product</TypographyH3> */}
    </Card>
  );
}
