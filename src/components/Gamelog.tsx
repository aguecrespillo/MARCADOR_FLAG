import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trash2, History } from 'lucide-react';

export const Gamelog: React.FC = () => {
  // Protección 1: Si scores no existe en el store, usamos un array vacío por defecto
  const scores = useGameStore((state) => state.scores || []);
  const removeScore = useGameStore((state) => state.removeScore);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <History className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Historial de Jugadas</h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {/* Protección 2: Verificamos que sea un array y que tenga contenido antes de hacer .map */}
        {Array.isArray(scores) && scores.length > 0 ? (
          scores.map((event) => (
            <div 
              key={event.id} 
              className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 transition-colors p-3 rounded-lg border-l-4 border-blue-500 shadow-sm"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${event.team === 'home' ? 'text-blue-700' : 'text-red-700'}`}>
                    {event.team === 'home' ? 'LOCAL' : 'VISITANTE'}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded">
                    +{event.points} pts
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-1 italic">
                  Reloj: {event.time || '--:--'}
                </span>
              </div>
              
              <button 
                onClick={() => removeScore(event.id)}
                className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                title="Eliminar jugada"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <History size={48} className="mb-2 opacity-20" />
            <p className="italic text-sm">No hay jugadas registradas aún</p>
          </div>
        )}
      </div>
    </div>
  );
};