import React, { useState } from 'react';
import { useGameStore, Team } from '../store/useGameStore';
import { Plus, Minus, RotateCcw, User } from 'lucide-react';

interface ScoringButtonsProps {
  team: Team;
}

export const ScoringButtons: React.FC<ScoringButtonsProps> = ({ team }) => {
  const { addPoints, useTimeout, undoLastEvent, homeTeam, awayTeam, homeRoster, awayRoster } = useGameStore();
  const teamName = team === 'home' ? homeTeam : awayTeam;
  const roster = team === 'home' ? homeRoster : awayRoster;
  const colorClass = team === 'home' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700';
  const [selectedScorer, setSelectedScorer] = useState<string>('');
  const [showScorerSelect, setShowScorerSelect] = useState(false);
  const [pendingScore, setPendingScore] = useState<{points: number; type: 'TD' | 'XP1' | 'XP2' | 'SAFETY' | 'DEF_XP2' | 'MANUAL'} | null>(null);

  const handleScore = (points: number, type: 'TD' | 'XP1' | 'XP2' | 'SAFETY' | 'DEF_XP2' | 'MANUAL') => {
    if (roster.length > 0 && (type === 'TD' || type === 'XP1' || type === 'XP2' || type === 'SAFETY')) {
      // Show scorer selector for scoring plays
      setPendingScore({ points, type });
      setShowScorerSelect(true);
    } else {
      // Directly add points for other scores or if no roster
      addPoints(team, points, type);
    }
  };

  const confirmScore = (scorerId: string) => {
    if (pendingScore) {
      const player = roster.find(p => p.id === scorerId);
      const scorerName = player ? `${player.number} - ${player.name}` : '';
      addPoints(team, pendingScore.points, pendingScore.type, scorerName);
    }
    setShowScorerSelect(false);
    setPendingScore(null);
    setSelectedScorer('');
  };

  const skipScorer = () => {
    if (pendingScore) {
      addPoints(team, pendingScore.points, pendingScore.type);
    }
    setShowScorerSelect(false);
    setPendingScore(null);
    setSelectedScorer('');
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-800 rounded-2xl shadow-lg text-white">
      <h3 className="text-lg font-bold text-center mb-2 truncate">{teamName}</h3>
      
      {/* Scorer Selection Modal */}
      {showScorerSelect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 rounded-2xl p-4 shadow-2xl">
            <h4 className="text-lg font-bold text-center mb-4">
              {pendingScore?.type === 'TD' ? '¿Quién marcó el TD?' : 
               pendingScore?.type === 'SAFETY' ? '¿Quién hizo el Safety?' : 
               '¿Quién marcó los puntos?'}
            </h4>
            <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
              {roster.map((player) => (
                <button
                  key={player.id}
                  onClick={() => confirmScore(player.id)}
                  className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
                >
                  <span className="bg-blue-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full">
                    {player.number}
                  </span>
                  <span className="font-medium">{player.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={skipScorer}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold"
            >
              Sin jugador específico
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleScore(6, 'TD')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 ${colorClass}`}
        >
          <span className="text-2xl font-black">6</span>
          <span className="text-[10px] uppercase font-bold">Touchdown</span>
        </button>
        
        <button
          onClick={() => handleScore(1, 'XP1')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 ${colorClass}`}
        >
          <span className="text-2xl font-black">1</span>
          <span className="text-[10px] uppercase font-bold">Extra Pt (5y)</span>
        </button>
        
        <button
          onClick={() => handleScore(2, 'XP2')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 ${colorClass}`}
        >
          <span className="text-2xl font-black">2</span>
          <span className="text-[10px] uppercase font-bold">Extra Pt (10y)</span>
        </button>
        
        <button
          onClick={() => handleScore(2, 'SAFETY')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 ${colorClass}`}
        >
          <span className="text-2xl font-black">2</span>
          <span className="text-[10px] uppercase font-bold">Safety</span>
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => useTimeout(team)}
          className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl text-xs font-bold uppercase transition-all active:scale-95"
        >
          Timeout
        </button>
        <button
          onClick={undoLastEvent}
          className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all active:scale-95"
          title="Deshacer última acción"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};