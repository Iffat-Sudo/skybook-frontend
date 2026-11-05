"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/AuthProvider";
import {
  errorBoxClass,
  fieldClass,
  labelClass,
  labelTextClass,
  primaryButtonClass,
} from "@/components/ui/styles";

export default function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const { saveLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      saveLogin(response); // after registering, the user is logged in right away
      router.push(next);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormError("The two passwords are not the same");
      return;
    }

    setFormError(null);
    mutation.mutate({ name: name.trim(), email: email.trim(), password });
  }

  const errorMessage = formError ?? (mutation.isError ? mutation.error.message : null);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-card">
      <label className={labelClass}>
        <span className={labelTextClass}>Full name</span>
        <input
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          className={fieldClass}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

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
        <span className={labelTextClass}>Password (at least 8 characters)</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={fieldClass}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Repeat password</span>
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={fieldClass}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>

      {errorMessage && (
        <p role="alert" className={errorBoxClass}>
          {errorMessage}
        </p>
      )}

      <button type="submit" disabled={mutation.isPending} className={`${primaryButtonClass} w-full`}>
        {mutation.isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-small text-neutral-600">
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary-600 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}