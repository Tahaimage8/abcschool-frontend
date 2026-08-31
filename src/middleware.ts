import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];
const NUMBER_ENTRY_ROUTES = ["/dashboard/numbers"];
const ADMIN_ROUTES = ["/admin", "/dashboard/admin"];

const ALLOWED_NUMBER_ENTRY_ROLES = ["ADMIN", "CLASS_TEACHER"];

function matchesPath(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regexPattern = pattern
      .replace(/\*/g, ".*")
      .replace(/\//g, "\\/");
    return new RegExp(`^${regexPattern}`).test(pathname);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const isProtectedRoute = matchesPath(pathname, PROTECTED_ROUTES);
  const isNumberEntryRoute = matchesPath(pathname, NUMBER_ENTRY_ROUTES);
  const isAdminRoute = matchesPath(pathname, ADMIN_ROUTES);

  if (isProtectedRoute || isAdminRoute) {
    if (!sessionCookie) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (isNumberEntryRoute) {
      const roleCookie = request.cookies.get("better-auth.user_role")?.value;
      const userRole = roleCookie || "CLASS_TEACHER";

      if (!ALLOWED_NUMBER_ENTRY_ROLES.includes(userRole)) {
        const dashboardUrl = new URL("/dashboard", request.url);
        dashboardUrl.searchParams.set("error", "forbidden");
        return NextResponse.redirect(dashboardUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/dashboard/admin/:path*",
  ],
};