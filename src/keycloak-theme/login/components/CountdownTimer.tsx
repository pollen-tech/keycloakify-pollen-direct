import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ minutes = 0, seconds = 0 }) => {
  const initialTime = {
    minutes,
    seconds,
  };

  // Retrieve the timer state from localStorage or use the initial state
  // const countdownTimer = localStorage.getItem('countdownTimer')?.toString || '';
  // const storedTime = JSON.parse(countdownTimer) || initialTime;
  const storedTime = JSON.parse(localStorage.getItem('countdownTimer') || 'null') || initialTime;

  const [time, setTime] = useState(storedTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
        // localStorage.setItem('countdownTimer', JSON.stringify(time));

      } else if (time.seconds === 0) {
        setTime({
          minutes: time.minutes - 1,
          seconds: 59,
        });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      // Save the timer state to localStorage when the component unmounts
      // localStorage.setItem('countdownTimer', JSON.stringify(time));
    };
  }, [time]);

  return (
    <span>{`${time.minutes}:${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}</span>
  );
};

export default CountdownTimer;