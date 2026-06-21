export const AUTH_TOKEN_COOKIE = "wuzzify_cms_token";

export function setBrowserAuthToken(token: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(
    token,
  )}; Path=/; Max-Age=604800; SameSite=Lax`;
}

export function getBrowserAuthToken(): string | null {
  if (typeof document === "undefined") return null;

  const name = `${AUTH_TOKEN_COOKIE}=`;
  for (const rawPart of document.cookie.split(";")) {
    const part = rawPart.trim();
    if (part.startsWith(name)) {
      return decodeURIComponent(part.slice(name.length));
    }
  }
  return null;
}

export function clearBrowserAuthToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
