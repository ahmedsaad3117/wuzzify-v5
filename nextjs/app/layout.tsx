import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "وُظيفاي — موظفون بالذكاء الاصطناعي",
  description:
    "استبدل ٥ موظفين بوكيل ذكاء اصطناعي واحد. وكلاء وُظيفاي يديرون المبيعات والدعم والتسويق والمستندات على مدار الساعة.",
  metadataBase: new URL("https://wuzzify.ai"),
  openGraph: {
    title: "وُظيفاي — موظفون بالذكاء الاصطناعي",
    description: "خمسة وكلاء. صفر توظيف. ٢٤/٧.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="bg-white text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
