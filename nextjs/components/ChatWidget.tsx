"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { pollChat, sendChatMessage } from "@/lib/chat";

type Msg = { role: "user" | "agent"; text: string };

export default function ChatWidget() {
  const t = useTranslations("Chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [error, setError] = useState("");

  const cursorRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const greetedRef = useRef(false);

  // Seed a local greeting the first time the panel opens.
  useEffect(() => {
    if (open && !greetedRef.current) {
      greetedRef.current = true;
      setMessages([{ role: "agent", text: t("greeting") }]);
    }
  }, [open, t]);

  // Auto-scroll to the latest message.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, awaiting]);

  const poll = useCallback(async () => {
    const { messages: replies, cursor } = await pollChat(cursorRef.current);
    if (replies.length) {
      cursorRef.current = cursor;
      setMessages((prev) => [
        ...prev,
        ...replies.map((r) => ({ role: "agent" as const, text: r.text })),
      ]);
      setAwaiting(false);
    }
  }, []);

  // Poll for agent replies while the panel is open.
  useEffect(() => {
    if (!open) return;
    poll();
    const id = setInterval(poll, 2500);
    return () => clearInterval(id);
  }, [open, poll]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setSending(true);
    setAwaiting(true);

    try {
      await sendChatMessage(text);
      // Reply arrives via polling.
    } catch {
      setAwaiting(false);
      setError(t("error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        aria-label={t("title")}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 end-5 z-50 size-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lift grid place-items-center transition"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open ? (
        <div className="fixed bottom-24 end-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-7rem))] bg-white border border-line rounded-2xl shadow-lift flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 bg-brand-600 text-white">
            <div className="font-bold text-[15px]">{t("title")}</div>
            <div className="text-[12px] text-white/80">{t("subtitle")}</div>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-wash">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "flex " + (m.role === "user" ? "justify-start" : "justify-end")
                }
              >
                <div
                  className={
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed whitespace-pre-wrap " +
                    (m.role === "user"
                      ? "bg-white border border-line text-ink"
                      : "bg-brand-600 text-white")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {awaiting ? (
              <div className="flex justify-end">
                <div className="bg-brand-600/80 text-white rounded-2xl px-3.5 py-2.5 inline-flex gap-1">
                  <span className="size-1.5 rounded-full bg-white/90 animate-pulse-dot" />
                  <span className="size-1.5 rounded-full bg-white/90 animate-pulse-dot [animation-delay:.2s]" />
                  <span className="size-1.5 rounded-full bg-white/90 animate-pulse-dot [animation-delay:.4s]" />
                </div>
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="px-4 py-2 text-[12.5px] text-red-600 bg-red-50">{error}</p>
          ) : null}

          {/* Composer */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-line flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 h-11 px-3 rounded-xs border border-line focus:outline-none focus:border-brand-600 text-[14px]"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="h-11 px-4 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold rounded-xs transition text-[14px]"
            >
              {t("send")}
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
