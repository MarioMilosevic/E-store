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

export const addProductFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters long")
    .max(25, "Title must be at most 25 characters long"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  image: z
    .string()
    .url("Image must be a valid URL")
    .refine((value) => value.startsWith("http"), {
      message: "Image URL must start with http or https",
    }),
  condition: z.enum(["new", "used", "refurbished"], {
    errorMap: () => ({
      message: "Condition must be one of: new, used or refurbished",
    }),
  }),
  category: z.enum(
    [
      "electronics",
      "fashion",
      "home & garden",
      "toys",
      "games",
      "books",
      "sneakers",
      "watches & jewelry",
      "art",
      "musical instruments",
      "health & beauty",
      "office & stationery",
    ],
    {
      errorMap: () => ({
        message:
          "Category must be one of: electronics, fashion, home & garden, toys, games, books, sneakers, watches & jewelry, art, musical instruments, health & beauty, office & stationery",
      }),
    }
  ),
  sellingType: z.enum(["auction", "fixed"], {
    errorMap: () => ({
      message: "Selling type must be either auction or fixed",
    }),
  }),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .max(10000, "Price must be at most 10,000,0"),
  itemLocation: z.enum(["any", "us only", "north america", "europe", "asia"], {
    errorMap: () => ({
      message:
        "Item location must be one of: any, us only, north america, europe, asia",
    }),
  }),
  shippingCost: z.enum(["free", "fast"], {
    errorMap: () => ({
      message: "Shipping cost must be either free or fast",
    }),
  }),
});
export const addProductFormSchemaWithImage = addProductFormSchema.extend({});
