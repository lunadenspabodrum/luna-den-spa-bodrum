import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const address = "Merkez Mah, Tilkicik Cd. No:182 Sk No:3, 48990 Bodrum/Muğla";
const phoneNumber = "+90 536 400 9223";
const phoneHref = "tel:+905364009223";
const whatsappHref = "https://wa.me/905364009223";
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=Merkez%20Mah%2C%20Tilkicik%20Cd.%20No%3A182%20Sk%20No%3A3%2C%2048990%20Bodrum%2FMu%C4%9Fla";
const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3181.480619352786!2d27.308915199999998!3d37.1174791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14be71443d2b9edd%3A0x38b9de9d641eca79!2sThe%20Sign%20Highlight%20Hotel!5e0!3m2!1str!2str!4v1779538444618!5m2!1str!2str";

export function ContactOverview() {
  const t = useTranslations("contactPage");

  return (
    <Section className="bg-background">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="h-11 rounded-full bg-background px-5 text-sm"
          >
            {t("badge")}
          </Badge>

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>

          <p className="mt-6 text-base leading-8 text-foreground/75 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <Card className="flex h-full rounded-lg">
            <CardHeader>
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                {t("branch.title")}
              </CardTitle>
              <CardDescription className="text-base leading-7 text-foreground/70">
                {t("branch.description")}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              <Separator className="mb-5" />
              <dl className="grid gap-5 text-sm">
                <div>
                  <dt className="font-medium text-foreground">
                    {t("labels.address")}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-foreground/80">
                    {address}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">
                    {t("labels.phone")}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-foreground/80">
                    {phoneNumber}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                <Button asChild className="h-11 px-5">
                  <a href={phoneHref}>
                    {t("actions.call")}
                    <Phone className="size-4" />
                  </a>
                </Button>

                <Button asChild variant="outline" className="h-11 px-5">
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    {t("actions.whatsapp")}
                    <MessageCircle className="size-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 px-5 sm:col-span-2"
                >
                  <a href={directionsHref} target="_blank" rel="noreferrer">
                    {t("actions.directions")}
                    <Navigation className="size-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="h-80 gap-0 rounded-lg p-0 md:h-96 lg:h-full">
            <CardContent className="h-full p-0">
              <iframe
                src={mapEmbedSrc}
                title={t("map.title")}
                className="block size-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
