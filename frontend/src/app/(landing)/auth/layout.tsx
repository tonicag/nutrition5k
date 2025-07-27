export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="flex-1 flex flex-col">{children}</div>;
}
