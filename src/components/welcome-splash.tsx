"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { SparklesText } from "@/components/ui/sparkles-text";
import { SparklesCore } from "@/components/ui/sparkles";

type WelcomeSplashProps = {
  coupleNames?: string;
  weddingDate?: string;
  venue?: string;
  photo?: string;
  photoAlt?: string;
  sparkleColor?: string;
  onBeginOpen: () => void;
  onComplete: () => void;
};

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

export function WelcomeSplash({
  coupleNames = "Idoko & Mercy",
  weddingDate = "Saturday, 12th December 2026",
  venue = "Grand Palace Hall, Victoria Island",
  photo = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
  photoAlt = "Warm wedding ceremony setup with floral details",
  sparkleColor = "#f5d37a",
  onBeginOpen,
  onComplete,
}: WelcomeSplashProps) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);
    onBeginOpen();

    window.setTimeout(() => {
      onComplete();
      document.body.style.overflow = "";
    }, 2200);
  };

  return (
    <motion.div
      animate={{ opacity: isOpening ? 0 : 1 }}
      aria-label="Wedding invitation welcome"
      className="welcome-splash"
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      role="dialog"
      transition={{ delay: isOpening ? 1.62 : 0, duration: 0.5, ease: easeOut }}
    >
      <motion.div
        animate={isOpening ? { filter: "blur(3px)", scale: 1.16 } : { filter: "blur(0px)", scale: 1.08 }}
        aria-label={photoAlt}
        className="welcome-splash-photo"
        initial={{ scale: 1.08 }}
        role="img"
        style={{ backgroundImage: `url(${photo})` }}
        transition={{ duration: 1.45, ease: easeInOut }}
      />
      <motion.div
        animate={isOpening ? { opacity: 0.34 } : { opacity: 1 }}
        aria-hidden="true"
        className="welcome-splash-overlay"
        transition={{ duration: 1.15, ease: easeOut }}
      />

      <motion.div
        animate={isOpening ? { opacity: 1, scale: 1.36 } : { opacity: 0.55, scale: 1 }}
        aria-hidden="true"
        className="welcome-splash-sparkles"
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <SparklesCore
          background="transparent"
          className="h-full w-full"
          maxSize={1.1}
          minSize={0.3}
          particleColor={sparkleColor}
          particleDensity={isOpening ? 180 : 110}
          speed={0.65}
        />
      </motion.div>

      <motion.div
        animate={isOpening ? { opacity: 0, scale: 0.94, y: -14, filter: "blur(6px)" } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        className="welcome-splash-content"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: isOpening ? 0.42 : 0.8, ease: easeOut }}
      >
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="welcome-splash-guest"
          initial={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
        >
          A private wedding invitation
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="welcome-splash-names"
          initial={{ opacity: 0, y: 22 }}
          transition={{ delay: 0.28, duration: 0.7, ease: easeOut }}
        >
          <span>Wedding of</span>
          <SparklesText
            className="welcome-splash-title"
            colors={{ first: "#fff8dc", second: sparkleColor }}
            sparklesCount={26}
            text={coupleNames}
          />
        </motion.div>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="welcome-splash-meta"
          initial={{ opacity: 0, y: 18 }}
          transition={{ delay: 0.42, duration: 0.65, ease: easeOut }}
        >
          {weddingDate}
          <br />
          {venue}
        </motion.p>

        <motion.button
          animate={
            isOpening
              ? { opacity: [1, 1, 0], scale: [1, 1.18, 0.55], y: [0, 0, 8] }
              : { opacity: 1, scale: 1, y: 0 }
          }
          aria-label="Open wedding invitation"
          className="welcome-splash-open"
          disabled={isOpening}
          initial={{ opacity: 0, scale: 0.88 }}
          onClick={handleOpen}
          transition={
            isOpening
              ? { duration: 0.68, ease: easeInOut, times: [0, 0.42, 1] }
              : { delay: 0.58, duration: 0.55, ease: easeOut }
          }
          type="button"
          whileHover={{ scale: isOpening ? 1.2 : 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span aria-hidden="true" className="welcome-splash-open-ring" />
          <span aria-hidden="true" className="welcome-splash-open-pulse" />
          <Play className="welcome-splash-open-icon" fill="currentColor" />
        </motion.button>

        <motion.p
          animate={{ opacity: isOpening ? 0 : 1 }}
          className="welcome-splash-hint"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.72, duration: 0.5 }}
        >
          Tap to open your invitation
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {isOpening && (
          <>
            <motion.div
              animate={{ opacity: [0, 1, 0.88, 0], scale: [0.1, 1.25, 7.5, 18], rotate: [0, 10, 18, 24] }}
              aria-hidden="true"
              className="welcome-splash-aperture"
              initial={{ opacity: 0, scale: 0.1, rotate: 0 }}
              transition={{ duration: 1.55, ease: easeInOut, times: [0, 0.18, 0.62, 1] }}
            />
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.25, 1.45, 2.35] }}
              aria-hidden="true"
              className="welcome-splash-burst"
              initial={{ opacity: 0, scale: 0.25 }}
              transition={{ duration: 0.95, ease: easeOut, times: [0, 0.28, 1] }}
            />
            <motion.div
              animate={{ opacity: [0, 0.78, 0] }}
              aria-hidden="true"
              className="welcome-splash-flash"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: easeOut, times: [0, 0.38, 1] }}
            />
            <motion.div
              animate={{ clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"], x: ["0%", "-9%"], rotateZ: [0, -2] }}
              aria-hidden="true"
              className="welcome-splash-fold welcome-splash-fold-left"
              initial={{ clipPath: "inset(0% 0% 0% 0%)", x: "0%", rotateZ: 0 }}
              transition={{ delay: 0.32, duration: 1.15, ease: easeInOut }}
            />
            <motion.div
              animate={{ clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 100%)"], x: ["0%", "9%"], rotateZ: [0, 2] }}
              aria-hidden="true"
              className="welcome-splash-fold welcome-splash-fold-right"
              initial={{ clipPath: "inset(0% 0% 0% 0%)", x: "0%", rotateZ: 0 }}
              transition={{ delay: 0.32, duration: 1.15, ease: easeInOut }}
            />
            <motion.div
              animate={{ opacity: [0, 1, 0], y: ["30%", "-18%", "-70%"] }}
              aria-hidden="true"
              className="welcome-splash-gold-rain"
              initial={{ opacity: 0, y: "30%" }}
              transition={{ duration: 1.35, delay: 0.18, ease: easeOut, times: [0, 0.35, 1] }}
            />
            <motion.p
              animate={{ opacity: [0, 1, 0], y: [8, 0, -8], filter: ["blur(4px)", "blur(0px)", "blur(5px)"] }}
              aria-hidden="true"
              className="welcome-splash-opening-text"
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 1.25, delay: 0.42, ease: easeOut, times: [0, 0.34, 1] }}
            >
              Opening the invitation
            </motion.p>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
