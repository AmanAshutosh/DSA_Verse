import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 10) + 1; // random speed
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
      }
      setProgress(value);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader">
      <h1 className="loader__logo">DSA Verse</h1>

      <div className="loader__bar">
        <div className="loader__fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="loader__text">{progress}%</p>
    </div>
  );
}
