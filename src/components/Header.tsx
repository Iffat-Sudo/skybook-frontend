"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth/AuthProvider";

const links = [
  { href: "/", label: "Search flights", hideOnPhone: true },
  { href: "/bookings", label: "My bookings", hideOnPhone: false },
];

const linkClass = "rounded-lg px-3 py-2 text-small font-medium";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isReady, logout } = useAuth();

  function handleLogout() {
    logout();
    queryClient.clear(); // forget all data of the old user
    router.push("/");
  }

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="SkyBook home">
          <Image src="/logo.svg" alt="SkyBook" width={109} height={32} loading="eager" />
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/" || pathname.startsWith("/results")
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkClass} ${link.hideOnPhone ? "hidden sm:inline-flex" : ""} ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Wait until we know if the user is logged in, so the button doesn't "jump" */}
          {isReady &&
            (user ? (
              <>
                <span className="hidden px-2 text-small text-neutral-600 md:inline">
                  Hi, {user.name.split(" ")[0]}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${linkClass} text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900`}
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`${linkClass} ml-1 bg-primary-600 text-white hover:bg-primary-700`}
              >
                Log in
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}