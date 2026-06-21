import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Pin the tracing root to this app (several stray lockfiles exist higher up).
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default withNextIntl(nextConfig);
