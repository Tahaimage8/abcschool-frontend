import { getAuthHeaders, getToken } from "../jwtAuth";

const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export interface ManagerUser {
  id: string;
  name: string;
  email: string;
  role: "manager";
  sub_id: string;
  createdAt?: string;
}

export interface FieldOfficerUser {
  id: string;
  name: string;
  email: string;
  role: "field_officer";
  sub_id: string;
  parent_manager_id: string;
  createdAt?: string;
}

async function safeJsonParse(res: Response, defaultErrorMsg: string) {
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(data.error || defaultErrorMsg);
    }
    return data;
  } catch (err: any) {
    if (!res.ok) {
      throw new Error(err.message || defaultErrorMsg);
    }
    throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
  }
}

export async function createManager(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string; manager: ManagerUser }> {
  const res = await fetch(`${API_BASE_URL}/admin/managers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return await safeJsonParse(res, "Failed to create manager");
}

export async function getManagers(): Promise<{ managers: ManagerUser[] }> {
  const res = await fetch(`${API_BASE_URL}/admin/managers`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return await safeJsonParse(res, "Failed to fetch managers");
}

export async function resetManagerPassword(payload: {
  managerId: string;
  newPassword: string;
}): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/admin/managers/reset-password`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return await safeJsonParse(res, "Failed to reset manager password");
}

export async function createFieldOfficer(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string; fieldOfficer: FieldOfficerUser }> {
  const res = await fetch(`${API_BASE_URL}/manager/field-officers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      username: payload.email,
      password: payload.password,
    }),
  });

  return await safeJsonParse(res, "Failed to create field officer");
}

export async function getMyFieldOfficers(): Promise<{
  fieldOfficers: FieldOfficerUser[];
}> {
  const res = await fetch(`${API_BASE_URL}/manager/field-officers`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return await safeJsonParse(res, "Failed to fetch field officers");
}
