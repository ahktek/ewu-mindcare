"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SupportPage() {
  const [form, setForm] = useState({
    category: "stress",
    concern: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Anonymous request submitted successfully!");
        setForm({
          category: "stress",
          concern: "",
        });
      } else {
        alert(data.message || "Failed to submit request.");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FBFF]">
      <Navbar />

      <div className="px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-[#C8102E] mb-2">
            Anonymous Support Request
          </h1>
          <p className="text-gray-500 mb-8">
            Share your concern privately without revealing your identity.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              <option value="stress">Stress</option>
              <option value="anxiety">Anxiety</option>
              <option value="academic pressure">Academic Pressure</option>
              <option value="burnout">Burnout</option>
              <option value="loneliness">Loneliness</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Write your concern here..."
              value={form.concern}
              onChange={(e) => setForm({ ...form, concern: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 h-40 outline-none focus:ring-2 focus:ring-[#C8102E]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Anonymously"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}