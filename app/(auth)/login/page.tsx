"use client";
import AuthForm from "../../../components/auth/AuthForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted values:", values);
  }

  return (
    <AuthForm
      form={form}
      cardInfo={cardObj}
      onSubmit={onSubmit}
      formFields={formFields}
      submitObj={submitObj}
    />
  );
}
