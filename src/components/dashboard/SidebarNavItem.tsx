"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const SidebarNavItem = forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ href, label, icon, isActive = false }, ref) => {
    const pathname = usePathname();
    const active = isActive || pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        ref={ref}
        href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          active
            ? "bg-indigo-50 text-indigo-600 font-semibold dark:bg-indigo-950/40 dark:text-indigo-400"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        }`}
        onClick={() => {}}
      >
        <span className="flex h-5 w-5 items-center justify-center shrink-0">{icon}</span>
        <span className="truncate">{label}</span>
        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
      </Link>
    );
  }
);

SidebarNavItem.displayName = "SidebarNavItem";