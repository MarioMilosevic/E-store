"use server";

import { z } from "zod";
import { signUpFormSchema } from "@/lib/zodSchemas";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function signUpUser(values: z.infer<typeof signUpFormSchema>) {
  const result = signUpFormSchema.safeParse(values);
  console.log("ovo je result", result);

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
  const { email, firstName, lastName } = result.data;

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  console.log("ovo je existing email", existingEmail);

  if (existingEmail) {
    return {
      status: "failure",
      message: "User with this email already exists",
    };
  }

  return {
    status: "success",
    message: "Request sent successfully",
  };
}
