import Image from "next/image";

import { LanguageSwitcher } from "@/components/layout/controls/language-switcher";
import { PhoneContactDropdown } from "@/components/layout/controls/phone-contact-dropdown";
import { Container } from "@/components/layout/primitives/container";
import { siteConfig } from "@/data/site";
import { Link } from "@/i18n/navigation";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="grid h-24 grid-cols-[auto_1fr] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
        <Link
          href="/"
          prefetch={false}
          aria-label={`${siteConfig.name} anasayfa`}
          className="inline-flex w-fit items-center"
        >
          <Image
            src="/logo/logo.webp"
            alt={siteConfig.name}
            width={1580}
            height={1360}
            priority
            className="h-16 w-auto object-contain sm:h-20"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center justify-end gap-2">
          <PhoneContactDropdown />
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
