import prisma from "@/prisma/prismaClient";
import successFactory from "@/services/success";
import errorFactory from "@/services/error";
import { signUpFormSchema } from "@/lib/zodSchemas";

export async function POST(req: Request) {
  const response = await req.json();
  const result = signUpFormSchema.safeParse(response);

  if (!result.success) {
    return errorFactory.badRequest("Invalid input data");
  }

  const { email, firstName, lastName, password } = result.data;

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return errorFactory.conflict("User with this email already exists");
  }
  const fullName = `${firstName} ${lastName}`;

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
    return successFactory.created(user, "Signed up successfully");
  }

  return errorFactory.internalServerError("Something went wrong");
}
