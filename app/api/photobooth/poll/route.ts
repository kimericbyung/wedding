import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

function isPiAuth(req: Request) {
  return req.headers.get("authorization") === `Bearer ${process.env.PHOTOBOOTH_SECRET}`;
}

export async function GET(req: Request) {
  if (!isPiAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  // Return the oldest pending session created in the last 60 seconds
  const cutoff = new Date(Date.now() - 60_000).toISOString();
  const { data } = await supabase
    .from("photobooth_sessions")
    .select("id")
    .eq("status", "pending")
    .gte("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ id: data?.id ?? null });
}
