"use client";

import { PredictionHistory } from "@/services/API/historyService";
import { Beef, Calendar, Droplets, Wheat, Zap } from "lucide-react";

interface HistoryCardsProps {
    predictions: PredictionHistory[];
    isLoading?: boolean;
}

function calculateEnhancedNutrition(macronutrients_per_gram: {
    calories?: number;
    protein: number;
    carbs: number;
    fat: number;
}) {
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

export default function HistoryCards({
    predictions,
    isLoading,
}: HistoryCardsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden animate-pulse"
                    >
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            <div className="grid grid-cols-2 gap-3">
                                {[...Array(4)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!predictions || predictions.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-lg">
                        <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No History Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Start analyzing your meals to see your nutrition history
                    here
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => {
                const enhancedNutrition = calculateEnhancedNutrition(
                    prediction.macronutrients_per_gram
                );

                const date = new Date(prediction.createdAt);
                const formattedDate = date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                return (
                    <div
                        key={prediction.id}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
                    >
                        <div className="relative w-full h-48 overflow-hidden">
                            {prediction.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={prediction.image}
                                    alt="Analyzed dish"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                    <div className="text-center">
                                        <Zap className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">
                                            No Image
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formattedDate}
                                </div>
                                <div className="text-center mt-0.5 text-white/80">
                                    {formattedTime}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Nutrition Analysis
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Per 100g serving
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-700 p-3 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                                                Calories
                                            </p>
                                            <p className="text-lg font-bold text-green-800 dark:text-green-200">
                                                {enhancedNutrition.calories}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-700 p-3 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Beef className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                                                Protein
                                            </p>
                                            <p className="text-lg font-bold text-red-800 dark:text-red-200">
                                                {enhancedNutrition.protein}g
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700 p-3 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Wheat className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                                                Carbs
                                            </p>
                                            <p className="text-lg font-bold text-orange-800 dark:text-orange-200">
                                                {enhancedNutrition.carbs}g
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700 p-3 hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Droplets className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                                                Fat
                                            </p>
                                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                                                {enhancedNutrition.fat}g
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
