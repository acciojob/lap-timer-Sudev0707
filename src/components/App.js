
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);


  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };


  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };


  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time]);
    }
  };


  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };


  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  const pad = (num) => String(num).padStart(2, "0");


  return (
    <div className="container">
      {/* Do not remove the main div */}
      <h1>Lap Timer</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        <ul className="laps-list">
          {laps.map((lap, index) => (
            <li key={index}> {formatTime(lap)}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App
