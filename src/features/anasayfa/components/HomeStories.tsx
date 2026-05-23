"use client";

import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Container } from "@/components/layout/primitives/container";
import { Section } from "@/components/layout/primitives/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SupportedLocale = "tr" | "en";

type LocalizedText = Readonly<Record<SupportedLocale, string>>;

type Story = Readonly<{
  name: string;
  initials: string;
  message: LocalizedText;
  service: LocalizedText;
  avatarClassName: string;
}>;

const storyDuration = 6500;

const storyLabels: Readonly<
  Record<
    SupportedLocale,
    {
      close: string;
      googleReview: string;
      next: string;
      open: string;
      previous: string;
      stars: string;
      verified: string;
    }
  >
> = {
  tr: {
    close: "Yorumu kapat",
    googleReview: "Google yorumu",
    next: "Sonraki yorum",
    open: "yorumunu aç",
    previous: "Önceki yorum",
    stars: "5 yıldız",
    verified: "Doğrulanmış yorum",
  },
  en: {
    close: "Close review",
    googleReview: "Google review",
    next: "Next review",
    open: "open review",
    previous: "Previous review",
    stars: "5 stars",
    verified: "Verified review",
  },
};

const stories: ReadonlyArray<Story> = [
  {
    name: "Buse Burma",
    initials: "BB",
    service: {
      tr: "Bali Masajı",
      en: "Balinese Massage",
    },
    message: {
      tr: "Bodrum'da tatilimin en sakin anıydı. Masaj sonrası hem bedenim hem zihnim gerçekten hafifledi.",
      en: "It was the calmest moment of my holiday in Bodrum. After the massage, both my body and mind felt genuinely lighter.",
    },
    avatarClassName: "bg-[#9fcaf0] text-[#174963]",
  },
  {
    name: "Buğrahan Umay Şafak",
    initials: "BU",
    service: {
      tr: "Klasik Masaj",
      en: "Classic Massage",
    },
    message: {
      tr: "Profesyonel ekip, tertemiz alanlar ve çok iyi planlanmış bir seans. Bel gerginliğim belirgin şekilde azaldı.",
      en: "A professional team, spotless rooms, and a very well-planned session. The tension in my lower back noticeably eased.",
    },
    avatarClassName: "bg-[#8fd0ea] text-[#15526b]",
  },
  {
    name: "Mert Demirhan",
    initials: "MD",
    service: {
      tr: "Aromaterapi",
      en: "Aromatherapy",
    },
    message: {
      tr: "Koku, müzik ve bakım ritmi çok dengeliydi. Kendimi özel hissettiren dingin bir deneyim oldu.",
      en: "The scent, music, and treatment rhythm were beautifully balanced. It was a calm experience that made me feel cared for.",
    },
    avatarClassName: "bg-[#f4c8d8] text-[#653247]",
  },
  {
    name: "Emirhan Aydın",
    initials: "EA",
    service: {
      tr: "Derin Doku",
      en: "Deep Tissue",
    },
    message: {
      tr: "Spor sonrası sertliklerim için gittim. Uygulama güçlü ama kontrollüydü, terapist her adımı çok iyi yönetti.",
      en: "I went for post-workout stiffness. The pressure was strong but controlled, and the therapist guided every step very well.",
    },
    avatarClassName: "bg-[#80beb4] text-[#174f49]",
  },
  {
    name: "Kaan Yıldız",
    initials: "KY",
    service: {
      tr: "Spa Ritüeli",
      en: "Spa Ritual",
    },
    message: {
      tr: "Gün batımından önce aldığım seans bütün günün yorgunluğunu aldı. Bodrum atmosferine çok yakışan bir yer.",
      en: "My session before sunset took away the tiredness of the whole day. It is a place that fits the Bodrum atmosphere so well.",
    },
    avatarClassName: "bg-[#f7f0dc] text-[#655d4f]",
  },
  {
    name: "Begüm Er",
    initials: "BE",
    service: {
      tr: "Wellness Bakımı",
      en: "Wellness Care",
    },
    message: {
      tr: "Rezervasyondan çıkışa kadar her şey sakindi. Kendime ayırdığım en iyi molalardan biri oldu.",
      en: "Everything was calm from reservation to checkout. It became one of the best breaks I have taken for myself.",
    },
    avatarClassName: "bg-[#81d2c3] text-[#18574f]",
  },
  {
    name: "Deniz Arman",
    initials: "DA",
    service: {
      tr: "Medikal Masaj",
      en: "Medical Massage",
    },
    message: {
      tr: "Boyun ve omuz ağrılarım için gittim. Nokta atışı uygulama ve sakin anlatım sayesinde çok rahatladım.",
      en: "I went for neck and shoulder pain. The focused treatment and calm explanation helped me relax deeply.",
    },
    avatarClassName: "bg-[#d8c5a7] text-[#65451f]",
  },
  {
    name: "Elif Sönmez",
    initials: "ES",
    service: {
      tr: "Cilt Bakımı",
      en: "Skin Care",
    },
    message: {
      tr: "Cildim seans sonrası çok daha canlı görünüyordu. Kullanılan ürünler ve ortamın temizliği güven verdi.",
      en: "My skin looked much more vibrant after the session. The products used and the cleanliness of the space gave me confidence.",
    },
    avatarClassName: "bg-[#d9b7ee] text-[#56306c]",
  },
  {
    name: "Kerem Uzun",
    initials: "KU",
    service: {
      tr: "Spor Masajı",
      en: "Sports Massage",
    },
    message: {
      tr: "Antrenman sonrası toparlanmak için tercih ettim. Baskı seviyesi tam istediğim gibiydi.",
      en: "I chose it for recovery after training. The pressure level was exactly what I wanted.",
    },
    avatarClassName: "bg-[#aec9a1] text-[#335728]",
  },
  {
    name: "Lara Ekin",
    initials: "LE",
    service: {
      tr: "Çift Masajı",
      en: "Couples Massage",
    },
    message: {
      tr: "Rezervasyon çok kolaydı, seans boyunca hiçbir detay aceleye gelmedi. Çok zarif bir deneyimdi.",
      en: "Booking was very easy, and no detail felt rushed during the session. It was a very refined experience.",
    },
    avatarClassName: "bg-[#f0b6aa] text-[#713b31]",
  },
  {
    name: "Ozan Bora",
    initials: "OB",
    service: {
      tr: "Refleksoloji",
      en: "Reflexology",
    },
    message: {
      tr: "Kısa bir mola için uğradım ama etkisi tüm güne yayıldı. Personel çok ilgili ve ölçülüydü.",
      en: "I stopped by for a short break, but the effect lasted all day. The staff was attentive and thoughtful.",
    },
    avatarClassName: "bg-[#9cb6df] text-[#263f67]",
  },
  {
    name: "Nil Karaca",
    initials: "NK",
    service: {
      tr: "Hamam Ritüeli",
      en: "Hammam Ritual",
    },
    message: {
      tr: "Bodrum'da kendime ayırdığım en keyifli saatti. Hem ferah hem çok özenli hissettirdi.",
      en: "It was the most enjoyable hour I set aside for myself in Bodrum. It felt both refreshing and very thoughtful.",
    },
    avatarClassName: "bg-[#a6d8cd] text-[#25564f]",
  },
];

export function HomeStories() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasStoryHistoryEntryRef = useRef(false);

  const contentLocale: SupportedLocale = locale === "en" ? "en" : "tr";
  const labels = storyLabels[contentLocale];
  const activeStory = stories[activeIndex];

  const closeStory = useCallback(() => {
    setProgress(0);

    if (hasStoryHistoryEntryRef.current) {
      window.history.back();
      return;
    }

    setIsOpen(false);
  }, []);

  const openStory = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setIsOpen(true);
  }, []);

  const showPreviousStory = useCallback(() => {
    setProgress(0);
    setActiveIndex((current) =>
      current === 0 ? stories.length - 1 : current - 1,
    );
  }, []);

  const showNextStory = useCallback(() => {
    setProgress(0);

    if (activeIndex === stories.length - 1) {
      closeStory();
      return;
    }

    setActiveIndex(activeIndex + 1);
  }, [activeIndex, closeStory]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!hasStoryHistoryEntryRef.current) {
      window.history.pushState(
        {
          ...window.history.state,
          lunaStoryOpen: true,
        },
        "",
        window.location.href,
      );
      hasStoryHistoryEntryRef.current = true;
    }

    function handlePopState() {
      if (!hasStoryHistoryEntryRef.current) {
        return;
      }

      hasStoryHistoryEntryRef.current = false;
      setProgress(0);
      setIsOpen(false);
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const startedAt = performance.now();
    let animationFrame = 0;

    function updateProgress(timestamp: number) {
      const elapsed = timestamp - startedAt;
      const nextProgress = Math.min((elapsed / storyDuration) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        showNextStory();
        return;
      }

      animationFrame = window.requestAnimationFrame(updateProgress);
    }

    animationFrame = window.requestAnimationFrame(updateProgress);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeIndex, isOpen, showNextStory]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeStory();
      }

      if (event.key === "ArrowLeft") {
        showPreviousStory();
      }

      if (event.key === "ArrowRight") {
        showNextStory();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeStory, isOpen, showNextStory, showPreviousStory]);

  return (
    <Section spacing="sm" className="bg-background">
      <Container>
        <div className="-my-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-start justify-between lg:min-w-0">
            {stories.map((story, index) => (
              <button
                key={story.name}
                type="button"
                onClick={() => openStory(index)}
                className="group grid w-16 justify-items-center gap-1.5 text-center outline-none sm:w-[72px]"
                aria-label={`${story.name} ${labels.open}`}
              >
                <span className="rounded-full bg-gradient-to-tr from-[#f0b347] via-[#d94b92] to-[#7557d8] p-[2px] transition group-hover:scale-105 group-focus-visible:ring-3 group-focus-visible:ring-ring/40">
                  <span className="block rounded-full bg-background p-[3px]">
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full text-lg font-semibold sm:size-14 sm:text-xl",
                        story.avatarClassName,
                      )}
                    >
                      {story.initials}
                    </span>
                  </span>
                </span>
                <span className="max-w-full truncate text-xs font-semibold text-muted-foreground sm:text-sm">
                  {story.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  key="story-dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${activeStory.name} ${labels.googleReview}`}
                  onClick={closeStory}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-3 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    onClick={(event) => {
                      event.stopPropagation();
                      showPreviousStory();
                    }}
                    aria-label={labels.previous}
                    className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white md:inline-flex"
                  >
                    <ChevronLeft className="size-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    onClick={(event) => {
                      event.stopPropagation();
                      showNextStory();
                    }}
                    aria-label={labels.next}
                    className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white md:inline-flex"
                  >
                    <ChevronRight className="size-5" />
                  </Button>

                  <motion.article
                    onClick={(event) => event.stopPropagation()}
                    className="relative z-10 flex h-[min(680px,calc(100svh-28px))] w-full max-w-[390px] flex-col overflow-hidden rounded-[1.55rem] bg-[#fbf7ef] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                    initial={{ opacity: 0, y: 34, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 22, scale: 0.96 }}
                    transition={{
                      duration: 0.32,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_12%,rgba(255,255,255,0.85),transparent_34%),linear-gradient(160deg,rgba(107,70,24,0.13),transparent_42%),linear-gradient(0deg,rgba(33,27,20,0.06),transparent_40%)]" />

                <div className="relative z-10 flex gap-1 px-4 pt-4">
                  {stories.map((story, index) => (
                    <span
                      key={story.name}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-black/20"
                    >
                      <span
                        className="block h-full rounded-full bg-white"
                        style={{
                          width:
                            index < activeIndex
                              ? "100%"
                              : index === activeIndex
                                ? `${progress}%`
                                : "0%",
                        }}
                      />
                    </span>
                  ))}
                </div>

                <header className="relative z-10 flex items-center gap-3 px-5 pt-4">
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full text-base font-semibold",
                      activeStory.avatarClassName,
                    )}
                  >
                    {activeStory.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-[#064b39]">
                      {activeStory.name}
                    </h2>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={closeStory}
                    aria-label={labels.close}
                    className="rounded-full text-[#064b39] hover:bg-black/5"
                  >
                    <X className="size-5" />
                  </Button>
                </header>

                <div className="absolute inset-x-0 bottom-0 top-20 z-20 grid grid-cols-2">
                  <button
                    type="button"
                    onClick={showPreviousStory}
                    aria-label={labels.previous}
                  />
                  <button
                    type="button"
                    onClick={showNextStory}
                    aria-label={labels.next}
                  />
                </div>

                <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-6">
                  <div className="rounded-[1.25rem] bg-white/88 p-5 shadow-[0_18px_55px_rgba(33,27,20,0.13)] backdrop-blur">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-14 place-items-center rounded-full text-2xl font-semibold",
                          activeStory.avatarClassName,
                        )}
                      >
                        {activeStory.initials.slice(0, 1)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-xl font-bold leading-tight text-[#064b39]">
                          {activeStory.name}
                        </h3>
                      </div>
                    </div>

                    <div
                      className="mt-7 flex gap-1 text-[#f3c600]"
                      aria-label={labels.stars}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className="size-5 fill-current stroke-current"
                        />
                      ))}
                    </div>

                    <blockquote className="mt-6 text-[1.22rem] font-medium leading-snug text-[#1e293b]">
                      {activeStory.message[contentLocale]}
                    </blockquote>

                  </div>
                </div>
                  </motion.article>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </Section>
  );
}
