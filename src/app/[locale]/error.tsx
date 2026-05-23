"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          {t("eyebrow")}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            className="h-11 px-6"
          >
            {t("retry")}
          </Button>

          <Button asChild variant="outline" className="h-11 px-6">
            <Link href="/">{t("home")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
