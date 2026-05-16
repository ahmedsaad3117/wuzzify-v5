import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? process.env.BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? process.env.CHAT_ID;

function buildTelegramMessage(name: string, email: string, message: string) {
  return [
    "📩 New Contact Form",
    `👤 Name: ${name || "-"}`,
    `📧 Email: ${email}`,
    `💬 Message: ${message || "-"}`,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email) {
    return NextResponse.json(
      { error: "Email is required." },
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
        text: buildTelegramMessage(name, email, message),
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