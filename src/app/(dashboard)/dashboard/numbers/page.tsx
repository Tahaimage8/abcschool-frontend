"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle, ListFilter, CheckCircle2, XCircle, Trash2, ToggleLeft, ToggleRight, Loader2, RefreshCw, CreditCard, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  createFONumber,
  getFONumbers,
  updateFONumberStatus,
  deleteFONumber,
  FONumberItem,
} from "@/lib/api/numbers";

const mobileNumberRegex = /^01[3-9]\d{8}$/;
const singleNumberSchema = z.object({
  number: z
    .string()
    .regex(mobileNumberRegex, "Enter a valid Bangladeshi mobile number (e.g., 01712345678)"),
  payment_method: z.enum(["bkash", "nogod", "rocket", "upay"], {
    message: "Please select a valid payment method",
  }),

});

type SingleNumberFormData = z.infer<typeof singleNumberSchema>;

export default function NumbersPage() {
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [numbersList, setNumbersList] = useState<FONumberItem[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SingleNumberFormData>({
    resolver: zodResolver(singleNumberSchema),
    defaultValues: {
      number: "",
      payment_method: "bkash",
    },
  });

  const fetchNumbers = useCallback(async () => {
    try {
      setIsLoadingList(true);
      const filterParam = statusFilter === "all" ? undefined : statusFilter;
      const data = await getFONumbers(filterParam);
      setNumbersList(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load numbers";
      toast.error(msg);
    } finally {
      setIsLoadingList(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (activeTab === "list") {
      fetchNumbers();
    }
  }, [activeTab, fetchNumbers]);

  const onAddSubmit = async (data: SingleNumberFormData) => {
    try {
      toast.loading("Adding number...", { id: "add-number" });
      await createFONumber({
        number: data.number,
        payment_method: data.payment_method,
      });
      toast.success("Number added successfully!", { id: "add-number" });
      reset({
        number: "",
        payment_method: data.payment_method,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add number";
      toast.error(msg, { id: "add-number" });
    }
  };

  const handleToggleStatus = async (item: FONumberItem) => {
    try {
      setActionLoadingId(item._id);
      const newTargetStatus = item.status === "active" ? "inactive" : "active";
      await updateFONumberStatus(item._id, newTargetStatus);
      toast.success(`Number status changed to ${newTargetStatus}`);
      fetchNumbers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update status";
      toast.error(msg);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this number entry?")) return;
    try {
      setActionLoadingId(id);
      await deleteFONumber(id);
      toast.success("Number entry deleted");
      setNumbersList((prev) => prev.filter((item) => item._id !== id));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete number";
      toast.error(msg);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getMethodBadgeStyle = (method: string) => {
    switch (method) {
      case "bkash":
        return "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border-pink-200 dark:border-pink-800";
      case "nogod":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "rocket":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "upay":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Field Officer Number Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add single numbers with payment methods and manage your active/inactive list.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "add"
              ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          Add Number
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("list")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "list"
              ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          <ListFilter className="w-4 h-4" />
          My Numbers
        </button>
      </div>

      {/* Tab 1: Single Add Number */}
      {activeTab === "add" && (
        <form onSubmit={handleSubmit(onAddSubmit)} className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Single Number Entry
            </h2>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <input
                id="number"
                type="tel"
                maxLength={11}
                {...register("number")}
                className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.number ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                }`}
                placeholder="e.g., 01712345678"
              />
              {errors.number && (
                <p className="mt-1 text-sm text-red-500">{errors.number.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Method
              </label>
              <div className="relative">
                <select
                  id="payment_method"
                  {...register("payment_method")}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 capitalize"
                >
                  <option value="bkash">bKash</option>
                  <option value="nogod">Nagad (Nogod)</option>
                  <option value="rocket">Rocket</option>
                  <option value="upay">Upay</option>
                </select>
              </div>
              {errors.payment_method && (
                <p className="mt-1 text-sm text-red-500">{errors.payment_method.message}</p>
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
                  <span>Adding Number...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Number Entry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: My Numbers List */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Filter Status:
              </span>
              <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {(["all", "active", "inactive"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                      statusFilter === st
                        ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={fetchNumbers}
              disabled={isLoadingList}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingList ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* List Content */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            {isLoadingList ? (
              <div className="flex items-center justify-center p-12 text-gray-500 dark:text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
                <span>Loading your numbers...</span>
              </div>
            ) : numbersList.length === 0 ? (
              <div className="text-center p-12 space-y-3">
                <Phone className="w-10 h-10 text-gray-400 mx-auto" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">No numbers found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {statusFilter === "all"
                    ? "You haven't added any numbers yet."
                    : `No numbers with status '${statusFilter}'.`}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                  <thead className="bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 font-semibold">Number ID</th>
                      <th scope="col" className="px-6 py-3.5 font-semibold">Mobile Number</th>
                      <th scope="col" className="px-6 py-3.5 font-semibold">Payment Method</th>
                      <th scope="col" className="px-6 py-3.5 font-semibold">Status</th>
                      <th scope="col" className="px-6 py-3.5 font-semibold">Date Added</th>
                      <th scope="col" className="px-6 py-3.5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {numbersList.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {item.number_id || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold text-gray-900 dark:text-white">
                          {item.number}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border uppercase tracking-wider ${getMethodBadgeStyle(
                              item.payment_method
                            )}`}
                          >
                            <CreditCard className="w-3 h-3" />
                            {item.payment_method}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {item.status === "active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                              <XCircle className="w-3.5 h-3.5" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item)}
                              disabled={actionLoadingId === item._id}
                              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                item.status === "active"
                                  ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100"
                                  : "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                              }`}
                              title={item.status === "active" ? "Mark as Inactive" : "Mark as Active"}
                            >
                              {item.status === "active" ? (
                                <>
                                  <ToggleLeft className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                  <span>Deactivate</span>
                                </>
                              ) : (
                                <>
                                  <ToggleRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                  <span>Activate</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              disabled={actionLoadingId === item._id}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors"
                              title="Delete Number"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}