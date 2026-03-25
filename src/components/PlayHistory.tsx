import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { History, Clock, User } from 'lucide-react';

export const PlayHistory: React.FC = () => {
  const { history } = useGameStore() as any;

  if (history.length === 0) return null;

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center gap-2">
        <History size={16} className="text-blue-500" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Historial de Jugadas</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50">
              <th className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Reloj</th>
              <th className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Jugador</th>
              <th className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {history.map((play: any) => (
              <tr key={play.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-white font-mono text-xs font-bold">{play.time}</span>
                    <span className="text-[8px] text-slate-500 font-black uppercase">Periodo {play.period}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${play.team === 'home' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <span className={`text-xs font-bold uppercase ${play.team === 'home' ? 'text-blue-100' : 'text-red-100'}`}>
                      {play.playerName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-black ${
                    play.team === 'home' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    +{play.pts}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 bg-slate-950/30 text-center">
        <p className="text-[8px] font-medium text-slate-600 uppercase tracking-tighter">
          Desliza para ver jugadas anteriores
        </p>
      </div>
    </div>
  );
};