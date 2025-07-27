"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, FileImage, Sparkles, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    fileToBase64,
    PredictionFormData,
    predictionFormSchema,
} from "./prediction-form-schema";

interface PredictionFormProps {
    containerClassName?: string;
    className?: string;
    onSubmit?: (data: { image: string }) => Promise<void>;
    onReset?: () => void;
}

export default function PredictionForm({
    containerClassName,
    className,
    onSubmit,
    onReset,
}: PredictionFormProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const predictionRef = useRef<HTMLDivElement>(null);

    const form = useForm<PredictionFormData>({
        resolver: zodResolver(predictionFormSchema),
    });

    const handleFileChange = useCallback(
        (file: File) => {
            onReset?.();
            form.setValue("image", file);
            form.clearErrors("image");

            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        },
        [form, onReset]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);

            const files = Array.from(e.dataTransfer.files);
            const imageFile = files.find((file) =>
                file.type.startsWith("image/")
            );

            if (imageFile) {
                handleFileChange(imageFile);
            } else {
                toast.error("Please upload an image file");
            }
        },
        [handleFileChange]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const removeImage = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.setValue("image", undefined as any);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        onReset?.();
    }, [form, previewUrl, onReset]);

    const handleSubmit = useCallback(
        async (data: PredictionFormData) => {
            try {
                const base64Image = await fileToBase64(data.image);
                await onSubmit?.({ image: base64Image });
                setTimeout(() => {
                    predictionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 500);
            } catch (error) {
                console.error("Error processing image:", error);
                toast.error("Failed to process image. Please try again.");
            }
        },
        [onSubmit]
    );

    const { isSubmitting } = form.formState;

    return (
        <div className={cn("relative flex-1", containerClassName)}>
            {/* Background gradient elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-200/10 dark:bg-cyan-800/10 rounded-full blur-2xl animate-pulse" />
                <div
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200/10 dark:bg-purple-800/10 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className={cn(
                        "relative z-10 flex flex-col gap-6 max-w-2xl mx-auto",
                        className
                    )}
                >
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100/80 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-full text-sm font-medium text-cyan-700 dark:text-cyan-300">
                            <Sparkles className="w-4 h-4" />
                            AI Nutrition Analysis
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Upload Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
                                Dish Photo
                            </span>
                        </h1>
                        <p className="text-muted-foreground">
                            Get instant nutritional insights from your meal
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-base font-semibold">
                                    Food Image
                                </FormLabel>
                                <FormControl className="overflow-hidden">
                                    <div className="w-full">
                                        <div
                                            className={cn(
                                                "relative group border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden",
                                                isDragOver
                                                    ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 scale-[1.02]"
                                                    : "border-gray-300 dark:border-gray-600 hover:border-cyan-400 hover:bg-gray-50/50 dark:hover:bg-gray-900/20",
                                                previewUrl && ""
                                            )}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                        >
                                            {previewUrl ? (
                                                <div className="relative w-full h-full">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-xl"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={
                                                                removeImage
                                                            }
                                                            className="shadow-lg"
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                                                    <div className="relative">
                                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/40 rounded-2xl border border-cyan-200 dark:border-cyan-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                                            <Camera className="w-8 h-8 md:w-10 md:h-10 text-cyan-600 dark:text-cyan-400" />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                                                            <Upload className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                            Drop your image here
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            or click to browse
                                                        </p>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                                            Supports: JPEG, PNG,
                                                            WebP (max 5MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        handleFileChange(file);
                                                    }
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>

                                        {field.value && (
                                            <div
                                                ref={predictionRef}
                                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 max-w-full w-full overflow-hidden"
                                            >
                                                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/40 rounded-lg flex items-center justify-center">
                                                    <FileImage className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">
                                                        {field.value.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {(
                                                            field.value.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{" "}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormDescription className="text-center">
                                    Upload a clear photo of your dish for the
                                    most accurate nutrition analysis
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting || !form.watch("image")}
                        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5 mr-2" />
                                Analyze Nutrition
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
