"use client";
import { useState } from "react";
import { AceternityInput } from "../AceternityInput";

export default function Puzzle1({ onSolved }: { onSolved: () => void }) {
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (val: string) => {
    if (val.trim().toUpperCase() === "TEAMWORK") {
      setFeedback("✅ Correct! Moving on...");
      setTimeout(onSolved, 1000);
    } else {
      setFeedback("❌ Wrong answer, try again!");
    }
  };

  const puzzlePlaceholders = [
    "What brings teams together?",
    "The key to collaboration is...",
    "United we stand, divided we fall...",
    "Many hands make light work...",
    "Together everyone achieves more...",
  ];

  return (
    <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Level 1: Collaboration</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Find the main secret word among TEAMWORK, TRUST, COLLABOR, SUPPORT, TRANSPARENCY, HARMONY.
      </p>
      <div className="mb-4">
        <AceternityInput 
          placeholders={puzzlePlaceholders}
          onAnswer={handleAnswer} 
        />
      </div>
      {feedback && (
        <p className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white">
          {feedback}
        </p>
      )}
    </div>
  );
}