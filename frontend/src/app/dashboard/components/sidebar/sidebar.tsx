"use client";

import { cn } from "@/lib/utils";
import { BarChart3, History, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinkClasses =
    "p-3 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/20 flex items-center gap-3 transition-colors";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("mobile-sidebar");
            const button = document.getElementById("mobile-menu-button");
            if (
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                button &&
                !button.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navigationItems = [
        {
            href: "/dashboard",
            icon: BarChart3,
            label: "Predict",
            isActive: pathname === "/dashboard",
        },
        {
            href: "/dashboard/history",
            icon: History,
            label: "History",
            isActive: pathname === "/dashboard/history",
        },
    ];

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-cyan-950 dark:text-cyan-200 truncate">
                        Nutrition AI
                    </h1>
                    <button
                        id="mobile-menu-button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
            )}

            <nav
                id="mobile-sidebar"
                className={cn(
                    "md:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-xl font-bold text-cyan-950 dark:text-cyan-200">
                            Macronutrient Predictor
                        </h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 p-4 flex-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                className={cn(navLinkClasses, {
                                    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200":
                                        item.isActive,
                                    "text-gray-700 dark:text-gray-300":
                                        !item.isActive,
                                })}
                                href={item.href}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <Link
                            className={cn(
                                navLinkClasses,
                                "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            )}
                            href="/auth/logout"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            <nav className="hidden md:flex flex-col gap-4 h-screen w-64 bg-gray-50 dark:bg-gray-900 p-4 text-cyan-800 dark:text-cyan-200 border-r border-gray-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-cyan-950 dark:text-cyan-200">
                    Macronutrient Predictor
                </h1>

                <div className="flex flex-col gap-2 mt-8">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            className={cn(navLinkClasses, {
                                "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200":
                                    item.isActive,
                                "text-cyan-800 dark:text-cyan-300":
                                    !item.isActive,
                            })}
                            href={item.href}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    className={cn(
                        navLinkClasses,
                        "mt-auto mb-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    )}
                    href="/auth/logout"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </Link>
            </nav>
        </>
    );
}
