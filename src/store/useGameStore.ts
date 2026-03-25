import { create } from 'zustand';
import { db } from '../lib/firebase';
import { ref, onValue, set } from 'firebase/database';

export const useGameStore = create((getSet, get) => {
  const gameRef = ref(db, 'currentGame');

  // Escuchar cambios de la nube en tiempo real
  onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    if (data) getSet(data);
  });

  const sync = (newState: any) => {
    set(gameRef, { ...get(), ...newState });
  };

  return {
    homeTeam: 'LOCAL',
    awayTeam: 'VISITANTE',
    homeScore: 0,
    awayScore: 0,
    homeTimeouts: 2,
    awayTimeouts: 2,
    timeLeft: 1200,
    isRunning: false,
    period: 1,
    history: [],
    homeRoster: [],
    awayRoster: [],

    // Acciones que se sincronizan con la nube
    updateTeams: (data: any) => sync(data),
    
    addPlayer: (team: 'home' | 'away', player: any) => {
      const key = team === 'home' ? 'homeRoster' : 'awayRoster';
      sync({ [key]: [...(get() as any)[key], player] });
    },

    recordPlay: (team: 'home' | 'away', pts: number, playerName: string, time: string) => {
      const scoreKey = team === 'home' ? 'homeScore' : 'awayScore';
      const newHistory = [{ id: Date.now(), team, playerName, pts, time, period: (get() as any).period }, ...(get() as any).history];
      sync({ 
        [scoreKey]: (get() as any)[scoreKey] + pts,
        history: newHistory
      });
    },

    toggleTimer: () => sync({ isRunning: !(get() as any).isRunning }),
    
    tick: () => {
      const state: any = get();
      if (state.isRunning && state.timeLeft > 0) {
        sync({ timeLeft: state.timeLeft - 1 });
      } else if (state.timeLeft === 0) {
        sync({ isRunning: false });
      }
    },

    resetGame: () => sync({
      homeScore: 0, awayScore: 0, homeTimeouts: 2, awayTimeouts: 2,
      timeLeft: 1200, isRunning: false, period: 1, history: [],
      homeRoster: [], awayRoster: []
    })
  };
});