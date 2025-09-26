"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Puzzle1 from "./puzzles/Puzzle1"; // Import Puzzle1 from its file
import Puzzle2 from "./puzzles/Puzzle2";
import Puzzle3 from "./puzzles/Puzzle3";
import Puzzle4 from "./puzzles/Puzzle4";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const FINAL_KEY = "AQZ"; // expected concatenation of puzzle keys

export default function PuzzleFlow() {
  const [step, setStep] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [escaped, setEscaped] = useState(false);

  const handleSolved = (letter: string, number: number) => {
    toast.success(`Puzzle solved! Key #${number}: ${letter}`);
    setClues((prev) => [...prev, letter]);
    setStep((prev) => prev + 1);
  };

  const handleEscape = async () => {
    if (escaped) return; // block repeat submissions

    const token = clues.join(""); // concatenated string
    const res = await fetch("/api/escape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.escaped) {
      setEscaped(true);
    } else {
      toast.error("❌ Wrong final code!");
    }
  };

  // 🚨 Once escaped, stop rendering puzzles entirely
  if (escaped) {
    return <EscapedScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center text-black">
      <Toaster position="top-center" />
      {step === 0 && (
        <div className="p-6 text-white rounded-xl shadow-md text-center">
          <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Culture Quest
          </h1>
          <div className="flex justify-center">
            <HoverBorderGradient
              onClick={() => setStep(1)} // Set the step to 1 when clicked
              className="px-6 py-2 text-white text-sm md:text-lg relative z-30"
            >
              Start Puzzle
            </HoverBorderGradient>
          </div>
        </div>
      )}

      {step === 1 && <Puzzle1 onSolved={() => handleSolved("A", 1)} />}
      {step === 2 && <Puzzle2 onSolved={() => handleSolved("Q", 2)} />}
      {step === 3 && <Puzzle3 onSolved={() => handleSolved("Z", 3)} />}
      {step === 4 && (
        <Puzzle4
          onEscaped={handleEscape}
          showClues={clues} // optional: show clues back
        />
      )}
    </div>
  );
}

// ✅ Escaped screen is fully isolated
function EscapedScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center text-white text-6xl font-extrabold">
      🎉 You Escaped!
    </div>
  );
}
