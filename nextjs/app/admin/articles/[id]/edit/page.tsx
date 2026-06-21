"use client";

import { use, useEffect, useState } from "react";
import { adminArticlesApi } from "@/lib/api";
import { useRequireAdmin } from "@/lib/use-admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import ArticleForm from "@/components/admin/ArticleForm";
import type { Article } from "@/lib/types";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { token, admin, loading, logout } = useRequireAdmin();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    let active = true;
    adminArticlesApi
      .get(token, id)
      .then((a) => active && setArticle(a))
      .catch(() => active && setError("تعذّر تحميل المقال."));
    return () => {
      active = false;
    };
  }, [token, id]);

  if (loading || !token) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-3">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <AdminShell admin={admin} onLogout={logout}>
      <h1 className="display text-[28px] mb-8">تعديل المقال</h1>
      {error ? (
        <p className="text-[13px] text-red-600">{error}</p>
      ) : article ? (
        <ArticleForm token={token} article={article} />
      ) : (
        <p className="text-ink-3">جارٍ التحميل...</p>
      )}
    </AdminShell>
  );
}
