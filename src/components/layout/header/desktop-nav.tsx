"use client";

import { useTranslations } from "next-intl";

import { navigationItems } from "@/data/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  return (
    <nav
      aria-label="Ana menü"
      className="hidden items-center justify-center justify-self-center lg:flex"
    >
      <ul className="flex items-center gap-1 rounded-full border border-border bg-background/80 p-1 shadow-sm backdrop-blur">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {t(item.titleKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
