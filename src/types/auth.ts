export type UserRole = "ADMIN" | "PRINCIPAL" | "CLASS_TEACHER";

export const USER_ROLES = {
  ADMIN: "ADMIN",
  PRINCIPAL: "PRINCIPAL",
  CLASS_TEACHER: "CLASS_TEACHER",
} as const;

export const ALL_ROLES: UserRole[] = ["ADMIN", "PRINCIPAL", "CLASS_TEACHER"];

export function isValidRole(role: unknown): role is UserRole {
  return typeof role === "string" && (role === "ADMIN" || role === "PRINCIPAL" || role === "CLASS_TEACHER");
}

export function hasRole(userRole: string | undefined | null, allowedRoles: UserRole[]): boolean {
  if (!userRole || !isValidRole(userRole)) return false;
  return allowedRoles.includes(userRole as UserRole);
}
