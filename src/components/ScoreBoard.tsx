import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Clock, RefreshCcw, Share2, Award, Zap, XCircle, Undo2, Timer } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  const { 
    homeScore, awayScore, homeTeam, awayTeam, 
    isFinished, resetGame, homeTimeouts, awayTimeouts, 
    requestTimeout, timeoutTimer, setTimeoutTimer, history, undoLastPlay 
  } = useGameStore() as any;

  const shareStats = () => {
    const stats: Record<string, number> = {};
    history.forEach((play: any) => { stats[play.playerName] = (stats[play.playerName] || 0) + play.pts; });
    let statsText = "\n📊 *ESTADÍSTICAS:*";
    Object.entries(stats).forEach(([name, pts]) => { statsText += `\n🏈 ${name}: ${pts} pts`; });
    let historyText = "\n\n⏱️ *CRONOLOGÍA:*";
    history.slice().reverse().forEach((play: any) => {
      historyText += `\n🏁 ${play.time} (P${play.period}): ${play.playerName} +${play.pts}`;
    });
    const text = `*ACTA FINAL FLAG FOOTBALL* 🏈\n\n` +
                 `🏠 ${homeTeam}: *${homeScore}*\n` +
                 `🚀 ${awayTeam}: *${awayScore}*\n` +
                 `--------------------------` +
                 statsText + historyText + 
                 `\n\n_Generado por Alfonso Scoreboard_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isFinished) {
    const stats: Record<string, number> = {};
    history.forEach((play: any) => { stats[play.playerName] = (stats[play.playerName] || 0) + play.pts; });
    const mvp = Object.entries(stats).sort((a, b) => b[1] - a[1])[0] || ['-', 0];
    return (
      <div className="bg-slate-900 p-8 rounded-3xl border-4 border-yellow-500 text-center shadow-2xl">
        <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
        <h2 className="text-white text-2xl font-black uppercase mb-8">Finalizado</h2>
        <div className="flex justify-around items-center mb-10 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="text-center">
            <div className="text-blue-400 font-bold text-[10px] uppercase mb-1">{homeTeam}</div>
            <div className="text-5xl font-black text-white">{homeScore}</div>
          </div>
          <div className="text-slate-700 text-3xl font-light">VS</div>
          <div className="text-center">
            <div className="text-red-400 font-bold text-[10px] uppercase mb-1">{awayTeam}</div>
            <div className="text-5xl font-black text-white">{awayScore}</div>
          </div>
        </div>
        <button onClick={shareStats} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 mb-4">
          <Share2 size={20} /> ENVIAR ACTA
        </button>
        <button onClick={() => confirm('¿Resetear?') && resetGame()} className="text-slate-500 text-[10px] font-black uppercase">Reiniciar</button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* PANEL LOCAL */}
        <div className="bg-[#1e293b]/50 p-6 rounded-[2.5rem] border border-slate-800 flex flex-col items-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <span className="text-blue-400 font-black text-[10px] tracking-widest uppercase mb-1">{homeTeam}</span>
          <span className="text-7xl font-black text-white mb-4 tracking-tighter">{homeScore}</span>
          
          {/* BOTÓN TIMEOUT LOCAL */}
          <button 
            onClick={() => requestTimeout('home')} 
            disabled={homeTimeouts <= 0}
            className={`w-full py-3 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 ${
              homeTimeouts > 0 
              ? 'bg-blue-600/10 border border-blue-500/30 text-blue-400' 
              : 'bg-slate-800 text-slate-600 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2 mb-0.5">
               <Timer size={14} className={homeTimeouts > 0 ? "animate-pulse" : ""} />
               <span className="font-black text-xs">TIMEOUTS</span>
            </div>
            <div className="flex gap-1.5 mt-1">
               {[...Array(2)].map((_, i) => (
                 <div key={i} className={`h-1.5 w-6 rounded-full ${i < homeTimeouts ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>
               ))}
            </div>
          </button>
        </div>

        {/* PANEL VISITANTE */}
        <div className="bg-[#1e293b]/50 p-6 rounded-[2.5rem] border border-slate-800 flex flex-col items-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
          <span className="text-red-400 font-black text-[10px] tracking-widest uppercase mb-1">{awayTeam}</span>
          <span className="text-7xl font-black text-white mb-4 tracking-tighter">{awayScore}</span>
          
          {/* BOTÓN TIMEOUT VISITANTE */}
          <button 
            onClick={() => requestTimeout('away')} 
            disabled={awayTimeouts <= 0}
            className={`w-full py-3 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 ${
              awayTimeouts > 0 
              ? 'bg-red-600/10 border border-red-500/30 text-red-400' 
              : 'bg-slate-800 text-slate-600 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2 mb-0.5">
               <Timer size={14} className={awayTimeouts > 0 ? "animate-pulse" : ""} />
               <span className="font-black text-xs">TIMEOUTS</span>
            </div>
            <div className="flex gap-1.5 mt-1">
               {[...Array(2)].map((_, i) => (
                 <div key={i} className={`h-1.5 w-6 rounded-full ${i < awayTimeouts ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-700'}`}></div>
               ))}
            </div>
          </button>
        </div>
      </div>

      {/* BOTÓN DESHACER */}
      {history.length > 0 && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => confirm('¿Eliminar última jugada?') && undoLastPlay()}
            className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-slate-400 rounded-full text-[10px] font-black uppercase border border-slate-700 active:bg-red-900/20"
          >
            <Undo2 size={12} /> CORREGIR ERROR
          </button>
        </div>
      )}

      {/* MODAL TIMEOUT GIGANTE */}
      {timeoutTimer !== null && (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
          <Zap size={60} className="text-yellow-500 mb-4 animate-pulse" />
          <h2 className="text-white text-3xl font-black uppercase tracking-[0.3em] mb-2">TIEMPO MUERTO</h2>
          <div className="text-[12rem] font-mono font-black text-yellow-400 leading-none mb-10 tabular-nums">
            {timeoutTimer}
          </div>
          <button 
            onClick={() => setTimeoutTimer(null)} 
            className="bg-red-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-red-900/40"
          >
            REANUDAR JUEGO
          </button>
        </div>
      )}
    </>
  );
};