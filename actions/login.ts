"use server";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function loginUser(prevstate: string, formData: FormData) {
  console.log("ovo je prethodni stejt", prevstate);
  const validatedFields = formSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return validatedFields.error.flatten().fieldErrors;
  } else {
    console.log("prosla forma", validatedFields.data);
    return { email: "", password: "" };
  }
}
