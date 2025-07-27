import RegisterFormLayout from "@/app/(landing)/auth/register/components/register-form-layout";

export default function LoginPage() {
    return (
        <div className="flex flex-col flex-1 w-full">
            <RegisterFormLayout className="max-w-md p-4 mt-8 md:mt-0 md:my-auto w-full" />
        </div>
    );
}
