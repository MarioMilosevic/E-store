import { loginFormSchema } from "@/lib/zodSchemas";
import { createSession } from "@/lib/session";
import prisma from "@/prisma/prismaClient";

export async function POST(req: Request) {
  const response = await req.json();
  const result = loginFormSchema.safeParse(response);
  // success.true ili false

  if (!result.success) {
    return Response.json({
      status: "error",
      message: "Invalid input data",
    });
    // return {
    //   status: "error",
    //   message: "Something went wrong",
    // };
  }
  const { email, password } = result.data;

  const userInfo = await prisma.user.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });
  console.log("ovo je user info", userInfo);

  if (!userInfo) {
    return Response.json({
      status: "error",
      message: "Invalid login credentials",
    });
    // return {
    //   status: "error",
    //   message: "Invalid login credentials",
    // };
  }

  const passwordValidation = await prisma.user.checkPassword(
    password,
    userInfo?.password
  );
  console.log("ovo je password validation", passwordValidation);

  if (!passwordValidation) {
    return Response.json({
      status: "error",
      message: "Invalid login credentials",
    });
    // return {
    //   status: "error",
    //   message: "Invalid login credentials",
    // };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  });
  console.log("ovo je user", user);

  if (user) {
    const userIdString = String(user.id);
    await createSession(userIdString);
    return Response.json({
      status: "success",
      message: "Login successful",
      data: user,
    });
    // return {
    //   status: "success",
    //   message: "Login successfull",
    //   data: user,
    // };
  }

  // return {
  //   status: "error",
  //   message: "Something went wrong",
  // };

  // console.log("ovo na serveru", response);
  return Response.json("ovo je nesto default");
}
