"use client";
import { useState } from "react";

export default function Puzzle2({ onSolved }: { onSolved: () => void }) {
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (answer: string) => {
    // Correct answer: 'rebalance'
    if (answer === "rebalance") {
      setFeedback("✅ Correct! Moving on...");
      setTimeout(onSolved, 1000);
    } else {
      setFeedback("❌ Wrong answer, try again!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Level 2: Customer Focus</h2>
      <p className="mb-4">
        You are in a high-stakes virtual meeting. Due to the festive season, deadlines are tight, and people are tense. What action will bring out the best in the team?
      </p>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleAnswer("boost_morale")}
          className="border p-2 rounded"
        >
          Boost morale with a promise: “We’ll push through this together — no matter what. Dinner’s on me after we finish.”
        </button>
        <button
          onClick={() => handleAnswer("step_back")}
          className="border p-2 rounded"
        >
          Step back quietly to avoid adding pressure, and trust that the team will find their own rhythm.
        </button>
        <button
          onClick={() => handleAnswer("rebalance")}
          className="border p-2 rounded bg-blue-50"
        >
          Acknowledge the stress, offer to rebalance workload (Correct)
        </button>
        <button
          onClick={() => handleAnswer("tighter_policies")}
          className="border p-2 rounded"
        >
          Set tighter policies for the future so that deadlines aren't missed again.
        </button>
      </div>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
