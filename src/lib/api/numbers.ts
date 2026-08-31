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
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
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
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete number entry");
  }
}
