"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Overview", href: "/admin", icon: "📊" },
  { name: "Appointments", href: "/admin/appointments", icon: "📅" },
  { name: "Support Requests", href: "/admin/support", icon: "✉️" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center font-bold">
            EWU
          </div>
          <span className="font-bold text-xl text-[#1F2937]">MindCare</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-colors ${
                isActive
                  ? "bg-[#DCEEFF] text-[#C8102E]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#C8102E]"
              }`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-gray-500 hover:bg-gray-50"
        >
          <span>🏠</span> Back to Site
        </Link>
      </div>
    </aside>
  );
}
