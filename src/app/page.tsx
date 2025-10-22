"use client";
import { useRef } from "react";
import PuzzleFlow from "@/components/PuzzleFlow";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const musicRef = useRef<{ play: () => void }>(null);

  const startMusic = () => {
    musicRef.current?.play();
  };

  return (
    <main>
      <BackgroundMusic ref={musicRef} />
      <Toaster position="top-center" />
      <PuzzleFlow onStartMusic={startMusic} />
    </main>
  );
}
