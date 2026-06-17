"use client";

import { motion } from "motion/react";

import { Card } from "@/components/ui/card";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

type WeddingSplineHeroProps = {
  tone: "velvet" | "celestial" | "lagos";
};

const sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function WeddingSplineHero({ tone }: WeddingSplineHeroProps) {
  const copy =
    tone === "celestial"
      ? {
          title: "A little moonlit welcome",
          body: "Move around and let the invitation respond, like a soft first hello before the celebration begins.",
        }
      : tone === "lagos"
        ? {
            title: "Your personal wedding pass",
            body: "A playful first moment before guests see the RSVP, directions, program, and celebration details.",
          }
        : {
            title: "You are warmly invited",
            body: "An intimate 3D welcome before the invitation opens, the date is revealed, and the story begins.",
          };

  return (
    <Card className="spline-card">
      <Spotlight className="-top-44 left-0 md:-top-28 md:left-28" fill="white" />
      <CursorSpotlight
        className="from-white/80 via-white/30 to-transparent"
        size={260}
        springOptions={{ damping: 20, stiffness: 140 }}
      />
      <div className="spline-copy">
        <span>Barrister Idoko & Mercy</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
        <div className="spline-rings" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
      <div className="spline-scene-wrap">
        <SplineScene className="h-full w-full" scene={sceneUrl} />
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
          aria-hidden="true"
          className="floating-petal petal-one"
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ y: [0, 12, 0], x: [0, -10, 0], rotate: [0, -10, 0] }}
          aria-hidden="true"
          className="floating-petal petal-two"
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </Card>
  );
}
