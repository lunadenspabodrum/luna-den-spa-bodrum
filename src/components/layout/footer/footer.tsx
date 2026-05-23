import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { navigationItems } from "@/data/navigation";
import { Link } from "@/i18n/navigation";

const footerNavigationItems = navigationItems.filter(
  (item) => item.href !== "/",
);

export function Footer() {
  const tNavigation = useTranslations("navigation");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div className="max-w-xl">
            <p className="text-sm leading-6 text-muted-foreground">
              {tFooter("description")}
            </p>
          </div>

          <nav aria-label="Footer menü" className="md:justify-self-end">
            <h2 className="text-base font-semibold text-foreground">
              {tFooter("quickLinks")}
            </h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {footerNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="transition hover:text-foreground"
                  >
                    {tNavigation(item.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          {tFooter("copyright")}
        </div>
      </Container>
    </footer>
  );
}
