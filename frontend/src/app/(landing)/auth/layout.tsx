import LoggedInGuard from "@/app/(landing)/auth/components/logged-in-guard";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LoggedInGuard>
            <div className="flex-1 flex flex-col">{children}</div>
        </LoggedInGuard>
    );
}
