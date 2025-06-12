"use server";

import { z } from "zod";
import { signUpFormSchema } from "@/lib/zodSchemas";
import prisma from "@/prisma/prismaClient";

export async function signUpUser(values: z.infer<typeof signUpFormSchema>) {
  const result = signUpFormSchema.safeParse(values);
  console.log("ovo je result", result);

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
  const { email, firstName, lastName, password } = result.data;

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  const fullName = `${firstName} ${lastName}`;

  console.log("ovo je existing email", existingEmail);

  if (existingEmail) {
    return {
      status: "error",
      message: "User with this email already exists",
    };
  }

  const user = await prisma.user.create({
    data: {
      email,
      fullName,
      password,
    },
    select: {
      email: true,
      fullName: true,
    },
  });

  if (user.email && user.fullName) {
    return {
      status: "success",
      message: "User signed up successfully",
    };
  }
  return {
    status: "error",
    message:"Something went wrong"
  }
}
