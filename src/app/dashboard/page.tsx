"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  GraduationCap,
  User,
  Mail,
  Shield,
  LogOut,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully!");
      router.push("/signin");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  const user = session.user as {
    name?: string;
    email?: string;
    role?: string;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome, {user.name || "User"}!
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                  {user.role || "MEMBER"}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ABC School Management Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-500" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Details Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Your Authentication Session
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                <User className="w-4 h-4 text-indigo-500" />
                Name
              </div>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {user.name || "N/A"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                <Mail className="w-4 h-4 text-indigo-500" />
                Email
              </div>
              <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                {user.email || "N/A"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4 text-indigo-500" />
                Assigned Role
              </div>
              <p className="text-base font-medium text-indigo-600 dark:text-indigo-400">
                {user.role || "MEMBER"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
