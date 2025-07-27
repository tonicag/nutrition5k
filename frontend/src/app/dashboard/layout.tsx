import Sidebar from "@/app/dashboard/components/sidebar/sidebar";
import { AuthenticatedGuard } from "@/components/guards/authenticated-guard";
import Providers from "@/providers/providers";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthenticatedGuard>
            <Providers>
                <div className="flex h-screen w-full max-h-screen">
                    <Sidebar />
                    <div className="flex-1 flex flex-col h-full max-w-full">
                        <div className="flex-1 overflow-y-auto pt-16 md:pt-0 p-4">
                            {children}
                        </div>
                    </div>
                </div>
            </Providers>
        </AuthenticatedGuard>
    );
}
