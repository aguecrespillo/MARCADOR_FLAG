import { create } from 'zustand';

export const useGameStore = create((set) => ({
  homeTeam: 'LOCAL', 
  awayTeam: 'VISITANTE',
  homeScore: 0, 
  awayScore: 0,
  gameTime: 1200, 
  isRunning: false,
  // ... resto de variables iniciales
  
  tick: () => set((state) => {
    if (state.isRunning && state.gameTime > 0) {
      return { gameTime: state.gameTime - 1 };
    }
    return { isRunning: false };
  }),
  
  toggleClock: () => set((state) => ({ isRunning: !state.isRunning })),
  resetGame: () => set({ homeScore: 0, awayScore: 0, gameTime: 1200, isRunning: false }),
  setTeamName: (team, name) => set((state) => ({ [team === 'home' ? 'homeTeam' : 'awayTeam']: name })),
  addPoints: (team, pts) => set((state) => ({ 
    [team === 'home' ? 'homeScore' : 'awayScore']: state[team === 'home' ? 'homeScore' : 'awayScore'] + pts 
  })),
}));