import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import AboutPageWrapper from "@/features/anasayfa/containers/AboutPageWrapper";
import { buildPageMetadata, normalizeLocale } from "@/lib/metadata";

type HomeProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return buildPageMetadata({
    locale,
    title:
      normalizedLocale === "en"
        ? "Luna Den Spa Bodrum | Massage, Spa and Wellness"
        : "Luna Den Spa Bodrum | Masaj, Spa ve Wellness",
    description:
      normalizedLocale === "en"
        ? "Discover Luna Den Spa Bodrum for massage, spa, and wellness services in a calm and attentive atmosphere."
        : "Luna Den Spa Bodrum'da masaj, spa ve wellness hizmetleriyle sakin ve özenli bir deneyim yaşayın.",
    path: normalizedLocale === "en" ? "/en" : "/",
    image: "/hero.png",
  });
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <AboutPageWrapper />;
}
