import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { History } from 'lucide-react';

export const GameLog: React.FC = () => {
  const { history, homeTeam, awayTeam } = useGameStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-slate-500 bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-700">
        <History size={48} className="mb-2 opacity-20" />
        <p className="text-sm font-medium">No hay eventos registrados</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto p-4 bg-slate-800 rounded-2xl shadow-xl text-white max-h-[300px] overflow-y-auto">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
        <History size={16} /> Historial de Juego
      </h3>
      <div className="flex flex-col gap-2">
        {history.map((event) => (
          <div
            key={event.id}
            className={`flex items-center justify-between p-3 rounded-xl ${
              event.team === 'home' ? 'bg-blue-900/30 border-l-4 border-blue-500' : 'bg-red-900/30 border-l-4 border-red-500'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-slate-400">
                {event.team === 'home' ? homeTeam : awayTeam}
              </span>
              <span className="text-sm font-medium">{event.type}</span>
              {event.scorer && (
                <span className="text-xs font-bold text-yellow-400">⭐ {event.scorer}</span>
              )}
            </div>
            <div className="flex flex-col items-end">
              <span className="text-lg font-black">+{event.points}</span>
              <span className="text-[10px] font-mono text-slate-500">{formatTime(event.gameTime)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
