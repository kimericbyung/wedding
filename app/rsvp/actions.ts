"use server";

import { createSupabaseClient } from "@/lib/supabase";

export type Party = {
  id: string;
  code: string;
  display_name: string;
  max_invited: number;
  invitation_type: "individual" | "couple" | "family";
};

export type PartySearchResult = Party & { guest_names: string[] };

export type Guest = {
  id: string;
  party_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  adult: boolean;
  sort_order: number;
};

export type GuestRSVP = {
  attending: boolean | null;
  meal_choice: string | null;
  dietary_notes: string | null;
  plus_one_name: string | null;
  note: string | null;
  responded_at: string | null;
};

export type GuestWithRSVP = Guest & { rsvp: GuestRSVP | null };

export async function searchParties(query: string): Promise<PartySearchResult[]> {
  if (query.trim().length < 2) return [];
  const supabase = createSupabaseClient();

  // Filter by each word so "Eric Kim" matches first+last name together
  const terms = query.trim().split(/\s+/).filter(Boolean);

  let q = supabase
    .from("guests")
    .select("full_name, party_id, parties!inner(id, code, display_name, max_invited, invitation_type)")
    .eq("invited", true);

  for (const term of terms) {
    q = q.ilike("full_name", `%${term}%`);
  }

  const { data, error } = await q.limit(20);
  if (error) throw new Error(error.message);

  // Group guest names by party, deduplicated
  const partyMap = new Map<string, PartySearchResult>();
  for (const row of data ?? []) {
    const p = row.parties as unknown as Party;
    if (!partyMap.has(p.id)) {
      partyMap.set(p.id, { ...p, guest_names: [] });
    }
    partyMap.get(p.id)!.guest_names.push(row.full_name);
  }

  // For each matched party, fetch ALL guests (not just the ones matching the search)
  const results: PartySearchResult[] = [];
  for (const partial of partyMap.values()) {
    const { data: allGuests } = await supabase
      .from("guests")
      .select("full_name")
      .eq("party_id", partial.id)
      .eq("invited", true)
      .order("sort_order");
    results.push({
      ...partial,
      guest_names: (allGuests ?? []).map((g) => g.full_name),
    });
  }

  return results;
}

export async function getPartyByCode(code: string): Promise<{
  party: Party;
  guests: GuestWithRSVP[];
} | null> {
  const supabase = createSupabaseClient();

  const { data: party, error: partyError } = await supabase
    .from("parties")
    .select("id, code, display_name, max_invited, invitation_type")
    .eq("code", code)
    .eq("is_visible", true)
    .single();

  if (partyError || !party) return null;

  const { data: rows, error: guestsError } = await supabase
    .from("guests")
    .select(
      "id, party_id, first_name, last_name, full_name, adult, sort_order, rsvps(attending, meal_choice, dietary_notes, plus_one_name, note, responded_at)"
    )
    .eq("party_id", party.id)
    .eq("invited", true)
    .order("sort_order");

  if (guestsError) throw new Error(guestsError.message);

  const guests: GuestWithRSVP[] = (rows ?? []).map((g) => {
    const rsvpArr = g.rsvps as GuestRSVP[] | GuestRSVP | null;
    const rsvp = Array.isArray(rsvpArr)
      ? (rsvpArr[0] ?? null)
      : (rsvpArr ?? null);
    return {
      id: g.id,
      party_id: g.party_id,
      first_name: g.first_name,
      last_name: g.last_name,
      full_name: g.full_name,
      adult: g.adult,
      sort_order: g.sort_order,
      rsvp,
    };
  });

  return { party, guests };
}

export type RSVPInput = {
  guest_id: string;
  attending: boolean;
  meal_choice?: string;
  dietary_notes?: string;
  plus_one_name?: string;
  note?: string;
};

export async function submitPartyRSVP(
  partyId: string,
  inputs: RSVPInput[]
): Promise<void> {
  const supabase = createSupabaseClient();

  // Server-side: confirm every submitted guest_id belongs to this party
  const { data: validGuests } = await supabase
    .from("guests")
    .select("id")
    .eq("party_id", partyId)
    .eq("invited", true);

  const validIds = new Set((validGuests ?? []).map((g) => g.id));
  if (!inputs.every((r) => validIds.has(r.guest_id))) {
    throw new Error("Invalid guest IDs for this party");
  }

  const { error } = await supabase.from("rsvps").upsert(
    inputs.map((r) => ({
      guest_id: r.guest_id,
      attending: r.attending,
      meal_choice: r.attending ? (r.meal_choice ?? null) : null,
      dietary_notes: r.dietary_notes || null,
      plus_one_name: r.attending ? (r.plus_one_name || null) : null,
      note: r.note || null,
      responded_at: new Date().toISOString(),
    })),
    { onConflict: "guest_id" }
  );

  if (error) throw new Error(error.message);
}
