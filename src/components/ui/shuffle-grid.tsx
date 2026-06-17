"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ShuffleImage = {
  id: number;
  label: string;
  position?: string;
  src: string;
  alt: string;
};

type WeddingShuffleGridProps = {
  className?: string;
};

const squareData: ShuffleImage[] = [
  {
    id: 1,
    label: "Traditional",
    position: "50% 28%",
    src: "https://images.unsplash.com/photo-1661332306744-70f9ed1a7f40?auto=format&fit=crop&w=900&q=82",
    alt: "A Nigerian couple wearing traditional wedding clothing.",
  },
  {
    id: 2,
    label: "Portrait",
    position: "50% 28%",
    src: "https://images.unsplash.com/photo-1664645534653-b4b8b6473cb2?auto=format&fit=crop&w=900&q=82",
    alt: "A Black couple in elegant wedding attire.",
  },
  {
    id: 3,
    label: "Lagos",
    position: "50% 35%",
    src: "https://images.unsplash.com/photo-1719499683843-721331f2495f?auto=format&fit=crop&w=900&q=82",
    alt: "A bride and groom kissing in front of a white wall.",
  },
  {
    id: 4,
    label: "Together",
    position: "50% 40%",
    src: "https://images.unsplash.com/photo-1529519195486-16945f0fb37f?auto=format&fit=crop&w=900&q=82",
    alt: "A wedding couple holding hands.",
  },
  {
    id: 5,
    label: "Joy",
    position: "50% 34%",
    src: "https://images.unsplash.com/photo-1551963474-cc9e699de3b4?auto=format&fit=crop&w=900&q=82",
    alt: "A man hugging a woman during a wedding portrait session.",
  },
  {
    id: 6,
    label: "Soft",
    position: "50% 35%",
    src: "https://images.unsplash.com/photo-1551963319-13ff32a5acd1?auto=format&fit=crop&w=900&q=82",
    alt: "A groom kissing the bride on the forehead.",
  },
  {
    id: 7,
    label: "Formal",
    position: "50% 28%",
    src: "https://images.unsplash.com/photo-1719179542047-a4d84fd35c1f?auto=format&fit=crop&w=900&q=82",
    alt: "A Black bride and groom standing in formal wedding attire.",
  },
  {
    id: 8,
    label: "Golden",
    position: "50% 40%",
    src: "https://images.unsplash.com/photo-1606217239582-d9f72323bcd7?auto=format&fit=crop&w=900&q=82",
    alt: "A bride and groom standing together outdoors.",
  },
  {
    id: 9,
    label: "Calm",
    position: "50% 28%",
    src: "https://images.unsplash.com/photo-1745231991466-19d41014cc66?auto=format&fit=crop&w=900&q=82",
    alt: "A couple embracing during a wedding portrait.",
  },
  {
    id: 10,
    label: "Classic",
    position: "50% 36%",
    src: "https://images.unsplash.com/photo-1621829845053-c8114fc01eb3?auto=format&fit=crop&w=900&q=82",
    alt: "A bride and groom standing together on rocks.",
  },
  {
    id: 11,
    label: "Tender",
    position: "50% 36%",
    src: "https://images.unsplash.com/photo-1664646130497-fad665afbda8?auto=format&fit=crop&w=900&q=82",
    alt: "A wedding couple sharing a kiss.",
  },
  {
    id: 12,
    label: "Forever",
    position: "50% 35%",
    src: "https://images.unsplash.com/photo-1664646449779-ee70428b3936?auto=format&fit=crop&w=900&q=82",
    alt: "A couple kissing in wedding attire.",
  },
  {
    id: 13,
    label: "Rings",
    position: "50% 50%",
    src: "https://images.unsplash.com/photo-1561345822-1d5a8ccea1ff?auto=format&fit=crop&w=900&q=82",
    alt: "A close view of wedding rings.",
  },
  {
    id: 14,
    label: "Native",
    position: "50% 34%",
    src: "https://images.unsplash.com/photo-1705459965544-fcc7ead92d58?auto=format&fit=crop&w=900&q=82",
    alt: "A Nigerian traditional wedding couple standing beside a car.",
  },
  {
    id: 15,
    label: "Color",
    position: "50% 30%",
    src: "https://images.unsplash.com/photo-1654129047656-c97c015f534a?auto=format&fit=crop&w=900&q=82",
    alt: "A traditional wedding couple in colorful formal clothing.",
  },
  {
    id: 16,
    label: "Grace",
    position: "50% 30%",
    src: "https://images.unsplash.com/photo-1772241824154-ce6e7c985ff9?auto=format&fit=crop&w=900&q=82",
    alt: "A bride and groom posing for a formal wedding portrait.",
  },
];

function shuffle(array: ShuffleImage[]) {
  const next = [...array];

  for (let currentIndex = next.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [next[currentIndex], next[randomIndex]] = [next[randomIndex], next[currentIndex]];
  }

  return next;
}

export function WeddingShuffleGrid({ className }: WeddingShuffleGridProps) {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(squareData);
  const [, setCycle] = useState(0);

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares((currentSquares) => shuffle(currentSquares));
      setCycle((currentCycle) => currentCycle + 1);
      timeoutRef.current = window.setTimeout(shuffleSquares, 4600);
    };

    timeoutRef.current = window.setTimeout(shuffleSquares, 1400);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={cn("shuffle-mosaic", className)} aria-label="Wedding memory photo mosaic">
      <LayoutGroup id="wedding-shuffle-grid">
        <div className="shuffle-mosaic-grid">
          {squares.map((square, index) => (
            <motion.div
              animate={{ opacity: [0.9, 1], scale: [0.985, 1], y: [3, 0] }}
              aria-label={square.alt}
              className={cn(
                "shuffle-mosaic-tile",
                `shuffle-mosaic-tile-${square.id}`,
                index % 5 === 0 && "shuffle-mosaic-tile-tall",
              )}
              initial={{ opacity: 0.9, scale: 0.985, y: 3 }}
              key={square.id}
              layout
              layoutId={`wedding-shuffle-${square.id}`}
              role="img"
              style={{
                backgroundImage: `url(${square.src})`,
                backgroundPosition: square.position ?? "center",
              }}
              transition={{
                layout: { duration: 1.85, type: "spring", bounce: 0.04 },
                opacity: { duration: 0.8, delay: (index % 4) * 0.04 },
                scale: { duration: 0.9, delay: (index % 4) * 0.04 },
                y: { duration: 0.9, delay: (index % 4) * 0.04 },
              }}
            >
              <small>{square.label}</small>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
      <div className="shuffle-mosaic-caption">
        <span>12 Dec 2026</span>
        <strong>Grand Palace Hall</strong>
      </div>
    </div>
  );
}
