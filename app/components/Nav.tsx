"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/details", label: "details" },
  { href: "/attire", label: "attire" },
  { href: "/rsvp", label: "rsvp" },
  { href: "/registry", label: "registry" },
  { href: "/faq", label: "faq" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-parchment/90 backdrop-blur-sm border-b border-warm-border/40">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-ink-mid">
          b &amp; e
        </Link>
        <ul className="flex gap-5 overflow-x-auto">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xl relative transition-colors ${
                  pathname === href
                    ? "text-ink font-semibold"
                    : "text-ink-light hover:text-ink-mid"
                }`}
              >
                {label}
                {pathname === href && (
                  <svg
                    className="absolute -bottom-0.5 left-0 w-full overflow-visible"
                    height="5"
                    viewBox="0 0 50 5"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M0 3 C8 1 18 4.5 28 3 C38 1.5 44 4 50 3"
                      stroke="#C4837A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
