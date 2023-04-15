import React, { useState, useRef, useEffect } from "react";

const BpmCounter: React.FC = () => {
  const [bpm, setBpm] = useState<number>(0);
  const [clicks, setClicks] = useState<number[]>([]);
  const clickTimeout = useRef<NodeJS.Timeout>();

  const handleClick = () => {
    const now = performance.now();

    setClicks((prevClicks) => {
      const newClicks = [...prevClicks, now];

      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }

      clickTimeout.current = setTimeout(() => {
        setClicks([]);
      }, 2000);

      if (newClicks.length >= 2) {
        const intervals = newClicks.slice(1).map((c, i) => c - newClicks[i]);
        const avgInterval =
          intervals.reduce((a, b) => a + b) / intervals.length;
        setBpm(Math.round(60000 / avgInterval));
      }

      return newClicks;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl font-bold mb-4">{bpm && `${bpm}`}</p>
      <h1 className="text-xl font-bold mb-4">BPM Counter</h1>
      <button
        onClick={handleClick}
        className="bg-black text-white font-bold py-2 px-4 rounded"
      >
        Tap
      </button>
      <span className="py-2">or use space bar</span>
      <p className="text-lg font-semibold mt-2">Clicks: {clicks.length}</p>
    </div>
  );
};

export default BpmCounter;
