"use client";

import {
    EnhancedPredictionResponse,
    predictAPI,
} from "@/services/API/prediction";
import { useState } from "react";
import { toast } from "sonner";
import PredictionForm from "./prediction-form";

export default function Prediction() {
    const [nutritionData, setNutritionData] =
        useState<EnhancedPredictionResponse | null>(null);

    const handleFormSubmit = async (data: { image: string }) => {
        try {
            console.log("Base64 Image:", data.image);

            const response = await predictAPI.predict(data.image);

            setNutritionData(response);

            toast.success("Analysis complete!", {
                description: "Your nutritional data is ready",
            });
        } catch (error) {
            console.error("Error analyzing image:", error);
            toast.error("Analysis failed", {
                description: "Please try again with a different image",
            });
        } finally {
        }
    };

    return (
        <div className="space-y-8 flex-1 pt-8  gap-2">
            <PredictionForm
                onSubmit={handleFormSubmit}
                className="flex-1"
                containerClassName="flex-1"
                onReset={() => setNutritionData(null)}
            />

            {nutritionData && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Nutrition Analysis
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700">
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                                    {nutritionData.calories}
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    Calories
                                </p>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-700">
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                                    {nutritionData.protein}g
                                </p>
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Protein
                                </p>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700">
                                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                    {nutritionData.carbs}g
                                </p>
                                <p className="text-sm text-orange-600 dark:text-orange-400">
                                    Carbs
                                </p>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                                    {nutritionData.fat}g
                                </p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                    Fat
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
