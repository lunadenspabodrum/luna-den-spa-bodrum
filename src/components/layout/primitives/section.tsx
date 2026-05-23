import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

type SectionProps = Readonly<{
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  as?: ElementType;
}>;

const sectionSpacingClasses: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-10 md:py-14",
  md: "py-14 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-36",
};

export function Section({
  children,
  className,
  spacing = "lg",
  as: Component = "section",
}: SectionProps) {
  return (
    <Component className={cn(sectionSpacingClasses[spacing], className)}>
      {children}
    </Component>
  );
}
