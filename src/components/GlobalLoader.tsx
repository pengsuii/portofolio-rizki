"use client";
import { useLoading } from "@/providers/loading-context";

export function GlobalLoader() {
  const { isLoading, message } = useLoading();
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white px-6 py-4 shadow-lg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}