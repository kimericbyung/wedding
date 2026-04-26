import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const input = (password ?? "").toLowerCase().trim();
  const expected = (process.env.SITE_PASSWORD ?? "").toLowerCase().trim();

  if (input === expected) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("site_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
