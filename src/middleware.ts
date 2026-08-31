import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware disabled for now per user request
export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};