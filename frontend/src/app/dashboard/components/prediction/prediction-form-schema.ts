import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
];

const ACCEPTED_IMAGE_EXTENSIONS = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "heic",
    "heif",
];

const isValidImageFile = (file: File): boolean => {
    if (file.type && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return true;
    }

    const extension = file.name.toLowerCase().split(".").pop();
    return extension ? ACCEPTED_IMAGE_EXTENSIONS.includes(extension) : false;
};

export const predictionFormSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 5MB",
        })
        .refine((file) => isValidImageFile(file), {
            message: "Only JPEG, PNG, WebP, and HEIC images are allowed",
        }),
});

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export type PredictionFormData = z.infer<typeof predictionFormSchema>;
