"use client";
import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";

export default function Puzzle2({ onSolved }: { onSolved: () => void }) {
  const [currentLevel, setCurrentLevel] = useState(1);

  const allLevels = {
    1: {
      title: "Taking Ownership of a Mistake",
      description: "You've sent a client presentation that contains a small but important data error. Your manager hasn't noticed yet, and correcting it might mean admitting your mistake to the client. What should you do?",
      options: [
        { text: "Wait until the client raises it, then say it must have been a \"system error.\"", answer: "A" },
        { text: "Inform your manager immediately, explain the issue honestly, and share how you plan to correct it.", answer: "B" },
        { text: "Quietly replace the file later, hoping no one notices.", answer: "C" }
      ],
      correctAnswer: "B"
    },
    2: {
      title: "Challenging a Senior's View",
      description: "During a review meeting, a senior leader insists on using an old process you believe wastes time. Your data shows a better, faster way. What do you do?",
      options: [
        { text: "Stay silent — it's not wise to challenge a senior publicly.", answer: "A" },
        { text: "Respectfully share your insights, using data to back your recommendation and invite feedback.", answer: "B" },
        { text: "Complain privately to your peers later.", answer: "C" }
      ],
      correctAnswer: "B"
    },
    3: {
      title: "Taking Calculated Risks",
      description: "Your team is hesitant to try a new, untested approach for a client project. The current method works but won't meet the client's aggressive timeline. How do you respond?",
      options: [
        { text: "Stick to the tried-and-tested route to avoid mistakes.", answer: "A" },
        { text: "Encourage the team to pilot the new approach after evaluating potential risks and mitigation plans.", answer: "B" },
        { text: "Let the manager decide — it's not your responsibility.", answer: "C" }
      ],
      correctAnswer: "B"
    },
    4: {
      title: "Learning a New Tool",
      description: "Your company is implementing a new project management platform. You're comfortable with Excel, but leadership wants everyone to switch. How do you handle it?",
      options: [
        { text: "Learn how the new tool can improve team collaboration and adapt to it willingly.", answer: "A" },
        { text: "Resist it — your old system works well enough.", answer: "B" },
        { text: "Ask a colleague to use it on your behalf.", answer: "C" }
      ],
      correctAnswer: "A"
    },
    5: {
      title: "Receiving Challenging Feedback",
      description: "You present your analysis in a meeting, and a peer points out a major gap. You're caught off guard. What's your next move?",
      options: [
        { text: "Defend your work and argue that their feedback is irrelevant.", answer: "A" },
        { text: "Thank them, review the data later, and acknowledge valid points openly.", answer: "B" },
        { text: "Withdraw from future discussions to avoid such moments.", answer: "C" }
      ],
      correctAnswer: "B"
    },
    6: {
      title: "Breaking a Deadlock",
      description: "Two teams are stuck arguing over whose plan to follow, causing delays in a key project. What do you do?",
      options: [
        { text: "Step back and wait for leadership to intervene.", answer: "A" },
        { text: "Bring both teams together to brainstorm hybrid ideas, combining the best of both plans for faster execution.", answer: "B" },
        { text: "Support whichever team your manager prefers to avoid conflict.", answer: "C" }
      ],
      correctAnswer: "B"
    },
    7: {
      title: "Doing More with Less",
      description: "Your project budget has been cut by 20%, but deliverables remain the same. What's your response?",
      options: [
        { text: "Find innovative, low-cost alternatives to deliver quality despite constraints.", answer: "A" },
        { text: "Ask for an extension and explain it's impossible under new conditions.", answer: "B" },
        { text: "Reduce scope quietly without informing anyone.", answer: "C" }
      ],
      correctAnswer: "A"
    },
    8: {
      title: "Accelerating Execution",
      description: "You discover two teams are unknowingly working on similar modules for a client project. What should you do?",
      options: [
        { text: "Suggest merging efforts and sharing progress to avoid duplication and deliver faster.", answer: "A" },
        { text: "Keep quiet — it's not your responsibility.", answer: "B" },
        { text: "Let both continue; competition improves performance.", answer: "C" }
      ],
      correctAnswer: "A"
    },
    9: {
      title: "Supporting a Struggling Colleague",
      description: "A team member confides that personal issues are affecting their work performance. You notice they're missing deadlines. What's the best approach?",
      options: [
        { text: "Offer empathy, discuss how the team can support them, and help prioritize tasks while maintaining accountability.", answer: "A" },
        { text: "Tell them everyone faces problems and they should handle it privately.", answer: "B" },
        { text: "Ignore it — personal issues aren't your concern.", answer: "C" }
      ],
      correctAnswer: "A"
    },
    10: {
      title: "Creating Inclusion in Meetings",
      description: "You notice that quieter members rarely speak up, while a few dominate every discussion. What do you do?",
      options: [
        { text: "Start inviting quieter members to share their perspectives directly and appreciate their inputs.", answer: "A" },
        { text: "Let the talkative ones continue — it keeps meetings lively.", answer: "B" },
        { text: "Schedule a separate meeting only for vocal members to save time.", answer: "C" }
      ],
      correctAnswer: "A"
    }
  };

  const selectedLevels = useMemo(() => {
    const keys = Object.keys(allLevels).map(Number);
    const shuffled = keys.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  const levels = useMemo(() => {
    const result: Record<number, typeof allLevels[1]> = {};
    selectedLevels.forEach((originalKey, index) => {
      result[index + 1] = allLevels[originalKey as keyof typeof allLevels];
    });
    return result;
  }, [selectedLevels]);

  const handleAnswer = (answer: string) => {
    const level = levels[currentLevel as keyof typeof levels];
    
    if (answer === level.correctAnswer) {
      if (currentLevel < 4) {
        toast.success(`Correct! Moving to next question`, {
          style: {
            background: "#27272a",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
        setTimeout(() => setCurrentLevel(currentLevel + 1), 1000);
      } else {
        toast.success("Puzzle Complete! Second part of the key: RI", {
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
    <div className="p-8 dark:bg-zinc-900 rounded-xl shadow-lg mx-auto text-center z-10 ml-2 mr-2 bg-white">
      <div className="inline-block max-w-[340px]">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {currentLevelData.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          {currentLevelData.description}
        </p>
      </div>
      <div className="text-gray-600 dark:text-gray-300 py-4 flex flex-col gap-2 max-w-[360px]">
        {currentLevelData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.answer)}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg hover:bg-[#27272a] dark:hover:bg-[#27272a] transition text-sm md:text-md text-grey dark:text-[#f5f5f5] hover:text-white text-center"
          >
            {option.answer}. {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
