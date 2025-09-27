"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AceternityInput } from "../AceternityInput";

interface Puzzle3Props {
  onSolved: () => void;
}

export default function Puzzle3({ onSolved }: Puzzle3Props) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (val: string) => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "C3", answer: val }),
      });
      const data = await res.json();
      if (data.correct) {
        toast.success("Correct! Third part of the key: OUS", {
          style: {
            background: "#27272a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
        onSolved();
      } else {
        toast.error("Wrong answer, try again!", {
          style: {
            background: "#27272a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.", {
        style: {
          background: "#27272a",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };

  const puzzlePlaceholders = [
    "Caesar had courage",
    "Solve the riddle to innovate...",
  ];

  return (
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Level 3: Innovation
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
Xvh gluhfwob exw vshdn wkh wuxwk.
Qhyhu klgh zkdw lv uljkw.
Eh dffrxqwdeoh.
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-6">
        <div className="inline-block w-full">
          <AceternityInput
            placeholders={puzzlePlaceholders}
            onAnswer={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
