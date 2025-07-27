"use client";

import { getHistoryQueryOptions } from "@/queries/history-query";
import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import HistoryCards from "../components/history/history-cards";

export default function HistoryPage() {
    const { data, isLoading, error } = useQuery(getHistoryQueryOptions());

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">
                        Failed to load history
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Please try refreshing the page
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/10 dark:bg-cyan-800/10 rounded-full blur-2xl animate-pulse" />
                <div
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200/10 dark:bg-purple-800/10 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative z-10 mb-8">
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100/80 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-full text-sm font-medium text-cyan-700 dark:text-cyan-300">
                        <Sparkles className="w-4 h-4" />
                        Your Nutrition Journey
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Analysis{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
                            History
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Review all your previous nutrition analyses and track
                        your eating patterns
                    </p>
                </div>
            </div>

            <div className="relative z-10">
                <HistoryCards predictions={data || []} isLoading={isLoading} />
            </div>
        </div>
    );
}
