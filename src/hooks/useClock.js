/**
 * hooks/useClock.js
 * Returns a live Date object that refreshes every `intervalMs` milliseconds.
 */

import { useState, useEffect } from "react";

export function useClock(intervalMs = 10_000) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time on the given interval (default every 10 s)
    const timer = setInterval(() => setTime(new Date()), intervalMs);
    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [intervalMs]);

  return time;
}
