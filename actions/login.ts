"use server";

import { z } from "zod";
import { loginFormSchema } from "@/lib/zodSchemas";
import { createSession } from "@/lib/session";
import prisma from "@/prisma/prismaClient";

export async function loginUser(values: z.infer<typeof loginFormSchema>) {
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
  const { email, password } = result.data;

  const userInfo = await prisma.user.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });

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
      role:true
    },
  });


  if (user) {
    const userIdString = String(user.id)
    await createSession(userIdString)
    return {
      status: "success",
      message: "Login successfull",
      data:user
    };
  }

  return {
    status: "error",
    message: "Something went wrong",
  };
}
