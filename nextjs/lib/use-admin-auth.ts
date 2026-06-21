"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "./api";
import {
  clearBrowserAuthToken,
  getBrowserAuthToken,
} from "./auth-token";
import type { AdminUser } from "./types";

interface AdminAuthState {
  token: string | null;
  admin: AdminUser | null;
  loading: boolean;
  logout: () => void;
}

/** Guards an admin page: redirects to /admin/login when not authenticated. */
export function useRequireAdmin(): AdminAuthState {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getBrowserAuthToken();
    if (!stored) {
      router.replace("/admin/login");
      return;
    }

    let active = true;
    authApi
      .me(stored)
      .then((user) => {
        if (!active) return;
        setToken(stored);
        setAdmin(user);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        clearBrowserAuthToken();
        router.replace("/admin/login");
      });

    return () => {
      active = false;
    };
  }, [router]);

  function logout() {
    clearBrowserAuthToken();
    router.replace("/admin/login");
  }

  return { token, admin, loading, logout };
}
