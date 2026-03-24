import React, { useState } from 'react';
import { GameClock } from './components/GameClock';
import { ScoreBoard } from './components/ScoreBoard';
import { ScoringButtons } from './components/ScoringButtons';
import { Gamelog } from './components/Gamelog';
import { DownAndDistance } from './components/DownAndDistance';
import { Roster } from './components/Roster';
import { useGameStore } from './store/useGameStore';
import { Settings, X, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const { resetGame } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans">
      <header className="max-w-md mx-auto mb-6 flex justify-between items-center border-b border-slate-900 pb-2">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-blue-500" />
          <h1 className="text-lg font-black uppercase italic tracking-tighter">Flag Score Alfonso</h1>
        </div>
        <button onClick={() => setShowSettings(true)} className="p-2 bg-slate-900 rounded-full border border-slate-800"><Settings size={20} /></button>
      </header>
      <main className="max-w-md mx-auto flex flex-col gap-6">
        <GameClock />
        <ScoreBoard />
        <DownAndDistance />
        <div className="grid grid-cols-2 gap-4">
          <ScoringButtons team="home" />
          <ScoringButtons team="away" />
        </div>
        <Gamelog />
        <Roster />
      </main>
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex justify-between items-center mb-6 text-xl font-bold">
              <h2>Ajustes</h2>
              <button onClick={() => setShowSettings(false)}><X size={24} /></button>
            </div>
            <button onClick={() => confirm('¿Borrar todo?') && (resetGame(), setShowSettings(false))} className="w-full py-4 bg-red-600 text-white rounded-xl font-bold mt-4 shadow-lg active:scale-95">REINICIAR TODO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;