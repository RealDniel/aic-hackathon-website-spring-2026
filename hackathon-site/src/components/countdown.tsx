"use client";

import { useEffect, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

const TARGET_DATE = new Date("2026-05-16T10:00:00-08:00"); // -8 hours for pacific standard (just to be explicit cause OSU is in PST)

function getCountdownParts(target: Date): CountdownParts {
  const remainingMs = target.getTime() - Date.now();

  if (remainingMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isComplete: false };
}

export default function Countdown() {
  const [countdown, setCountdown] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownParts(TARGET_DATE));
    };

    updateCountdown();

    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeText = countdown.isComplete
    ? "LIVE"
    : `${countdown.days}:${String(countdown.hours).padStart(2, "0")}:${String(countdown.minutes).padStart(2, "0")}:${String(countdown.seconds).padStart(2, "0")}`;

  return (
    <div
      className="flex h-full min-w-[9rem] items-center justify-between gap-2 border border-solid bg-[#c8c8c8] px-[0.45rem] text-[0.74rem] [font-variant-numeric:tabular-nums] [border-color:var(--win95-shadow)_var(--win95-light)_var(--win95-light)_var(--win95-shadow)] [text-shadow:0_0_1px_rgba(178,255,255,0.7),0_0_10px_rgba(0,255,255,0.25)] max-[760px]:ml-auto max-[760px]:min-w-[8rem]"
      role="status"
      aria-live="polite"
      aria-label="Hackathon countdown"
    >
      <span className="font-bold tracking-[0.02em]">AIC</span>
      <span className="font-bold tracking-[0.02em]">{timeText}</span>
    </div>
  );
}
