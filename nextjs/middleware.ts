import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes, the /admin dashboard, Next internals, and static files
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
  ],
};
