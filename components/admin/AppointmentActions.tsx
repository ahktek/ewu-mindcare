"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppointmentActions({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {currentStatus === "pending" && (
        <button
          onClick={() => updateStatus("approved")}
          disabled={loading}
          className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          Approve
        </button>
      )}
      {currentStatus !== "cancelled" && currentStatus !== "completed" && (
        <button
          onClick={() => updateStatus("cancelled")}
          disabled={loading}
          className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 disabled:opacity-50"
        >
          Cancel
        </button>
      )}
      {currentStatus === "approved" && (
        <button
          onClick={() => updateStatus("completed")}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 disabled:opacity-50"
        >
          Done
        </button>
      )}
    </div>
  );
}
