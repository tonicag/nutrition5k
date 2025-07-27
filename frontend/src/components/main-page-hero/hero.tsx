"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    ArrowDown,
    ArrowRight,
    BarChart3,
    Beef,
    Camera,
    Droplets,
    ImageIcon,
    Sparkles,
    Wheat,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-cyan-50/30 dark:to-cyan-950/20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-cyan-200/20 dark:bg-cyan-800/20 rounded-full blur-2xl md:blur-3xl animate-pulse" />
                <div
                    className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-2xl md:blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
                <div className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16">
                    <div className="space-y-3 md:space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-100/80 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-full text-xs md:text-sm font-medium text-cyan-700 dark:text-cyan-300">
                            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                            AI-Powered Nutrition Analysis
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                            From{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                                Dish
                            </span>{" "}
                            to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Data
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                            Instantly analyze the nutritional content of any
                            dish with just a single photograph
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-4 items-center">
                        <div className="lg:col-span-1 flex justify-center w-full">
                            <div className="relative">
                                <div className="w-36 h-36 md:w-40 md:h-40 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/40 dark:to-cyan-800/40 rounded-2xl border border-cyan-200 dark:border-cyan-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <Camera className="w-14 h-14 md:w-16 md:h-16 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center animate-bounce">
                                    <ImageIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                                        Your Dish
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Take a photo
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 flex justify-center lg:justify-start">
                            <div className="hidden lg:flex items-center flex-1">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent ml-2 flex-1" />
                                <ArrowRight
                                    className="w-8 h-8 text-cyan-500 animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                />
                            </div>
                            <div className="lg:hidden flex flex-col items-center">
                                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-transparent mt-1" />
                                <ArrowDown
                                    className="w-6 h-6 text-cyan-500 animate-bounce"
                                    style={{ animationDelay: "0.5s" }}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-1 flex justify-center w-full">
                            <div className="relative">
                                <div className="w-36 h-36 md:w-40 md:h-40 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl border border-purple-200 dark:border-purple-700 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <BarChart3 className="w-14 h-14 md:w-16 md:h-16 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-spin">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                        AI Analysis
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Processing...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1 flex justify-center lg:justify-start">
                            <div className="hidden lg:flex items-center flex-1">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent ml-2 flex-1" />
                                <ArrowRight
                                    className="w-8 h-8 text-purple-500 animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                />
                            </div>
                            <div className="lg:hidden flex flex-col items-center">
                                <div className="w-0.5 h-4 bg-gradient-to-b from-purple-500 to-transparent mt-1" />
                                <ArrowDown
                                    className="w-6 h-6 text-purple-500 animate-bounce"
                                    style={{ animationDelay: "0.5s" }}
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-1 flex justify-center w-full">
                            <div className="space-y-3 w-full max-w-xs">
                                <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Beef className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm md:text-base font-semibold text-red-700 dark:text-red-300">
                                            Proteins
                                        </p>
                                        <p className="text-xs md:text-sm text-red-600/80 dark:text-red-400/80">
                                            25.2g
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Wheat className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm md:text-base font-semibold text-orange-700 dark:text-orange-300">
                                            Carbs
                                        </p>
                                        <p className="text-xs md:text-sm text-orange-600/80 dark:text-orange-400/80">
                                            48.1g
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Droplets className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm md:text-base font-semibold text-yellow-700 dark:text-yellow-300">
                                            Fats
                                        </p>
                                        <p className="text-xs md:text-sm text-yellow-600/80 dark:text-yellow-400/80">
                                            12.8g
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 md:mt-16 space-y-6">
                    <div className="space-y-4">
                        <p className="text-base md:text-lg text-muted-foreground px-4">
                            Join thousands of users getting instant nutrition
                            insights
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                            <Link
                                href="/auth/register"
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-full sm:w-auto text-base md:text-lg p-2 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                                )}
                            >
                                <Camera className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Start Analyzing
                            </Link>
                            {/* <Button
                                size="default"
                                variant="outline"
                                className="w-full sm:w-auto text-base md:text-lg p-2 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                View Demo
                            </Button> */}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/40 px-4">
                        <div className="text-center min-w-0">
                            <p className="text-xl md:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                Accurate
                            </p>
                        </div>
                        <div className="text-center min-w-0">
                            <p className="text-xl md:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                Fast
                            </p>
                        </div>
                        <div className="text-center min-w-0">
                            <p className="text-xl md:text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                Easy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
