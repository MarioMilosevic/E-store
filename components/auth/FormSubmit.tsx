"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type FormSubmitProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
};

export default function FormSubmit({ children, type }: FormSubmitProps) {
  const status = useFormStatus();
    console.log(status);
    
    if (status.pending) {
        return <p>creating post</p>
    }


  return <Button type={type}>{children}</Button>;
}
