"use client";
import AuthForm from "@/components/auth/AuthForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { signUpFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { signUpUser } from "@/actions/sign-up";
import FloatingLabelInput from "@/components/ui/FloatingLabelInput";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const formFields: FormFieldObjType<z.infer<typeof signUpFormSchema>>[] = [
    {
      name: "email",
      content: "Email",
      type: "text",
    },
    {
      name: "password",
      content: "Password",
      type: "password",
    },
    {
      name: "passwordConfirm",
      content: "Confirm Password",
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

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
   const response = await signUpUser(values)
    console.log(response);
  }

  return (
    <AuthForm
      form={form}
      submitHandler={onSubmit}
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
