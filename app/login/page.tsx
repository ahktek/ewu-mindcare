"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignup) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            },
          },
        });

        if (signupError) throw signupError;
        
        // We'll use a trigger or a separate API call to sync to Prisma User table in a real app
        // For now, let's assume successful signup leads to a confirmation message
        alert("Check your email for the confirmation link!");
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;

        // Simple role-based routing logic for demonstration
        // In a real app, we'd fetch the user's role from the Prisma 'User' table
        if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("counselor")) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FBFF]">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#C8102E] to-[#A00D25] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-red-200">
              EWU
            </div>
            <h1 className="mt-6 text-3xl font-bold text-[#1F2937]">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-500 mt-2">
              {isSignup ? "Join the EWU MindCare community" : "Sign in to access your wellness portal"}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignup && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-1">FULL NAME</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">UNIVERSITY EMAIL</label>
              <input
                type="email"
                placeholder="name@ewu.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 ml-1">PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C8102E] transition-all"
                required
              />
            </div>

            {isSignup && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 ml-1">I AM A...</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#C8102E] transition-all appearance-none"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty Member</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8102E] text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100 hover:shadow-red-200 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:transform-none"
            >
              {loading ? "Verifying..." : isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">OR</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            {isSignup ? "Already have an account?" : "New to MindCare?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#C8102E] font-bold hover:underline"
            >
              {isSignup ? "Sign In" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}