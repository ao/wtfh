import React, { useState, useEffect } from 'react';
import './App.css';
import AlarmForm from './components/AlarmForm';
import sounds from './sounds';

const App = () => {
  const [time, setTime] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');

  const playRandomSound = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 1;
    audio.loop = true;
    audio.play();
    setCurrentAudio(audio);

    setPlayCount((count) => count + 1);

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setCurrentAudio(null);
    }, 20000);
  };

  useEffect(() => {
    let timer;

    if (isPlaying && !isWakingUp) {
      timer = setInterval(() => {
        const now = new Date();
        const targetTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          time.split(':')[0],
          time.split(':')[1]
        );

        const diff = targetTime - now;
        if (diff <= 0) {
          setIsWakingUp(true);
          playRandomSound();
        } else {
          const secondsRemaining = Math.floor(diff / 1000);
          const hours = Math.floor(secondsRemaining / 3600);
          const minutes = Math.floor((secondsRemaining % 3600) / 60);
          const seconds = secondsRemaining % 60;

          // Format the remaining time string
          const timeParts = [];
          if (hours > 0) timeParts.push(`${hours}h`);
          timeParts.push(`${minutes}m`);
          timeParts.push(`${seconds}s`);
          setRemainingTime(timeParts.join(' '));
        }
      }, 1000);
    }

    if (isWakingUp) {
      const interval = setInterval(() => {
        playRandomSound();
      }, 20 * 1000);

      return () => clearInterval(interval);
    }

    return () => clearInterval(timer);
  }, [isPlaying, isWakingUp, time]);

  const handleSetTime = (selectedTime) => {
    setTime(selectedTime);
    setIsPlaying(true);
    setIsWakingUp(false);
    setPlayCount(0);
    setRemainingTime(''); // Reset remaining time
  };

  return (
    <div className={`app ${isWakingUp ? 'light' : 'dark'}`}>
      <h1>{isWakingUp ? 'Time to WTFU!' : 'When do you want to WTFU?'}</h1>
      <AlarmForm onSetTime={handleSetTime} />
      {isPlaying && !isWakingUp && (
        <>
          <p>Waiting to play sound at {time}...</p>
          <p>Time remaining: {remainingTime}</p> {/* Display remaining time */}
        </>
      )}
      {isWakingUp && (
        <>
          <p>Wake-up sequence started! Playing sounds every 20 seconds...</p>
          <p className="play-count">Times played: {playCount}</p>
        </>
      )}
    </div>
  );
};

export default App;
