"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Search flights" },
  { href: "/bookings", label: "My bookings" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="SkyBook home">
          <Image
            src="/logo.svg"
            alt="SkyBook"
            width={109}
            height={32}
            loading="eager"
          />
        </Link>

        <nav className="flex gap-1">
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
                className={`rounded-lg px-3 py-2 text-small font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
