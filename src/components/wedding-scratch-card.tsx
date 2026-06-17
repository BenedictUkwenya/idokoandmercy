"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Heart, MapPin, Sparkles } from "lucide-react";
import {
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Card } from "@/components/ui/card";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface WeddingScratchCardProps {
  weddingDate?: string;
  venue?: string;
  coupleNames?: string;
  revealThreshold?: number;
  compact?: boolean;
}

const particleColors = ["#FFD700", "#FFC700", "#FFB700", "#FFA500", "#FF69B4", "#FF1493"];

export function WeddingScratchCard({
  weddingDate = "April 30, 2026",
  venue = "Grand Palace Hall, Victoria Island",
  coupleNames = "Barrister Idoko & Mercy",
  revealThreshold = 48,
  compact = false,
}: WeddingScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<Point | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback((x: number, y: number, amount = 3) => {
    const newParticles: Particle[] = [];
    for (let index = 0; index < amount; index += 1) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 2,
        life: 1,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }
    setParticles((current) => [...current, ...newParticles]);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#FFD700");
    gradient.addColorStop(0.42, "#B96B1D");
    gradient.addColorStop(0.68, "#FFF0A4");
    gradient.addColorStop(1, "#D6942D");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    ctx.font = `700 ${compact ? 14 : 18}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal", rect.width / 2, rect.height / 2 - 6);
    ctx.font = `600 ${compact ? 11 : 13}px Arial, sans-serif`;
    ctx.fillText("rub gently with your finger", rect.width / 2, rect.height / 2 + 18);
  }, [compact]);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);

    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  useEffect(() => {
    const updateParticles = () => {
      setParticles((current) => {
        const updated = current
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2,
            life: particle.life - 0.025,
          }))
          .filter((particle) => particle.life > 0);

        if (updated.length > 0) {
          animationFrameRef.current = requestAnimationFrame(updateParticles);
        }

        return updated;
      });
    };

    if (particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particles.length]);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();

      if (lastPointRef.current) {
        ctx.moveTo(lastPointRef.current.x * scaleX, lastPointRef.current.y * scaleY);
        ctx.lineTo(x * scaleX, y * scaleY);
        ctx.lineWidth = (compact ? 30 : 40) * window.devicePixelRatio;
        ctx.lineCap = "round";
        ctx.stroke();
      } else {
        ctx.arc(x * scaleX, y * scaleY, (compact ? 16 : 20) * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPointRef.current = { x, y };

      if (Math.random() > 0.68) {
        createParticles(x, y);
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;

      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] < 128) transparent += 1;
      }

      const percentage = (transparent / (pixels.length / 4)) * 100;
      setScratchPercentage(percentage);

      if (percentage > revealThreshold && !isRevealed) {
        setIsRevealed(true);
        for (let index = 0; index < 26; index += 1) {
          createParticles(Math.random() * rect.width, Math.random() * rect.height, 1);
        }
      }
    },
    [compact, createParticles, isRevealed, revealThreshold],
  );

  const getPoint = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
    const clientY = "touches" in event ? event.touches[0]?.clientY : event.clientY;

    if (clientX === undefined || clientY === undefined) return null;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleStart = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsScratching(true);
    lastPointRef.current = null;

    const point = getPoint(event);
    if (point) scratch(point.x, point.y);
  };

  const handleMove = (event: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    event.preventDefault();

    const point = getPoint(event);
    if (point) scratch(point.x, point.y);
  };

  const handleEnd = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={compact ? "w-full" : "mx-auto w-full max-w-md"}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative overflow-hidden border-none bg-white py-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-100/50 to-purple-100/60" />

        <div className={compact ? "relative p-4" : "relative p-8"}>
          <motion.div
            animate={{ scale: 1 }}
            className={compact ? "mb-3 flex justify-center" : "mb-6 flex justify-center"}
            initial={{ scale: 0 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 200 }}
          >
            <div className={compact ? "rounded-full bg-gradient-to-br from-rose-400 to-pink-500 p-3 shadow-lg" : "rounded-full bg-gradient-to-br from-rose-400 to-pink-500 p-4 shadow-lg"}>
              <Heart className={compact ? "h-5 w-5 fill-white text-white" : "h-8 w-8 fill-white text-white"} />
            </div>
          </motion.div>

          <motion.h3
            animate={{ opacity: 1 }}
            className={compact ? "mb-1 bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-center font-serif text-xl text-transparent" : "mb-2 bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-center font-serif text-3xl text-transparent"}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
          >
            {coupleNames}
          </motion.h3>

          <motion.p
            animate={{ opacity: 1 }}
            className={compact ? "mb-4 text-center text-xs text-muted-foreground" : "mb-8 text-center text-sm text-muted-foreground"}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.35 }}
          >
            You&apos;re invited to celebrate our special day
          </motion.p>

          <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
              <AnimatePresence>
                {isRevealed && (
                  <>
                    <motion.div
                      animate={{ rotate: 0, scale: 1 }}
                      className="mb-4"
                      initial={{ rotate: -180, scale: 0 }}
                      transition={{ delay: 0.1, stiffness: 200, type: "spring" }}
                    >
                      <Sparkles className={compact ? "h-8 w-8 text-rose-500" : "h-12 w-12 text-rose-500"} />
                    </motion.div>

                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.24 }}
                    >
                      <div className="flex items-center justify-center gap-2 text-rose-700">
                        <Calendar className={compact ? "h-4 w-4" : "h-5 w-5"} />
                        <span className={compact ? "text-base font-semibold" : "text-xl font-semibold"}>{weddingDate}</span>
                      </div>

                      <div className="flex items-start justify-center gap-2 text-rose-700">
                        <MapPin className={compact ? "mt-1 h-4 w-4 shrink-0" : "mt-1 h-5 w-5 shrink-0"} />
                        <span className={compact ? "text-sm font-medium" : "text-base font-medium"}>{venue}</span>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-500 ${
                isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
              onMouseDown={handleStart}
              onMouseLeave={handleEnd}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onTouchEnd={handleEnd}
              onTouchMove={handleMove}
              onTouchStart={handleStart}
            />

            {particles.map((particle) => (
              <div
                className="pointer-events-none absolute h-2 w-2 rounded-full"
                key={particle.id}
                style={{
                  backgroundColor: particle.color,
                  left: particle.x,
                  opacity: particle.life,
                  top: particle.y,
                  transform: `scale(${particle.life})`,
                }}
              />
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{isRevealed ? "Revealed!" : "Scratch to reveal"}</span>
              <span className="font-semibold text-rose-700">{Math.round(scratchPercentage)}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-rose-100">
              <motion.div
                animate={{ width: `${scratchPercentage}%` }}
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500"
                initial={{ width: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.45 }}
              >
                <p className="text-xs italic text-muted-foreground">We can&apos;t wait to celebrate with you.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {!isRevealed && (
        <motion.p
          animate={{ opacity: 1 }}
          className={compact ? "mt-3 text-center text-xs text-muted-foreground" : "mt-6 text-center text-sm text-muted-foreground"}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.65 }}
        >
          Use your finger to scratch the card
        </motion.p>
      )}
    </motion.div>
  );
}
