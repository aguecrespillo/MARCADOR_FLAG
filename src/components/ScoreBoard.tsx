import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Clock, RefreshCcw, Share2, Award, Zap, XCircle } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  const { 
    homeScore, awayScore, homeTeam, awayTeam, 
    isFinished, resetGame, homeTimeouts, awayTimeouts, 
    requestTimeout, timeoutTimer, setTimeoutTimer, history 
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
        <h2 className="text-white text-2xl font-black uppercase mb-8">Partido Finalizado</h2>
        
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

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-8 text-yellow-500 flex items-center justify-center gap-3">
          <Award size={24} />
          <div className="text-left">
            <div className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Máximo Anotador</div>
            <div className="font-bold text-lg text-white uppercase">{mvp[0]} ({mvp[1]} pts)</div>
          </div>
        </div>

        <button onClick={shareStats} className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg mb-4">
          <Share2 size={20} /> ENVIAR POR WHATSAPP
        </button>
        
        <button onClick={() => confirm('¿Borrar todo?') && resetGame()} className="text-slate-500 text-xs font-bold uppercase hover:text-red-500 transition-colors">
          <RefreshCcw size={12} className="inline mr-1" /> REINICIAR MARCADOR
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 bg-slate-800 p-4 rounded-3xl border border-slate-700 shadow-xl text-white">
        <div className="text-center p-4 bg-slate-900/50 rounded-2xl border-b-4 border-blue-500">
          <div className="text-[10px] font-black text-blue-400 uppercase mb-1">{homeTeam}</div>
          <div className="text-5xl font-black mb-2">{homeScore}</div>
          <button onClick={() => requestTimeout('home')} disabled={homeTimeouts <= 0} className="flex items-center gap-1 mx-auto text-[10px] font-bold border border-blue-500/50 text-blue-400 px-3 py-1 rounded-lg disabled:opacity-30">
            <Clock size={10} /> TO: {homeTimeouts}
          </button>
        </div>
        
        <div className="text-center p-4 bg-slate-900/50 rounded-2xl border-b-4 border-red-500">
          <div className="text-[10px] font-black text-red-400 uppercase mb-1">{awayTeam}</div>
          <div className="text-5xl font-black mb-2">{awayScore}</div>
          <button onClick={() => requestTimeout('away')} disabled={awayTimeouts <= 0} className="flex items-center gap-1 mx-auto text-[10px] font-bold border border-red-500/50 text-red-400 px-3 py-1 rounded-lg disabled:opacity-30">
            <Clock size={10} /> TO: {awayTimeouts}
          </button>
        </div>
      </div>

      {timeoutTimer !== null && (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <Zap size={60} className="text-yellow-500 mb-4 animate-pulse" />
          <h2 className="text-white text-3xl font-black uppercase tracking-widest mb-2">TIEMPO MUERTO</h2>
          <div className="text-[12rem] font-mono font-black text-yellow-400 leading-none mb-8">
            {timeoutTimer}
          </div>
          <button 
            onClick={() => setTimeoutTimer(null)} 
            className="bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-3xl font-black text-xl flex items-center gap-3 shadow-2xl"
          >
            <XCircle size={24} /> CANCELAR TO
          </button>
        </div>
      )}
    </>
  );
};