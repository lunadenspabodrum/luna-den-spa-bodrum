import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

type StaticRoute = Readonly<{
  tr: string;
  en: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}>;

const staticRoutes: ReadonlyArray<StaticRoute> = [
  {
    tr: "/",
    en: "/en",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    tr: "/hakkimizda",
    en: "/en/about",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    tr: "/hizmetlerimiz",
    en: "/en/services",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    tr: "/iletisim",
    en: "/en/contact",
    priority: 0.8,
    changeFrequency: "monthly",
  },
];

function ensureLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(ensureLeadingSlash(path), siteConfig.url).toString();
}

function createLocalizedEntry({
  tr,
  en,
  priority,
  changeFrequency,
}: StaticRoute): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const trUrl = absoluteUrl(tr);
  const enUrl = absoluteUrl(en);
  const languages = {
    tr: trUrl,
    en: enUrl,
    "x-default": trUrl,
  };

  return [
    {
      url: trUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages,
      },
    },
    {
      url: enUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages,
      },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.flatMap((route) => createLocalizedEntry(route));
}
