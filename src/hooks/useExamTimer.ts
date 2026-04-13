"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useExamTimer(totalMinutes: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(totalMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && secondsRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsRemaining]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setSecondsRemaining(totalMinutes * 60);
    setIsRunning(false);
    setIsFinished(false);
  }, [totalMinutes]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const elapsed = totalMinutes * 60 - secondsRemaining;
  const percentage = Math.round((elapsed / (totalMinutes * 60)) * 100);

  return { secondsRemaining, minutes, seconds, display, elapsed, percentage, isRunning, isFinished, start, pause, reset };
}
