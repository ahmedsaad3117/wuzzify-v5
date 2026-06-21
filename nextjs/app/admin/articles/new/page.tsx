"use client";

import { useRequireAdmin } from "@/lib/use-admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import ArticleForm from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  const { token, admin, loading, logout } = useRequireAdmin();

  if (loading || !token) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-3">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <AdminShell admin={admin} onLogout={logout}>
      <h1 className="display text-[28px] mb-8">مقال جديد</h1>
      <ArticleForm token={token} />
    </AdminShell>
  );
}
