import React, { useState } from 'react';
import { ChevronRight, RefreshCcw } from 'lucide-react';

export const DownTracker: React.FC = () => {
  const [down, setDown] = useState(1);

  const nextDown = () => {
    if (down < 4) setDown(down + 1);
    else setDown(1); // Reinicia al llegar al 4º si sigues pulsando
  };

  const resetDowns = () => setDown(1);

  return (
    <div className="bg-slate-900/80 p-5 rounded-[2.5rem] border border-slate-800 shadow-xl mt-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Down Progress</span>
        </div>
        <button 
          onClick={resetDowns}
          className="text-slate-500 hover:text-white transition-colors"
          title="Reiniciar a 1º Down"
        >
          <RefreshCcw size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Los 4 botones de Down */}
        <div className="flex-1 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((d) => (
            <button
              key={d}
              onClick={() => setDown(d)}
              className={`relative h-14 rounded-2xl font-black text-xl transition-all flex items-center justify-center ${
                down === d 
                ? 'bg-yellow-500 text-slate-900 shadow-[0_0_20px_rgba(234,179,8,0.3)] scale-105 z-10' 
                : 'bg-slate-800 text-slate-500 border border-slate-700/50'
              }`}
            >
              {d}
              {down === d && (
                <span className="absolute -bottom-1 w-6 h-1 bg-slate-900 rounded-full opacity-20"></span>
              )}
            </button>
          ))}
        </div>

        {/* Botón rápido para avanzar */}
        <button 
          onClick={nextDown}
          className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-yellow-500 active:scale-90 transition-all"
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          {down === 4 ? '¡ÚLTIMO INTENTO!' : `${down}º DOWN`}
        </p>
      </div>
    </div>
  );
};