"use client";

import { useState, useTransition } from "react";
import { assignSeat } from "./actions";
import type { SeatingGuest } from "./page";

const SEATS_PER_TABLE = 8;

export default function SeatingChart({ guests: initial }: { guests: SeatingGuest[] }) {
  const [guests, setGuests] = useState(initial);
  const [selected, setSelected] = useState<string | null>(null);
  const [emptyTables, setEmptyTables] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const unassigned = guests.filter((g) => g.table_number === null);

  const occupiedTableNumbers = Array.from(
    new Set(guests.filter((g) => g.table_number !== null).map((g) => g.table_number!))
  );
  const allTableNumbers = Array.from(
    new Set([...occupiedTableNumbers, ...emptyTables])
  ).sort((a, b) => a - b);

  const nextTable = allTableNumbers.length > 0 ? Math.max(...allTableNumbers) + 1 : 1;

  function selectGuest(id: string) {
    setSelected((prev) => (prev === id ? null : id));
  }

  function moveToTable(tableNumber: number) {
    if (!selected) return;
    const tableGuests = guests.filter((g) => g.table_number === tableNumber);
    if (tableGuests.length >= SEATS_PER_TABLE) return;

    startTransition(async () => {
      await assignSeat(selected, tableNumber);
      setGuests((prev) =>
        prev.map((g) => (g.id === selected ? { ...g, table_number: tableNumber } : g))
      );
      // Remove from empty tables list if it was there
      setEmptyTables((prev) => prev.filter((t) => t !== tableNumber));
      setSelected(null);
    });
  }

  function removeFromTable(guestId: string) {
    startTransition(async () => {
      await assignSeat(guestId, null);
      setGuests((prev) =>
        prev.map((g) => (g.id === guestId ? { ...g, table_number: null } : g))
      );
      setSelected(null);
    });
  }

  function addEmptyTable() {
    setEmptyTables((prev) => [...prev, nextTable]);
  }

  const selectedGuest = guests.find((g) => g.id === selected);

  return (
    <div>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-ink-light font-light">
          {guests.length} attending · {unassigned.length} unassigned · {allTableNumbers.length} tables
        </p>
        {selected && (
          <p className="text-xs text-accent font-semibold tracking-wide">
            {selectedGuest?.full_name} selected — click a table to assign
          </p>
        )}
        {isPending && (
          <p className="text-xs text-ink-light animate-pulse">saving…</p>
        )}
      </div>

      <div className="flex gap-8 items-start">
        {/* Unassigned pool */}
        <div className="w-48 shrink-0">
          <p className="text-xs tracking-[0.2em] text-ink-light font-normal mb-3">
            unassigned ({unassigned.length})
          </p>
          <div className="space-y-1">
            {unassigned.map((g) => (
              <GuestChip
                key={g.id}
                guest={g}
                selected={selected === g.id}
                onClick={() => selectGuest(g.id)}
              />
            ))}
            {unassigned.length === 0 && (
              <p className="text-xs text-ink-light/50 font-light italic">all seated</p>
            )}
          </div>
        </div>

        {/* Tables grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {allTableNumbers.map((t) => {
              const tableGuests = guests.filter((g) => g.table_number === t);
              const isFull = tableGuests.length >= SEATS_PER_TABLE;
              const canDrop = selected !== null && !isFull;
              return (
                <div
                  key={t}
                  onClick={() => canDrop && moveToTable(t)}
                  className={`border p-4 transition-colors ${
                    canDrop
                      ? "border-accent cursor-pointer hover:bg-accent/5"
                      : "border-warm-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs tracking-[0.2em] text-accent font-semibold">
                      table {t}
                    </p>
                    <p className="text-xs text-ink-light font-light">
                      {tableGuests.length}/{SEATS_PER_TABLE}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {tableGuests.map((g) => (
                      <GuestChip
                        key={g.id}
                        guest={g}
                        selected={selected === g.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectGuest(g.id);
                        }}
                        onRemove={(e) => {
                          e.stopPropagation();
                          removeFromTable(g.id);
                        }}
                      />
                    ))}
                    {Array.from({ length: SEATS_PER_TABLE - tableGuests.length }).map((_, i) => (
                      <div key={i} className="h-7 border border-dashed border-warm-border/50 rounded" />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Add table button */}
            <button
              onClick={selected ? () => moveToTable(nextTable) : addEmptyTable}
              className="border border-dashed border-warm-border p-4 text-xs text-ink-light hover:border-ink hover:text-ink transition-colors text-center min-h-[80px]"
            >
              {selected
                ? `assign to new table ${nextTable}`
                : `+ add table ${nextTable}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuestChip({
  guest,
  selected,
  onClick,
  onRemove,
}: {
  guest: SeatingGuest;
  selected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-xs transition-colors ${
        selected
          ? "bg-accent text-white"
          : "bg-parchment-dark hover:bg-warm-border text-ink"
      }`}
    >
      <span className="truncate font-light">{guest.full_name}</span>
      <span className={`shrink-0 ml-1 ${selected ? "text-white/70" : "text-ink-light"}`}>
        {guest.meal_choice ? guest.meal_choice[0].toUpperCase() : "·"}
      </span>
      {onRemove && (
        <button
          onClick={onRemove}
          className={`shrink-0 ml-1 leading-none ${selected ? "text-white/70 hover:text-white" : "text-ink-light hover:text-rose"}`}
        >
          ×
        </button>
      )}
    </div>
  );
}
