"use client";

import { useState } from "react";

type Meal = "beef" | "chicken" | "fish" | "vegetarian" | "";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  attending: "yes" | "no" | "";
  meal: Meal;
  plusOne: boolean;
  plusOneName: string;
  plusOneMeal: Meal;
  notes: string;
}

const MEALS: { value: Meal; label: string }[] = [
  { value: "beef", label: "beef" },
  { value: "chicken", label: "chicken" },
  { value: "fish", label: "fish" },
  { value: "vegetarian", label: "vegetarian" },
];

function MealSelector({
  value,
  onChange,
}: {
  value: Meal;
  onChange: (v: Meal) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MEALS.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => onChange(m.value)}
          className={`sketchy py-3 text-xl border-2 transition-colors ${
            value === m.value
              ? "border-ink bg-ink text-parchment"
              : "border-warm-border text-ink-mid hover:border-ink-mid"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full border-b-2 border-warm-border py-2 text-ink outline-none focus:border-ink-mid transition-colors bg-transparent text-2xl placeholder:text-ink-light/50";

const labelClass = "block text-lg text-ink-light mb-1";

export default function RSVP() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    attending: "",
    meal: "",
    plusOne: false,
    plusOneName: "",
    plusOneMeal: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.attending &&
    (form.attending === "no" || form.meal) &&
    (form.attending === "no" || !form.plusOne || (form.plusOneName && form.plusOneMeal));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    // TODO: wire up to backend (Supabase, Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-8" aria-hidden="true">
          <path d="M30 55 C15 45 5 30 5 20 C5 10 12 5 20 8 C24 10 28 14 30 18 C32 14 36 10 40 8 C48 5 55 10 55 20 C55 30 45 45 30 55Z" stroke="#C4837A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-4xl font-bold text-ink mb-3">
          {form.attending === "yes" ? "we can't wait to see you!" : "we'll miss you."}
        </h2>
        <p className="text-2xl text-ink-mid">
          thank you, {form.firstName} — your response has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-14">
          <p className="text-xl text-ink-light mb-3">kindly respond by August 1, 2026</p>
          <h1 className="text-6xl font-bold text-ink">rsvp</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>first name</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>last name</label>
              <input
                required
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Attendance */}
          <div>
            <label className={labelClass}>will you attend?</label>
            <div className="flex gap-3 mt-2">
              {[
                { v: "yes" as const, l: "joyfully accepts" },
                { v: "no" as const, l: "regretfully declines" },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set("attending", v)}
                  className={`sketchy flex-1 py-3 text-xl border-2 transition-colors ${
                    form.attending === v
                      ? "border-ink bg-ink text-parchment"
                      : "border-warm-border text-ink-mid hover:border-ink-mid"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div>
                <label className={labelClass}>your meal preference</label>
                <div className="mt-2">
                  <MealSelector value={form.meal} onChange={(v) => set("meal", v)} />
                </div>
              </div>

              <div>
                <label className={labelClass}>bringing a guest?</label>
                <div className="flex gap-3 mt-2">
                  {[
                    { v: false, l: "just me" },
                    { v: true, l: "+ 1 guest" },
                  ].map(({ v, l }) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => set("plusOne", v)}
                      className={`sketchy-alt flex-1 py-3 text-xl border-2 transition-colors ${
                        form.plusOne === v
                          ? "border-ink bg-ink text-parchment"
                          : "border-warm-border text-ink-mid hover:border-ink-mid"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {form.plusOne && (
                <>
                  <div>
                    <label className={labelClass}>guest name</label>
                    <input
                      required
                      value={form.plusOneName}
                      onChange={(e) => set("plusOneName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>guest meal preference</label>
                    <div className="mt-2">
                      <MealSelector
                        value={form.plusOneMeal}
                        onChange={(v) => set("plusOneMeal", v)}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div>
            <label className={labelClass}>
              notes{" "}
              <span className="text-ink-light/60">(dietary restrictions, etc.)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="w-full border-b-2 border-warm-border py-2 text-ink outline-none focus:border-ink-mid transition-colors bg-transparent resize-none text-2xl"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="sketchy w-full py-4 bg-ink text-parchment text-2xl font-semibold hover:bg-ink-mid transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "sending…" : "send our rsvp"}
          </button>
        </form>
      </div>
    </div>
  );
}
