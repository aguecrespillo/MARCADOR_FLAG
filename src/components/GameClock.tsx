import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Play, Pause, SkipForward, Timer, AlertTriangle } from 'lucide-react';

export const GameClock: React.FC = () => {
  const { timeLeft, isRunning, toggleTimer, nextPeriod, period, tick, timeoutTimer, finishGame } = useGameStore() as any;

  useEffect(() => {
    let interval: any;
    // El tick debe correr si el juego está en marcha O si hay un timeout activo
    if ((isRunning && timeLeft > 0) || (timeoutTimer !== null && timeoutTimer > 0)) {
      interval = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timeoutTimer, tick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center">
      <div className="flex items-center gap-2 mb-2">
        <Timer size={16} className="text-blue-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Periodo {period}</span>
      </div>
      
      <div className="text-7xl font-mono font-black text-white tabular-nums tracking-tighter mb-6">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-2 w-full">
        <button 
          onClick={toggleTimer}
          className={`flex-[2] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isRunning ? 'bg-amber-500/10 text-amber-500 border border-amber-500/50' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
          }`}
        >
          {isRunning ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          <span className="font-black text-xs uppercase">{isRunning ? 'Pausa' : 'Iniciar'}</span>
        </button>

        <button 
          onClick={() => confirm('¿Pasar al siguiente periodo?') && nextPeriod()}
          className="bg-slate-800 text-slate-400 p-4 rounded-2xl hover:bg-slate-700 transition-all border border-slate-700"
        >
          <SkipForward size={20} />
        </button>

        <button 
          onClick={() => confirm('¿Finalizar partido y ver acta?') && finishGame()}
          className="bg-red-900/20 text-red-500 p-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-500/30"
        >
          <AlertTriangle size={20} />
        </button>
      </div>
    </div>
  );
};