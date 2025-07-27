import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 border-b-2 border-b-cyan-500">
            <Link href="/">
                <h1 className="text-xl font-bold">Macronutrient Predictor</h1>
            </Link>
            <div className="flex gap-2">
                <Link
                    className={buttonVariants({ variant: "outline" })}
                    href="/auth/login"
                >
                    Login
                </Link>
                <Link
                    className={buttonVariants({ variant: "default" })}
                    href="/auth/register"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
}
