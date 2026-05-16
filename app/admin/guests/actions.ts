"use server";

import { createSupabaseAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

export async function getParties() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("parties")
    .select("id, display_name, code")
    .order("display_name");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addGuestsToExistingParty(
  partyId: string,
  guests: { first_name: string; last_name: string }[]
) {
  const supabase = createSupabaseAdminClient();

  // Get current max sort_order for this party
  const { data: existing } = await supabase
    .from("guests")
    .select("sort_order")
    .eq("party_id", partyId)
    .order("sort_order", { ascending: false })
    .limit(1);

  let sortOrder = (existing?.[0]?.sort_order ?? -1) + 1;

  const rows = guests.map((g) => ({
    party_id: partyId,
    first_name: g.first_name.trim(),
    last_name: g.last_name.trim(),
    adult: true,
    invited: true,
    sort_order: sortOrder++,
  }));

  const { error } = await supabase.from("guests").insert(rows);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/guests");
}

export async function addGuestsToNewParty(
  partyDisplayName: string,
  guests: { first_name: string; last_name: string }[]
) {
  const supabase = createSupabaseAdminClient();

  const code = nanoid(8).toLowerCase();

  const { data: party, error: partyError } = await supabase
    .from("parties")
    .insert({
      display_name: partyDisplayName.trim(),
      code,
      max_invited: guests.length,
      invitation_type: guests.length === 1 ? "individual" : guests.length === 2 ? "couple" : "family",
      is_visible: true,
    })
    .select("id")
    .single();

  if (partyError) throw new Error(partyError.message);

  const rows = guests.map((g, i) => ({
    party_id: party.id,
    first_name: g.first_name.trim(),
    last_name: g.last_name.trim(),
    adult: true,
    invited: true,
    sort_order: i,
  }));

  const { error: guestsError } = await supabase.from("guests").insert(rows);
  if (guestsError) throw new Error(guestsError.message);
  revalidatePath("/admin/guests");
}
