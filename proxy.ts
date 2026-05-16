import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const adminAuth = request.cookies.get("admin_auth");
    if (adminAuth?.value !== "1") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: ["/admin/:path*"],
};
