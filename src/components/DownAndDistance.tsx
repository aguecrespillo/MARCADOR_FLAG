import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { ChevronUp, ChevronDown, Flag, Crosshair, Target } from 'lucide-react';

export const DownAndDistance: React.FC = () => {
  const { down, distance, setDown, setDistance } = useGameStore();

  const handleDownChange = (delta: number) => {
    const next = down + delta;
    if (next >= 1 && next <= 4) setDown(next);
  };

  const handleDistanceChange = (delta: number) => {
    const next = distance + delta;
    if (next >= 1 && next <= 99) setDistance(next);
  };

  const presets = [
    { label: 'Medio', value: 50, icon: Flag, color: 'bg-yellow-600' },
    { label: 'Gol', value: 10, icon: Crosshair, color: 'bg-green-600' },
    { label: 'TD', value: 20, icon: Target, color: 'bg-blue-600' },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-slate-800 rounded-2xl shadow-xl text-white">
      {/* Quick Presets */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setDistance(preset.value)}
            className={`${preset.color} hover:opacity-80 py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all active:scale-95`}
          >
            <preset.icon size={14} />
            <span className="text-xs font-bold">{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Down & Distance */}
      <div className="grid grid-cols-2 gap-2">
        {/* Down */}
        <div className="flex flex-col items-center p-3 bg-slate-700 rounded-xl">
          <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Down</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleDownChange(-1)} className="p-1 hover:bg-slate-600 rounded"><ChevronDown size={16} /></button>
            <span className="text-2xl font-black">{down}</span>
            <button onClick={() => handleDownChange(1)} className="p-1 hover:bg-slate-600 rounded"><ChevronUp size={16} /></button>
          </div>
        </div>

        {/* Distance */}
        <div className="flex flex-col items-center p-3 bg-slate-700 rounded-xl">
          <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Yardas para 1º</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleDistanceChange(-1)} className="p-1 hover:bg-slate-600 rounded"><ChevronDown size={16} /></button>
            <span className="text-2xl font-black">{distance}</span>
            <button onClick={() => handleDistanceChange(1)} className="p-1 hover:bg-slate-600 rounded"><ChevronUp size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};