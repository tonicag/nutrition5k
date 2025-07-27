"use client";

import { buttonVariants } from "@/components/ui/button";
import { useAuthStoreSelector } from "@/context/auth-context";
import Link from "next/link";

export default function Navbar() {
    const isAuthenticated = useAuthStoreSelector(
        (state) => state.isAuthenticated
    );

    return (
        <div className="flex justify-between items-center p-4 border-b-2 border-b-cyan-500">
            <Link href="/">
                <h1 className="text-xl font-bold">Macronutrient Predictor</h1>
            </Link>
            {!isAuthenticated && (
                <div className="flex gap-2">
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/auth/login"
                    >
                        Login
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href="/auth/register"
                    >
                        Get Started
                    </Link>
                </div>
            )}
            {isAuthenticated && (
                <div className="flex gap-2 items-center">
                    <Link href="/auth/logout">Logout</Link>
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}
