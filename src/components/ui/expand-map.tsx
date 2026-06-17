"use client";

import type React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type LocationMapProps = {
  location?: string;
  coordinates?: string;
  className?: string;
};

export function LocationMap({
  location = "Victoria Island, Lagos, Nigeria",
  coordinates = "6.4281° N, 3.4219° E",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className={cn("relative w-full cursor-pointer select-none", className)}
      onClick={() => setIsExpanded((current) => !current)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        animate={{
          height: isExpanded ? 280 : 150,
          maxWidth: isExpanded ? 360 : 250,
        }}
        className="relative w-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] shadow-2xl"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-[var(--soft)]" />

              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <motion.line
                  animate={{ pathLength: 1 }}
                  className="stroke-[color:var(--ink)]/25"
                  initial={{ pathLength: 0 }}
                  strokeWidth="4"
                  transition={{ duration: 0.8, delay: 0.2 }}
                  x1="0%"
                  x2="100%"
                  y1="35%"
                  y2="35%"
                />
                <motion.line
                  animate={{ pathLength: 1 }}
                  className="stroke-[color:var(--ink)]/25"
                  initial={{ pathLength: 0 }}
                  strokeWidth="4"
                  transition={{ duration: 0.8, delay: 0.3 }}
                  x1="0%"
                  x2="100%"
                  y1="65%"
                  y2="65%"
                />
                <motion.line
                  animate={{ pathLength: 1 }}
                  className="stroke-[color:var(--ink)]/20"
                  initial={{ pathLength: 0 }}
                  strokeWidth="3"
                  transition={{ duration: 0.6, delay: 0.4 }}
                  x1="30%"
                  x2="30%"
                  y1="0%"
                  y2="100%"
                />
                <motion.line
                  animate={{ pathLength: 1 }}
                  className="stroke-[color:var(--ink)]/20"
                  initial={{ pathLength: 0 }}
                  strokeWidth="3"
                  transition={{ duration: 0.6, delay: 0.5 }}
                  x1="70%"
                  x2="70%"
                  y1="0%"
                  y2="100%"
                />

                {[20, 50, 80].map((y, index) => (
                  <motion.line
                    animate={{ pathLength: 1 }}
                    className="stroke-[color:var(--ink)]/10"
                    initial={{ pathLength: 0 }}
                    key={`h-${y}`}
                    strokeWidth="1.5"
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    x1="0%"
                    x2="100%"
                    y1={`${y}%`}
                    y2={`${y}%`}
                  />
                ))}
                {[15, 45, 55, 85].map((x, index) => (
                  <motion.line
                    animate={{ pathLength: 1 }}
                    className="stroke-[color:var(--ink)]/10"
                    initial={{ pathLength: 0 }}
                    key={`v-${x}`}
                    strokeWidth="1.5"
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    x1={`${x}%`}
                    x2={`${x}%`}
                    y1="0%"
                    y2="100%"
                  />
                ))}
              </svg>

              {[
                "top-[40%] left-[10%] h-[20%] w-[15%]",
                "top-[15%] left-[35%] h-[15%] w-[12%]",
                "top-[70%] left-[75%] h-[18%] w-[18%]",
                "top-[20%] right-[10%] h-[25%] w-[10%]",
                "top-[55%] left-[5%] h-[12%] w-[8%]",
                "top-[8%] left-[75%] h-[10%] w-[14%]",
              ].map((building, index) => (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn("absolute rounded-sm border border-[color:var(--line)] bg-[var(--muted)]/25", building)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  key={building}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                />
              ))}

              <motion.div
                animate={{ scale: 1, y: 0 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg className="drop-shadow-lg" fill="none" height="32" viewBox="0 0 24 24" width="32">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="#34D399"
                  />
                  <circle className="fill-[var(--surface)]" cx="12" cy="9" r="2.5" />
                </svg>
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ opacity: isExpanded ? 0 : 0.05 }}
          className="absolute inset-0"
          transition={{ duration: 0.3 }}
        >
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <pattern height="20" id="location-grid" patternUnits="userSpaceOnUse" width="20">
                <path className="stroke-[color:var(--ink)]" d="M 20 0 L 0 0 0 20" fill="none" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect fill="url(#location-grid)" height="100%" width="100%" />
          </svg>
        </motion.div>

        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <motion.svg
              animate={{
                filter: isHovered
                  ? "drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))"
                  : "drop-shadow(0 0 4px rgba(52, 211, 153, 0.3))",
                opacity: isExpanded ? 0 : 1,
              }}
              className="text-emerald-400"
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              transition={{ duration: 0.3 }}
              viewBox="0 0 24 24"
              width="18"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>

            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              className="flex items-center gap-1.5 rounded-full bg-[var(--ink)]/5 px-2 py-1 backdrop-blur-sm"
              transition={{ duration: 0.2 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">Live</span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.h3
              animate={{
                x: isHovered ? 4 : 0,
              }}
              className="text-sm font-bold tracking-tight text-[var(--ink)]"
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="font-mono text-xs text-[var(--muted)]"
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                scaleX: isHovered || isExpanded ? 1 : 0.3,
              }}
              className="h-px origin-left bg-gradient-to-r from-emerald-500/60 via-emerald-400/30 to-transparent"
              initial={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        className="absolute -bottom-6 left-1/2 whitespace-nowrap text-[10px] text-[var(--muted)]"
        initial={{ opacity: 0 }}
        style={{ x: "-50%" }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  );
}
