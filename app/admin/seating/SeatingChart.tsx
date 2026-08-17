"use client";

import { useState, useTransition } from "react";
import { assignSeat, upsertTableConfig, deleteTableConfig } from "./actions";
import type { SeatingGuest } from "./page";

const DEFAULT_SEAT_COUNT = 8;
const MIN_SEAT_COUNT = 8;
const MAX_SEAT_COUNT = 10;

// SVG table geometry constants
const CX = 150, CY = 150, TABLE_R = 52, SEAT_ORBIT_R = 100, SEAT_R = 20;

type SeatSlot = { seatNumber: number; guest: SeatingGuest | null };

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function SeatingChart({
  guests: initialGuests,
  tableConfigs: initialConfigs,
}: {
  guests: SeatingGuest[];
  tableConfigs: Record<number, number>;
}) {
  const [guests, setGuests] = useState(initialGuests);
  const [configs, setConfigs] = useState<Record<number, number>>(initialConfigs);
  const [selected, setSelected] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const allTableNumbers = Array.from(
    new Set([
      ...Object.keys(configs).map(Number),
      ...guests.filter((g) => g.table_number !== null).map((g) => g.table_number!),
    ])
  ).sort((a, b) => a - b);

  const nextTable = allTableNumbers.length > 0 ? Math.max(...allTableNumbers) + 1 : 1;
  const unassigned = guests.filter((g) => g.table_number === null);
  const selectedGuest = guests.find((g) => g.id === selected) ?? null;

  function getSeatCount(t: number) {
    return configs[t] ?? DEFAULT_SEAT_COUNT;
  }

  function getSeats(tableNumber: number): SeatSlot[] {
    const count = getSeatCount(tableNumber);
    const seated = guests.filter((g) => g.table_number === tableNumber && g.seat_number !== null);
    return Array.from({ length: count }, (_, i) => ({
      seatNumber: i + 1,
      guest: seated.find((g) => g.seat_number === i + 1) ?? null,
    }));
  }

  function handleSeatClick(tableNumber: number, seatNumber: number, occupant: SeatingGuest | null) {
    if (occupant) {
      if (!selected || selected === occupant.id) {
        setSelected((prev) => (prev === occupant.id ? null : occupant.id));
        return;
      }

      // A different guest is selected → swap their seats
      const guestId = selected;
      const moving = guests.find((g) => g.id === guestId);
      if (!moving) return;

      const fromTable = moving.table_number;
      const fromSeat = moving.seat_number;

      setGuests((prev) =>
        prev.map((g) => {
          if (g.id === guestId) return { ...g, table_number: tableNumber, seat_number: seatNumber };
          if (g.id === occupant.id) return { ...g, table_number: fromTable, seat_number: fromSeat };
          return g;
        })
      );
      setSelected(null);

      startTransition(async () => {
        await assignSeat(guestId, tableNumber, seatNumber);
        await assignSeat(occupant.id, fromTable, fromSeat);
      });
      return;
    }

    if (!selected) return;

    const guestId = selected;
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, table_number: tableNumber, seat_number: seatNumber } : g))
    );
    setSelected(null);

    startTransition(async () => {
      await assignSeat(guestId, tableNumber, seatNumber);
    });
  }

  function handleRemove(guestId: string) {
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, table_number: null, seat_number: null } : g))
    );
    if (selected === guestId) setSelected(null);

    startTransition(async () => {
      await assignSeat(guestId, null, null);
    });
  }

  function handleSeatCountChange(tableNumber: number, delta: number) {
    const current = getSeatCount(tableNumber);
    const next = Math.max(MIN_SEAT_COUNT, Math.min(MAX_SEAT_COUNT, current + delta));
    if (next === current) return;

    if (delta < 0) {
      const wouldLose = guests.some(
        (g) => g.table_number === tableNumber && g.seat_number !== null && g.seat_number > next
      );
      if (wouldLose) return;
    }

    setConfigs((prev) => ({ ...prev, [tableNumber]: next }));
    startTransition(async () => {
      await upsertTableConfig(tableNumber, next);
    });
  }

  function handleAddTable() {
    const t = nextTable;
    setConfigs((prev) => ({ ...prev, [t]: DEFAULT_SEAT_COUNT }));
    startTransition(async () => {
      await upsertTableConfig(t, DEFAULT_SEAT_COUNT);
    });
  }

  function handleDeleteTable(tableNumber: number) {
    setConfigs((prev) => {
      const next = { ...prev };
      delete next[tableNumber];
      return next;
    });
    startTransition(async () => {
      await deleteTableConfig(tableNumber);
    });
  }

  function handleAssignToNewTable() {
    if (!selected) return;
    const t = nextTable;
    const guestId = selected;

    setConfigs((prev) => ({ ...prev, [t]: DEFAULT_SEAT_COUNT }));
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, table_number: t, seat_number: 1 } : g))
    );
    setSelected(null);

    startTransition(async () => {
      await upsertTableConfig(t, DEFAULT_SEAT_COUNT);
      await assignSeat(guestId, t, 1);
    });
  }

  const totalSeated = guests.filter((g) => g.table_number !== null).length;

  return (
    <div>
      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <p className="text-sm text-ink-light font-light">
          {guests.length} attending · {totalSeated} seated · {unassigned.length} unassigned · {allTableNumbers.length} tables
        </p>
        <div className="flex items-center gap-4">
          {isPending && <p className="text-xs text-ink-light animate-pulse">saving…</p>}
          {selected && (
            <p className="text-xs text-accent font-semibold tracking-wide">
              {selectedGuest?.full_name} — click a seat to assign
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Unassigned pool — sticky sidebar */}
        <div className="w-44 shrink-0">
          <div className="sticky top-8">
            <p className="text-xs tracking-[0.2em] text-ink-light font-normal mb-3">
              unassigned ({unassigned.length})
            </p>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              {unassigned.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelected((prev) => (prev === g.id ? null : g.id))}
                  className={`w-full text-left flex items-center justify-between px-2 py-1.5 text-xs transition-colors rounded ${
                    selected === g.id
                      ? "bg-accent text-white"
                      : "bg-parchment-dark hover:bg-warm-border text-ink"
                  }`}
                >
                  <span className="truncate font-light">{g.full_name}</span>
                  {g.meal_choice && (
                    <span className={`shrink-0 ml-1 text-[10px] ${selected === g.id ? "text-white/70" : "text-ink-light"}`}>
                      {g.meal_choice[0].toUpperCase()}
                    </span>
                  )}
                </button>
              ))}
              {unassigned.length === 0 && (
                <p className="text-xs text-ink-light/50 italic">all seated</p>
              )}
            </div>

            {selected && (
              <button
                onClick={handleAssignToNewTable}
                className="mt-4 w-full text-xs border border-dashed border-accent text-accent py-2 hover:bg-accent/5 transition-colors"
              >
                + new table {nextTable}, seat 1
              </button>
            )}
          </div>
        </div>

        {/* Table grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {allTableNumbers.map((t) => (
            <TableCard
              key={t}
              tableNumber={t}
              seatCount={getSeatCount(t)}
              seats={getSeats(t)}
              selectedGuestId={selected}
              onSeatClick={(seatNum, occupant) => handleSeatClick(t, seatNum, occupant)}
              onRemove={handleRemove}
              onSeatCountChange={(delta) => handleSeatCountChange(t, delta)}
              onDeleteTable={() => handleDeleteTable(t)}
            />
          ))}

          <button
            onClick={handleAddTable}
            className="border border-dashed border-warm-border text-xs text-ink-light hover:border-ink hover:text-ink transition-colors min-h-[260px] flex items-center justify-center"
          >
            + add table {nextTable}
          </button>
        </div>
      </div>
    </div>
  );
}

function TableCard({
  tableNumber,
  seatCount,
  seats,
  selectedGuestId,
  onSeatClick,
  onRemove,
  onSeatCountChange,
  onDeleteTable,
}: {
  tableNumber: number;
  seatCount: number;
  seats: SeatSlot[];
  selectedGuestId: string | null;
  onSeatClick: (seatNum: number, occupant: SeatingGuest | null) => void;
  onRemove: (guestId: string) => void;
  onSeatCountChange: (delta: number) => void;
  onDeleteTable: () => void;
}) {
  const occupied = seats.filter((s) => s.guest !== null).length;
  const isEmpty = occupied === 0;

  return (
    <div className="border border-warm-border p-4">
      {/* Card header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs tracking-[0.2em] text-accent font-semibold">table {tableNumber}</p>
        <div className="flex items-center gap-3">
          {/* Seat count control */}
          <div className="flex items-center gap-1.5 text-ink-light">
            <button
              onClick={() => onSeatCountChange(-1)}
              className="hover:text-ink text-sm leading-none w-4"
              title="fewer seats"
            >
              −
            </button>
            <span className="text-xs font-light tabular-nums">{seatCount}</span>
            <button
              onClick={() => onSeatCountChange(1)}
              className="hover:text-ink text-sm leading-none w-4"
              title="more seats"
            >
              +
            </button>
          </div>
          <span className="text-xs text-ink-light font-light">{occupied}/{seatCount}</span>
          {isEmpty && (
            <button
              onClick={onDeleteTable}
              className="text-ink-light/50 hover:text-rose text-sm leading-none"
              title="remove table"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Circular diagram */}
      <svg viewBox="0 0 300 300" className="w-full select-none">
        {/* Table surface */}
        <circle cx={CX} cy={CY} r={TABLE_R} fill="#f5ede0" stroke="#d4c5a9" strokeWidth="1.5" />
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize="8" fill="#a08060" letterSpacing="2">
          TABLE
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize="22" fontWeight="300" fill="#7a6040">
          {tableNumber}
        </text>

        {seats.map(({ seatNumber, guest }) => {
          const angle = ((seatNumber - 1) / seatCount) * 2 * Math.PI - Math.PI / 2;
          const sx = CX + SEAT_ORBIT_R * Math.cos(angle);
          const sy = CY + SEAT_ORBIT_R * Math.sin(angle);

          const isSelected = guest?.id === selectedGuestId;
          const canReceive = selectedGuestId !== null && guest === null;
          const isOccupied = guest !== null;

          const fillColor = isSelected
            ? "#c9a96e"
            : isOccupied
            ? "#ede4d8"
            : canReceive
            ? "#f7f3ee"
            : "white";

          const strokeColor = isSelected
            ? "#b89050"
            : isOccupied
            ? "#b8a48c"
            : canReceive
            ? "#c9a96e"
            : "#d4c5a9";

          const strokeDash = isOccupied || isSelected ? undefined : "3 2";

          return (
            <g
              key={seatNumber}
              onClick={() => onSeatClick(seatNumber, guest)}
              className={isOccupied || selectedGuestId ? "cursor-pointer" : ""}
            >
              {/* Spoke from table edge to seat */}
              <line
                x1={CX + TABLE_R * Math.cos(angle)}
                y1={CY + TABLE_R * Math.sin(angle)}
                x2={sx - SEAT_R * Math.cos(angle)}
                y2={sy - SEAT_R * Math.sin(angle)}
                stroke="#d4c5a9"
                strokeWidth="1"
              />
              {/* Seat circle */}
              <circle
                cx={sx}
                cy={sy}
                r={SEAT_R}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeDasharray={strokeDash}
              />
              {/* Seat number (small, above center) */}
              <text
                x={sx}
                y={sy - 6}
                textAnchor="middle"
                fontSize="7"
                fill={isSelected ? "rgba(255,255,255,0.75)" : "#b0987a"}
              >
                {seatNumber}
              </text>
              {/* Guest initials or placeholder glyph */}
              {isOccupied ? (
                <text
                  x={sx}
                  y={sy + 7}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="500"
                  fill={isSelected ? "white" : "#5a4030"}
                >
                  {initials(guest!.full_name)}
                </text>
              ) : (
                <text
                  x={sx}
                  y={sy + 7}
                  textAnchor="middle"
                  fontSize="14"
                  fill={canReceive ? "#c9a96e" : "#d4c5a9"}
                >
                  {canReceive ? "+" : "·"}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Seat-by-seat legend for name card placement */}
      <div className="mt-2 pt-2 border-t border-warm-border space-y-px">
        {seats.map(({ seatNumber, guest }) => (
          <div key={seatNumber} className="flex items-center gap-2 min-h-[20px]">
            <span className="text-[10px] text-ink-light w-4 shrink-0 font-light text-right tabular-nums">
              {seatNumber}
            </span>
            <div className="w-px h-3 bg-warm-border shrink-0" />
            {guest ? (
              <>
                <span className="text-xs text-ink font-light flex-1 truncate">{guest.full_name}</span>
                <button
                  onClick={() => onRemove(guest.id)}
                  className="text-ink-light/40 hover:text-rose text-xs shrink-0 leading-none"
                >
                  ×
                </button>
              </>
            ) : (
              <span className="text-[10px] text-ink-light/30 italic">—</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
