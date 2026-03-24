import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export const GameClock = () => {
  const { gameTime, isRunning, tick, toggleClock } = useGameStore();
  const tickRef = useRef(tick);

  // Mantenemos la función actualizada en una referencia fija
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        // Llamamos a la referencia, que el compilador no puede renombrar erróneamente
        if (typeof tickRef.current === 'function') {
          tickRef.current();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center p-6 bg-slate-900 rounded-3xl border border-slate-800">
      <div className="text-7xl font-mono font-black text-white mb-4">{formatTime(gameTime)}</div>
      <button 
        onClick={toggleClock}
        className={`px-8 py-3 rounded-full font-bold ${isRunning ? 'bg-red-600' : 'bg-green-600'}`}
      >
        {isRunning ? 'PAUSE' : 'REANUDAR'}
      </button>
    </div>
  );
};