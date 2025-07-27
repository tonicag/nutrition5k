import { z } from "zod";

export const registerSchema = z
    .object({
        // name: z.string().min(1),
        email: z.email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterFormSchema = z.infer<typeof registerSchema>;
