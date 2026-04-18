"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function BookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Appointment request submitted successfully!");
        setForm({
          name: "",
          email: "",
          role: "student",
          date: "",
          time: "",
          notes: "",
        });
      } else {
        alert(data.message || "Failed to submit appointment.");
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
            Book Counseling Appointment
          </h1>
          <p className="text-gray-500 mb-8">
            Fill up the form to request a counseling session.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
              required
            />

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
              required
            />

            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#C8102E]"
              required
            />

            <textarea
              placeholder="Briefly describe your concern"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-gray-300 rounded-xl p-3 h-32 outline-none focus:ring-2 focus:ring-[#C8102E]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Appointment"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}