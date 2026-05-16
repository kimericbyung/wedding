"use client";

import { useState } from "react";

type AttendingGuest = {
  full_name: string;
  party_name: string;
  meal_choice: string | null;
  dietary_notes: string | null;
};

export default function CopyButton({ guests }: { guests: AttendingGuest[] }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const header = ["name", "party", "meal", "dietary notes"].join("\t");
    const rows = guests.map((g) =>
      [g.full_name, g.party_name, g.meal_choice ?? "", g.dietary_notes ?? ""].join("\t")
    );
    navigator.clipboard.writeText([header, ...rows].join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="px-5 py-2 border border-ink text-ink text-xs tracking-[0.2em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors"
    >
      {copied ? "copied!" : "copy to clipboard"}
    </button>
  );
}
