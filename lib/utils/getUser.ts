import { cookies } from "next/headers";
import { decrypt } from "../session";
import { UserType } from "../types";
import prisma from "@/prisma/prismaClient";

let cachedUser: UserType | null = null;

export async function getUser() {
  if (cachedUser?.id) return cachedUser;

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: Number(session.userId) },
    select: {
      id: true,
      fullName: true,
    },
  });
  cachedUser = user as UserType;
  return cachedUser;
}
