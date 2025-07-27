"use client";

import {
    RegisterFormSchema,
    registerSchema,
} from "@/app/(landing)/auth/register/components/form-schema";
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
import { Input } from "@/components/ui/input";
import { useAuthStoreSelector } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterFormLayout({
    className,
}: {
    className?: string;
}) {
    const register = useAuthStoreSelector((state) => state.register);
    const router = useRouter();

    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = useCallback(
        async (data: RegisterFormSchema) => {
            try {
                await register(data);
                router.push("/dashboard");
            } catch (error) {
                console.log({ error });
                if (isAxiosError(error)) {
                    toast(error.response?.data.error, {
                        description: "Please try again",
                    });
                } else {
                    toast("An unknown error occurred", {
                        description: "Please try again",
                    });
                }
            }
        },
        [register, router]
    );

    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "flex flex-col gap-4 max-w-4xl mx-auto",
                    className
                )}
            >
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Email"
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your email to login
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your password to login
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                />
                            </FormControl>
                            <FormDescription>
                                Confirm your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <p className="ms-auto text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        className="text-cyan-500 hover:text-cyan-600"
                        href="/auth/login"
                    >
                        Login
                    </Link>
                </p>
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    Register
                </Button>
            </form>
        </Form>
    );
}
