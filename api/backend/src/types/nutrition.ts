export interface MacronutrientsPerGram {
    fat: number;
    carbs: number;
    protein: number;
}

export interface TotalMacronutrients {
    fat: number;
    carbs: number;
    protein: number;
    calories: number;
}

export interface PredictionMetadata {
    filename?: string;
    device_used: string;
    mass_provided: boolean;
}

export interface MacronutrientPredictionResponse {
    macronutrients_per_gram: MacronutrientsPerGram;
    total_macronutrients?: TotalMacronutrients;
    metadata: PredictionMetadata;
}

export interface ErrorResponse {
    error: string;
    message?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
