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
  | 'hiding'        // NEW: Transition phase to hide role
  | 'discussion'
  | 'voting'
  | 'votingResults' // NEW: Show who was eliminated
  | 'results';      // Final game results

// ============================================
// GAME RESULT TYPES
// ============================================

export type GameEndReason =
  | 'impostor_eliminated'    // All impostors eliminated
  | 'impostor_majority'      // Impostors >= Crewmates
  | 'tie_vote';              // Tie in final round

export interface VoteRoundResult {
  eliminatedPlayer: Player | null;
  wasImpostor: boolean;
  isTie: boolean;
  voteSummary: VoteSummary[];
  gameEnded: boolean;
  endReason: GameEndReason | null;
}

export interface GameResult {
  crewmatesWin: boolean;
  impostorsWin: boolean;
  endReason: GameEndReason;
  allVoteRounds: VoteRoundResult[];
  survivingPlayers: Player[];
  eliminatedPlayers: Player[];
}

export interface VoteSummary {
  playerId: number;
  playerName: string;
  votesReceived: number;
  votedFor: number | null;
}

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
  voteRound: number;
  lastVoteResult: VoteRoundResult | null;
  gameResult: GameResult | null;
  playerOrder: number[]; // NEW: Randomized order for role reveal
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
  voteRound: 0,
  lastVoteResult: null,
  gameResult: null,
  playerOrder: [],
};