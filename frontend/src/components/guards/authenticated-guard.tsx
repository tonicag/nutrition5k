"use client";

import { useAuthStoreSelector } from "@/context/auth-context";
import { redirect } from "next/navigation";

export function AuthenticatedGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = useAuthStoreSelector(
        (state) => state.isAuthenticated
    );
    const isLoading = useAuthStoreSelector((state) => state.isLoading);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        redirect("/auth/login");
        return null;
    }

    return children;
}
