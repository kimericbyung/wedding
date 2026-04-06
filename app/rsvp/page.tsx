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
  { value: "beef", label: "Beef" },
  { value: "chicken", label: "Chicken" },
  { value: "fish", label: "Fish" },
  { value: "vegetarian", label: "Vegetarian" },
];

function MealSelector({
  value,
  onChange,
}: {
  value: Meal;
  onChange: (v: Meal) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {MEALS.map((m) => (
        <button
          key={m.value}
          type="button"
          onClick={() => onChange(m.value)}
          className={`py-2.5 text-xs tracking-wider uppercase border transition-colors ${
            value === m.value
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-stone-200 text-stone-500 hover:border-stone-400"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full border-b border-stone-200 py-2.5 text-neutral-900 outline-none focus:border-neutral-900 transition-colors bg-transparent text-sm placeholder:text-stone-300";

const labelClass = "block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2";

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
        <div className="w-px h-12 bg-stone-200 mb-10" />
        <h2 className="text-3xl font-light text-neutral-900 mb-3">
          {form.attending === "yes" ? "We can't wait to see you!" : "We'll miss you."}
        </h2>
        <p className="text-stone-400 text-sm">
          Thank you, {form.firstName}. Your response has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">
            Kindly respond by August 1, 2026
          </p>
          <h1 className="text-4xl font-light text-neutral-900">RSVP</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
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
            <label className={labelClass}>Email</label>
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
            <label className={labelClass}>Will you attend?</label>
            <div className="flex gap-3">
              {[
                { v: "yes" as const, l: "Joyfully accepts" },
                { v: "no" as const, l: "Regretfully declines" },
              ].map(({ v, l }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set("attending", v)}
                  className={`flex-1 py-3 text-xs tracking-wider uppercase border transition-colors ${
                    form.attending === v
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-stone-200 text-stone-500 hover:border-stone-400"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              {/* Meal */}
              <div>
                <label className={labelClass}>Your Meal Preference</label>
                <MealSelector
                  value={form.meal}
                  onChange={(v) => set("meal", v)}
                />
              </div>

              {/* Plus one toggle */}
              <div>
                <label className={labelClass}>Bringing a guest?</label>
                <div className="flex gap-3">
                  {[
                    { v: false, l: "Just me" },
                    { v: true, l: "+1 Guest" },
                  ].map(({ v, l }) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => set("plusOne", v)}
                      className={`flex-1 py-3 text-xs tracking-wider uppercase border transition-colors ${
                        form.plusOne === v
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-stone-200 text-stone-500 hover:border-stone-400"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest details */}
              {form.plusOne && (
                <>
                  <div>
                    <label className={labelClass}>Guest Name</label>
                    <input
                      required
                      value={form.plusOneName}
                      onChange={(e) => set("plusOneName", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Guest Meal Preference</label>
                    <MealSelector
                      value={form.plusOneMeal}
                      onChange={(v) => set("plusOneMeal", v)}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {/* Notes */}
          <div>
            <label className={labelClass}>
              Notes{" "}
              <span className="normal-case text-stone-300 tracking-normal">
                (dietary restrictions, etc.)
              </span>
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              className="w-full border-b border-stone-200 py-2.5 text-neutral-900 outline-none focus:border-neutral-900 transition-colors bg-transparent resize-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-4 bg-neutral-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Sending…" : "Submit RSVP"}
          </button>
        </form>
      </div>
    </div>
  );
}
