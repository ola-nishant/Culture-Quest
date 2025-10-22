"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AceternityInput } from "../AceternityInput";

interface Puzzle3Props {
  onSolved: () => void;
}

export default function Puzzle3({ onSolved }: Puzzle3Props) {
  const [currentLevel, setCurrentLevel] = useState(1);

  const levels = {
    1: {
      title: "Level 1: Innovation Cipher",
      description: "Bot jt tfddpoe xpse jo uif dmvf \n\n Bravo Creative wizards, twist and turn the letters in the line below to reveal the hidden magic! Try replacing  each letter in the line below by the next letter, it might help",
      answer: "creative",
      placeholders: [
        "Caesar had courage",
      ]
    },
    2: {
      title: "Level 2: Innovation Cipher",
      description: "tenalp reihtlaeh a gninigamieR\n\n Forward is backwards, the past is the present, the clue is the answer.",
      answer: "reimagining a healthier planet",
      placeholders: [
        "Think outside the box",
        "Challenge the status quo",
      ]
    }
  };

  const handleAnswer = (val: string) => {
    const level = levels[currentLevel as keyof typeof levels];
    console.log("Answer entered:", val, "correct answer is:", level.answer)
    if (val.toLowerCase() === level.answer) {
      if (currentLevel < 2) {
        toast.success(`Correct! Moving to ${levels[currentLevel + 1 as keyof typeof levels].title}`, {
          style: {
            background: "#27272a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
        setTimeout(() => setCurrentLevel(currentLevel + 1), 1000);
      } else {
        toast.success("Puzzle Complete! Third part of the key: OUS", {
          duration: 4000,
          style: {
            background: "#27272a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
        setTimeout(onSolved, 1000);
      }
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

  const currentLevelData = levels[currentLevel as keyof typeof levels];

  return (
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {currentLevelData.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6 whitespace-pre-line">
          {currentLevelData.description}
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-6">
        <div className="inline-block w-full">
          <AceternityInput
            key={currentLevel}
            placeholders={currentLevelData.placeholders}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    </div>
  );
}
