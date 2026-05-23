import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import AboutPageWrapper from "@/features/hakkımızda/containers/AboutPageWrapper";
import { buildPageMetadata, localizedPath, normalizeLocale } from "@/lib/metadata";

type AboutPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return buildPageMetadata({
    locale,
    title:
      normalizedLocale === "en"
        ? "About Luna Den Spa Bodrum | Massage, Spa and Wellness"
        : "Hakkımızda | Luna Den Spa Bodrum",
    description:
      normalizedLocale === "en"
        ? "Learn about Luna Den Spa Bodrum, offering massage, spa, and wellness experiences in a calm and attentive atmosphere."
        : "Luna Den Spa Bodrum hakkında bilgi alın. Masaj, spa ve wellness deneyimini sakin ve özenli bir atmosferde sunuyoruz.",
    path: localizedPath(locale, "/hakkimizda", "/about"),
    image: "/hakkimizda/hakkimizda.png",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <AboutPageWrapper />;
}
