import imageCompression from "browser-image-compression";
import { z } from "zod";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB for original file
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

// Helper function to check if file is a valid image
const isValidImageFile = (file: File): boolean => {
    // First check MIME type if it exists
    if (file.type && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return true;
    }

    // Fallback to extension check for files without proper MIME type (like HEIC)
    const extension = file.name.toLowerCase().split(".").pop();
    return extension ? ACCEPTED_IMAGE_EXTENSIONS.includes(extension) : false;
};

export const predictionFormSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 15MB",
        })
        .refine((file) => isValidImageFile(file), {
            message: "Only JPEG, PNG, WebP, and HEIC images are allowed",
        }),
});

export const compressAndConvertToBase64 = async (
    file: File
): Promise<string> => {
    try {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: "image/jpeg",
            initialQuality: 0.8,
        };

        console.log(
            "Original file size:",
            (file.size / 1024 / 1024).toFixed(2),
            "MB"
        );

        const compressedFile = await imageCompression(file, options);

        console.log(
            "Compressed file size:",
            (compressedFile.size / 1024 / 1024).toFixed(2),
            "MB"
        );
        console.log(
            "Compression ratio:",
            (((file.size - compressedFile.size) / file.size) * 100).toFixed(1),
            "% reduction"
        );

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
        });
    } catch (error) {
        console.error("Error compressing image:", error);
        return fileToBase64(file);
    }
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export type PredictionFormData = z.infer<typeof predictionFormSchema>;
