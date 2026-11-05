import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { safeRedirect } from "@/lib/auth/safeRedirect";

export const metadata: Metadata = {
  title: "Log in · SkyBook",
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-1">
        <h1 className="text-h2 text-neutral-900 md:text-h1">Log in</h1>
        <p className="text-small text-neutral-600">Log in to book flights and see your bookings.</p>
      </div>
      <LoginForm next={safeRedirect(next)} />
    </div>
  );
}