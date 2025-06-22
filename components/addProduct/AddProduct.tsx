"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProductFormSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { formFieldObjects } from "@/lib/constants";
import { cn } from "@/lib/helpers";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/auth/FormSubmit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  useState } from "react";
import { dropZoneConfig } from "@/lib/constants";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import useUserStore from "@/store/userStore";
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from "lucide-react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";

export default function AddProduct() {
  const [images, setImages] = useState<File[] | null>(null);
  const user = useUserStore((state) => state.user);

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      title: "",
      description: "",
      images: "",
      condition: "new",
      category: "electronics",
      itemLocation: "any",
      price: 0,
      sellingMethod: "auction",
      shippingOption: "free",
    },
  });

  async function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    const base64Images: string[] = [];
    if (images && images.length > 0) {
      for (const file of images) {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const base64Image = `data:${file.type};base64,${base64}`;
        base64Images.push(base64Image);
      }
    }


    const response = await fetch("/api/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        images:base64Images,
        seller: user?.id,
      }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      form.reset()
      setImages(null)
    } else {
      toast.error(result.message);
    }
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
            className="flex flex-col gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              key={"title"}
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
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
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              key={"image"}
              control={form.control}
              name="images"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor="image">Add Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={(files) => {
                          field.onChange(files);
                          setImages(files);
                        }}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full ">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {images &&
                            images.length > 0 &&
                            images.map((file, i) => (
                              <FileUploaderItem key={i} index={i}>
                                <Paperclip className="h-4 w-4 stroke-current" />
                                <span>{file.name}</span>
                              </FileUploaderItem>
                            ))}
                        </FileUploaderContent>
                      </FileUploader>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex flex-wrap justify-between gap-6">
              {formFieldObjects.map((objField) => (
                <FormField
                  key={objField.id}
                  control={form.control}
                  name={objField.name}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel htmlFor={objField.id}>
                          {objField.label}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[200px] justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? objField.options.find(
                                      (option) => option.id === field.value
                                    )?.label
                                  : objField.initialLabel}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {objField.options.map((option) => (
                                    <CommandItem
                                      value={option.label}
                                      key={option.id}
                                      onSelect={() => {
                                        form.setValue(
                                          objField.name,
                                          option.id as typeof field.value
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          option.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {option.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormField
                key={"price"}
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormSubmit
              type="submit"
              isSubmitting={form.formState.isSubmitting}
            >
              Add Product
            </FormSubmit>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
