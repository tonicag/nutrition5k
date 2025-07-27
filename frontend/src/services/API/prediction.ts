import { AXIOS } from "@/services/axios";

export const predictAPI = {
    predict: async (image: string): Promise<EnhancedPredictionResponse> => {
        const response = await AXIOS.post("/prediction/macronutrients", {
            image,
        });

        const data = response.data.data;

        if (!data) {
            throw new Error("No data returned from the API");
        }

        return calculateEnhancedPredictionResponse(data);
    },
};

function calculateEnhancedPredictionResponse(
    data: PredictionResponse
): EnhancedPredictionResponse {
    const { macronutrients_per_gram } = data;

    const { carbs, fat, protein } = macronutrients_per_gram;

    return {
        calories: Number(
            ((carbs * 4 + fat * 9 + protein * 4) * 100).toFixed(2)
        ),
        protein: Number((protein * 100).toFixed(2)),
        carbs: Number((carbs * 100).toFixed(2)),
        fat: Number((fat * 100).toFixed(2)),
    };
}

export type PredictionResponse = {
    macronutrients_per_gram: {
        carbs: number;
        fat: number;
        protein: number;
    };
    metadata: {
        device_used: string;
        mass_provided: boolean;
    };
};

export type EnhancedPredictionResponse = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
};
