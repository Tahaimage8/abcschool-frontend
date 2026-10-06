"use client";

import React, { useEffect, useState } from "react";
import { UserCheck, UserPlus, Loader2, Hash, AtSign, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import {
  createFieldOfficer,
  getMyFieldOfficers,
  FieldOfficerUser,
} from "@/lib/api/hierarchy";

export default function FieldOfficersDashboardPage() {
  const { user } = useAuth();
  const [fieldOfficers, setFieldOfficers] = useState<FieldOfficerUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form states for creating Field Officer
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchFieldOfficers = async () => {
    try {
      setLoading(true);
      const res = await getMyFieldOfficers();
      setFieldOfficers(res.fieldOfficers);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load Field Officers";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "manager" || user?.role === "admin") {
      fetchFieldOfficers();
    }
  }, [user]);

  const handleCreateFieldOfficer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setCreating(true);
      const res = await createFieldOfficer({ name, username, password });
      toast.success(`Field Officer created! Sub-ID: ${res.fieldOfficer.sub_id}`);
      setName("");
      setUsername("");
      setPassword("");
      fetchFieldOfficers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create Field Officer";
      toast.error(msg);
    } finally {
      setCreating(false);
    }
  };

  if (user?.role !== "manager" && user?.role !== "admin") {
    return (
      <div className="p-8 text-center text-red-500 font-semibold flex items-center justify-center gap-2">
        <ShieldAlert className="w-5 h-5" />
        Access Denied: Only Managers can create and view Field Officers.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Field Officer Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {user.role === "manager" ? (
            <>Your Manager Sub-ID is <strong className="text-indigo-600 dark:text-indigo-400">{user.sub_id || "314"}</strong>. Your created Field Officers will receive relational IDs like <code className="bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-700">{user.sub_id || "314"}/1</code>, <code className="bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-700">{user.sub_id || "314"}/2</code>.</>
          ) : (
            "Admin view of Field Officers."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create FO Form */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-600" />
            Create Field Officer
          </h2>

          <form onSubmit={handleCreateFieldOfficer} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Field Officer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Username (For Login)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <AtSign className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="fo_user1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              <span>Create Field Officer</span>
            </button>
          </form>
        </div>

        {/* Field Officers Table List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Field Officers List
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
              Total: {fieldOfficers.length}
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
            </div>
          ) : fieldOfficers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No Field Officers created yet under your account.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs font-semibold uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Relational Sub-ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Username</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {fieldOfficers.map((fo) => (
                    <tr key={fo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">
                        <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg">
                          <Hash className="w-3.5 h-3.5" />
                          {fo.sub_id}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {fo.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <AtSign className="w-3.5 h-3.5 text-gray-400" />
                          <span>{fo.username}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
