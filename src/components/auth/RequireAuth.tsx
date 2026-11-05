"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";

// Wrap a page with <RequireAuth> to send logged-out users to the login page
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !user) {
      const next = window.location.pathname + window.location.search;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [isReady, user, router]);

  // While we check (or while we redirect), show a small message instead of the page
  if (!isReady || !user) {
    return <p className="text-small text-neutral-600">Checking your login...</p>;
  }

  return <>{children}</>;
}