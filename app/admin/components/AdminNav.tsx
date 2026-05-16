"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "responses" },
  { href: "/admin/export", label: "export" },
  { href: "/admin/seating", label: "seating" },
  { href: "/admin/guests", label: "guests" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center gap-8 mb-12">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-xs tracking-[0.2em] lowercase pb-0.5 transition-colors ${
            pathname === href
              ? "text-ink font-medium border-b border-accent"
              : "text-ink-light hover:text-ink font-normal"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
