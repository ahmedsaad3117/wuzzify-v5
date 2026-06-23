import { NextRequest, NextResponse } from "next/server";

// Read at request time so the running server's env is always used
// (these are server-only runtime vars, never inlined at build).
export const dynamic = "force-dynamic";

function buildTelegramMessage(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  return [
    "📩 New Contact Form",
    `👤 Name: ${name || "-"}`,
    `📧 Email: ${email}`,
    `📱 Phone: ${phone}`,
    `💬 Message: ${message || "-"}`,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ?? process.env.BOT_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ?? process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    );
  }

  if (!phone) {
    return NextResponse.json(
      { error: "Phone is required." },
      { status: 400 }
    );
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: buildTelegramMessage(name, email, phone, message),
      }),
    }
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { error: "Failed to send Telegram message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}