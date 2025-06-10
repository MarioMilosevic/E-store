"use client";
import AuthForm from "../AuthForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  passwordConfirm: z.string(),
});
// const formSchema = z.object({
//   firstName: z.string().min(2).max(50),
//   lastName: z.string().min(2).max(50),
//   email: z.string().email(),
//   password: z.string().min(8).max(50),
//   passwordConfirm: z.string(),
// });

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
      name: "firstName",
      content: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      content: "Last Name",
      type: "text",
    },
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
    />
  );
}
