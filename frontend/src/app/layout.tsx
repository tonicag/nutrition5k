import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NutriAI",
    description: "NutriAI - Get Accurate Nutrition Predictions",
    icons: {
        icon: [
            {
                url: "/apple-icon.svg",
                type: "image/svg+xml",
            },
        ],
        shortcut: "/apple-icon.svg",
        apple: "/apple-icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <AuthProvider>{children}</AuthProvider>
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
