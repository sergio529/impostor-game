// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  id: string;
  name: string;
  icon: string;
  words: string[];
  isCustom?: boolean;
}

// ============================================
// PLAYER TYPES
// ============================================

export interface Player {
  id: number;
  displayName: string;
  isImpostor: boolean;
  secretWord: string;
  hasSeenRole: boolean;
  hasVoted: boolean;
  votedFor: number | null;
  isEliminated: boolean;
  votesReceived: number;
}

// ============================================
// GAME SETTINGS
// ============================================

export interface GameSettings {
  playerCount: number;
  impostorCount: number;
  discussionTime: number;
  selectedCategory: Category | null;
  showTimer: boolean;
  allowSkipVote: boolean;
  playerNames: string[];
}

export const DEFAULT_SETTINGS: GameSettings = {
  playerCount: 5,
  impostorCount: 1,
  discussionTime: 180,
  selectedCategory: null,
  showTimer: true,
  allowSkipVote: true,
  playerNames: [],
};

// ============================================
// GAME PHASE
// ============================================

export type GamePhase =
  | 'idle'
  | 'setup'
  | 'passing'
  | 'revealing'
  | 'discussion'
  | 'voting'
  | 'results';

// ============================================
// GAME STATE
// ============================================

export interface GameState {
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
  currentVoterIndex: number;
  secretWord: string;
  settings: GameSettings;
  round: number;
  gameResult: GameResult | null;
}

export interface GameResult {
  eliminatedPlayer: Player | null;
  wasImpostor: boolean;
  crewmatesWin: boolean;
  impostorsWin: boolean;
  isTie: boolean;
  voteSummary: VoteSummary[];
}

export interface VoteSummary {
  playerId: number;
  playerName: string;
  votesReceived: number;
  votedFor: number | null;
}

// ============================================
// INITIAL STATE
// ============================================

export const INITIAL_GAME_STATE: GameState = {
  phase: 'idle',
  players: [],
  currentPlayerIndex: 0,
  currentVoterIndex: 0,
  secretWord: '',
  settings: DEFAULT_SETTINGS,
  round: 0,
  gameResult: null,
};