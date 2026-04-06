"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/registry", label: "Registry" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-stone-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] uppercase text-stone-600 font-medium"
        >
          B & E
        </Link>
        <ul className="flex gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-[0.15em] uppercase transition-colors ${
                  pathname === href
                    ? "text-neutral-900 font-medium"
                    : "text-stone-400 hover:text-neutral-900"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
