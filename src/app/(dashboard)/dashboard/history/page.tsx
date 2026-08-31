"use client";

import React from "react";
import { History, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface MockEntry {
  id: string;
  userName: string;
  numbers: number[];
  createdAt: string;
}

const MOCK_DATA: MockEntry[] = [
  {
    id: "1",
    userName: "John Doe",
    numbers: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userName: "Jane Smith",
    numbers: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    userName: "Bob Wilson",
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    createdAt: "2024-01-13T09:15:00Z",
  },
];

export default function HistoryPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <History className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          History
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Your past number entries
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Numbers</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {MOCK_DATA.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {entry.userName}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {entry.numbers.map((num, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {MOCK_DATA.length === 0 && (
          <div className="p-12 text-center">
            <Loader2 className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 animate-spin" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">No entries yet</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Note</h2>
        <p className="text-gray-500 dark:text-gray-400">
          This is mock data. Once the backend is connected, this will show your actual submissions from the database.
        </p>
      </div>
    </div>
  );
}