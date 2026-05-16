"use server";

import { createSupabaseAdminClient } from "@/lib/supabase";

export async function assignSeat(guestId: string, tableNumber: number | null) {
  const supabase = createSupabaseAdminClient();

  if (tableNumber === null) {
    await supabase.from("seating").delete().eq("guest_id", guestId);
  } else {
    await supabase.from("seating").upsert(
      { guest_id: guestId, table_number: tableNumber },
      { onConflict: "guest_id" }
    );
  }
}
