"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AceternityInput } from "../AceternityInput";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";

interface Puzzle4Props {
  onEscaped: () => void;
}

export default function Puzzle4({ onEscaped }: Puzzle4Props) {
  const [showTerminal, setShowTerminal] = useState(false);

  const handleEscape = async (val: string) => {
    try {
      const res = await fetch("/api/escape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: val.toLowerCase() }),
      });
      const data = await res.json();
      if (data.escaped) {
        setShowTerminal(true); 
        setTimeout(() => {
          onEscaped(); 
        }, 5500); 
      } else {
        toast.error("Invalid token, try again!", {
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

  const escapePlaceholders = [
    "Enter the escape token...",
    "What will set you free?",
    "The key to escape is...",
    "Solve the final puzzle...",
    "Freedom awaits...",
  ];

  if (showTerminal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50">
        <Terminal>
          <TypingAnimation className="text-red-500">
            &gt; Verifying escape token...
          </TypingAnimation>
          <AnimatedSpan className="text-green-500">✔ Access granted!</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Loading escape sequence...</AnimatedSpan>
          <TypingAnimation className="text-muted-foreground">
            Congratulations! You escaped!
          </TypingAnimation>
        </Terminal>
      </div>
    );
  }


  return (
    <div className="relative p-8 rounded-xl shadow-lg mx-auto text-center z-10 dark:bg-zinc-900">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Final Level: Escape
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          Enter the final escape token to break free.
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-6">
        <div className="inline-block w-full">
          <AceternityInput
            placeholders={escapePlaceholders}
            onAnswer={handleEscape}
          />
        </div>
      </div>
    </div>
  );
}
