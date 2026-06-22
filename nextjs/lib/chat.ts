const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4001/api/v1";

const SESSION_COOKIE = "wuzzify_chat_session";

export interface ChatReply {
  seq: number;
  role: "agent";
  text: string;
  at: string;
}

export function getChatSessionId(): string | null {
  if (typeof document === "undefined") return null;
  const name = `${SESSION_COOKIE}=`;
  for (const part of document.cookie.split(";")) {
    const p = part.trim();
    if (p.startsWith(name)) return decodeURIComponent(p.slice(name.length));
  }
  return null;
}

function setChatSessionId(id: string): void {
  if (typeof document === "undefined") return;
  // 7-day session cookie
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(
    id,
  )}; Path=/; Max-Age=604800; SameSite=Lax`;
}

export async function sendChatMessage(
  message: string,
): Promise<{ sessionId: string }> {
  const sessionId = getChatSessionId() ?? undefined;
  const res = await fetch(`${BASE}/chat/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, message }),
  });
  if (!res.ok) throw new Error(`send failed: ${res.status}`);
  const data = (await res.json()) as { sessionId: string };
  if (data.sessionId) setChatSessionId(data.sessionId);
  return data;
}

export async function pollChat(
  after: number,
): Promise<{ messages: ChatReply[]; cursor: number }> {
  const sessionId = getChatSessionId();
  if (!sessionId) return { messages: [], cursor: after };
  const res = await fetch(
    `${BASE}/chat/poll?sessionId=${encodeURIComponent(
      sessionId,
    )}&after=${after}`,
    { cache: "no-store" },
  );
  if (!res.ok) return { messages: [], cursor: after };
  return (await res.json()) as { messages: ChatReply[]; cursor: number };
}
