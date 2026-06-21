"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { adminArticlesApi, ApiError } from "@/lib/api";
import type { Article, ArticleInput, ArticleStatus } from "@/lib/types";

// TipTap touches the DOM — load it client-side only.
const TiptapEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

const inputClass =
  "w-full h-11 px-3 rounded-xs border border-line focus:outline-none focus:border-brand-600 text-[14px]";
const labelClass = "block text-[13px] font-semibold mb-1.5 mt-5";

export default function ArticleForm({
  token,
  article,
}: {
  token: string;
  article?: Article;
}) {
  const router = useRouter();
  const editing = Boolean(article);

  const [titleAr, setTitleAr] = useState(article?.title_ar ?? "");
  const [titleEn, setTitleEn] = useState(article?.title_en ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerptAr, setExcerptAr] = useState(article?.excerpt_ar ?? "");
  const [excerptEn, setExcerptEn] = useState(article?.excerpt_en ?? "");
  const [coverUrl, setCoverUrl] = useState(article?.cover_url ?? "");
  const [status, setStatus] = useState<ArticleStatus>(
    article?.status ?? "draft",
  );
  const [contentAr, setContentAr] = useState(article?.content_ar ?? "");
  const [contentEn, setContentEn] = useState(article?.content_en ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!titleAr.trim()) {
      setError("العنوان بالعربية مطلوب.");
      return;
    }

    const payload: ArticleInput = {
      title_ar: titleAr.trim(),
      title_en: titleEn.trim() || undefined,
      slug: slug.trim() || undefined,
      excerpt_ar: excerptAr.trim() || undefined,
      excerpt_en: excerptEn.trim() || undefined,
      cover_url: coverUrl.trim() || undefined,
      content_ar: contentAr,
      content_en: contentEn || undefined,
      status,
    };

    setSaving(true);
    try {
      if (editing && article) {
        await adminArticlesApi.update(token, article.id, payload);
      } else {
        await adminArticlesApi.create(token, payload);
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "تعذّر الحفظ. حاول مجدداً.",
      );
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[820px]">
      <div className="grid sm:grid-cols-2 gap-x-5">
        <div>
          <label className={labelClass}>العنوان (عربي) *</label>
          <input
            className={inputClass}
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>العنوان (إنجليزي)</label>
          <input
            className={`${inputClass} text-end`}
            dir="ltr"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-5">
        <div>
          <label className={labelClass}>الرابط (slug)</label>
          <input
            className={`${inputClass} text-end`}
            dir="ltr"
            placeholder="يُشتق من العنوان تلقائياً"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>رابط صورة الغلاف</label>
          <input
            className={`${inputClass} text-end`}
            dir="ltr"
            placeholder="https://…"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </div>
      </div>

      <label className={labelClass}>مقتطف (عربي)</label>
      <textarea
        className={`${inputClass} h-auto py-2.5`}
        rows={2}
        value={excerptAr}
        onChange={(e) => setExcerptAr(e.target.value)}
      />

      <label className={labelClass}>مقتطف (إنجليزي)</label>
      <textarea
        className={`${inputClass} h-auto py-2.5 text-end`}
        dir="ltr"
        rows={2}
        value={excerptEn}
        onChange={(e) => setExcerptEn(e.target.value)}
      />

      <label className={labelClass}>المحتوى (عربي)</label>
      <TiptapEditor value={contentAr} onChange={setContentAr} />

      <label className={labelClass}>المحتوى (إنجليزي)</label>
      <TiptapEditor
        value={contentEn}
        onChange={setContentEn}
        placeholder="Write the English content here..."
      />

      <label className={labelClass}>الحالة</label>
      <select
        className={inputClass}
        value={status}
        onChange={(e) => setStatus(e.target.value as ArticleStatus)}
      >
        <option value="draft">مسودة</option>
        <option value="published">منشور</option>
      </select>

      {error ? (
        <p className="mt-5 text-[13px] text-red-600">{error}</p>
      ) : null}

      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="h-11 px-6 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xs transition"
        >
          {saving ? "جارٍ الحفظ..." : editing ? "حفظ التعديلات" : "إنشاء المقال"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="h-11 px-6 border border-line hover:border-brand-300 font-semibold rounded-xs transition"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
