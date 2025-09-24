"use client";
import { useState } from "react";

export default function Puzzle1({ onSolve }: { onSolve: () => void }) {
  const [answer, setAnswer] = useState("");

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === "next") {
      onSolve();
    } else {
      alert("Wrong answer, try again!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Puzzle 1</h2>
      <p className="text-gray-700">Type <b>next</b> to solve this puzzle.</p>
      <input
        className="border rounded p-2"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        onClick={checkAnswer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
