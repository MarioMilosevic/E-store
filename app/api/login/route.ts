import { loginFormSchema } from "@/lib/zodSchemas";
import { createSession } from "@/lib/session";
import prisma from "@/prisma/prismaClient";
import successFactory from "@/_services/success";
import errorFactory from "@/_services/error";

export async function POST(req: Request) {
  const response = await req.json();
  const result = loginFormSchema.safeParse(response);

  if (!result.success) {
    return errorFactory.badRequest("Invalid input data");
  }

  const { email, password } = result.data;

  const userInfo = await prisma.user.findUnique({
    where: { email },
    select: {
      password: true,
    },
  });

  if (!userInfo) {
    return errorFactory.notAuthorized("Invalid login credentials");
  }

  const passwordValidation = await prisma.user.checkPassword(
    password,
    userInfo?.password
  );

  if (!passwordValidation) {
    return errorFactory.badRequest("Invalid login credentials");
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

  if (user) {
    const userIdString = String(user.id);
    await createSession(userIdString);
    return successFactory.ok(user, "Login successfull");
  }

  return errorFactory.internalServerError("Something went wrong");
}
