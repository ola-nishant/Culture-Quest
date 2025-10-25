"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AceternityInput } from "../AceternityInput";
import { HyperText } from "../ui/hyper-text";

export default function Puzzle1({ onSolved }: { onSolved: () => void }) {
  const [currentLevel, setCurrentLevel] = useState(1);

  const levels = {
    1: {
      answer: "bold",
      title: "Level 1",
      description: "Find the word across or vertical",
      grid: [
        "Z K Q T H N O P R W A Y B C D",
        "C X D M U I V B J K L Z Q W R",
        "O B O L G A R G E W N Q H M L",
        "Q O R J E S F R U T D M A P X",
        "P L R S E V E R A N C X L M N",
        "L D Y P A S S W O N X U B Q D",
        "B R A W E H A E R T F O V I L"
      ],
      placeholders: [
        "The spirit of taking initiative",
        "Standing for what is right",
        "The word starts with B",
      ]
    },
    2: {
      answer: "acceptable",
      title: "Level 2", 
      description: "Find the word across or vertical",
      grid: [
        "Z X C V B N M Q W E R T Y U I",
        "Q W E R T Y U I O P L K J H G",
        "M N B V C X Z A S D F G H J K",
        "T R E W Q A S D F G H J K L Z",
        "A C C E P T A B L E Q W R T Y",
        "Y U I O P A S D F G H J K L Q",
        "I O P L K J H G F D S A Z X C"
      ],
      placeholders: [
        "Being open to new ideas",
        "Agreeing to unconventional approaches",
        "Starts with A",
      ]
    },
    3: {
      answer: "collaborate",
      title: "Level 3",
      description: "Find the word across or vertical",
      grid: [
        "Z X C V B N M Q W E R T Y U I",
        "Q W E R T Y U I O P L K J H G",
        "M N B V C X Z A S D F G H J K",
        "T R E W Q A S D F G H J K L Z",
        "Q W R T C O L L A B O R A T E",
        "Y U I O P A S D F G H J K L Q",
        "I O P L K J H G F D S A Z X C"
      ],
      placeholders: [
        "What brings teams together?",
        "The key to teamwork is...",
        "United we stand, divided we fall...",
      ]
    }
  };

  const handleAnswer = (val: string) => {
    const level = levels[currentLevel as keyof typeof levels];
    
    if (val.toLowerCase() === level.answer) {
      if (currentLevel < 3) {
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
        toast.success("Level Complete! First part of the key: CU", {
          duration: 5000,
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
    <div className="p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10 ml-2 mr-2">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {currentLevelData.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          {currentLevelData.description}
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-6">
        <div className="inline-block">
          {currentLevelData.grid.map((row, index) => (
            <HyperText key={`${currentLevel}-${index}`} className="whitespace-nowrap overflow-hidden text-ellipsis">
              {row}
            </HyperText>
          ))}
        </div>
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
