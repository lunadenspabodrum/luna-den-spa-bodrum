"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const galleryImages = [
  "/hakkimizda/sube-gorseli-1.jpg",
  "/hakkimizda/sube-gorseli-2.jpeg",
  "/hakkimizda/sube-gorseli-3.jpg",
  "/hakkimizda/sube-gorseli-4.png",
  "/hakkimizda/sube-gorseli-5.jpg",
] as const;

export function BranchGallery() {
  const t = useTranslations("aboutPage.gallery");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const activeImage =
    activeImageIndex === null ? null : galleryImages[activeImageIndex];

  const closeGallery = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    });
  }, []);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    });
  }, []);

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, closeGallery, showNextImage, showPreviousImage]);

  return (
    <Section className="bg-background">
      <Container>
        <div className="max-w-4xl">
          <div>
            <Badge
              variant="outline"
              className="h-11 rounded-full bg-background px-5 text-sm"
            >
              {t("badge")}
            </Badge>

            <h2 className="mt-5 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="mt-10 snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="grid auto-cols-[82vw] grid-flow-col gap-4 sm:auto-cols-[46vw] lg:auto-cols-[340px] xl:auto-cols-[390px]">
            {galleryImages.map((src, index) => (
              <Card key={src} className="snap-start rounded-lg p-0">
                <CardContent className="p-0">
                  <button
                    type="button"
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={t("open", { index: index + 1 })}
                  >
                    <Image
                      src={src}
                      alt={t("imageAlt", { index: index + 1 })}
                      fill
                      sizes="(min-width: 1280px) 390px, (min-width: 1024px) 340px, (min-width: 640px) 46vw, 82vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 transition group-hover:bg-primary/0" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                      <Images className="size-3.5" />
                      {index + 1} / {galleryImages.length}
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {activeImage &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 text-white sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label={t("dialogLabel")}
            onClick={closeGallery}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="absolute right-4 top-4 z-20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                closeGallery();
              }}
              aria-label={t("close")}
            >
              <X className="size-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 hover:text-white md:left-6"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              aria-label={t("previous")}
            >
              <ChevronLeft className="size-6" />
            </Button>

            <div
              className="relative h-[72dvh] w-full max-w-6xl overflow-hidden rounded-lg bg-white/5 md:h-[82dvh]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={t("imageAlt", { index: (activeImageIndex ?? 0) + 1 })}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 hover:text-white md:right-6"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              aria-label={t("next")}
            >
              <ChevronRight className="size-6" />
            </Button>

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {(activeImageIndex ?? 0) + 1} / {galleryImages.length}
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
}
