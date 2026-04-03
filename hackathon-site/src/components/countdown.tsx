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
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(TARGET_DATE)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdownParts(TARGET_DATE));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="countdown-container">
      <section>
        {countdown.isComplete ? (
          <h1>The event has started.</h1>
        ) : (
            <>
                <h1 className="countdown">
                    {countdown.days}:{String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                </h1>
            </>
        )}
      </section>
    </div>
  );
}
