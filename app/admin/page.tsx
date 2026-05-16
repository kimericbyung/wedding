import { createSupabaseAdminClient } from "@/lib/supabase";
import AdminNav from "./components/AdminNav";

type RSVP = {
  attending: boolean | null;
  meal_choice: string | null;
  dietary_notes: string | null;
  plus_one_name: string | null;
  note: string | null;
  responded_at: string | null;
};

type GuestRow = {
  full_name: string;
  adult: boolean;
  rsvps: RSVP | RSVP[] | null;
};

type PartyRow = {
  id: string;
  display_name: string;
  max_invited: number;
  guests: GuestRow[];
};

function getRsvp(rsvps: RSVP | RSVP[] | null): RSVP | null {
  if (!rsvps) return null;
  if (Array.isArray(rsvps)) return rsvps[0] ?? null;
  return rsvps;
}

async function getAllRSVPs(): Promise<PartyRow[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parties")
    .select(`
      id,
      display_name,
      max_invited,
      guests!inner(
        full_name,
        adult,
        sort_order,
        rsvps(attending, meal_choice, dietary_notes, plus_one_name, note, responded_at)
      )
    `)
    .eq("guests.invited", true)
    .order("display_name");

  if (error) throw new Error(error.message);
  return (data ?? []) as PartyRow[];
}

function Badge({ attending }: { attending: boolean | null }) {
  if (attending === null)
    return <span className="text-xs text-ink-light font-light">no response</span>;
  return attending
    ? <span className="text-xs text-accent font-semibold">attending</span>
    : <span className="text-xs text-rose font-semibold">declined</span>;
}

export default async function AdminDashboard() {
  const parties = await getAllRSVPs();

  const allGuests = parties.flatMap((p) => p.guests);
  const responded = allGuests.filter((g) => getRsvp(g.rsvps)?.responded_at);
  const attending = allGuests.filter((g) => getRsvp(g.rsvps)?.attending === true);
  const declined = allGuests.filter((g) => getRsvp(g.rsvps)?.attending === false);

  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            rsvp admin
          </h1>
          <div className="w-10 h-px bg-accent mx-auto" />
        </div>

        <AdminNav />

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { label: "total invited", value: allGuests.length },
            { label: "responded", value: responded.length },
            { label: "attending", value: attending.length },
            { label: "declined", value: declined.length },
          ].map((s) => (
            <div key={s.label} className="border border-warm-border p-6 text-center">
              <p className="text-3xl font-light text-ink mb-1">{s.value}</p>
              <p className="text-xs tracking-[0.2em] text-ink-light font-normal">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Party list */}
        <div className="space-y-4">
          {parties.map((party) => {
            const hasResponse = party.guests.some((g) => getRsvp(g.rsvps)?.responded_at);
            return (
              <div key={party.id} className="border border-warm-border">
                <div className="px-6 py-4 border-b border-warm-border flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{party.display_name}</p>
                  <p className="text-xs text-ink-light font-light">
                    {hasResponse ? "responded" : "no response yet"}
                  </p>
                </div>

                <div className="divide-y divide-warm-border">
                  {party.guests.map((guest) => {
                    const rsvp = getRsvp(guest.rsvps);
                    return (
                      <div key={guest.full_name} className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 items-start">
                        <div>
                          <p className="text-sm text-ink font-normal">{guest.full_name}</p>
                          <p className="text-xs text-ink-light font-light">{guest.adult ? "adult" : "child"}</p>
                        </div>
                        <div>
                          <Badge attending={rsvp?.attending ?? null} />
                        </div>
                        <div>
                          {rsvp?.meal_choice && (
                            <p className="text-xs text-ink-mid font-light">{rsvp.meal_choice}</p>
                          )}
                          {rsvp?.dietary_notes && (
                            <p className="text-xs text-ink-light font-light italic">{rsvp.dietary_notes}</p>
                          )}
                        </div>
                        <div>
                          {rsvp?.note && (
                            <p className="text-xs text-ink-light font-light italic">"{rsvp.note}"</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
