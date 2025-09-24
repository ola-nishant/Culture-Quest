"use client";
import { useState } from "react";

export default function Puzzle2({ onSolved }: { onSolved: () => void }) {
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (answer: string) => {
    // Correct answer for testing: 'log_ack'
    if (answer === "log_ack") {
      setFeedback("✅ Correct! Moving on...");
      setTimeout(onSolved, 1000);
    } else {
      setFeedback("❌ Wrong answer, try again!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-96 text-center">
      <h2 className="text-2xl font-bold mb-4">Level 2: Customer Focus</h2>
      <p className="mb-4">A customer has raised urgent feedback late at night. What would you do?</p>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleAnswer("ignore")}
          className="border p-2 rounded"
        >
          Ignore till next day
        </button>
        <button
          onClick={() => handleAnswer("log_ack")}
          className="border p-2 rounded bg-blue-50"
        >
          Log feedback, acknowledge (Correct)
        </button>
      </div>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
