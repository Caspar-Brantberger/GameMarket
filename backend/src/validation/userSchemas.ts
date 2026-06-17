import { z } from "zod";

export const updateUserSchema = z
    .object({
    username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username is too long")
    .optional(),

    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email is too long")
    .optional(),
    })
    .refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided",
        }
    );