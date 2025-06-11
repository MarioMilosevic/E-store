"use client";
import AuthForm from "@/components/auth/AuthForm";
import { loginUser } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { toast } from "sonner";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
      content: "Password",
      type: "password",
    },
  ];

  const submitObj = {
    contentText: "Don't have an account?",
    href: "/sign-up",
    buttonText: "Sign up",
  };

  const cardObj = {
    cardTitle: "Log in",
    cardDescription: "Enter your credentials to log in",
  };

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("Submitted values:", values);
    const result = await loginUser(values);
    

    if (result.status === 'error') {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }

  }

  return (
    <AuthForm
      form={form}
      cardInfo={cardObj}
      submitHandler={onSubmit}
      formFields={formFields}
      submitObj={submitObj}
    />
  );
}
