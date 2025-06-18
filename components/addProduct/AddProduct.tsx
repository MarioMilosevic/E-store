"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addProductFormSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import {
  categories,
  conditions,
  locations,
  sellingMethods,
  shippingOptions,
  MAX_FILE_SIZE,
  formFieldObjects,
} from "@/lib/constants";
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
import FormSubmit from "../auth/FormSubmit";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import { Check, ChevronsUpDown, CloudUpload, Paperclip } from "lucide-react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function AddProduct() {
  const [images, setImages] = useState<File[] | null>(null);

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
      sellingMethod: "auction",
      shippingCost: "free",
    },
  });

  const dropZoneConfig = {
    maxFiles: 3,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  };

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
              name="image"
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
                                        console.log(option.id);
                                        // ovo moram pogledat condition
                                        form.setValue("condition", option.id);
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
                        <Input placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* <div className="flex justify-between">
              <FormField
                key={"condition"}
                control={form.control}
                name="condition"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="condition">Condition</FormLabel>
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
                                ? conditions.find(
                                    (condition) => condition.id === field.value
                                  )?.label
                                : "Select condition"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {conditions.map((condition) => (
                                  <CommandItem
                                    value={condition.label}
                                    key={condition.id}
                                    onSelect={() => {
                                      form.setValue("condition", condition.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        condition.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {condition.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                key="category"
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="category">Category</FormLabel>
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
                                ? categories.find(
                                    (category) => category.id === field.value
                                  )?.label
                                : "Select category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {categories.map((category) => (
                                  <CommandItem
                                    value={category.label}
                                    key={category.id}
                                    onSelect={() => {
                                      form.setValue("category", category.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        category.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                key={"itemLocation"}
                control={form.control}
                name="itemLocation"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="itemLocation">
                        Item Location
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
                                ? locations.find(
                                    (location) => location.id === field.value
                                  )?.label
                                : "Select location"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {locations.map((location) => (
                                  <CommandItem
                                    value={location.label}
                                    key={location.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "itemLocation",
                                        location.id
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        location.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {location.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-between">
              <FormField
                key={"shippingCost"}
                control={form.control}
                name="shippingCost"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="shippingCost">
                        Shipping Option
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
                                ? shippingOptions.find(
                                    (option) => option.id === field.value
                                  )?.label
                                : "Select shipping option"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {shippingOptions.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.id}
                                    onSelect={() => {
                                      form.setValue("shippingCost", option.id);
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
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                key={"sellingMethod"}
                control={form.control}
                name="sellingMethod"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="sellingMethod">
                        Selling Method
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
                                ? sellingMethods.find(
                                    (option) => option.id === field.value
                                  )?.label
                                : "Select selling method"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {sellingMethods.map((option) => (
                                  <CommandItem
                                    value={option.label}
                                    key={option.id}
                                    onSelect={() => {
                                      form.setValue("sellingMethod", option.id);
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
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}
            {/* <FormField
                key={"price"}
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col w-[200px]">
                      <FormLabel htmlFor="price">Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div> */}
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
