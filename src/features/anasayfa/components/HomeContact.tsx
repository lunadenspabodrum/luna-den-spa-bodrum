import Image from "next/image";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const contactPhoneHref = "tel:+905364009223";
const whatsappHref = "https://wa.me/905364009223";

export function HomeContact() {
  const t = useTranslations("home.contact");

  return (
    <Section className="bg-background">
      <Container>
        <Card className="relative overflow-hidden rounded-lg bg-card">
          <Image
            src="/anasayfa-iletisim.png"
            alt=""
            fill
            aria-hidden="true"
            sizes="100vw"
            className="scale-105 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-r from-card/88 via-card/58 to-card/18" />
          <div className="absolute inset-0 bg-primary/3" />

          <div className="relative z-10 grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <CardHeader className="gap-4 p-0">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="size-5" />
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                  {t("eyebrow")}
                </p>
                <CardTitle className="mt-3 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
                  {t("title")}
                </CardTitle>
                <CardDescription className="mt-4 max-w-2xl text-base leading-7">
                  {t("description")}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 p-0 sm:flex-row lg:flex-col lg:items-stretch">
              <Button asChild className="h-11 px-5">
                <Link href="/iletisim">
                  {t("contactPage")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-11 px-5">
                <a href={contactPhoneHref}>
                  {t("call")}
                  <Phone className="size-4" />
                </a>
              </Button>

              <Button asChild variant="outline" className="h-11 px-5">
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  {t("whatsapp")}
                  <MessageCircle className="size-4" />
                </a>
              </Button>
            </CardContent>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
