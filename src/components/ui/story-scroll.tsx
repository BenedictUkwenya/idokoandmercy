"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

type FlowSectionProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
};

export function FlowSection({
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
}: FlowSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cx("relative min-h-screen w-full overflow-hidden", className)}
      data-flow-section
    >
      <div
        className={cx(
          "flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] will-change-transform",
        )}
        data-flow-inner
        style={{ transformOrigin: "center center", ...style }}
      >
        {children}
      </div>
    </section>
  );
}

type FlowArtProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

function childCount(children: ReactNode) {
  return React.Children.count(children);
}

export default function FlowArt({
  children,
  className,
  "aria-label": ariaLabel = "Story scroll",
}: FlowArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(containerRef.current.querySelectorAll<HTMLElement>("[data-flow-section]"));
      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, index) => {
        gsap.set(section, { zIndex: index + 1 });

        const inner = section.querySelector<HTMLElement>(".flow-art-container");
        if (!inner) return;

        if (index > 0) {
          gsap.set(inner, {
            autoAlpha: 1,
            scale: 0.985,
            transformOrigin: "center center",
          });

          const tween = gsap.to(inner, {
            autoAlpha: 1,
            ease: "none",
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 45%",
              scrub: true,
            },
          });

          if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
        }

        if (index < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              pin: true,
              pinSpacing: false,
            }),
          );
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <div aria-label={ariaLabel} className={cx("w-full overflow-x-hidden", className)} ref={containerRef}>
      {children}
    </div>
  );
}
