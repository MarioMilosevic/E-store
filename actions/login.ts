"use server";

import { z } from "zod";
import { loginFormSchema } from "@/lib/zodSchemas";

export async function loginUser(values: z.infer<typeof loginFormSchema>) {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
  console.log("ovo je result",result)

  return {
    status: "success",
    message: "Request sent successfully",
  };
}
