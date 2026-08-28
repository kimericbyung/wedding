import { createSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

function isPiAuth(req: Request) {
  return req.headers.get("authorization") === `Bearer ${process.env.PHOTOBOOTH_SECRET}`;
}

export async function POST(req: Request) {
  if (!isPiAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const jpeg = await req.arrayBuffer();
  const filename = `${id}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from("photobooth")
    .upload(filename, jpeg, { contentType: "image/jpeg", upsert: true });

  if (uploadError) {
    console.error("photobooth/upload storage error:", uploadError.message);
    await supabase.from("photobooth_sessions").update({ status: "error" }).eq("id", id);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("photobooth").getPublicUrl(filename);

  await supabase
    .from("photobooth_sessions")
    .update({ status: "done", image_url: urlData.publicUrl })
    .eq("id", id);

  return NextResponse.json({ ok: true });
}
