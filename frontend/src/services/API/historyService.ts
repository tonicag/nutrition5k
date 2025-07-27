import { AXIOS } from "@/services/axios";

export const historyAPI = {
    getHistory: async (): Promise<PredictionHistory[]> => {
        const response = await AXIOS.get("/history");
        return response.data.data;
    },
};

export type PredictionHistory = {
    id: string;
    createdAt: string;
    updatedAt: string;
    image?: string;
    macronutrients_per_gram: {
        calories?: number;
        protein: number;
        carbs: number;
        fat: number;
    };
};
