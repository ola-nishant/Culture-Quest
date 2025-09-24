"use client";
import { useState } from "react";

interface Puzzle3Props {
  onSolved: () => void;
}

export default function Puzzle3({ onSolved }: Puzzle3Props) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "C3", answer }),
      });
      const data = await res.json();
      if (data.correct) {
        setFeedback("✅ Correct! Moving on...");
        onSolved();
      } else {
        setFeedback("❌ Wrong answer, try again!");
      }
    } catch (err) {
      console.error(err);
      setFeedback("⚠️ Server error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Level 3: Innovation
      </h2>
      <p className="mb-4">
        Crack the creative riddle to find the innovative keyword.
      </p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter your answer"
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
