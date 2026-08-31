"use client";

import React from "react";
import { Monitor, BarChart3, Megaphone, CalendarCheck } from "lucide-react";

export default function Features() {
  const featuresList = [
    {
      title: "Smart Classes",
      description:
        "Interactive scheduling and digital resource management for the modern hybrid classroom environment.",
      icon: Monitor,
      iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
    {
      title: "Instant Results",
      description:
        "Automated grading and real-time performance analytics accessible to educators and parents instantly.",
      icon: BarChart3,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
    },
    {
      title: "Announcements",
      description:
        "Centralized broadcast system for urgent alerts, newsletters, and general school communications.",
      icon: Megaphone,
      iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400",
    },
    {
      title: "Attendance",
      description:
        "Streamlined digital roll calls with integrated biometric compatibility and absence tracking algorithms.",
      icon: CalendarCheck,
      iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    },
  ];

  return (
    <section className="relative bg-slate-50/70 py-16 sm:py-20 lg:py-24 dark:bg-gray-950/80 border-b border-gray-200/80 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Modern Features for Modern Schools
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Everything you need to run your institution efficiently, seamlessly integrated into a single powerful platform.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col items-start rounded-2xl  bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Feature Icon Container */}
                <div
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${feature.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Card Description */}
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
