"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, LayoutDashboard, PlusCircle, History, Settings, GraduationCap } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <LayoutDashboard className="h-5 w-5" />, roles: ["ADMIN", "CLASS_TEACHER", "PRINCIPAL"] },
  { href: "/dashboard/numbers", label: "Number Entry", icon: <PlusCircle className="h-5 w-5" />, roles: ["ADMIN", "CLASS_TEACHER"] },
  { href: "/dashboard/history", label: "History", icon: <History className="h-5 w-5" />, roles: ["ADMIN", "CLASS_TEACHER", "PRINCIPAL"] },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" />, roles: ["ADMIN", "CLASS_TEACHER", "PRINCIPAL"] },
];

function SidebarDesktop({ navItems, userRole }: { navItems: NavItem[]; userRole?: string }) {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:bg-white lg:dark:bg-gray-950 lg:border-r lg:border-gray-200 lg:dark:border-gray-800">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              ABC<span className="text-indigo-600 dark:text-indigo-400"> School</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <SidebarNavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Logged in as
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white capitalize">
            {userRole?.replace("_", " ") || "Member"}
          </p>
        </div>
      </div>
    </aside>
  );
}

function SidebarMobile({ isOpen, onClose, navItems, userRole }: { isOpen: boolean; onClose: () => void; navItems: NavItem[]; userRole?: string }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden translate-x-0"
        aria-label="Sidebar navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                ABC<span className="text-indigo-600 dark:text-indigo-400"> School</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <SidebarNavItem key={item.href} {...item} />
            ))}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Logged in as
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white capitalize">
              {userRole?.replace("_", " ") || "Member"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredNavItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(userRole || "")
  );

  return (
    <>
      <SidebarDesktop navItems={filteredNavItems} userRole={userRole} />
      {isClient && (
        <SidebarMobile
          isOpen={isOpen}
          onClose={onClose}
          navItems={filteredNavItems}
          userRole={userRole}
        />
      )}
    </>
  );
}