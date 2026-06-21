import type { Article } from "./types";

/** Pick the locale-appropriate field, falling back to Arabic. */
export function localizedArticle(article: Article, locale: string) {
  const en = locale === "en";
  return {
    title: (en && article.title_en) || article.title_ar,
    excerpt: (en && article.excerpt_en) || article.excerpt_ar || "",
    content: (en && article.content_en) || article.content_ar || "",
  };
}

export function formatArticleDate(iso: string | null, locale: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
