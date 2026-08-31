import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session token cookie
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // Protect administrative dashboard routes if no session cookie exists
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard/admin")) {
    if (!sessionCookie) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/admin/:path*"],
};
