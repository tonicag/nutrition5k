"use client";

import { useEffect } from "react";
import { setupAxiosInterceptors } from "@/services/axios";
import { useAuthContext } from "@/context/auth-context";

export const useAxiosSetup = () => {
    const authStore = useAuthContext();

    useEffect(() => {
        setupAxiosInterceptors(authStore);
    }, [authStore]);
};

export function AxiosSetup() {
    useAxiosSetup();
    return null;
}
