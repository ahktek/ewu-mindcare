"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Book Session", href: "/book" },
    { name: "Support", href: "/support" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center font-bold text-lg transition-transform group-hover:scale-105">
            EWU
          </div>
          <div>
            <h1 className="text-xl font-black text-[#1F2937] tracking-tight group-hover:text-[#C8102E] transition-colors">
              MindCare<span className="text-[#C8102E]">.</span>
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === link.href
                  ? "bg-red-50 text-[#C8102E]"
                  : "text-gray-600 hover:text-[#C8102E] hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:flex px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-[#C8102E] hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            Admin Portal
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl bg-[#C8102E] text-white text-sm font-bold shadow-lg shadow-red-100 hover:shadow-red-200 hover:-translate-y-0.5 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}