import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import { safeRedirect } from "@/lib/auth/safeRedirect";

export const metadata: Metadata = {
  title: "Create account · SkyBook",
};

type RegisterPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { next } = await searchParams;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">Create account</h1>
        <p className="text-small text-neutral-600">It only takes a minute.</p>
      </div>
      <RegisterForm next={safeRedirect(next)} />
    </div>
  );
}