import { create } from 'zustand';

interface ScoreEvent {
  id: string;
  team: 'home' | 'away';
  points: number;
  time: string;
}

interface GameState {
  homeScore: number;
  awayScore: number;
  scores: ScoreEvent[]; // <-- IMPORTANTE: Que esté definido aquí
  homeTeam: string;
  awayTeam: string;
  addPoints: (team: 'home' | 'away', pts: number) => void;
  removeScore: (id: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  homeScore: 0,
  awayScore: 0,
  scores: [], // <-- IMPORTANTE: Empezar con un array vacío
  homeTeam: 'LOCAL',
  awayTeam: 'VISITANTE',

  addPoints: (team, pts) => set((state) => {
    const newScore = {
      id: Math.random().toString(36).substr(2, 9),
      team,
      points: pts,
      time: "00:00" // Aquí podrías poner el tiempo real del reloj
    };
    return {
      [team === 'home' ? 'homeScore' : 'awayScore']: (state[team === 'home' ? 'homeScore' : 'awayScore'] || 0) + pts,
      scores: [newScore, ...state.scores]
    };
  }),

  removeScore: (id) => set((state) => {
    const scoreToRemove = state.scores.find(s => s.id === id);
    if (!scoreToRemove) return state;
    return {
      [scoreToRemove.team === 'home' ? 'homeScore' : 'awayScore']: state[scoreToRemove.team === 'home' ? 'homeScore' : 'awayScore'] - scoreToRemove.points,
      scores: state.scores.filter(s => s.id !== id)
    };
  })
}));