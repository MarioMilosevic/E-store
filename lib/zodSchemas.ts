import { z } from "zod";
import { passwordMessage } from "@/lib/constants";

export const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export const signUpFormSchema = z
  .object({
    firstName: z.string().trim().min(2).max(20),
    lastName: z.string().trim().min(2).max(30),
    email: z.string().email(),
    password: z.string().trim().min(8, passwordMessage),
    passwordConfirm: z.string().trim().min(8, passwordMessage),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
