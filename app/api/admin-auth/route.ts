import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const input = (password ?? "").trim();
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();

  if (input === expected) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
