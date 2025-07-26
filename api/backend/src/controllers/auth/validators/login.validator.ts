import { z } from "zod";

export const loginValidator = z.object({
    email: z.string().email(),
    password: z.string(),
});
