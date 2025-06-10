"use client";
import AuthForm from "../../../components/auth/AuthForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordMessage } from "@/lib/constants";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";

const formSchema = z
  .object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(30),
    // fullName: z
    //   .string()
    //   .min(5, {
    //     message: "Must be at least 5 character(s)",
    //   })
    //   .refine(
    //     (value) => {
    //       const names = value.trim().split(" ");
    //       return names.length >= 2 && names[1].length >= 2;
    //     },
    //     {
    //       message: "Last name must have at least 2 characters",
    //     }
    //   ),
    email: z.string().email(),
  })
  .extend({
    password: z.string().min(8, passwordMessage),
    passwordConfirm: z.string().min(8, passwordMessage),
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const formFields = [
    {
      name: "email",
      content: "Email",
      type: "text",
    },
    {
      name: "password",
      content: "Passsword",
      type: "password",
    },
    {
      name: "passwordConfirm",
      content: "Confirm Passsword",
      type: "password",
    },
  ];

  const submitObj = {
    contentText: "Already have an account?",
    href: "/login",
    buttonText: "Log in",
  };

  const cardInfo = {
    cardTitle: "Sign Up",
    cardDescription: "Enter your information to create an account",
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      cardInfo={cardInfo}
      submitObj={submitObj}
      formFields={formFields}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => {
            return (
              <FormItem>
                <FloatingLabelInput id="firstName" field={field}>
                  First Name
                </FloatingLabelInput>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => {
            return (
              <FormItem>
                <FloatingLabelInput id="lastName" field={field}>
                  Last Name
                </FloatingLabelInput>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </AuthForm>
  );
}
