import { z } from "zod";
import { passwordMessage } from "@/lib/constants";

import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";

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
    .any()
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp, and .gif formats are supported."
    ),
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
  sellingMethod: z.enum(["auction", "fixed"], {
    errorMap: () => ({
      message: "Selling method must be either auction or fixed",
    }),
  }),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .max(10000, "Price must be at most 10,000,0"),
  itemLocation: z.enum(["any", "us only", "north america", "europe", "asia"], {
    errorMap: () => ({
      message:
        "Item location must be one of: any, us-only, north-america, europe, asia",
    }),
  }),
  shippingCost: z.enum(["free", "express"], {
    errorMap: () => ({
      message: "Shipping cost must be either free or express",
    }),
  }),
});
export const addProductFormSchemaWithImage = addProductFormSchema.extend({});
