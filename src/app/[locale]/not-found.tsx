import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFoundPage");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
          404
        </p>

        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11 px-6">
            <Link href="/">{t("home")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
