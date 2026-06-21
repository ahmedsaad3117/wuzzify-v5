import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IconSprite from "@/components/Icons";
import { articlesApi, ApiError } from "@/lib/api";
import { formatArticleDate, localizedArticle } from "@/lib/article-i18n";
import type { Article } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Articles" });
  return { title: `${t("title")} — Wuzzify`, description: t("subtitle") };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Articles");

  let articles: Article[] = [];
  try {
    const data = await articlesApi.list({ limit: 50 });
    articles = data.items;
  } catch (err) {
    if (!(err instanceof ApiError)) {
      // Backend unreachable — render an empty state rather than crashing the page.
      articles = [];
    }
  }

  const base = locale === "ar" ? "" : `/${locale}`;

  return (
    <>
      <IconSprite />
      <Nav />
      <main>
        <section className="bg-wash border-y border-line py-20 lg:py-24">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-white border border-line px-2.5 py-1 rounded-xs">
                {t("tag")}
              </span>
              <h1 className="display text-[36px] lg:text-[48px] mt-4">
                {t("title")}
              </h1>
              <p className="mt-5 text-[16.5px] leading-loose text-ink-2 max-w-[60ch]">
                {t("subtitle")}
              </p>
            </div>

            {articles.length === 0 ? (
              <div className="bg-white border border-line rounded-xl p-10 text-center text-ink-2">
                {t("empty")}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => {
                  const l = localizedArticle(article, locale);
                  return (
                    <Link
                      key={article.id}
                      href={`${base}/articles/${article.slug}`}
                      className="group bg-white border border-line rounded-xl overflow-hidden hover:shadow-lift transition flex flex-col"
                    >
                      {article.cover_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={article.cover_url}
                          alt=""
                          className="w-full h-44 object-cover"
                        />
                      ) : (
                        <div className="w-full h-44 grad-bg" />
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="font-bold text-[18px] leading-snug group-hover:text-brand-700 transition">
                          {l.title}
                        </h2>
                        {l.excerpt ? (
                          <p className="mt-3 text-[14px] leading-loose text-ink-2 line-clamp-3">
                            {l.excerpt}
                          </p>
                        ) : null}
                        <div className="mt-auto pt-5 flex items-center justify-between text-[12.5px] text-ink-3">
                          <span className="num">
                            {formatArticleDate(article.published_at, locale)}
                          </span>
                          <span className="font-semibold text-brand-600">
                            {t("readMore")} ←
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
