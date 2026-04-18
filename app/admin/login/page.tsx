"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "admin" && password === "admin") {
      localStorage.setItem("is_admin", "true");
      router.push("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FBFF] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center font-black text-xl shadow-xl shadow-red-100 mb-6">
            EWU
          </div>
          <h1 className="text-3xl font-black text-[#1F2937] tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 mt-2 font-medium">Authorized Counselors Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">ADMIN ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter ID"
              className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-red-50 focus:border-[#C8102E] transition-all font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-red-50 focus:border-[#C8102E] transition-all font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C8102E] text-white py-4 rounded-2xl font-black shadow-xl shadow-red-100 hover:shadow-red-200 hover:-translate-y-1 transition-all active:scale-95"
          >
            Access Dashboard
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400 font-medium leading-relaxed">
          This is a protected system. Unauthorized access attempts are logged and monitored.
        </p>
      </div>
    </main>
  );
}
