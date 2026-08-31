import { authorizeRoles } from "@/lib/auth-helpers";
import { USER_ROLES } from "@/types/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authCheck = await authorizeRoles(request.headers, [USER_ROLES.ADMIN]);

  if (!authCheck.authorized) {
    return authCheck.response;
  }

  const { session } = authCheck;

  return NextResponse.json({
    message: "Welcome to the Admin-Only Protected Endpoint!",
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
    },
    timestamp: new Date().toISOString(),
  });
}
