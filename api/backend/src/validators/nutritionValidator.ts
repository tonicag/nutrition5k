import { z } from "zod";

// Base64 image validation schema
const base64ImageSchema = z
    .string()
    .min(1, "Image is required")
    .regex(
        /^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/]+=*)$/,
        "Image must be a valid base64 data URL (data:image/type;base64,...)"
    )
    .refine((value: string) => {
        try {
            const base64Data = value.split(",")[1];
            const buffer = Buffer.from(base64Data, "base64");

            return buffer.length > 100 && buffer.length < 10 * 1024 * 1024; // 100 bytes to 10MB
        } catch {
            return false;
        }
    }, "Image size must be between 100 bytes and 10MB");

const massSchema = z
    .number()
    .positive("Mass must be a positive number")
    .max(10000, "Mass cannot exceed 10,000 grams")
    .optional();

export const macronutrientPredictionSchema = z.object({
    image: base64ImageSchema,
    mass: massSchema,
});

export type MacronutrientPredictionRequest = z.infer<
    typeof macronutrientPredictionSchema
>;

export const validateBase64Image = (base64String: string): boolean => {
    try {
        const result = base64ImageSchema.safeParse(base64String);
        return result.success;
    } catch {
        return false;
    }
};

export const validateRequest = <T>(schema: z.ZodSchema<T>) => {
    return (data: unknown) => {
        const result = schema.safeParse(data);

        if (!result.success) {
            const errors = result.error.errors;

            return {
                success: false,
                error: errors
                    .map((error) => `${error.path}: ${error.message}`)
                    .join(";"),
                details: errors,
            };
        }

        return {
            success: true,
            data: result.data,
        };
    };
};
