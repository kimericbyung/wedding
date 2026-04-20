"use client";

import { useState } from "react";
import { submitPartyRSVP } from "../actions";
import type { Party, GuestWithRSVP } from "../actions";

const MEALS = [
  { value: "beef", label: "beef" },
  { value: "chicken", label: "chicken" },
  { value: "fish", label: "fish" },
  { value: "vegetarian", label: "vegetarian" },
];

type GuestState = {
  attending: "yes" | "no" | "";
  meal_choice: string;
  dietary_notes: string;
  plus_one_name: string;
  note: string;
};

function initState(guests: GuestWithRSVP[]): Record<string, GuestState> {
  return Object.fromEntries(
    guests.map((g) => [
      g.id,
      {
        attending:
          g.rsvp?.attending === true
            ? "yes"
            : g.rsvp?.attending === false
            ? "no"
            : "",
        meal_choice: g.rsvp?.meal_choice ?? "",
        dietary_notes: g.rsvp?.dietary_notes ?? "",
        plus_one_name: g.rsvp?.plus_one_name ?? "",
        note: g.rsvp?.note ?? "",
      },
    ])
  );
}

const labelClass =
  "block text-xs tracking-[0.15em] lowercase text-ink-light font-normal mb-2";
const inputClass =
  "w-full border-b border-warm-border py-2.5 text-sm text-ink outline-none focus:border-ink transition-colors bg-transparent font-light";

export default function RSVPForm({
  party,
  guests,
}: {
  party: Party;
  guests: GuestWithRSVP[];
}) {
  const [states, setStates] = useState<Record<string, GuestState>>(() =>
    initState(guests)
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alreadyResponded = guests.some((g) => g.rsvp?.responded_at);

  const setField = (guestId: string, field: keyof GuestState, value: string) =>
    setStates((prev) => ({
      ...prev,
      [guestId]: { ...prev[guestId], [field]: value },
    }));

  const isValid = guests.every((g) => {
    const s = states[g.id];
    return s.attending !== "" && (s.attending === "no" || s.meal_choice !== "");
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError(null);
    try {
      await submitPartyRSVP(
        party.id,
        guests.map((g) => {
          const s = states[g.id];
          return {
            guest_id: g.id,
            attending: s.attending === "yes",
            meal_choice: s.meal_choice || undefined,
            dietary_notes: s.dietary_notes || undefined,
            plus_one_name: s.plus_one_name || undefined,
            note: s.note || undefined,
          };
        })
      );
      setSubmitted(true);
    } catch {
      setError("something went wrong — please try again or reach out to us directly.");
    } finally {
      setLoading(false);
    }
  };

  const anyAttending = guests.some((g) => states[g.id]?.attending === "yes");

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">
        <div className="w-10 h-px bg-accent mx-auto mb-10" />
        <h2 className="text-[14pt] font-semibold text-accent mb-3">
          {anyAttending ? "we can't wait to see you!" : "we'll miss you."}
        </h2>
        <p className="text-sm text-ink-mid font-light mt-2">
          {party.display_name}, your rsvp has been received.
        </p>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          {alreadyResponded && (
            <p className="text-xs tracking-wide text-accent font-semibold mb-4 lowercase">
              you've already responded — feel free to update below
            </p>
          )}
          {/* display_name is user data from the database — preserve its casing */}
          <h1 className="text-[14pt] font-semibold text-accent mb-2">
            {party.display_name}
          </h1>
          <div className="w-10 h-px bg-accent mx-auto mt-4 mb-4" />
          <p className="text-xs tracking-[0.2em] lowercase text-ink-light font-normal">
            kindly respond by august 1, 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {guests.map((guest) => {
            const s = states[guest.id];
            return (
              <div key={guest.id} className="border border-warm-border p-6 space-y-5">
                {/* full_name comes from the database — preserve its casing */}
                <p className="text-sm font-semibold text-ink">{guest.full_name}</p>

                {/* Attending */}
                <div>
                  <label className={labelClass}>will you attend?</label>
                  <div className="flex gap-2">
                    {[
                      { v: "yes", l: "joyfully accepts" },
                      { v: "no", l: "regretfully declines" },
                    ].map(({ v, l }) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setField(guest.id, "attending", v)}
                        className={`flex-1 py-2.5 text-xs tracking-wide lowercase border transition-colors font-normal ${
                          s.attending === v
                            ? "border-ink bg-ink text-parchment"
                            : "border-warm-border text-ink-mid hover:border-ink"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {s.attending === "yes" && (
                  <>
                    {/* Meal */}
                    <div>
                      <label className={labelClass}>meal preference</label>
                      <div className="grid grid-cols-2 gap-2">
                        {MEALS.map((m) => (
                          <button
                            key={m.value}
                            type="button"
                            onClick={() =>
                              setField(guest.id, "meal_choice", m.value)
                            }
                            className={`py-2.5 text-xs tracking-wide lowercase border transition-colors font-normal ${
                              s.meal_choice === m.value
                                ? "border-ink bg-ink text-parchment"
                                : "border-warm-border text-ink-mid hover:border-ink"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        dietary notes{" "}
                        <span className="normal-case text-ink-light/60 tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={s.dietary_notes}
                        onChange={(e) =>
                          setField(guest.id, "dietary_notes", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        plus one name{" "}
                        <span className="normal-case text-ink-light/60 tracking-normal">
                          (if applicable)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={s.plus_one_name}
                        onChange={(e) =>
                          setField(guest.id, "plus_one_name", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  </>
                )}

                {s.attending !== "" && (
                  <div>
                    <label className={labelClass}>
                      message for us{" "}
                      <span className="normal-case text-ink-light/60 tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={s.note}
                      onChange={(e) =>
                        setField(guest.id, "note", e.target.value)
                      }
                      rows={2}
                      className="w-full border-b border-warm-border py-2.5 text-sm text-ink outline-none focus:border-ink transition-colors bg-transparent resize-none font-light"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {error && (
            <p className="text-rose text-sm font-light text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-3.5 bg-accent text-white text-xs tracking-[0.25em] lowercase font-normal hover:bg-accent/85 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "sending…" : "submit rsvp"}
          </button>
        </form>
      </div>
    </div>
  );
}
