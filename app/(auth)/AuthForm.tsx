"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { UseFormReturn } from "react-hook-form";

type FormFieldObjType = {
  name: string;
  content: string;
  type: string;
};

type AuthFormProps<T> = {
  form: UseFormReturn<T>; // <-- Make form generic
  cardInfo: {
    cardTitle: string;
    cardDescription: string;
  };
  onSubmit: (values: T) => void; // <-- Make onSubmit generic
  formFields: FormFieldObjType[];
  submitObj: {
    buttonText: string;
    contentText: string;
    href: string;
  };
};

export default function AuthForm({
  form,
  cardInfo,
  onSubmit,
  formFields,
  submitObj,
}: AuthFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{cardInfo.cardTitle}</CardTitle>
        <CardDescription>{cardInfo.cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {formFields.map((formField) => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id={formField.name}
                      field={field}
                      type={formField.type}
                    >
                      {formField.content}
                    </FloatingLabelInput>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {submitObj.contentText}{" "}
          <Link href={submitObj.href} className="underline">
            {submitObj.buttonText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
