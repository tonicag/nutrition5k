import { LoginFormSchema } from "@/app/(landing)/auth/login/components/form-schema";
import { RegisterFormSchema } from "@/app/(landing)/auth/register/components/form-schema";
import { AXIOS } from "@/services/axios";

export const authAPI = {
    login: async (body: LoginFormSchema) => {
        const response = await AXIOS.post("/auth/login", body);
        return response.data;
    },
    register: async (body: RegisterFormSchema) => {
        const response = await AXIOS.post("/auth/register", body);
        return response.data;
    },
};
