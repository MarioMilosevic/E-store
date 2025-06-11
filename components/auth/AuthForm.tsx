"use client";
// import { useFormState } from "react-dom";
import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Form, FormField, FormItem} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

type FormFieldObjType = {
  name: string;
  content: string;
  type: string;
};

type AuthFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  cardInfo: {
    cardTitle: string;
    cardDescription: string;
  };
  action: (values: T) => void;
  formFields: FormFieldObjType[];
  submitObj: {
    buttonText: string;
    contentText: string;
    href: string;
  };
  children?: React.ReactNode;
};

export default function AuthForm({
  form,
  cardInfo,
  action,
  formFields,
  submitObj,
  children,
}: AuthFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLElement | null>(null);
  const [state, formAction, isLoading] = useActionState(action, {
    email: "",
    password: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    console.log("use effect", state);
  }, [state]);

  return (
    <Card
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      ref={formRef}
    >
      <CardHeader>
        <CardTitle className="text-xl">{cardInfo.cardTitle}</CardTitle>
        <CardDescription>{cardInfo.cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="flex flex-col gap-4">
            {children}
            {formFields.map((formField) => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FloatingLabelInput
                        id={formField.name}
                        field={field}
                        type={formField.type}
                      >
                        {formField.content}
                      </FloatingLabelInput>
                      {state[field.name] ? (
                        <p className="text-red-600 text-sm pl-1">
                          {state[field.name][0]}
                        </p>
                      ) : (
                        ""
                      )}
                    </FormItem>
                  );
                }}
              />
            ))}
            {/* {state && <p className="text-red-600">{state}</p>} */}
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button>{children ? "Create an account" : "Submit"}</Button>
            )}
            {/* <FormSubmit type={"submit"}>
              {children ? "Create an account" : "Submit"}
            </FormSubmit> */}
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
