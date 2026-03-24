import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { History, Trash2 } from 'lucide-react';

export const Gamelog: React.FC = () => {
  // Nota: Asegúrate de que useGameStore tenga la acción 'undoLastEvent' o 'removeScore'
  // En la versión que te pasé antes, usamos 'undoLastEvent' por simplicidad, 
  // pero si quieres borrar una específica, usaremos esta lógica:
  const { history, undoLastEvent, homeTeam, awayTeam } = useGameStore();

  // Filtramos eventos (si quieres mostrar solo los que tienen nombre de jugador)
  const scores = history; 

  return (
    <div className="mt-6 bg-slate-800/50 rounded-xl border border-dashed border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-4 text-slate-400">
        <History size={20} />
        <h3 className="font-bold uppercase tracking-wider text-sm">Historial de Anotaciones</h3>
      </div>

      {scores.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
          <History size={48} className="mb-2 opacity-20" />
          <p className="text-sm">No hay eventos registrados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Mostramos el historial. El .map ya viene en orden por el Store */}
          {scores.map((event) => (
            <div 
              key={event.id} 
              className="flex items-center justify-between bg-slate-900/80 p-3 rounded-lg border border-slate-700 animate-in slide-in-from-top-2"
            >
              <div className="flex flex-col text-left">
                <span className={`text-[10px] font-bold uppercase mb-1 ${event.team === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
                  {event.team === 'home' ? homeTeam : awayTeam}
                </span>
                <span className="text-white font-medium text-sm">
                  {event.scorer || 'Anotación'} <span className="text-slate-400">+{event.points} ({event.type})</span>
                </span>
              </div>
              
              <button 
                onClick={() => { 
                  if(confirm('¿Deshacer la última acción?')) undoLastEvent(); 
                }}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Deshacer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};