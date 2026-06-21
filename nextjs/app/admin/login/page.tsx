"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { getBrowserAuthToken, setBrowserAuthToken } from "@/lib/auth-token";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getBrowserAuthToken()) router.replace("/admin");
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await authApi.login(email.trim(), password);
      setBrowserAuthToken(token);
      router.replace("/admin");
    } catch {
      setError("بيانات الدخول غير صحيحة.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-line rounded-xl shadow-card p-8"
      >
        <div className="text-center mb-8">
          <span className="font-extrabold text-[22px] text-brand-700">
            وُظيفاي
          </span>
          <p className="mt-2 text-[13px] text-ink-3">لوحة تحكم المقالات</p>
        </div>

        <label className="block text-[13px] font-semibold mb-1.5">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          dir="ltr"
          className="w-full h-11 px-3 rounded-xs border border-line focus:outline-none focus:border-brand-600 text-[14px] text-end mb-4"
        />

        <label className="block text-[13px] font-semibold mb-1.5">
          كلمة المرور
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full h-11 px-3 rounded-xs border border-line focus:outline-none focus:border-brand-600 text-[14px] mb-4"
        />

        {error ? (
          <p className="text-[13px] text-red-600 mb-4">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold rounded-xs transition"
        >
          {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
