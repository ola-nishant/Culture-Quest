"use client";
import { useState, useRef, useEffect } from "react";

export default function MusicControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="text-white hover:text-gray-300 text-sm"
      >
        {isPlaying ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-16 h-1"
      />
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/background-music.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}