import { auth } from "@/lib/auth";
import { UserRole, hasRole } from "@/types/auth";
import { NextResponse } from "next/server";

export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  role?: UserRole | string;
  [key: string]: unknown;
}

export interface SessionWithRole {
  user: ExtendedUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    [key: string]: unknown;
  };
}

/**
 * Get current session on server-side (Server Components, Route Handlers, Server Actions)
 */
export async function getServerSession(headers: Headers): Promise<SessionWithRole | null> {
  try {
    const session = await auth.api.getSession({
      headers,
    });

    if (!session || !session.user) {
      return null;
    }

    return session as unknown as SessionWithRole;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

/**
 * Requires user to be authenticated. Returns session or null.
 */
export async function requireAuth(headers: Headers): Promise<SessionWithRole | null> {
  return await getServerSession(headers);
}

/**
 * Role authorization check helper for Route Handlers
 * Returns { session, user } if user has required role, or NextResponse error if unauthorized
 */
export async function authorizeRoles(
  headers: Headers,
  allowedRoles: UserRole[]
): Promise<{ authorized: true; session: SessionWithRole } | { authorized: false; response: NextResponse }> {
  const session = await getServerSession(headers);

  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized: Authentication required" },
        { status: 401 }
      ),
    };
  }

  const userRole = session.user.role as string | undefined;

  if (!hasRole(userRole, allowedRoles)) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          error: `Forbidden: Insufficient permissions. Required role: ${allowedRoles.join(" or ")}`,
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    session,
  };
}
