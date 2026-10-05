const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export interface JwtUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: JwtUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface LoginPayload {
  email: string;
  password: string;
}

const TOKEN_KEY = "abcschool_jwt_token";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export async function registerWithJwt(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function loginWithJwt(
  payload: LoginPayload
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  if (data.token) {
    setToken(data.token);
  }

  return data;
}

export async function getJwtProfile(): Promise<{ user: JwtUser }> {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    removeToken();
    throw new Error(data.error || "Failed to fetch profile");
  }

  return data;
}
