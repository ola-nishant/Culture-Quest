"use client";
import { toast } from "react-hot-toast";
import { AceternityInput } from "../AceternityInput";
import { HyperText } from "../ui/hyper-text";

export default function Puzzle1({ onSolved }: { onSolved: () => void }) {
  const handleAnswer = async (val: string) => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "C1", answer: val }),
      });
      const data = await res.json();
      if (data.correct) {
        toast.success("Correct! First part of the key: CU", {
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
    "What brings teams together?",
    "The key to collaboration is...",
    "United we stand, divided we fall...",
    "Many hands make light work...",
    "Together everyone achieves more...",
  ];

  return (
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10 ml-2 mr-2">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Level 1
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Find the word that represents the core value of working together to
          achieve a common goal.
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-6">
        <div className="inline-block">
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            Z K Q T H N O P R W A Y B C D E F G H I J
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            C X D M U I V B J K L Z Q W R T Y U O P S
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            O B C O A R G E W N Q H M L K E I F D S T
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            Q V R J E S F R U T D M A P X A C G H I K
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            P E R S E V E R A N C X L M N M Q R S T U
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            L H Y P A S S W O N X U B Q D W F G H J K
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            B R A W E H A E R T F O V I L O M P Q S T
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            U N X L T R U S Y T E M W A B R D F G H I
          </HyperText>
          <HyperText className="whitespace-nowrap overflow-hidden text-ellipsis">
            R A U T H E N T I C I T K L M K O P Q S V
          </HyperText>
        </div>
        <div className="inline-block w-full">
          <AceternityInput
            placeholders={puzzlePlaceholders}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    </div>
  );
}
