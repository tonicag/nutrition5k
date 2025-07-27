"use client";

import { useAuthStoreSelector } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
    const logout = useAuthStoreSelector((state) => state.logout);

    const router = useRouter();

    useEffect(() => {
        logout();
        router.push("/");
    }, [logout, router]);

    return null;
}
