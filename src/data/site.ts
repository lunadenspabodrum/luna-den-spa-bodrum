const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunadenspabodrum.com";

export const siteConfig = {
  name: "Luna Den Spa Bodrum",
  url: siteUrl.replace(/\/$/, ""),
  description:
    "Luna Den Spa Bodrum, masaj, spa ve wellness hizmetlerini sakin ve özenli bir atmosferde sunar.",
} as const;
