"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setError(false);

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: inputRef.current?.value ?? "" }),
    });

    setIsPending(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xs text-center">
        <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-2">
          admin
        </h1>
        <div className="w-10 h-px bg-accent mx-auto mb-10" />

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            placeholder="password…"
            autoFocus
            className="w-full border-b border-warm-border py-3 text-base text-ink outline-none focus:border-ink transition-colors bg-transparent font-light placeholder:text-ink-light/50 text-center mb-6"
          />
          {error && (
            <p className="text-xs text-rose font-light mb-4 tracking-wide">
              incorrect password
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 border border-ink text-ink text-xs tracking-[0.25em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors disabled:opacity-50"
          >
            {isPending ? "…" : "enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
