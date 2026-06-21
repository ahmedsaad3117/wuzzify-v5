"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminArticlesApi } from "@/lib/api";
import { useRequireAdmin } from "@/lib/use-admin-auth";
import { formatArticleDate } from "@/lib/article-i18n";
import AdminShell from "@/components/admin/AdminShell";
import type { Article } from "@/lib/types";

export default function AdminArticlesListPage() {
  const { token, admin, loading, logout } = useRequireAdmin();
  const [articles, setArticles] = useState<Article[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    try {
      const data = await adminArticlesApi.listAll(token);
      setArticles(data.items);
      setError("");
    } catch {
      setError("تعذّر تحميل المقالات.");
    } finally {
      setBusy(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  async function handleDelete(article: Article) {
    if (!token) return;
    if (!window.confirm(`حذف المقال "${article.title_ar}"؟`)) return;
    try {
      await adminArticlesApi.remove(token, article.id);
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
    } catch {
      window.alert("تعذّر حذف المقال.");
    }
  }

  if (loading || !token) {
    return (
      <div className="min-h-screen grid place-items-center text-ink-3">
        جارٍ التحميل...
      </div>
    );
  }

  return (
    <AdminShell admin={admin} onLogout={logout}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="display text-[28px]">المقالات</h1>
          <p className="text-[13px] text-ink-3 mt-1">
            إدارة مقالات الموقع (مسودات ومنشورة).
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="h-10 px-5 inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xs transition"
        >
          + مقال جديد
        </Link>
      </div>

      {error ? <p className="text-[13px] text-red-600 mb-4">{error}</p> : null}

      <div className="bg-white border border-line rounded-xl overflow-hidden">
        {busy ? (
          <p className="p-8 text-center text-ink-3">جارٍ التحميل...</p>
        ) : articles.length === 0 ? (
          <p className="p-8 text-center text-ink-3">لا توجد مقالات بعد.</p>
        ) : (
          <table className="w-full text-[14px]">
            <thead className="bg-wash text-ink-3 text-[12px] uppercase tracking-wider">
              <tr>
                <th className="text-start font-semibold px-5 py-3">العنوان</th>
                <th className="text-start font-semibold px-5 py-3">الحالة</th>
                <th className="text-start font-semibold px-5 py-3">التاريخ</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t border-line">
                  <td className="px-5 py-3">
                    <span className="font-semibold">{article.title_ar}</span>
                    <span className="block text-[12px] text-ink-3 num" dir="ltr">
                      /{article.slug}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        "inline-block text-[11px] font-bold px-2 py-0.5 rounded-xs " +
                        (article.status === "published"
                          ? "bg-brand-100 text-brand-700"
                          : "bg-line text-ink-3")
                      }
                    >
                      {article.status === "published" ? "منشور" : "مسودة"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink-3 num">
                    {formatArticleDate(
                      article.published_at ?? article.created_at,
                      "ar",
                    )}
                  </td>
                  <td className="px-5 py-3 text-end whitespace-nowrap">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-brand-600 hover:text-brand-700 font-semibold"
                    >
                      تعديل
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(article)}
                      className="ms-4 text-red-600 hover:text-red-700 font-semibold"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
