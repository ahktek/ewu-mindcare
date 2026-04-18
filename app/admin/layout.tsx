"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we are on the login page, don't try to authorize or redirect
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    // Basic local storage check for 'admin/admin' auth
    const isAdmin = localStorage.getItem("is_admin") === "true";
    if (!isAdmin) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#C8102E] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If we are on the login page, don't show the Sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FBFF]">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
