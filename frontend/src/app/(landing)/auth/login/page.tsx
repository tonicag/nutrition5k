import LoginFormLayout from "@/app/(landing)/auth/login/components/login-form-layout";

export default function LoginPage() {
    return (
        <div className="flex flex-col flex-1 w-full">
            <LoginFormLayout className="max-w-md p-4 mt-8 md:mt-0 md:my-auto w-full" />
        </div>
    );
}
