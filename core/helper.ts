import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const registerSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" })
        .min(3, "Username must be at least 3 characters long")
        .max(50, "Username must not exceed 50 characters"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
});