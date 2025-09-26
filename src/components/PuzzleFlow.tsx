"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Puzzle1 from "./puzzles/Puzzle1"; // Import Puzzle1 from its file
import Puzzle2 from "./puzzles/Puzzle2";
import Puzzle3 from "./puzzles/Puzzle3";
import Puzzle4 from "./puzzles/Puzzle4";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
      <Toaster position="top-center" />
      {step === 0 && (
        <div className="p-6 bg-white rounded-xl shadow-md text-center">
          <h1 className="text-4xl font-bold mb-6">Culture Quest</h1>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            onClick={() => setStep(1)}
          >
            Start Puzzle
          </button>
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
    <div className="flex min-h-screen items-center justify-center bg-black text-white text-6xl font-extrabold">
      🎉 You Escaped!
    </div>
  );
}
