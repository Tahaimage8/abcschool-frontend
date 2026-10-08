import { getAuthHeaders } from "../jwtAuth";

const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

export interface NumberEntryPayload {
  userName: string;
  mobileNumber: string;
  numbers: string[];
  userId?: string;
}

export interface NumberEntryItem {
  _id: string;
  userId?: string;
  userName: string;
  mobileNumber: string;
  numbers: string[];
  createdAt: string;
  updatedAt: string;
}

export async function createNumberEntry(
  payload: NumberEntryPayload
): Promise<NumberEntryItem> {
  const res = await fetch(`${API_BASE_URL}/numbers`, {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create number entry");
  }

  return data.data;
}

export async function getNumberEntries(
  userId?: string
): Promise<NumberEntryItem[]> {
  const url = new URL(`${API_BASE_URL}/numbers`);
  if (userId) {
    url.searchParams.set("userId", userId);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch number entries");
  }

  return data.data || [];
}

export async function deleteNumberEntry(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/numbers/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete number entry");
  }
}

export interface FONumberPayload {
  number: string;
  payment_method: "bkash" | "nogod" | "rocket" | "upay";
}

export interface FONumberItem {
  _id: string;
  number: string;
  payment_method: "bkash" | "nogod" | "rocket" | "upay";
  status: "active" | "inactive";
  added_by: string;
  createdAt: string;
  updatedAt: string;
}

export async function createFONumber(
  payload: FONumberPayload
): Promise<FONumberItem> {
  const res = await fetch(`${API_BASE_URL}/fo-numbers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMsg = data.details
      ? Object.values(data.details).flat().join(", ")
      : data.error || "Failed to add FO number";
    throw new Error(errorMsg);
  }

  return data.data;
}

export async function getFONumbers(
  status?: "active" | "inactive"
): Promise<FONumberItem[]> {
  const url = new URL(`${API_BASE_URL}/fo-numbers`);
  if (status) {
    url.searchParams.set("status", status);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch FO numbers");
  }

  return data.data || [];
}

export async function updateFONumberStatus(
  id: string,
  status?: "active" | "inactive"
): Promise<FONumberItem> {
  const res = await fetch(`${API_BASE_URL}/fo-numbers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(status ? { status } : {}),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update status");
  }

  return data.data;
}

export async function deleteFONumber(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/fo-numbers/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete number");
  }
}

