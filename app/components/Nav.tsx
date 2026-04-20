"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "home" },
  { href: "/our-story", label: "our story" },
  { href: "/details", label: "details" },
  { href: "/attire", label: "attire" },
  { href: "/rsvp", label: "rsvp" },
  { href: "/registry", label: "registry" },
  { href: "/faq", label: "faq" },
  { href: "/gallery", label: "gallery" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-parchment/95 backdrop-blur-sm border-b border-warm-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Brittaney & Eric"
            width={1536}
            height={1024}
            className="h-24 w-auto"
          />
        </Link>
        <ul className="flex gap-7 overflow-x-auto ml-8">
          {links.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className={`text-xs tracking-[0.15em] lowercase transition-colors pb-0.5 ${
                  pathname === href
                    ? "text-ink font-medium border-b border-accent"
                    : "text-ink-light hover:text-ink font-normal"
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
