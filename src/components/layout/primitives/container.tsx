import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide" | "full";

type ContainerProps = Readonly<{
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}>;

const containerSizes: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-10",
        containerSizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
