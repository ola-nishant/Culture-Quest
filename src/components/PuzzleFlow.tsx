"use client";
import { useState } from "react";
import Puzzle2 from "./puzzles/Puzzle2";
import Puzzle3 from "./puzzles/Puzzle3";
import Puzzle4 from "./puzzles/Puzzle4";

export default function PuzzleFlow() {
  const [step, setStep] = useState(0); // 0 = start page
  const [escaped, setEscaped] = useState(false);

  if (escaped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white text-5xl font-bold">
        🎉 You Escaped!
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
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

      {step === 1 && <Puzzle1 onSolved={() => setStep(2)} />}
      {step === 2 && <Puzzle2 onSolved={() => setStep(3)} />}
      {step === 3 && <Puzzle3 onSolved={() => setStep(4)} />}
      {step === 4 && <Puzzle4 onEscaped={() => setEscaped(true)} />}
    </div>
  );
}

// Puzzle 1: Word Search / Input
function Puzzle1({ onSolved }: { onSolved: () => void }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (answer.trim().toUpperCase() === "TEAMWORK") {
      setFeedback("✅ Correct! Moving on...");
      setTimeout(onSolved, 1000);
    } else {
      setFeedback("❌ Wrong answer, try again!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Level 1: Collaboration</h2>
      <p className="mb-4">
        Find the main secret word among TEAMWORK, TRUST, COLLABOR, SUPPORT, TRANSPARENCY, HARMONY.
      </p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type answer here (for testing: TEAMWORK)"
        className="border p-2 rounded w-full mb-2 text-black"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
