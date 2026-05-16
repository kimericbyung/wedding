"use client";

import { useState, useTransition } from "react";
import { addGuestsToExistingParty, addGuestsToNewParty } from "./actions";
import { useRouter } from "next/navigation";

type Party = { id: string; display_name: string; code: string };
type GuestInput = { first_name: string; last_name: string };

export default function AddGuestsForm({ parties }: { parties: Party[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [partyId, setPartyId] = useState(parties[0]?.id ?? "");
  const [partyName, setPartyName] = useState("");
  const [guestRows, setGuestRows] = useState<GuestInput[]>([{ first_name: "", last_name: "" }]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addRow() {
    setGuestRows((prev) => [...prev, { first_name: "", last_name: "" }]);
  }

  function removeRow(i: number) {
    setGuestRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateRow(i: number, field: keyof GuestInput, value: string) {
    setGuestRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  }

  const isValid =
    guestRows.every((g) => g.first_name.trim() && g.last_name.trim()) &&
    (mode === "existing" ? !!partyId : !!partyName.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        if (mode === "existing") {
          await addGuestsToExistingParty(partyId, guestRows);
        } else {
          await addGuestsToNewParty(partyName, guestRows);
        }
        setSuccess(true);
        setGuestRows([{ first_name: "", last_name: "" }]);
        setPartyName("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "something went wrong");
      }
    });
  }

  const inputClass = "w-full border-b border-warm-border py-2 text-sm text-ink outline-none focus:border-ink transition-colors bg-transparent font-light";
  const labelClass = "block text-xs tracking-[0.15em] text-ink-light font-normal mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["existing", "new"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-xs tracking-wide border transition-colors font-normal ${
              mode === m
                ? "border-ink bg-ink text-parchment"
                : "border-warm-border text-ink-mid hover:border-ink"
            }`}
          >
            {m === "existing" ? "existing party" : "new party"}
          </button>
        ))}
      </div>

      {/* Party selection */}
      {mode === "existing" ? (
        <div>
          <label className={labelClass}>party</label>
          <select
            value={partyId}
            onChange={(e) => setPartyId(e.target.value)}
            className={inputClass}
          >
            {parties.map((p) => (
              <option key={p.id} value={p.id}>{p.display_name}</option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label className={labelClass}>party name</label>
          <input
            type="text"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            placeholder="e.g. the johnson family"
            className={inputClass}
          />
        </div>
      )}

      {/* Guest rows */}
      <div className="space-y-3">
        <label className={labelClass}>guests</label>
        {guestRows.map((g, i) => (
          <div key={i} className="flex gap-2 items-end">
            <div className="flex-1">
              <input
                type="text"
                value={g.first_name}
                onChange={(e) => updateRow(i, "first_name", e.target.value)}
                placeholder="first name"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={g.last_name}
                onChange={(e) => updateRow(i, "last_name", e.target.value)}
                placeholder="last name"
                className={inputClass}
              />
            </div>
            {guestRows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-ink-light hover:text-rose text-lg leading-none pb-2 transition-colors"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="text-xs text-ink-light hover:text-ink transition-colors tracking-wide"
        >
          + add another guest
        </button>
      </div>

      {error && <p className="text-xs text-rose font-light">{error}</p>}
      {success && <p className="text-xs text-accent font-light">guests added successfully</p>}

      <button
        type="submit"
        disabled={!isValid || isPending}
        className="w-full py-3 border border-ink text-ink text-xs tracking-[0.25em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? "saving…" : "add guests"}
      </button>
    </form>
  );
}
