"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImage = {
  src: string;
  alt?: string;
};

type ZoomParallaxProps = {
  images: ParallaxImage[];
};

const imageLayouts = [
  "[&>div]:!h-[54vh] [&>div]:!w-[54vw]",
  "[&>div]:!-top-[24vh] [&>div]:!left-[6vw] [&>div]:!h-[28vh] [&>div]:!w-[32vw]",
  "[&>div]:!-top-[8vh] [&>div]:!-left-[24vw] [&>div]:!h-[36vh] [&>div]:!w-[22vw]",
  "[&>div]:!left-[26vw] [&>div]:!h-[24vh] [&>div]:!w-[25vw]",
  "[&>div]:!top-[25vh] [&>div]:!left-[8vw] [&>div]:!h-[24vh] [&>div]:!w-[22vw]",
  "[&>div]:!top-[25vh] [&>div]:!-left-[22vw] [&>div]:!h-[24vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[18vh] [&>div]:!left-[24vw] [&>div]:!h-[18vh] [&>div]:!w-[18vw]",
];

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 1.9]);
  const scale25 = useTransform(scrollYProgress, [0, 1], [1, 2.25]);
  const scale28 = useTransform(scrollYProgress, [0, 1], [1, 2.55]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 2.85]);
  const scale32 = useTransform(scrollYProgress, [0, 1], [1, 3.15]);

  const scales = [scale2, scale25, scale28, scale25, scale28, scale3, scale32];

  return (
    <div className="relative h-[240vh]" ref={container}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0_42%,rgba(0,0,0,0.22)_82%)]" />
        {images.slice(0, 7).map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              className={`absolute top-0 flex h-full w-full items-center justify-center ${imageLayouts[index]}`}
              key={`${src}-${index}`}
              style={{ scale }}
            >
              <div
                className={`parallax-photo parallax-photo-${index} relative h-[25vh] w-[25vw] overflow-hidden rounded-[1.4rem] border border-white/20 shadow-2xl`}
              >
                <div
                  aria-label={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full bg-cover bg-center"
                  role="img"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
