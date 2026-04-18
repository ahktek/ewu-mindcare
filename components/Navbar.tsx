import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-lg">
            EWU
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#C8102E]">
              EWU MindCare Portal
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Digital Mental Health Counselor System
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 text-sm md:text-base">
          <Link href="/" className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50">
            Home
          </Link>

          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Dashboard
          </Link>

          <Link
            href="/book"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Book
          </Link>

          <Link
            href="/support"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Support
          </Link>

          <Link
            href="/chat"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Chat
          </Link>

          <Link
            href="/resources"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Resources
          </Link>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl text-[#1F2937] hover:bg-red-50"
          >
            Admin
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-[#C8102E] text-white font-medium hover:opacity-90"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}