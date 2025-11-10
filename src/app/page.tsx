"use client";
import { useRef } from "react";
import PuzzleFlow from "@/components/PuzzleFlow";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const musicRef = useRef<{ play: () => void; stop: () => void }>(null);

  const startMusic = () => {
    musicRef.current?.play();
  };

  const stopMusic = () => {
    musicRef.current?.stop();
  };

  return (
    <main>
      <BackgroundMusic ref={musicRef} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#27272a",
            color: "#fff",
            fontSize: "1.1rem",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
      <PuzzleFlow onStartMusic={startMusic} onStopMusic={stopMusic} />
    </main>
  );
}
