import { ClipboardCheck, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const reasons = [
  {
    key: "quality",
    icon: Sparkles,
  },
  {
    key: "safety",
    icon: ShieldCheck,
  },
  {
    key: "contact",
    icon: ClipboardCheck,
  },
] as const;

export function WhyUs() {
  const t = useTranslations("aboutPage.why");

  return (
    <Section className="bg-secondary/40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="h-11 rounded-full bg-background px-5 text-sm"
          >
            {t("badge")}
          </Badge>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </div>

        <Separator className="my-10" />

        <div className="grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <Card key={reason.key} className="rounded-lg">
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <reason.icon className="size-5" />
                </div>
                <CardTitle className="leading-snug">
                  {t(`items.${reason.key}.title`)}
                </CardTitle>
                <CardDescription className="leading-6">
                  {t(`items.${reason.key}.description`)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
