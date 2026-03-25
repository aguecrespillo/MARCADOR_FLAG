import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { UserPlus, UserMinus } from 'lucide-react';

export const Roster: React.FC = () => {
  const { homeRoster, awayRoster, addPlayer, removePlayer } = useGameStore() as any;
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');

  const onAdd = (team: 'home' | 'away') => {
    if (playerName.trim() === '') return;
    const newPlayer = {
      id: Date.now().toString(),
      name: playerName.trim().toUpperCase(),
      number: playerNumber || '00'
    };
    addPlayer(team, newPlayer);
    setPlayerName('');
    setPlayerNumber('');
  };

  // Función para borrar con aviso de seguridad
  const handleRemove = (team: 'home' | 'away', id: string, name: string) => {
    if (window.confirm(`¿Seguro que quieres borrar a ${name} del equipo?`)) {
      removePlayer(team, id);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* FORMULARIO */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2.5 mb-5 border-b border-slate-800 pb-3">
          <UserPlus size={18} className="text-yellow-500" />
          <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Gestión de Jugadores</h3>
        </div>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Nombre..." 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)} 
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Nº" 
            value={playerNumber} 
            onChange={(e) => setPlayerNumber(e.target.value)} 
            className="w-16 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white text-center font-bold outline-none focus:border-blue-500" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onAdd('home')} 
            className="bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition-all active:scale-95 text-[10px] uppercase tracking-widest"
          >
            Añadir Local
          </button>
          <button 
            onClick={() => onAdd('away')} 
            className="bg-red-600 hover:bg-red-500 text-white font-black py-3 rounded-xl transition-all active:scale-95 text-[10px] uppercase tracking-widest"
          >
            Añadir Visitante
          </button>
        </div>
      </div>

      {/* LISTADO DE ROSTERS */}
      <div className="grid grid-cols-2 gap-3">
        {/* COLUMNA LOCAL */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 min-h-[120px]">
          <h4 className="text-[10px] font-black text-blue-500 uppercase mb-3 border-b border-blue-500/20 pb-1 tracking-widest">ROSTER LOCAL</h4>
          <div className="flex flex-col gap-1.5">
            {homeRoster.map((p: any) => (
              <div key={p.id} className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 font-mono text-[9px] font-bold">#{p.number}</span>
                  <span className="font-bold text-white uppercase text-[10px] truncate max-w-[60px]">{p.name}</span>
                </div>
                <button 
                  onClick={() => handleRemove('home', p.id, p.name)}
                  className="text-red-900 hover:text-red-500 transition-colors p-1"
                >
                  <UserMinus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA VISITANTE */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 min-h-[120px]">
          <h4 className="text-[10px] font-black text-red-500 uppercase mb-3 border-b border-red-500/20 pb-1 tracking-widest">ROSTER VISITANTE</h4>
          <div className="flex flex-col gap-1.5">
            {awayRoster.map((p: any) => (
              <div key={p.id} className="flex justify-between items-center bg-slate-950/60 p-2 rounded-lg border border-slate-800 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-mono text-[9px] font-bold">#{p.number}</span>
                  <span className="font-bold text-white uppercase text-[10px] truncate max-w-[60px]">{p.name}</span>
                </div>
                <button 
                  onClick={() => handleRemove('away', p.id, p.name)}
                  className="text-red-900 hover:text-red-500 transition-colors p-1"
                >
                  <UserMinus size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};