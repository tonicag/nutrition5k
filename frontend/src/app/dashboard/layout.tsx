import { AuthenticatedGuard } from "@/components/guards/authenticated-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthenticatedGuard>{children}</AuthenticatedGuard>;
}
