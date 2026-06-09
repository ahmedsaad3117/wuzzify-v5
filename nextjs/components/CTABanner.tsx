"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { Icon } from "./Icons";

export default function CTABanner() {
  const t = useTranslations("CTABanner");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage(t("errorEmpty"));
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setEmail("");
      setStatus("success");
      setMessage(t("success"));
    } catch {
      setStatus("error");
      setMessage(t("errorGeneric"));
    }
  }

  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="relative rounded-2xl overflow-hidden grad-bg p-12 lg:p-20">
          <Icon
            id="wmark"
            width={320}
            height={220}
            className="absolute -top-10 -end-10 text-white/15"
          />
          <div className="relative max-w-2xl">
            <h2 className="display text-[36px] lg:text-[52px] text-white">
              {t("title")}
            </h2>
            <p className="mt-5 text-[18px] leading-loose text-white/90 max-w-[52ch]">
              {t("body")}
            </p>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-wrap gap-3 max-w-md">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("emailPlaceholder")}
                required
                autoComplete="email"
                className="flex-1 min-w-[220px] h-12 px-4 rounded-xs bg-white border border-white/0 text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-600 text-[14px]"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="h-12 px-6 bg-ink hover:bg-brand-900 text-white text-[14px] font-semibold rounded-xs transition inline-flex items-center gap-2"
              >
                {status === "submitting" ? t("submitting") : t("submit")}
                {status !== "submitting" && <Icon id="i-arrow" />}
              </button>
            </form>
            {message ? (
              <p className="mt-3 text-[13px] text-white" role="status">
                {message}
              </p>
            ) : null}
            <p className="mt-3 text-[12.5px] text-white/75">
              {t("footnote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
