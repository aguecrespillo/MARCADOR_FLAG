import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Clock } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  // Añadimos timeoutTimer, tickTimeout y setTimeoutTimer a la lista
  const { 
    homeTeam, awayTeam, homeScore, awayScore, 
    homeTimeouts, awayTimeouts, period, 
    homeTeamImage, awayTeamImage,
    timeoutTimer, tickTimeout, setTimeoutTimer 
  } = useGameStore();

  // EFECTO: Hace que el contador de timeout baje cada segundo
  useEffect(() => {
    if (timeoutTimer === null) return;

    const interval = setInterval(() => {
      tickTimeout();
    }, 1000);

    return () => clearInterval(interval);
  }, [timeoutTimer, tickTimeout]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4 w-full p-4 bg-slate-800 rounded-2xl shadow-xl text-white">
        {/* Home Team */}
        <div className="flex flex-col items-center p-4 bg-slate-700 rounded-xl border-b-4 border-blue-500">
          {homeTeamImage ? (
            <img 
              src={homeTeamImage} 
              alt={homeTeam} 
              className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-blue-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-2 text-3xl font-bold">
              {homeTeam.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-bold uppercase tracking-tight mb-2 truncate w-full text-center">
            {homeTeam}
          </h2>
          <div className="text-6xl font-black mb-4">{homeScore}</div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg">
            <Clock size={16} className="text-yellow-400" />
            <span className="text-lg font-bold">{homeTimeouts}</span>
            <span className="text-xs text-slate-400 uppercase">Timeouts</span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center p-4 bg-slate-700 rounded-xl border-b-4 border-red-500">
          {awayTeamImage ? (
            <img 
              src={awayTeamImage} 
              alt={awayTeam} 
              className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-red-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-2 text-3xl font-bold">
              {awayTeam.charAt(0).toUpperCase()}
            </div>
          )}
          <h2 className="text-xl font-bold uppercase tracking-tight mb-2 truncate w-full text-center">
            {awayTeam}
          </h2>
          <div className="text-6xl font-black mb-4">{awayScore}</div>
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-2 rounded-lg">
            <Clock size={16} className="text-yellow-400" />
            <span className="text-lg font-bold">{awayTimeouts}</span>
            <span className="text-xs text-slate-400 uppercase">Timeouts</span>
          </div>
        </div>

        {/* Period Indicator */}
        <div className="col-span-2 flex justify-center items-center py-2 bg-slate-900 rounded-lg">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Periodo {period}
          </span>
        </div>
      </div>

      {/* PANTALLA DE TIMEOUT (Overlay) */}
      {timeoutTimer !== null && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[9999] p-4">
          <h2 className="text-4xl font-black text-white mb-8 uppercase tracking-[0.2em] animate-pulse">
            TIMEOUT
          </h2>
          <div className="text-[15rem] font-black text-yellow-400 leading-none mb-12 drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            {timeoutTimer}
          </div>
          <button 
            onClick={() => setTimeoutTimer(null)}
            className="px-12 py-5 bg-red-600 hover:bg-red-700 text-white text-2xl font-black rounded-full transition-all active:scale-90 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          >
            REANUDAR
          </button>
        </div>
      )}
    </div>
  );
};