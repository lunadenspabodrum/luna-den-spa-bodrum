"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const conversionLabels = {
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL,
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL,
} as const;

type ConversionType = keyof typeof conversionLabels;

function isConversionType(value: string): value is ConversionType {
  return value === "whatsapp" || value === "phone";
}

function reportConversion(
  type: ConversionType,
  metadata: Record<string, string | undefined>,
  callback?: () => void
) {
  const label = conversionLabels[type];

  if (!googleAdsId || !label || !window.gtag) {
    callback?.();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${googleAdsId}/${label}`,
    event_category: type,
    event_label: [metadata.location, metadata.href].filter(Boolean).join(":"),
    event_callback: callback,
    event_timeout: 1000,
  });
}

export function GoogleAdsConversions() {
  useEffect(() => {
    if (!googleAdsId) {
      return;
    }

    function handleConversionClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[data-conversion]");

      if (!link) {
        return;
      }

      const conversionType = link.dataset.conversion;

      if (!conversionType || !isConversionType(conversionType)) {
        return;
      }

      const metadata = {
        location: link.dataset.conversionLocation,
        href: link.getAttribute("href") ?? undefined,
      };

      if (link.target === "_blank") {
        reportConversion(conversionType, metadata);
        return;
      }

      const href = link.href;

      if (!href) {
        reportConversion(conversionType, metadata);
        return;
      }

      event.preventDefault();

      let navigated = false;
      const navigate = () => {
        if (navigated) {
          return;
        }

        navigated = true;
        window.location.href = href;
      };

      reportConversion(conversionType, metadata, navigate);
      window.setTimeout(navigate, 1100);
    }

    document.addEventListener("click", handleConversionClick, true);

    return () => {
      document.removeEventListener("click", handleConversionClick, true);
    };
  }, []);

  if (!googleAdsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);}
          window.gtag('js', new Date());
          window.gtag('config', '${googleAdsId}');
        `}
      </Script>
    </>
  );
}
