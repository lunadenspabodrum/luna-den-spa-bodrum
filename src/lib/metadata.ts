import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

type Locale = "tr" | "en";

type BuildPageMetadataParams = Readonly<{
  locale: string;
  title: string;
  description: string;
  path: string;
  image?: string;
  alternates?: Readonly<{
    tr: string;
    en: string;
  }>;
}>;

export function normalizeLocale(locale: string): Locale {
  return locale === "en" ? "en" : "tr";
}

function ensureLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeEnglishPath(path: string) {
  const normalizedPath = ensureLeadingSlash(path);

  if (normalizedPath === "/en" || normalizedPath.startsWith("/en/")) {
    return normalizedPath;
  }

  return `/en${normalizedPath}`;
}

export function localizedPath(locale: string, trPath: string, enPath: string) {
  return normalizeLocale(locale) === "en"
    ? normalizeEnglishPath(enPath)
    : ensureLeadingSlash(trPath);
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(ensureLeadingSlash(path), siteConfig.url).toString();
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path,
  image = "/logo/logo.webp",
  alternates,
}: BuildPageMetadataParams): Metadata {
  const normalizedLocale = normalizeLocale(locale);
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates
        ? {
            tr: absoluteUrl(alternates.tr),
            en: absoluteUrl(alternates.en),
            "x-default": absoluteUrl(alternates.tr),
          }
        : undefined,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
      locale: normalizedLocale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
