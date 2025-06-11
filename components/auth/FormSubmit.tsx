"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/ButtonLoading";

type FormSubmitProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
};

export default function FormSubmit({ children, type }: FormSubmitProps) {
  const status = useFormStatus();

  if (status.pending) {
    return <ButtonLoading />;
  }

  return <Button type={type}>{children}</Button>;
}
