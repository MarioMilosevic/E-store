"use server";

import { z } from "zod";
import { signUpFormSchema } from "@/lib/zodSchemas";

export async function signUpUser(values: z.infer<typeof signUpFormSchema>) {
  const result = signUpFormSchema.safeParse(values);
  console.log('ovo je result', result)

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }


  
  return {
    status: "success",
    message: "Request sent successfully",
  };
}
