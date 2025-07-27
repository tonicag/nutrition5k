import { LoginFormSchema } from "@/app/(landing)/auth/login/components/form-schema";
import { RegisterFormSchema } from "@/app/(landing)/auth/register/components/form-schema";
import { authAPI } from "@/services/API/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
    id: string;
    email: string;
    name?: string;
};

export type AuthStore = {
    user: User | null;
    setUser: (user: User | null) => void;

    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;

    logIn: (body: LoginFormSchema) => Promise<void>;
    register: (body: RegisterFormSchema) => Promise<void>;

    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;

    jwtToken: string | null;
    setJwtToken: (jwtToken: string | null) => void;
};

export const createAuthStore = () =>
    create<AuthStore>()(
        persist(
            (set) => ({
                user: null,
                setUser: (user) => set({ user }),

                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated) =>
                    set({ isAuthenticated }),

                logIn: async (body) => {
                    const response = await authAPI.login(body);

                    set({
                        user: response.user,
                        isAuthenticated: true,
                        jwtToken: response.token,
                    });
                },
                register: async (body) => {
                    const response = await authAPI.register(body);

                    set({
                        user: response.user,
                        isAuthenticated: true,
                        jwtToken: response.token,
                    });
                },

                isLoading: true,
                setIsLoading: (isLoading) => set({ isLoading }),

                jwtToken: null,
                setJwtToken: (jwtToken) => set({ jwtToken }),
            }),
            {
                name: "auth-store",
                storage: createJSONStorage(() => localStorage),
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        state.setIsLoading(false);
                    }
                },
            }
        )
    );
