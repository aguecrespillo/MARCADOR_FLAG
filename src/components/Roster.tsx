import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { UserPlus, Users, X, ChevronDown, ChevronUp, Save, Download } from 'lucide-react';

export const Roster: React.FC = () => {
  const { homeTeam, awayTeam, homeRoster, awayRoster, addPlayer, removePlayer, setRoster } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: '', number: '', team: 'home' as 'home' | 'away' });

  // Función para guardar los equipos actuales como "Predeterminados"
  const guardarPredeterminado = () => {
    const data = { home: homeRoster, away: awayRoster };
    localStorage.setItem('roster_corsair_default', JSON.stringify(data));
    alert("Equipos guardados como predeterminados");
  };

  // Función para cargar los equipos guardados
  const cargarPredeterminado = () => {
    const saved = localStorage.getItem('roster_corsair_default');
    if (saved) {
      const { home, away } = JSON.parse(saved);
      setRoster('home', home);
      setRoster('away', away);
    } else {
      alert("No hay equipos guardados todavía");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayer.name && newPlayer.number) {
      addPlayer(newPlayer.team, {
        id: Date.now().toString(),
        name: newPlayer.name,
        number: newPlayer.number,
      });
      setNewPlayer({ ...newPlayer, name: '', number: '' });
    }
  };

  return (
    <div className="mt-4 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#eab305] hover:bg-[#d4a004] p-4 rounded-2xl flex items-center justify-between shadow-lg transition-all border-b-4 border-[#b48903]"
      >
        <div className="flex items-center gap-3">
          <Users size={24} className="text-slate-900" />
          <span className="text-slate-900 font-black uppercase tracking-tight text-lg">
            Gestión de Equipos ({homeRoster.length + awayRoster.length})
          </span>
        </div>
        {isOpen ? <ChevronUp className="text-slate-900" /> : <ChevronDown className="text-slate-900" />}
      </button>

      {isOpen && (
        <div className="bg-slate-800 mt-2 rounded-2xl p-4 border border-slate-700 animate-in slide-in-from-top-2 duration-300">
          
          {/* BOTONES DE MEMORIA */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={guardarPredeterminado}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 border border-slate-600"
            >
              <Save size={14} /> GUARDAR PLANTILLA
            </button>
            <button 
              onClick={cargarPredeterminado}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 border border-slate-600"
            >
              <Download size={14} /> CARGAR PLANTILLA
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 bg-slate-900 p-3 rounded-xl border border-slate-700">
            <input
              type="text"
              placeholder="Nombre"
              value={newPlayer.name}
              onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Nº"
              value={newPlayer.number}
              onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none"
            />
            <select
              value={newPlayer.team}
              onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value as 'home' | 'away' })}
              className="bg-slate-800 text-white p-3 rounded-lg border border-slate-600"
            >
              <option value="home">{homeTeam}</option>
              <option value="away">{awayTeam}</option>
            </select>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
              <UserPlus size={20} /> AÑADIR
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[#eab305] font-black uppercase text-sm mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> {homeTeam}
              </h4>
              <div className="space-y-2">
                {homeRoster.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-white font-bold"><span className="text-slate-500 mr-2">#{p.number}</span> {p.name}</span>
                    <button onClick={() => removePlayer('home', p.id)} className="text-slate-600 hover:text-red-500 p-1">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#eab305] font-black uppercase text-sm mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div> {awayTeam}
              </h4>
              <div className="space-y-2">
                {awayRoster.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-white font-bold"><span className="text-slate-500 mr-2">#{p.number}</span> {p.name}</span>
                    <button onClick={() => removePlayer('away', p.id)} className="text-slate-600 hover:text-red-500 p-1">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};