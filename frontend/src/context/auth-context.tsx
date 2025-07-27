"use client";

import { AxiosSetup } from "@/hooks/useAxiosSetup";
import { createAuthStore, AuthStore } from "@/store/authStore";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type AuthContextType = {
    authStore: ReturnType<typeof createAuthStore> | null;
};

export const AuthContext = createContext<AuthContextType>({
    authStore: null,
});

export function useAuthContext() {
    const { authStore } = useContext(AuthContext);
    if (!authStore) {
        throw new Error("AuthStore not found");
    }
    return authStore;
}

export function useAuthStoreSelector<T>(selector: (state: AuthStore) => T) {
    const authStore = useAuthContext();
    return useStore(authStore, selector);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const authStore = useRef<ReturnType<typeof createAuthStore> | null>(null);

    if (!authStore.current) {
        authStore.current = createAuthStore();
    }

    return (
        <AuthContext.Provider value={{ authStore: authStore.current }}>
            <AxiosSetup />
            {children}
        </AuthContext.Provider>
    );
}
