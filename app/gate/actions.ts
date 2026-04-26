"use server";

import { cookies } from "next/headers";

export async function submitPassword(_: unknown, formData: FormData): Promise<string | null> {
  const input = (formData.get("password") as string ?? "").toLowerCase().trim();
  const expected = (process.env.SITE_PASSWORD ?? "").toLowerCase().trim();

  if (input === expected) {
    const cookieStore = await cookies();
    setTimeout(() => (
      cookieStore.set("site_auth", "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      })
    ), 1400);
    return "correct";
  }

  return "incorrect";
}
