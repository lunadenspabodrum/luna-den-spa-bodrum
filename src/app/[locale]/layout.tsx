import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer/footer";
import { Header } from "@/components/layout/header/header";
import { GoogleAdsConversions } from "@/components/analytics/google-ads-conversions";
import { PageTransition } from "@/components/providers/page-transition";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import "../../style/globals.css";

const fontVariables = {
  "--font-geist-sans":
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as CSSProperties;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={fontVariables}>
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <GoogleAdsConversions />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
