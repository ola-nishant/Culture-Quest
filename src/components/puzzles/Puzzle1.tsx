"use client";
import { useState } from "react";
import { AceternityInput } from "../AceternityInput";
import { HyperText } from "../ui/hyper-text"; // Import the HyperText component

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
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg w-full max-w-md mx-auto text-center z-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Level 1: Collaboration</h2>
      <div className="mb-6 text-gray-600 dark:text-gray-300">
        <HyperText>
Z K Q T H N O P R W A Y  
C X D M U I V B J K L Z  
O B C O A R G E W N Q H  
Q V R J E S F R U T D M  
P E R S E V E R A N C E  
L H Y P A S S I O N X U  
B R A V E H E A R T F O  
U N X L T R U S T Y E M  
R A U T H E N T I C I T  
A I N T E G R I T Y W G  
G O A L S R D E D I C A  
E H O N O R Z V A L U E  
J C O M M I T M E N T R  
S A C R I F I C E Y K P  
M L E A D E R S H I P V  
        </HyperText>
      </div>
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