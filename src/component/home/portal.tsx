"use client";

import React from "react";
import { LogIn, ArrowRight, ShieldCheck, Landmark, UserCheck } from "lucide-react";

export default function UnifiedAccess() {
  const roles = [
    {
      title: "System Administrator",
      description: "Global configuration & security",
      icon: ShieldCheck,
      iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
    {
      title: "Principal / Director",
      description: "Institution analytics & oversight",
      icon: Landmark,
      iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    },
    {
      title: "Faculty Member",
      description: "Classes, grades & student interaction",
      icon: UserCheck,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-20 lg:py-24 dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 border-b border-gray-200/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Unified Access, Tailored Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            One intelligent login portal automatically routes users to their role-specific operational dashboard.
          </p>
        </div>

        {/* Diagram / Portal Section Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Left: Global Login Card */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white text-center shadow-xl shadow-indigo-500/20 transition-transform duration-300 hover:scale-[1.02]">
              {/* Subtle Overlay Glow */}
              <div className="absolute -inset-x-20 -top-20 -z-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <LogIn className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight">
                Global Login
              </h3>

              <p className="mt-2 text-sm text-indigo-100/90 font-medium">
                Single Sign-On Gateway
              </p>
            </div>
          </div>

          {/* Center: Arrow Indicator */}
          <div className="flex items-center justify-center text-gray-400 dark:text-gray-600">
            <ArrowRight className="hidden md:block h-8 w-8 animate-pulse text-indigo-400 dark:text-indigo-500" />
            <ArrowRight className="block md:hidden h-8 w-8 rotate-90 animate-pulse text-indigo-400 dark:text-indigo-500" />
          </div>

          {/* Right: Role Cards Stack */}
          <div className="w-full max-w-md flex flex-col gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-900"
                >
                  {/* Role Icon Container */}
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${role.iconBg}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Role Info */}
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {role.title}
                    </h4>
                    <p className="mt-0.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {role.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
