"use client";

import { useId } from "react";
import type { Container } from "@tsparticles/engine";
import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";

import { cn } from "@/lib/utils";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

const initSparklesEngine = async (engine: Parameters<typeof loadSlim>[0]) => {
  await loadSlim(engine);
};

export function SparklesCore(props: SparklesCoreProps) {
  return (
    <ParticlesProvider init={initSparklesEngine}>
      <SparklesParticles {...props} />
    </ParticlesProvider>
  );
}

function SparklesParticles({
  id,
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 100,
}: SparklesCoreProps) {
  const controls = useAnimation();
  const generatedId = useId();
  const { loaded } = useParticlesProvider();

  const particlesLoaded = async (container?: Container) => {
    if (!container) return;

    await controls.start({
      opacity: 1,
      transition: {
        duration: 1,
      },
    });
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {loaded && (
        <Particles
          className="h-full w-full"
          id={id || generatedId}
          options={{
            background: {
              color: {
                value: background,
              },
            },
            detectRetina: true,
            fpsLimit: 120,
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: particleColor,
              },
              links: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: {
                  min: 0.1,
                  max: speed,
                },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  height: 400,
                  width: 400,
                },
                value: particleDensity,
              },
              opacity: {
                animation: {
                  enable: true,
                  speed,
                  startValue: "random",
                  sync: false,
                },
                value: {
                  min: 0.1,
                  max: 1,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: {
                  min: minSize,
                  max: maxSize,
                },
              },
            },
          }}
          particlesLoaded={particlesLoaded}
        />
      )}
    </motion.div>
  );
}
