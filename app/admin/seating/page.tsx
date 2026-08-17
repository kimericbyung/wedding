import { createSupabaseAdminClient } from "@/lib/supabase";
import AdminNav from "../components/AdminNav";
import SeatingChart from "./SeatingChart";

export type SeatingGuest = {
  id: string;
  full_name: string;
  meal_choice: string | null;
  table_number: number | null;
  seat_number: number | null;
};

async function getAttendingGuests(): Promise<SeatingGuest[]> {
  const supabase = createSupabaseAdminClient();

  const { data: guests, error } = await supabase
    .from("guests")
    .select("id, full_name, rsvps!inner(attending, meal_choice), seating(table_number, seat_number)")
    .eq("invited", true)
    .eq("rsvps.attending", true)
    .order("full_name");

  if (error) throw new Error(error.message);

  return (guests ?? []).map((g) => {
    const rsvp = Array.isArray(g.rsvps) ? g.rsvps[0] : g.rsvps;
    const seat = Array.isArray(g.seating) ? g.seating[0] : g.seating;
    return {
      id: g.id,
      full_name: g.full_name,
      meal_choice: (rsvp as { meal_choice: string | null })?.meal_choice ?? null,
      table_number: (seat as { table_number: number | null } | null)?.table_number ?? null,
      seat_number: (seat as { seat_number: number | null } | null)?.seat_number ?? null,
    };
  });
}

export type TableConfig = { seatCount: number; name: string | null };

async function getTableConfigs(): Promise<Record<number, TableConfig>> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("table_configs")
    .select("table_number, seat_count, table_name");
  if (error) return {};
  return Object.fromEntries(
    (data ?? []).map((r) => [r.table_number, { seatCount: r.seat_count, name: r.table_name ?? null }])
  );
}

export default async function SeatingPage() {
  const [guests, tableConfigs] = await Promise.all([
    getAttendingGuests(),
    getTableConfigs(),
  ]);

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            rsvp admin
          </h1>
          <div className="w-10 h-px bg-accent mx-auto" />
        </div>

        <AdminNav />

        <SeatingChart guests={guests} tableConfigs={tableConfigs} />
      </div>
    </div>
  );
}
