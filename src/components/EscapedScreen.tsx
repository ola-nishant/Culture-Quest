import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { BackgroundLines } from "./ui/background-lines";

export default function EscapedScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center text-white">
      {/* Background Ripple Effect */}
      <div className="absolute inset-0 -z-20">
        <BackgroundRippleEffect />
      </div>

      {/* Background Lines */}
      <div className="absolute inset-0 -z-10">
        <BackgroundLines />
      </div>

      {/* Foreground Text */}
      <div className="relative z-10 text-center">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 md:py-5 font-bold tracking-tight">
          You Escaped!
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-md text-neutral-700 dark:text-neutral-400 text-center">
          Congratulations on completing the challenge!
        </p>
      </div>
    </div>
  );
}