import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import ContactPageWrapper from "@/features/iletisim/containers/ContactPageWrapper";
import { buildPageMetadata, localizedPath, normalizeLocale } from "@/lib/metadata";

type ContactPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return buildPageMetadata({
    locale,
    title:
      normalizedLocale === "en"
        ? "Contact | Luna Den Spa Bodrum"
        : "İletişim | Luna Den Spa Bodrum",
    description:
      normalizedLocale === "en"
        ? "Reach Luna Den Spa Bodrum for address, map, phone, WhatsApp, and appointment details."
        : "Luna Den Spa Bodrum adres, harita, telefon, WhatsApp ve randevu detayları için bize ulaşın.",
    path: localizedPath(locale, "/iletisim", "/contact"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContactPageWrapper />;
}
