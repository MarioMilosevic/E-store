import { cookies } from "next/headers";
import successFactory from "@/services/success";

export async function DELETE() {
  (await cookies()).delete("session");
  return successFactory.noContent();
}
