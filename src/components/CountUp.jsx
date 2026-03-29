import React, { useEffect, useState } from 'react';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endVal = parseFloat(end.toString().replace(/,/g, ''));
    if (isNaN(endVal)) {
      setCount(end);
      return;
    }

    const totalFrames = (duration / 1000) * 60;
    const increment = endVal / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      start += increment;
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start).toLocaleString());
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default CountUp;
