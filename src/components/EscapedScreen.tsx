"use client";
import { useEffect, useRef } from "react";
import ConfettiBackground from "./ui/confetti-background-new";

export default function EscapedScreen({ onStopMusic }: { onStopMusic: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Stop background music first
    onStopMusic();

    // Wait a brief moment then play applause
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.6; // Set volume to 60%
        audioRef.current.play().catch((error) => {
          // Handle autoplay restrictions
          console.log("Audio autoplay prevented:", error);
        });
      }
    }, 300);

    // Cleanup: pause audio when component unmounts
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onStopMusic]);

  return (
    <div className="min-h-screen w-full bg-white">
      <ConfettiBackground>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-8 relative z-50">
              <img
                src="/game_logo.png"
                alt="Culture Quest Logo"
                className="w-[270px] md:w-[400px] h-auto object-contain relative z-50"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <h1 className="text-4xl lg:text-7xl font-sans py-2 md:py-5 font-bold tracking-tight text-[#4a5568]">
              You Escaped!
            </h1>
            <p className="max-w-2xl mx-auto text-sm md:text-lg text-[#718096] text-center">
              Congratulations on completing the challenge!
            </p>
          </div>
        </div>
      </ConfettiBackground>

      {/* Audio element for success music */}
      <audio ref={audioRef} loop>
        <source src="/success_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}