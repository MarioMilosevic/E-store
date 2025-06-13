"use server";

import { z } from "zod";
import { loginFormSchema } from "@/lib/zodSchemas";
import prisma from "@/prisma/prismaClient";
import { createSession } from "@/lib/session";

export async function loginUser(values: z.infer<typeof loginFormSchema>) {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
  console.log("ovo je result", result);
  const { email, password } = result.data;

  const userInfo = await prisma.user.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });
  console.log("ovo je user info", userInfo);

  if (!userInfo) {
    return {
      status: "error",
      message: "Invalid login credentials",
    };
  }

  const passwordValidation = await prisma.user.checkPassword(
    password,
    userInfo?.password
  );
  console.log("ovo je password validation", passwordValidation);

  if (!passwordValidation) {
    return {
      status: "error",
      message: "Invalid login credentials",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
    },
  });

  console.log("ovo je user", user);

  if (user) {
    const userIdString = String(user.id)
    await createSession(userIdString)
    return {
      status: "success",
      message: "Login successfull",
    };
  }

  return {
    status: "error",
    message: "Something went wrong",
  };
}
