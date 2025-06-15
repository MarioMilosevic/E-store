"use client";
import { loginUser } from "@/actions/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { z } from "zod";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import useUserStore from "@/store/userStore";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const formFields: FormFieldObjType<{ email: string; password: string }>[] = [
    { name: "email", content: "Email", type: "text" },
    { name: "password", content: "Password", type: "password" },
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
    console.log(values);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log("ovo je response", response);

    const result = await response.json();
    console.log("ovo je result", result);

    // if (result.status === "error") {
    //   toast.error(result.message);
    // } else {
    //   toast.success(result.message);
    // }

    // const result = await loginUser(values);

    // if (result.status === "error") {
    //   toast.error(result.message);
    // } else {
    //   toast.success(result.message);
    //   console.log("ovo me zanima", result.data);
    //   setUser(result.data);
    //   console.log("ovo bi trebao biti user", user);
    //   redirect("/");
    // }
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
