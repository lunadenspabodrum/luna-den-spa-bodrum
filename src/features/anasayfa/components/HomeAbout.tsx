import Image from "next/image";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";

const highlights = [
  {
    key: "expert",
    icon: ShieldCheck,
  },
  {
    key: "calm",
    icon: Leaf,
  },
  {
    key: "personal",
    icon: Sparkles,
  },
] as const;

export function HomeAbout() {
  const t = useTranslations("home.about");

  return (
    <Section className="bg-background">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Badge
              asChild
              variant="outline"
              className="h-14 rounded-full border-primary/25 bg-background px-7 text-lg font-medium text-foreground shadow-sm transition hover:border-primary/45 hover:bg-secondary"
            >
              <Link href="/hakkimizda">{t("badge")}</Link>
            </Badge>

            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("description")}
            </p>

            <Button asChild className="mt-7 h-11 px-5">
              <Link href="/hakkimizda">
                {t("cta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Separator className="my-8" />

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <Card key={item.key} size="sm" className="rounded-lg">
                  <CardHeader>
                    <div className="mb-2 flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <item.icon className="size-4" />
                    </div>
                    <CardTitle>{t(`highlights.${item.key}.title`)}</CardTitle>
                    <CardDescription>
                      {t(`highlights.${item.key}.description`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div
            className="relative min-h-104 overflow-hidden rounded-lg bg-secondary ring-1 ring-border"
            aria-label={t("imageAlt")}
          >
            <Image
              src="/anasayfa-hakkimizda.png"
              alt={t("imageAlt")}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-image-overlay/10" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
