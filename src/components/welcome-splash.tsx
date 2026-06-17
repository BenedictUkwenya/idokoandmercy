"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { SparklesText } from "@/components/ui/sparkles-text";
import { SparklesCore } from "@/components/ui/sparkles";

type WelcomeSplashProps = {
  guestName?: string;
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

export function WelcomeSplash({
  guestName = "Mr. & Mrs. Adewale",
  coupleNames = "Barrister Idoko & Mercy",
  weddingDate = "Saturday, 12th December 2026",
  venue = "Grand Palace Hall, Victoria Island",
  photo = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
  photoAlt = "Wedding couple portrait",
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
    }, 1900);
  };

  return (
    <motion.div
      animate={{ opacity: isOpening ? 0 : 1 }}
      aria-label="Wedding invitation welcome"
      className="welcome-splash"
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      role="dialog"
      transition={{ delay: isOpening ? 1.15 : 0, duration: 0.55, ease: easeOut }}
    >
      <motion.div
        animate={isOpening ? { filter: "blur(8px)", scale: 1.28 } : { filter: "blur(0px)", scale: 1.08 }}
        aria-label={photoAlt}
        className="welcome-splash-photo"
        initial={{ scale: 1.08 }}
        role="img"
        style={{ backgroundImage: `url(${photo})` }}
        transition={{ duration: 1.5, ease: easeOut }}
      />
      <motion.div
        animate={isOpening ? { opacity: 0.72 } : { opacity: 1 }}
        aria-hidden="true"
        className="welcome-splash-overlay"
        transition={{ duration: 1, ease: easeOut }}
      />

      <motion.div
        animate={isOpening ? { opacity: 1, scale: 1.22 } : { opacity: 0.55, scale: 1 }}
        aria-hidden="true"
        className="welcome-splash-sparkles"
        transition={{ duration: 1, ease: easeOut }}
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
        animate={isOpening ? { opacity: 0, scale: 0.92, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
        className="welcome-splash-content"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: isOpening ? 0.35 : 0.8, ease: easeOut }}
      >
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="welcome-splash-guest"
          initial={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.15, duration: 0.6, ease: easeOut }}
        >
          A private invitation for {guestName}
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
            colors={{ first: sparkleColor, second: "#ffffff" }}
            sparklesCount={14}
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
          animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.2 : 1 }}
          aria-label="Open wedding invitation"
          className="welcome-splash-open"
          disabled={isOpening}
          initial={{ opacity: 0, scale: 0.88 }}
          onClick={handleOpen}
          transition={{ delay: isOpening ? 0 : 0.58, duration: 0.55, ease: easeOut }}
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
              animate={{ opacity: [0, 1, 0], scale: [0.2, 1.35, 2.8] }}
              aria-hidden="true"
              className="welcome-splash-burst"
              initial={{ opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.85, ease: easeOut, times: [0, 0.28, 1] }}
            />
            <motion.div
              animate={{ opacity: [0, 0.55, 0] }}
              aria-hidden="true"
              className="welcome-splash-flash"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: easeOut, times: [0, 0.35, 1] }}
            />
            <motion.div
              animate={{ x: ["0%", "-108%"] }}
              aria-hidden="true"
              className="welcome-splash-curtain welcome-splash-curtain-left"
              initial={{ x: "0%" }}
              transition={{ delay: 0.28, duration: 1.15, ease: easeOut }}
            />
            <motion.div
              animate={{ x: ["0%", "108%"] }}
              aria-hidden="true"
              className="welcome-splash-curtain welcome-splash-curtain-right"
              initial={{ x: "0%" }}
              transition={{ delay: 0.28, duration: 1.15, ease: easeOut }}
            />
            <motion.p
              animate={{ opacity: [0, 1, 0], y: [8, 0, -6] }}
              aria-hidden="true"
              className="welcome-splash-opening-text"
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 1.2, delay: 0.35, ease: easeOut, times: [0, 0.35, 1] }}
            >
              Opening the invitation
            </motion.p>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
