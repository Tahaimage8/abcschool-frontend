"use client";

import React from "react";
import { PlusCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const mobileNumberRegex = /^01[3-9]\d{8}$/;

const numberEntrySchema = z.object({
  userName: z.string().min(1, "Name is required"),
  mobileNumber: z.string().regex(mobileNumberRegex, "Enter a valid Bangladeshi mobile number (e.g., 01712345678)"),
  numbers: z.array(z.number().min(0).max(1000)).length(10, "Exactly 10 numbers required"),
});

type NumberEntryFormData = z.infer<typeof numberEntrySchema>;

export default function NumbersPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NumberEntryFormData>({
    resolver: zodResolver(numberEntrySchema),
    defaultValues: {
      userName,
      mobileNumber: "",
      numbers: Array(10).fill(0),
    },
  });

  const onSubmit = async (data: NumberEntryFormData) => {
    try {
      toast.loading("Submitting...", { id: "submit" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Number entry submitted! (Mock)", { id: "submit" });
      console.log("Submitted:", data);
    } catch {
      toast.error("Failed to submit", { id: "submit" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Number Entry
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Enter your name, mobile number, and 10 numbers below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                My Name
              </label>
              <input
                id="userName"
                {...register("userName")}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-500">{errors.userName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                {...register("mobileNumber")}
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                }`}
                placeholder="01712345678"
                maxLength={11}
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.mobileNumber.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Format: 01X-XXXXXXXX (e.g., 01712345678)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enter 10 Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i}>
                <label htmlFor={`number-${i}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number {i + 1}
                </label>
                <input
                  id={`number-${i}`}
                  type="number"
                  min={0}
                  max={1000}
                  step={1}
                  {...register(`numbers.${i}`, { valueAsNumber: true })}
                  className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.numbers ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          {errors.numbers && (
            <p className="mt-2 text-sm text-red-500">{errors.numbers.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Submit Entry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}