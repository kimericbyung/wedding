"use server";

import { createSupabaseAdminClient } from "@/lib/supabase";

export async function assignSeat(
  guestId: string,
  tableNumber: number | null,
  seatNumber: number | null
) {
  const supabase = createSupabaseAdminClient();

  if (tableNumber === null) {
    await supabase.from("seating").delete().eq("guest_id", guestId);
  } else {
    await supabase.from("seating").upsert(
      { guest_id: guestId, table_number: tableNumber, seat_number: seatNumber },
      { onConflict: "guest_id" }
    );
  }
}

export async function upsertTableConfig(tableNumber: number, seatCount: number) {
  const supabase = createSupabaseAdminClient();
  await supabase
    .from("table_configs")
    .upsert({ table_number: tableNumber, seat_count: seatCount }, { onConflict: "table_number" });
}

export async function deleteTableConfig(tableNumber: number) {
  const supabase = createSupabaseAdminClient();
  await supabase.from("table_configs").delete().eq("table_number", tableNumber);
}
