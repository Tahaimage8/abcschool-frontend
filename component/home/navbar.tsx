"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function AppHeader() {
  const pathname = usePathname();

  // Demo State: User Login Status (Toggle for testing)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Demo User Data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            ABC<span className="text-blue-600 dark:text-blue-400"> School</span>
          </span>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 sm:flex md:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive
                    ? "font-semibold text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute inset-x-3.5 bottom-0 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Action Buttons / User Menu */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoggedIn ? (
            /* Logged In State: Dropdown Menu */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-600/30"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.name}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* User Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <hr className="my-1.5 border-gray-100 dark:border-gray-800" />

                  {/* Links */}
                  <Link
                    href="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  >
                    <LayoutDashboard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Dashboard
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  >
                    <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    Settings
                  </Link>

                  <hr className="my-1.5 border-gray-100 dark:border-gray-800" />

                  {/* Sign Out Action */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out State: Sign In & Sign Up Buttons */
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)} // Demo toggle
                className="rounded-full px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40"
              >
                Sign In
              </button>
              <Link
                href="/signup"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pt-2 pb-6 sm:hidden dark:border-gray-800 dark:bg-gray-950">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-xl px-3.5 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold dark:bg-blue-950/40 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <hr className="my-4 border-gray-100 dark:border-gray-800" />

          {/* Mobile User Controls */}
          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-600/30"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <LayoutDashboard className="h-4 w-4 text-gray-500" />
                  Dashboard
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-xl border border-gray-300 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Sign In
              </button>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}