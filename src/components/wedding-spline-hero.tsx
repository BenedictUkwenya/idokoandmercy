"use client";

import { motion } from "motion/react";

import { Card } from "@/components/ui/card";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function WeddingSplineHero() {
  return (
    <Card className="spline-card">
      <Spotlight className="-top-44 left-0 md:-top-28 md:left-28" fill="white" />
      <CursorSpotlight
        className="from-white/80 via-white/30 to-transparent"
        size={260}
        springOptions={{ damping: 20, stiffness: 140 }}
      />
      <div className="spline-copy">
        <span>Idoko & Mercy</span>
        <h2>A luminous welcome</h2>
        <p>Move around and let the invitation shimmer gently before the date, venue, and RSVP details unfold.</p>
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
