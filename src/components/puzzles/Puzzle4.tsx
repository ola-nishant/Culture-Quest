"use client";
import { useState } from "react";

interface Puzzle4Props {
  onEscaped: () => void;
}

export default function Puzzle4({ onEscaped }: Puzzle4Props) {
  const [token, setToken] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEscape = async () => {
    try {
      const res = await fetch("/api/escape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.escaped) {
        setFeedback("🎉 You escaped!");
        onEscaped();
      } else {
        setFeedback("❌ Invalid token, try again!");
      }
    } catch (err) {
      console.error(err);
      setFeedback("⚠️ Server error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Final Level: Escape
      </h2>
      <p className="mb-4">
        Enter the final escape token to break free.
      </p>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter escape token"
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleEscape}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Escape
      </button>
      {feedback && <p className="mt-2">{feedback}</p>}
    </div>
  );
}
