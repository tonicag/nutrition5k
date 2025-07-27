"use client";

import { useAuthStoreSelector } from "@/context/auth-context";
import { redirect, usePathname } from "next/navigation";

export default function LoggedInGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isAuthenticated = useAuthStoreSelector(
        (state) => state.isAuthenticated
    );

    if (isAuthenticated && !pathname.includes("logout")) {
        return redirect("/dashboard");
    }

    return children;
}
