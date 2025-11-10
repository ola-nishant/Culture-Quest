"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const BackgroundMusic = forwardRef<{ play: () => void; stop: () => void }>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.3;
        audio.play().catch(console.error);
      }
    },
    stop: () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }));

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src="/background-music.mp3"
    />
  );
});

BackgroundMusic.displayName = "BackgroundMusic";
export default BackgroundMusic;