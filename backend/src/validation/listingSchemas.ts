import { z } from "zod";

const platformSchema = z.enum([
"PC",
"PLAYSTATION",
"XBOX",
"NINTENDO_SWITCH",
"MOBILE",
]);

const conditionSchema = z.enum([
"NEW",
"USED",
"LIKE_NEW",
"REFURBISHED",
"DAMAGED",
]);

const statusSchema = z.enum([
"AVAILABLE",
"SOLD",
"PENDING",
]);

export const createListingSchema = z.object({
title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),

description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),

price: z
    .number()
    .finite("Price must be a valid number")
    .min(0, "Price cannot be negative")
    .max(1_000_000, "Price is too high"),

platform: platformSchema,

imageUrl: z
    .string()
    .trim()
    .max(2000, "Image URL is too long"),

genre: z
    .string()
    .trim()
    .max(50, "Genre is too long")
    .optional(),

condition: conditionSchema,

status: statusSchema.optional(),

location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location is too long"),
});

export const updateListingSchema =
createListingSchema
    .omit({
    status: true,
    })
    .extend({
    status: statusSchema.optional(),
    })
    .partial()
    .refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided",
    }
    );