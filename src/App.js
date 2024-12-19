import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const decreaseBreak = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const increaseBreak = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const decreaseSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (isSession) setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const increaseSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (isSession) setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsSession(!isSession);
      setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
      document.getElementById('beep').play();
    }
  }, [timeLeft, isSession, breakLength, sessionLength]);

  return (
    <div className="pomodoro-clock">
      <h1>Pomodoro Clock</h1>
      <div id="break-label">Break Length</div>
      <button id="break-decrement" onClick={decreaseBreak}>-</button>
      <span id="break-length">{breakLength}</span>
      <button id="break-increment" onClick={increaseBreak}>+</button>

      <div id="session-label">Session Length</div>
      <button id="session-decrement" onClick={decreaseSession}>-</button>
      <span id="session-length">{sessionLength}</span>
      <button id="session-increment" onClick={increaseSession}>+</button>

      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={toggleTimer}>Start/Stop</button>
      <button id="reset" onClick={resetTimer}>Reset</button>

      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav"></audio>
    </div>
  );
}

export default App;
