import React, { useState, useEffect } from 'react';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds (so it completes at 3 seconds)
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Complete and remove splash after 3 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src="/optistep.gif"
        alt="Optistep Academy Intro"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
