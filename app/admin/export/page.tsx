import { createSupabaseAdminClient } from "@/lib/supabase";
import AdminNav from "../components/AdminNav";
import CopyButton from "./CopyButton";

type AttendingGuest = {
  full_name: string;
  party_name: string;
  meal_choice: string | null;
  dietary_notes: string | null;
};

async function getAttendingGuests(): Promise<AttendingGuest[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select(`
      full_name,
      parties!inner(display_name),
      rsvps!inner(attending, meal_choice, dietary_notes)
    `)
    .eq("invited", true)
    .eq("rsvps.attending", true)
    .order("full_name");

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => {
    const rsvp = Array.isArray(row.rsvps) ? row.rsvps[0] : row.rsvps;
    const party = Array.isArray(row.parties) ? row.parties[0] : row.parties;
    return {
      full_name: row.full_name,
      party_name: (party as { display_name: string })?.display_name ?? "",
      meal_choice: (rsvp as { meal_choice: string | null })?.meal_choice ?? null,
      dietary_notes: (rsvp as { dietary_notes: string | null })?.dietary_notes ?? null,
    };
  });
}

export default async function ExportPage() {
  const guests = await getAttendingGuests();

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            rsvp admin
          </h1>
          <div className="w-10 h-px bg-accent mx-auto" />
        </div>

        <AdminNav />

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink-light font-light">
            {guests.length} attending
          </p>
          <CopyButton guests={guests} />
        </div>

        <div className="border border-warm-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm-border bg-parchment-dark">
                <th className="text-left px-4 py-3 text-xs tracking-[0.2em] text-ink-light font-normal">name</th>
                <th className="text-left px-4 py-3 text-xs tracking-[0.2em] text-ink-light font-normal">party</th>
                <th className="text-left px-4 py-3 text-xs tracking-[0.2em] text-ink-light font-normal">meal</th>
                <th className="text-left px-4 py-3 text-xs tracking-[0.2em] text-ink-light font-normal">dietary notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border">
              {guests.map((g) => (
                <tr key={g.full_name} className="hover:bg-parchment-dark/50">
                  <td className="px-4 py-3 text-ink font-light">{g.full_name}</td>
                  <td className="px-4 py-3 text-ink-mid font-light">{g.party_name}</td>
                  <td className="px-4 py-3 text-ink-mid font-light">{g.meal_choice ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-light font-light italic">{g.dietary_notes ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
