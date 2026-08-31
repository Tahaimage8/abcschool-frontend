"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white py-12 sm:py-16 lg:py-24 dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950 border-b border-gray-200/85 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/85">
      
      {/* Background Decorative Blur Highlights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="flex flex-col items-start lg:col-span-6 text-left">
            
            {/* Optional Small Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur-sm dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Next-Gen School Management Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Empowering Every <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-blue-400">
                Student, Every Day
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="mt-6 text-base text-gray-600 sm:text-lg lg:text-xl dark:text-gray-300 max-w-xl leading-relaxed">
              A smarter school management platform connecting students, teachers, parents, and administrators in one unified digital space.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/35 active:scale-98 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-98 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                Learn More
              </Link>
            </div>

          </div>

          {/* Right Banner Image Showcase */}
          <div className="relative lg:col-span-6">
            
            {/* Purple Ambient Glow Effect Behind Image */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-70 blur-2xl transition-all dark:from-indigo-600/40 dark:to-purple-600/40" />

            {/* Card Container for Banner Image */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-2 shadow-2xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90">
              <Image
                src="/images/banner.png"
                alt="ABC School Management Dashboard"
                width={1200}
                height={750}
                priority
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
