"use client";
import {
    LoginFormSchema,
    loginSchema,
} from "@/app/(landing)/auth/login/components/form-schema";
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

export default function LoginFormLayout({ className }: { className?: string }) {
    const logIn = useAuthStoreSelector((state) => state.logIn);
    const router = useRouter();
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = useCallback(
        async (data: LoginFormSchema) => {
            try {
                await logIn(data);
                router.push("/dashboard");
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.error, {
                        description: "Please try again",
                    });
                } else {
                    toast.error("An unknown error occurred", {
                        description: "Please try again",
                    });
                }
            }
        },
        [logIn, router]
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
                <h1 className="text-2xl font-bold mb-4">Login</h1>
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
                <p className="ms-auto text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        className="text-cyan-500 hover:text-cyan-600"
                        href="/auth/register"
                    >
                        Register
                    </Link>
                </p>
                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    Login
                </Button>
            </form>
        </Form>
    );
}
