"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { AdminUser } from "@/lib/types";

export default function AdminShell({
  admin,
  onLogout,
  children,
}: {
  admin: AdminUser | null;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-line">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-extrabold text-[18px] text-brand-700">
              وُظيفاي
            </span>
            <span className="text-[12px] text-ink-3 border-s border-line ps-2">
              لوحة المقالات
            </span>
          </Link>
          <div className="flex items-center gap-4 text-[13px]">
            {admin ? (
              <span className="text-ink-2 hidden sm:inline">{admin.email}</span>
            ) : null}
            <button
              type="button"
              onClick={onLogout}
              className="h-9 px-4 rounded-xs border border-line hover:border-brand-300 font-semibold transition"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
