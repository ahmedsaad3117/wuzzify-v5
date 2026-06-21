import type {
  AdminUser,
  Article,
  ArticleInput,
  ArticleList,
  LoginResponse,
} from "./types";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4001/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...rest } = init;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(rest.body ? { "Content-Type": "application/json" } : {}),
    ...(rest.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...rest, headers });

  if (res.status === 204) return undefined as unknown as T;

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body?.message ?? detail;
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, detail);
  }
  return (await res.json()) as T;
}

// ── Public (server components) ───────────────────────────────
export const articlesApi = {
  list: (opts: { limit?: number; offset?: number; revalidate?: number } = {}) => {
    const qs = new URLSearchParams();
    if (opts.limit) qs.set("limit", String(opts.limit));
    if (opts.offset) qs.set("offset", String(opts.offset));
    return request<ArticleList>(`/articles${qs.size ? `?${qs}` : ""}`, {
      next: { revalidate: opts.revalidate ?? 60 },
    } as RequestInit);
  },

  getBySlug: (slug: string, revalidate = 60) =>
    request<Article>(`/articles/by-slug/${encodeURIComponent(slug)}`, {
      next: { revalidate },
    } as RequestInit),
};

// ── Auth ─────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>(`/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: (token: string) =>
    request<AdminUser>(`/auth/me`, { token, cache: "no-store" }),
};

// ── Admin (requires JWT) ─────────────────────────────────────
export const adminArticlesApi = {
  listAll: (token: string) =>
    request<ArticleList>(`/articles/admin/all`, { token, cache: "no-store" }),

  get: (token: string, id: string) =>
    request<Article>(`/articles/admin/${id}`, { token, cache: "no-store" }),

  create: (token: string, input: ArticleInput) =>
    request<Article>(`/articles/admin`, {
      token,
      method: "POST",
      body: JSON.stringify(input),
    }),

  update: (token: string, id: string, input: Partial<ArticleInput>) =>
    request<Article>(`/articles/admin/${id}`, {
      token,
      method: "PATCH",
      body: JSON.stringify(input),
    }),

  remove: (token: string, id: string) =>
    request<void>(`/articles/admin/${id}`, { token, method: "DELETE" }),
};
