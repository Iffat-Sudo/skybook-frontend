"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  errorBoxClass,
  fieldClass,
  labelClass,
  labelTextClass,
  primaryButtonClass,
} from "@/components/ui/styles";

const DEMO_EMAIL = "demo@skybook.com";
const DEMO_PASSWORD = "SkyBookDemo2026";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const { saveLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      saveLogin(response);
      router.push(next);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ email: email.trim(), password });
  }

  function fillDemoAccount() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-card">
        <label className={labelClass}>
          <span className={labelTextClass}>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            className={fieldClass}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {mutation.isError && (
          <p role="alert" className={errorBoxClass}>
            {mutation.error.message}
          </p>
        )}

        <button type="submit" disabled={mutation.isPending} className={`${primaryButtonClass} w-full`}>
          {mutation.isPending ? "Logging in..." : "Log in"}
        </button>

        {mutation.isPending && (
          <p className="text-center text-caption text-neutral-400">
            The first login can take up to a minute while the server wakes up.
          </p>
        )}

        <p className="text-center text-small text-neutral-600">
          No account yet?{" "}
          <Link
            href={`/register?next=${encodeURIComponent(next)}`}
            className="font-medium text-primary-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>

      <div className="rounded-lg bg-primary-50 p-4 text-small text-primary-900">
        <p className="font-medium">Just looking around?</p>
        <p className="text-neutral-600">
          Use the demo account: {DEMO_EMAIL} / {DEMO_PASSWORD}
        </p>
        <button
          type="button"
          onClick={fillDemoAccount}
          className="mt-2 font-medium text-primary-700 hover:underline"
        >
          Fill in the demo account
        </button>
      </div>
    </div>
  );
}