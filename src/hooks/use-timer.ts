import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const start = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current!) / 1000));
    }, 1000);
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return time;
  };

  const reset = () => {
    setTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return { time, start, stop, reset };
}
