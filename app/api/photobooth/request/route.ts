import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("photobooth_sessions")
    .insert({ status: "pending" })
    .select("id")
    .single();

  if (error) {
    console.error("photobooth/request:", error.message);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
