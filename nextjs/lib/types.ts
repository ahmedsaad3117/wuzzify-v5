export type ArticleStatus = "draft" | "published";

export interface Article {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string | null;
  excerpt_ar: string | null;
  excerpt_en: string | null;
  content_ar: string;
  content_en: string | null;
  cover_url: string | null;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleList {
  items: Article[];
  total: number;
}

export interface ArticleInput {
  slug?: string;
  title_ar: string;
  title_en?: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  content_ar?: string;
  content_en?: string;
  cover_url?: string;
  status?: ArticleStatus;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}
