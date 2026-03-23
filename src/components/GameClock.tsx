import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

export const GameClock: React.FC = () => {
  const { gameTime, isRunning, toggleClock, tick, resetGame, period, maxPeriods, nextPeriod, setPeriod } = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && gameTime > 0) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameTime, tick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 bg-slate-900 text-white rounded-xl shadow-lg"
      style={{
        backgroundColor: "#eab305"
      }}>
      {/* Period Indicator */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {Array.from({ length: maxPeriods }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPeriod(i + 1)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              period === i + 1 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="text-6xl font-mono font-bold mb-4 tracking-wider">
        {formatTime(gameTime)}
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleClock}
          className={`p-4 rounded-full transition-all active:scale-95 ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        {period < maxPeriods && (
          <button
            onClick={nextPeriod}
            className="p-4 rounded-full bg-purple-600 hover:bg-purple-700 transition-all active:scale-95"
            title="Siguiente periodo"
          >
            <SkipForward size={32} />
          </button>
        )}
        
        <button
          onClick={() => {
            if (confirm('¿Reiniciar el partido?')) resetGame();
          }}
          className="p-4 rounded-full bg-slate-700 hover:bg-slate-600 transition-all active:scale-95"
        >
          <RotateCcw size={32} />
        </button>
      </div>
    </div>
  );
};