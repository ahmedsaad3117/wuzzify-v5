import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IconSprite from "@/components/Icons";
import { articlesApi, ApiError } from "@/lib/api";
import { formatArticleDate, localizedArticle } from "@/lib/article-i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const article = await articlesApi.getBySlug(slug);
    const l = localizedArticle(article, locale);
    return { title: `${l.title} — Wuzzify`, description: l.excerpt || undefined };
  } catch {
    return { title: "Wuzzify" };
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Articles");

  let article;
  try {
    article = await articlesApi.getBySlug(slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const l = localizedArticle(article, locale);
  const base = locale === "ar" ? "" : `/${locale}`;

  return (
    <>
      <IconSprite />
      <Nav />
      <main>
        <article className="py-16 lg:py-24">
          <div className="max-w-[760px] mx-auto px-6 lg:px-10">
            <Link
              href={`${base}/articles`}
              className="text-[13px] font-semibold text-brand-600 hover:text-brand-700 transition"
            >
              → {t("backToList")}
            </Link>

            <h1 className="display text-[32px] lg:text-[44px] mt-6 leading-tight">
              {l.title}
            </h1>

            <p className="num mt-4 text-[13px] text-ink-3">
              {t("publishedOn")}{" "}
              {formatArticleDate(article.published_at, locale)}
            </p>

            {article.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.cover_url}
                alt=""
                className="w-full rounded-xl border border-line mt-8 object-cover"
              />
            ) : null}

            <div
              className="article-body mt-8"
              dangerouslySetInnerHTML={{ __html: l.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
