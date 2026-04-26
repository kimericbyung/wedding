"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Phase = "locked" | "animating" | "fading" | "done";

type WoofState = {
  visible: boolean;
  scale: number;
};

export default function PasswordModal() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("locked");
  const [woof1, setWoof1] = useState<WoofState>({ visible: false, scale: 0.5 });
  const [woof2, setWoof2] = useState<WoofState>({ visible: false, scale: 0.5 });
  const [incorrect, setIncorrect] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const password = inputRef.current?.value ?? "";
    setIsPending(true);
    setIncorrect(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setIsPending(false);

    if (!res.ok) {
      setIncorrect(true);
      return;
    }

    // Cookie is now set — run animation, then refresh
    setPhase("animating");
  }

  useEffect(() => {
    if (phase !== "animating") return;

    const t1 = setTimeout(() => setWoof1({ visible: true, scale: 1.4 }), 100);
    const t2 = setTimeout(() => setWoof2({ visible: true, scale: 1.4 }), 500);
    const t3 = setTimeout(() => setWoof1({ visible: false, scale: 2 }), 1000);
    const t4 = setTimeout(() => setWoof2({ visible: false, scale: 2 }), 1400);
    const t5 = setTimeout(() => setPhase("fading"), 1600);
    const t6 = setTimeout(() => router.refresh(), 2300);

    return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout);
  }, [phase, router]);

  if (phase === "done") return null;

  const backdropOpacity = phase === "fading" ? 0 : 1;
  const showForm = phase === "locked";

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${phase === "fading" ? "pointer-events-none" : ""}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-parchment backdrop-blur-sm transition-opacity duration-700"
        style={{ opacity: backdropOpacity }}
      />

      {/* Woof 1 — left side, tilted left */}
      <span
        className="absolute left-[20%] top-1/2 text-4xl md:text-5xl font-semibold text-accent select-none pointer-events-none transition-all duration-300"
        style={{
          transform: `translateY(-50%) rotate(-45deg) scale(${woof1.scale})`,
          opacity: woof1.visible ? 1 : 0,
          transformOrigin: "center center",
        }}
      >
        woof!
      </span>

      {/* Yoshi — centered, appears during animation */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: phase === "animating" ? 1 : 0 }}
      >
        <Image
          src="/yoshi-woof.png"
          alt="Yoshi"
          width={400}
          height={400}
          className="w-48 md:w-64 h-auto"
        />
      </div>

      {/* Woof 2 — right side, tilted right */}
      <span
        className="absolute right-[20%] top-1/2 text-4xl md:text-5xl font-semibold text-accent select-none pointer-events-none transition-all duration-300"
        style={{
          transform: `translateY(-50%) rotate(45deg) scale(${woof2.scale})`,
          opacity: woof2.visible ? 1 : 0,
          transformOrigin: "center center",
        }}
      >
        woof!
      </span>

      {/* Modal form */}
      {showForm && (
        <div className="relative z-10 flex flex-col items-center text-center px-10 py-12 max-w-sm w-full">
          <Image
            src="/animated-logo.gif"
            alt="Brittaney & Eric"
            width={1536}
            height={1024}
            unoptimized
            priority
            className="w-64 md:w-72 h-auto mb-8"
          />

          <p className="text-xs tracking-[0.4em] lowercase text-ink-light font-normal mb-8">
            september 19, 2026
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <input
              ref={inputRef}
              type="password"
              name="password"
              placeholder="enter password…"
              autoFocus
              className="w-full border-b border-warm-border py-3 text-base text-ink outline-none focus:border-ink transition-colors bg-transparent font-light placeholder:text-ink-light/50 text-center mb-6"
            />
            {incorrect && (
              <p className="text-xs text-rose font-light mb-4 tracking-wide">
                incorrect password — try again
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
      )}
    </div>
  );
}
