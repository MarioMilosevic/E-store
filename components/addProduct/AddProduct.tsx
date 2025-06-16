"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/zodSchemas";
import { FormFieldObjType } from "@/lib/globalTypes";
import { z } from "zod";
import { toast } from "sonner";
import { TypographyH3 } from "@/typography/h3";
export default function AddProduct() {
  return (
    <>
      <TypographyH3>Add Product</TypographyH3>
    </>
  );
}
