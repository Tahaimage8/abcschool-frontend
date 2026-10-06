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
  username: string;
  role: "field_officer";
  sub_id: string;
  parent_manager_id: string;
  createdAt?: string;
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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create manager");
  }
  return data;
}

export async function getManagers(): Promise<{ managers: ManagerUser[] }> {
  const res = await fetch(`${API_BASE_URL}/admin/managers`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch managers");
  }
  return data;
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

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to reset manager password");
  }
  return data;
}

export async function createFieldOfficer(payload: {
  name: string;
  username: string;
  password: string;
}): Promise<{ message: string; fieldOfficer: FieldOfficerUser }> {
  const res = await fetch(`${API_BASE_URL}/manager/field-officers`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to create field officer");
  }
  return data;
}

export async function getMyFieldOfficers(): Promise<{
  fieldOfficers: FieldOfficerUser[];
}> {
  const res = await fetch(`${API_BASE_URL}/manager/field-officers`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch field officers");
  }
  return data;
}
