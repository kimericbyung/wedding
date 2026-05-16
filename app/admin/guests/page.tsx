import { createSupabaseAdminClient } from "@/lib/supabase";
import AdminNav from "../components/AdminNav";
import AddGuestsForm from "./AddGuestsForm";

async function getParties() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parties")
    .select("id, display_name, code")
    .order("display_name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

async function getAllGuests() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("id, full_name, party_id, sort_order, invited")
    .eq("invited", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export default async function GuestsPage() {
  const [parties, guests] = await Promise.all([getParties(), getAllGuests()]);

  const partiesWithGuests = parties.map((p) => ({
    ...p,
    guests: guests.filter((g) => g.party_id === p.id),
  }));

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

        <div className="grid md:grid-cols-2 gap-10">
          {/* Add guests form */}
          <div>
            <p className="text-xs tracking-[0.2em] text-ink-light font-normal mb-6">add guests</p>
            <AddGuestsForm parties={parties} />
          </div>

          {/* Current guest list */}
          <div>
            <p className="text-xs tracking-[0.2em] text-ink-light font-normal mb-6">
              current guest list ({guests.length})
            </p>
            <div className="space-y-3">
              {partiesWithGuests.map((p) => (
                <div key={p.id} className="border border-warm-border">
                  <div className="px-4 py-3 border-b border-warm-border bg-parchment-dark flex items-center justify-between">
                    <p className="text-xs font-semibold text-ink">{p.display_name}</p>
                    <p className="text-xs text-ink-light font-light tracking-wide">{p.code}</p>
                  </div>
                  <div className="divide-y divide-warm-border">
                    {p.guests.map((g) => (
                      <p key={g.id} className="px-4 py-2 text-sm text-ink-mid font-light">
                        {g.full_name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
