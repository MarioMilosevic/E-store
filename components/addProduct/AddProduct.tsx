"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProductFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { z } from "zod";
import { toast } from "sonner";
import { AutosizeTextarea } from "../ui/AutosizeTextarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileInput from "@/components/ui/FileInput";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      condition: "new",
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
            <FileInput />
            <FormField
              key={"condition"}
              control={form.control}
              name="condition"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select defaultValue={field.value }>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
