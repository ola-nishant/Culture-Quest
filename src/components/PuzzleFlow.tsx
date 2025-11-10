"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Puzzle1 from "./puzzles/Puzzle1";
import Puzzle2 from "./puzzles/Puzzle2";

function TransitionScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-black animate-fade-in">
        <div className="text-5xl md:text-7xl font-bold mb-4">Ready? Buckle up</div>
        <div className="text-3xl md:text-5xl">Your journey through the world of PI begins now.</div>
      </h2>
    </div>
  );
}
import Puzzle3 from "./puzzles/Puzzle3";
import Puzzle4 from "./puzzles/Puzzle4";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import EscapedScreen from "./EscapedScreen";

const FINAL_KEY = "CURIOUS"; // expected concatenation of puzzle keys

export default function PuzzleFlow({ onStartMusic, onStopMusic }: { onStartMusic: () => void; onStopMusic: () => void }) {
  const [step, setStep] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [escaped, setEscaped] = useState(false);

  const handleSolved = (keyPart: string) => {
    setClues((prev) => [...prev, keyPart]);
    setStep((prev) => prev + 1);
  };

  const handleEscape = async () => {
    if (escaped) return; // block repeat submissions

    const token = clues.join(""); // concatenate all clues
    const res = await fetch("/api/escape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.escaped) {
      setEscaped(true);
    } else {
      toast.error("Wrong final code!", { duration: 5000 });
    }
  };

  if (escaped) {
    return <EscapedScreen onStopMusic={onStopMusic} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center text-black">
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
      {step === 0 && (
        <div className="p-6 text-white rounded-xl text-center">
          <div className="flex justify-center mb-8 mt-12 relative z-50">
            <img
              src="/game_logo.png"
              alt="Culture Quest Logo"
              className="w-[270px] md:w-[400px] h-auto object-contain relative z-50"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <p className="max-w-2xl mx-auto text-base md:text-xl text-neutral-700 dark:text-neutral-400 text-center mt-8 relative z-40">
              <strong>Welcome, brave explorer!</strong><br /><br />
              All the games ahead are inspired by <strong>PI's legendary 4Cs</strong><br /><br />
              Keep them close to your heart... you'll need them to survive what's coming
              <br /><br />
              <span className="text-black">
              🎮 <strong>Rules of the Game:</strong>  
              <br /> 1️⃣ There are 4 mind-bending puzzles waiting for you.  
              <br /> 2️⃣ Each puzzle unlocks a precious clue — <strong>REMEMBER IT!</strong>
              <br /> 3️⃣ Combine all your clues to find your way out and <strong>escape to victory!</strong>
              <br /><br />
              </span>
            </p>

          <div className="flex justify-center mt-5">
            <HoverBorderGradient
              onClick={() => {
                onStartMusic();
                setTimeout(() => {
                  setStep(0.5);
                }, 750);
              }}
              className="px-6 py-2 text-white text-sm md:text-lg relative z-30"
            >
              Start Puzzle
            </HoverBorderGradient>
          </div>
        </div>
      )}

      {step === 0.5 && <TransitionScreen onComplete={() => setStep(1)} />}

      {step === 1 && <Puzzle1 onSolved={() => handleSolved("CU")} />}
      {step === 2 && <Puzzle2 onSolved={() => handleSolved("RI")} />}
      {step === 3 && <Puzzle3 onSolved={() => handleSolved("OUS")} />}
      {step === 4 && <Puzzle4 onEscaped={handleEscape} />}
    </div>
  );
}
