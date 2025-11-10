"use client";
import { motion } from "motion/react";
import React, { useMemo } from "react";

const CONFETTI_COLORS = [
  "#FF5733", // Bright Orange
  "#FFD700", // Gold
  "#FF1493", // Deep Pink
  "#00FFFF", // Cyan
  "#9400D3", // Violet
  "#FF4500", // Orange Red
  "#1E90FF", // Dodger Blue
  "#FF69B4", // Hot Pink
  "#32CD32", // Lime Green
  "#FF6347", // Tomato
  "#00FF7F", // Spring Green
  "#FF00FF", // Magenta
  "#FFA500", // Orange
  "#9370DB", // Medium Purple
  "#20B2AA", // Light Sea Green
];

interface ConfettiPiece {
  id: number;
  startX: number;
  startY: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "rect" | "star";
  rotation: number;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
  layer: number;
}

const generateConfettiPieces = (count: number): ConfettiPiece[] => {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const layer = Math.floor(i / (count / 3));
    const distance = 35 + layer * 15 + Math.random() * 40;

    return {
      id: i,
      startX: 50,
      startY: 50,
      size: 6 + Math.random() * 12,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.75 ? "circle" : Math.random() > 0.5 ? "square" : Math.random() > 0.25 ? "rect" : "star",
      rotation: Math.random() * 360,
      delay: i * 0.008,
      duration: 1.8 + Math.random() * 1.2,
      angle,
      distance,
      layer,
    };
  });
};

export default function ConfettiBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const confettiPieces = useMemo(() => generateConfettiPieces(150), []);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className || ""}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces.map((piece) => {
          const endX = piece.startX + Math.cos(piece.angle) * piece.distance;
          const endY = piece.startY + Math.sin(piece.angle) * piece.distance + 30;
          const isGlowing = piece.layer === 0;

          return (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.startX}vw`,
                y: `${piece.startY}vh`,
                scale: 0,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                x: [`${piece.startX}vw`, `${endX}vw`],
                y: [`${piece.startY}vh`, `${endY}vh`, `${endY + 70}vh`],
                scale: [0, 1.5, 1.2, 1, 0.7],
                rotate: [0, piece.rotation * 1.5, piece.rotation * 3],
                opacity: [0, 1, 0.9, 0.7, 0],
              }}
              transition={{
                duration: piece.duration,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: piece.delay,
                repeat: Infinity,
                repeatDelay: 1.2,
              }}
              style={{
                position: "absolute",
                width: piece.shape === "rect" ? `${piece.size * 1.8}px` : piece.shape === "star" ? `${piece.size * 1.3}px` : `${piece.size}px`,
                height: piece.shape === "star" ? `${piece.size * 1.3}px` : `${piece.size}px`,
                backgroundColor: piece.color,
                borderRadius:
                  piece.shape === "circle" ? "50%" :
                  piece.shape === "square" ? "3px" :
                  piece.shape === "rect" ? "2px" :
                  "50%",
                clipPath: piece.shape === "star" ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" : undefined,
                boxShadow: isGlowing ? `0 0 10px ${piece.color}80, 0 0 20px ${piece.color}40` : "none",
                zIndex: piece.layer,
                pointerEvents: "none",
              }}
            />
          );
        })}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}