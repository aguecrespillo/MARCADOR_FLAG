import React, { useState, useRef } from 'react';
import { GameClock } from './components/GameClock';
import { ScoreBoard } from './components/ScoreBoard';
import { ScoringButtons } from './components/ScoringButtons';
import { GameLog } from './components/GameLog';
import { DownAndDistance } from './components/DownAndDistance';
import { Roster } from './components/Roster';
import { useGameStore, Team } from './store/useGameStore';
import { Settings, X, Trophy, Camera, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const { homeTeam, awayTeam, setTeamName, resetGame, homeTeamImage, awayTeamImage, setTeamImage } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);
  const homeImageInput = useRef<HTMLInputElement>(null);
  const awayImageInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = (team: Team, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTeamImage(team, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg shadow-inner">
            <Trophy size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-black tracking-tighter uppercase italic">Flag Score</h1>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <Settings size={24} />
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 flex flex-col gap-6 pb-24">
        {/* Clock Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-500">
          <GameClock />
        </section>

        {/* Scoreboard Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
          <ScoreBoard />
        </section>

        {/* Down & Distance Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-500 delay-200">
          <DownAndDistance />
        </section>

        {/* Scoring Controls */}
        <section className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
          <ScoringButtons team="home" />
          <ScoringButtons team="away" />
        </section>

        {/* History Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-500 delay-400">
          <GameLog />
        </section>

        {/* Roster Section */}
        <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 delay-500">
          <Roster team="home" />
          <Roster team="away" />
        </section>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Configuración</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-800 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Home Team Image */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Escudo Equipo Local</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={homeImageInput}
                    onChange={(e) => handleImageUpload('home', e)}
                    className="hidden"
                  />
                  {homeTeamImage ? (
                    <div className="relative">
                      <img src={homeTeamImage} alt="Local" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                      <button
                        onClick={() => setTeamImage('home', '')}
                        className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => homeImageInput.current?.click()}
                      className="w-16 h-16 rounded-full bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <Camera size={24} />
                    </button>
                  )}
                  <input
                    type="text"
                    value={homeTeam}
                    onChange={(e) => setTeamName('home', e.target.value)}
                    placeholder="Nombre del equipo"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Away Team Image */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Escudo Equipo Visitante</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    ref={awayImageInput}
                    onChange={(e) => handleImageUpload('away', e)}
                    className="hidden"
                  />
                  {awayTeamImage ? (
                    <div className="relative">
                      <img src={awayTeamImage} alt="Visitante" className="w-16 h-16 rounded-full object-cover border-2 border-red-500" />
                      <button
                        onClick={() => setTeamImage('away', '')}
                        className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => awayImageInput.current?.click()}
                      className="w-16 h-16 rounded-full bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center text-slate-400 hover:border-red-500 hover:text-red-400 transition-colors"
                    >
                      <Camera size={24} />
                    </button>
                  )}
                  <input
                    type="text"
                    value={awayTeam}
                    onChange={(e) => setTeamName('away', e.target.value)}
                    placeholder="Nombre del equipo"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (confirm('¿Reiniciar todo el partido?')) {
                    resetGame();
                    setShowSettings(false);
                  }
                }}
                className="mt-4 py-4 bg-red-600/20 text-red-500 border border-red-500/30 rounded-xl font-bold uppercase tracking-widest hover:bg-red-600/30 transition-colors"
              >
                Reiniciar Partido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer / Quick Actions */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-900 flex justify-center">
        <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
          Flag Football Scoreboard v1.0
        </p>
      </footer>
    </div>
  );
};

export default App;
