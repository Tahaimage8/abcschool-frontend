export type UserRole = "MEMBER" | "CLASS_TEACHER" | "PRINCIPAL" | "ADMIN";

export const USER_ROLES = {
  MEMBER: "MEMBER",
  CLASS_TEACHER: "CLASS_TEACHER",
  PRINCIPAL: "PRINCIPAL",
  ADMIN: "ADMIN",
} as const;

export const ALL_ROLES: UserRole[] = ["MEMBER", "CLASS_TEACHER", "PRINCIPAL", "ADMIN"];

export function isValidRole(role: unknown): role is UserRole {
  return (
    typeof role === "string" &&
    (role === "MEMBER" || role === "CLASS_TEACHER" || role === "PRINCIPAL" || role === "ADMIN")
  );
}

export function hasRole(userRole: string | undefined | null, allowedRoles: UserRole[]): boolean {
  if (!userRole || !isValidRole(userRole)) return false;
  return allowedRoles.includes(userRole as UserRole);
}
