import React, { useState } from 'react';
import { useGameStore, Team, Player } from '../store/useGameStore';
import { Users, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

interface RosterProps {
  team: Team;
}

export const Roster: React.FC<RosterProps> = ({ team }) => {
  const { homeTeam, awayTeam, homeRoster, awayRoster, addPlayer, removePlayer } = useGameStore();
  const teamName = team === 'home' ? homeTeam : awayTeam;
  const roster = team === 'home' ? homeRoster : awayRoster;
  const [isExpanded, setIsExpanded] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && newPlayerNumber.trim()) {
      addPlayer(team, {
        id: Math.random().toString(36).substring(7),
        name: newPlayerName.trim(),
        number: newPlayerNumber.trim(),
      });
      setNewPlayerName('');
      setNewPlayerNumber('');
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-white"
        style={{
          backgroundColor: "#fde047"
        }}>
        <div className="flex items-center gap-2">
          <Users size={20} className="text-blue-400" />
          <span className="font-bold">Roster</span>
          <span className="text-slate-400 text-sm">({roster.length})</span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-700">
          {/* Add player form */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Número"
              value={newPlayerNumber}
              onChange={(e) => setNewPlayerNumber(e.target.value)}
              className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-center"
              maxLength={3}
            />
            <input
              type="text"
              placeholder="Nombre del jugador"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
            <button
              onClick={handleAddPlayer}
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Player list */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {roster.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No hay jugadores en el roster</p>
            ) : (
              roster.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-slate-700 rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm">
                      {player.number}
                    </span>
                    <span className="text-white font-medium">{player.name}</span>
                  </div>
                  <button
                    onClick={() => removePlayer(team, player.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};