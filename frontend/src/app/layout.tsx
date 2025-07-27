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
            <script>
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W2HX7BGK');`}
            </script>

            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-W2HX7BGK"
                        height="0"
                        width="0"
                        style={{
                            display: "none",
                            visibility: "hidden",
                        }}
                    ></iframe>
                </noscript>
                <AuthProvider>{children}</AuthProvider>
                <Toaster position="top-center" richColors />
            </body>
        </html>
    );
}
