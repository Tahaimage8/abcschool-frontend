"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-slate-100/70 pt-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 md:grid-cols-12 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                ABC<span className="text-blue-600 dark:text-blue-400"> School</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Elevating educational excellence through innovative management technology.
            </p>
          </div>

          {/* Col 2: Platform Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              PLATFORM
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              SUPPORT
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect / Socials */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              CONNECT
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="mailto:contact@abcschool.com"
                aria-label="Email Us"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://abcschool.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Website"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-200/80 py-6 text-center dark:border-gray-800">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            © 2026 ABC School Management. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
