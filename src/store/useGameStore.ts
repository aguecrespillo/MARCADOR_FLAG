import { create } from 'zustand';

export type Team = 'home' | 'away';

export interface Player {
  id: string;
  name: string;
  number: string;
}

export interface ScoringEvent {
  id: string;
  team: Team;
  points: number;
  type: 'TD' | 'XP1' | 'XP2' | 'SAFETY' | 'DEF_XP2' | 'MANUAL';
  timestamp: number;
  gameTime: number;
  scorer?: string; // player name who scored
}

interface GameState {
  homeTeam: string;
  awayTeam: string;
  homeTeamImage: string;
  awayTeamImage: string;
  homeScore: number;
  awayScore: number;
  homeTimeouts: number;
  awayTimeouts: number;
  gameTime: number; // in seconds
  isRunning: boolean;
  period: number;
  maxPeriods: number;
  down: number;
  distance: number;
  ballOn: number;
  history: ScoringEvent[];
  homeRoster: Player[];
  awayRoster: Player[];

  // Actions
  setTeamName: (team: Team, name: string) => void;
  setTeamImage: (team: Team, image: string) => void;
  addPoints: (team: Team, points: number, type: ScoringEvent['type'], scorer?: string) => void;
  undoLastEvent: () => void;
  resetGame: () => void;
  toggleClock: () => void;
  tick: () => void;
  setGameTime: (seconds: number) => void;
  useTimeout: (team: Team) => void;
  resetTimeouts: (team: Team) => void;
  setDown: (down: number) => void;
  setDistance: (distance: number) => void;
  setBallOn: (yard: number) => void;
  setPeriod: (period: number) => void;
  addPlayer: (team: Team, player: Player) => void;
  removePlayer: (team: Team, playerId: string) => void;
  nextPeriod: () => void;
}

const INITIAL_TIME = 20 * 60; // 20 minutes

export const useGameStore = create<GameState>((set, get) => ({
  homeTeam: 'Local',
  awayTeam: 'Visitante',
  homeTeamImage: '',
  awayTeamImage: '',
  homeScore: 0,
  awayScore: 0,
  homeTimeouts: 3,
  awayTimeouts: 3,
  gameTime: INITIAL_TIME,
  isRunning: false,
  period: 1,
  maxPeriods: 2,
  down: 1,
  distance: 10,
  ballOn: 20,
  history: [],
  homeRoster: [],
  awayRoster: [],

  setTeamName: (team, name) => set((state) => ({
    [team === 'home' ? 'homeTeam' : 'awayTeam']: name
  })),

  setTeamImage: (team, image) => set((state) => ({
    [team === 'home' ? 'homeTeamImage' : 'awayTeamImage']: image
  })),

  addPoints: (team, points, type, scorer) => set((state) => {
    const event: ScoringEvent = {
      id: Math.random().toString(36).substring(7),
      team,
      points,
      type,
      timestamp: Date.now(),
      gameTime: state.gameTime,
      scorer,
    };
    
    return {
      [team === 'home' ? 'homeScore' : 'awayScore']: state[team === 'home' ? 'homeScore' : 'awayScore'] + points,
      history: [event, ...state.history]
    };
  }),

  undoLastEvent: () => set((state) => {
    if (state.history.length === 0) return state;
    const lastEvent = state.history[0];
    const newHistory = state.history.slice(1);
    
    return {
      [lastEvent.team === 'home' ? 'homeScore' : 'awayScore']: state[lastEvent.team === 'home' ? 'homeScore' : 'awayScore'] - lastEvent.points,
      history: newHistory
    };
  }),

  resetGame: () => set({
    homeScore: 0,
    awayScore: 0,
    homeTimeouts: 3,
    awayTimeouts: 3,
    gameTime: INITIAL_TIME,
    isRunning: false,
    period: 1,
    maxPeriods: 2,
    down: 1,
    distance: 10,
    ballOn: 20,
    history: [],
    homeRoster: [],
    awayRoster: [],
  }),

  toggleClock: () => set((state) => ({ isRunning: !state.isRunning })),

  tick: () => set((state) => {
    if (!state.isRunning || state.gameTime <= 0) return { isRunning: false };
    return { gameTime: state.gameTime - 1 };
  }),

  setGameTime: (seconds) => set({ gameTime: seconds }),

  useTimeout: (team) => set((state) => {
    const key = team === 'home' ? 'homeTimeouts' : 'awayTimeouts';
    if (state[key] <= 0) return state;
    return { [key]: state[key] - 1, isRunning: false };
  }),

  resetTimeouts: (team) => set((state) => ({
    [team === 'home' ? 'homeTimeouts' : 'awayTimeouts']: 3
  })),

  setDown: (down) => set({ down }),
  setDistance: (distance) => set({ distance }),
  setBallOn: (yard) => set({ ballOn }),
  setPeriod: (period) => set({ period }),

  addPlayer: (team, player) => set((state) => ({
    [team === 'home' ? 'homeRoster' : 'awayRoster']: [
      ...state[team === 'home' ? 'homeRoster' : 'awayRoster'],
      player
    ]
  })),

  removePlayer: (team, playerId) => set((state) => ({
    [team === 'home' ? 'homeRoster' : 'awayRoster']: state[team === 'home' ? 'homeRoster' : 'awayRoster'].filter(p => p.id !== playerId)
  })),

  nextPeriod: () => set((state) => {
    if (state.period >= state.maxPeriods) return state;
    return {
      period: state.period + 1,
      gameTime: INITIAL_TIME,
      isRunning: false,
    };
  }),

}));
