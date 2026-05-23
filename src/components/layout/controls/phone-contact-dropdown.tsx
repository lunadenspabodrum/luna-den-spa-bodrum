"use client";

import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const phoneNumber = "+90 536 400 9223";
const phoneHref = "tel:+905364009223";
const whatsappHref = "https://wa.me/905364009223";

export function PhoneContactDropdown() {
  const t = useTranslations("header.phone");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-full px-3 text-xs sm:px-4 sm:text-sm"
          aria-label={t("triggerLabel", { phone: phoneNumber })}
        >
          <Phone className="size-4" />
          <span className="hidden min-[390px]:inline">{phoneNumber}</span>
          <ChevronDown className="hidden size-3.5 sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a href={phoneHref}>
            <Phone className="size-4" />
            <span>{t("call")}</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            <MessageCircle className="size-4" />
            <span>{t("whatsapp")}</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
