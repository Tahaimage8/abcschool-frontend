"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signUpSchema, SignUpInput } from "@/lib/validations/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpInput) => {
    try {
      await registerAuth({
        name: values.name,
        email: values.email,
        password: values.password,
        role: "user",
      });

      toast.success("Account created successfully! Welcome to ABC School.");
      router.push("/signin?registered=true");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 mb-4 shadow-sm">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Join ABC School Management Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  {...register("name")}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2`}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@school.com"
                  disabled={isSubmitting}
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("password")}
                  className={`w-full pl-10 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800/60 border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("confirmPassword")}
                  className={`w-full pl-10 pr-11 py-2.5 bg-gray-50 dark:bg-gray-800/60 border ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm transition-all focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Note badge regarding Member role */}
            <div className="flex items-center gap-2 p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl text-xs text-indigo-700 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span>
                Accounts are registered with standard Member permissions by default.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
