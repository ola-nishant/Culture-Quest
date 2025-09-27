"use client";
import { useState } from "react";
import { toast } from "react-hot-toast"; 
export default function Puzzle2({ onSolved }: { onSolved: () => void }) {
  const handleAnswer = (answer: string) => {
    if (answer === "rebalance") {
      toast.success("Correct! Moving on...", {
        style: {
          background: "#27272a",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      setTimeout(onSolved, 1000);
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
  };

  return (
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10 ml-2 mr-2">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Level 2: Customer Focus
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          You are in a high-stakes virtual meeting. Due to the festive season,
          deadlines are tight, and people are tense. What action will bring out
          the best in the team?
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-2 max-w-[360px]">
        <button
          onClick={() => handleAnswer("boost_morale")}
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg hover:bg-[#27272a] dark:hover:bg-[#27272a] transition text-sm md:text-md text-[#f5f5f5b7] dark:text-[#f5f5f5b7] text-center"
        >
          Boost morale with a promise: “We’ll push through this together - no matter
          what. Dinner’s on me after we finish.”
        </button>
        <button
          onClick={() => handleAnswer("step_back")}
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg hover:bg-[#27272a] dark:hover:bg-[#27272a] transition text-sm md:text-md text-[#f5f5f5b7] dark:text-[#f5f5f5b7] text-center"
        >
          Step back quietly to avoid adding pressure, and trust that the team will
          find their own rhythm.
        </button>
        <button
          onClick={() => handleAnswer("rebalance")}
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg hover:bg-[#27272a] dark:hover:bg-[#27272a] transition text-sm md:text-md text-[#f5f5f5b7] dark:text-[#f5f5f5b7] text-center"
        >
          Acknowledge the stress, offer to rebalance workload
        </button>
        <button
          onClick={() => handleAnswer("tighter_policies")}
          className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg hover:bg-[#27272a] dark:hover:bg-[#27272a] transition text-sm md:text-md text-[#f5f5f5b7] dark:text-[#f5f5f5b7] text-center"
        >
          Set tighter policies for the future so that deadlines aren't missed again.
        </button>
      </div>
    </div>
  );
}
