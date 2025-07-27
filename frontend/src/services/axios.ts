import { createAuthStore } from "@/store/authStore";
import axios from "axios";

export const AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const setupAxiosInterceptors = (
    authStore: ReturnType<typeof createAuthStore>
) => {
    AXIOS.interceptors.request.clear();
    AXIOS.interceptors.response.clear();

    AXIOS.interceptors.request.use(
        (config) => {
            const token = authStore.getState().jwtToken;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    AXIOS.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                authStore.getState().setUser(null);
                authStore.getState().setIsAuthenticated(false);
                authStore.getState().setJwtToken(null);
            }
            return Promise.reject(error);
        }
    );
};
