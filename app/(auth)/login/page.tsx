"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      setUser(result.data);
      router.push("/");
    } else {
      toast.error(result.message);
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
