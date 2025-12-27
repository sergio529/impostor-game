import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  GameState,
  Player,
  Category,
  INITIAL_GAME_STATE,
} from '../types/game';
import { getRandomWord } from '../data/categories';
import { determineGameResult, getMaxImpostors } from '../utils/gameLogic';

// ============================================
// ACTION TYPES
// ============================================

type GameAction =
  | { type: 'SET_PLAYER_COUNT'; payload: number }
  | { type: 'SET_IMPOSTOR_COUNT'; payload: number }
  | { type: 'SET_CATEGORY'; payload: Category }
  | { type: 'SET_DISCUSSION_TIME'; payload: number }
  | { type: 'SET_PLAYER_NAMES'; payload: string[] }
  | { type: 'START_GAME' }
  | { type: 'PLAYER_READY' }
  | { type: 'PLAYER_SAW_ROLE' }
  | { type: 'START_DISCUSSION' }
  | { type: 'START_VOTING' }
  | { type: 'CAST_VOTE'; payload: { voterId: number; targetId: number | null } }
  | { type: 'NEXT_VOTER' }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'NEW_ROUND' }
  | { type: 'RESET_GAME' };

// ============================================
// HELPER: CREATE PLAYERS
// ============================================

const createPlayers = (
  playerCount: number,
  impostorCount: number,
  secretWord: string,
  playerNames: string[]
): Player[] => {
  // Create array of impostor indices
  const impostorIndices = new Set<number>();
  while (impostorIndices.size < impostorCount) {
    impostorIndices.add(Math.floor(Math.random() * playerCount));
  }

  // Create players with custom names or default names
  return Array.from({ length: playerCount }, (_, index) => {
    const customName = playerNames[index]?.trim();
    return {
      id: index + 1,
      displayName: customName || `Player ${index + 1}`,
      isImpostor: impostorIndices.has(index),
      secretWord: impostorIndices.has(index) ? '???' : secretWord,
      hasSeenRole: false,
      hasVoted: false,
      votedFor: null,
      isEliminated: false,
      votesReceived: 0,
    };
  });
};

// ============================================
// REDUCER
// ============================================

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_PLAYER_COUNT': {
      const newPlayerCount = action.payload;
      const maxImpostors = getMaxImpostors(newPlayerCount);

      // Adjust player names array
      let newPlayerNames = [...state.settings.playerNames];
      if (newPlayerCount > newPlayerNames.length) {
        for (let i = newPlayerNames.length; i < newPlayerCount; i++) {
          newPlayerNames.push('');
        }
      } else {
        newPlayerNames = newPlayerNames.slice(0, newPlayerCount);
      }

      return {
        ...state,
        settings: {
          ...state.settings,
          playerCount: newPlayerCount,
          impostorCount: Math.min(state.settings.impostorCount, maxImpostors),
          playerNames: newPlayerNames,
        },
      };
    }

    case 'SET_IMPOSTOR_COUNT': {
      return {
        ...state,
        settings: {
          ...state.settings,
          impostorCount: action.payload,
        },
      };
    }

    case 'SET_CATEGORY': {
      return {
        ...state,
        settings: {
          ...state.settings,
          selectedCategory: action.payload,
        },
      };
    }

    case 'SET_DISCUSSION_TIME': {
      return {
        ...state,
        settings: {
          ...state.settings,
          discussionTime: action.payload,
        },
      };
    }

    case 'SET_PLAYER_NAMES': {
      return {
        ...state,
        settings: {
          ...state.settings,
          playerNames: action.payload,
        },
      };
    }

    case 'START_GAME': {
      if (!state.settings.selectedCategory) return state;

      const secretWord = getRandomWord(state.settings.selectedCategory);
      const players = createPlayers(
        state.settings.playerCount,
        state.settings.impostorCount,
        secretWord,
        state.settings.playerNames
      );

      return {
        ...state,
        phase: 'passing',
        players,
        secretWord,
        currentPlayerIndex: 0,
        currentVoterIndex: 0,
        round: state.round + 1,
        gameResult: null,
      };
    }

    case 'PLAYER_READY': {
      return {
        ...state,
        phase: 'revealing',
      };
    }

    case 'PLAYER_SAW_ROLE': {
      const updatedPlayers = state.players.map((player, index) =>
        index === state.currentPlayerIndex
          ? { ...player, hasSeenRole: true }
          : player
      );

      const nextIndex = state.currentPlayerIndex + 1;
      const allPlayersSawRole = nextIndex >= state.players.length;

      if (allPlayersSawRole) {
        return {
          ...state,
          players: updatedPlayers,
          phase: 'discussion',
          currentPlayerIndex: 0,
        };
      }

      return {
        ...state,
        players: updatedPlayers,
        phase: 'passing',
        currentPlayerIndex: nextIndex,
      };
    }

    case 'START_DISCUSSION': {
      return {
        ...state,
        phase: 'discussion',
      };
    }

    case 'START_VOTING': {
      return {
        ...state,
        phase: 'voting',
        currentVoterIndex: 0,
      };
    }

    case 'CAST_VOTE': {
      const { voterId, targetId } = action.payload;
      const updatedPlayers = state.players.map((player) =>
        player.id === voterId
          ? { ...player, hasVoted: true, votedFor: targetId }
          : player
      );

      return {
        ...state,
        players: updatedPlayers,
      };
    }

    case 'NEXT_VOTER': {
      const nextVoterIndex = state.currentVoterIndex + 1;
      const allPlayersVoted = nextVoterIndex >= state.players.length;

      if (allPlayersVoted) {
        const gameResult = determineGameResult(state.players);
        return {
          ...state,
          phase: 'results',
          gameResult,
        };
      }

      return {
        ...state,
        currentVoterIndex: nextVoterIndex,
      };
    }

    case 'CALCULATE_RESULTS': {
      const gameResult = determineGameResult(state.players);
      return {
        ...state,
        phase: 'results',
        gameResult,
      };
    }

    case 'NEW_ROUND': {
      if (!state.settings.selectedCategory) return state;

      const secretWord = getRandomWord(state.settings.selectedCategory);
      const players = createPlayers(
        state.settings.playerCount,
        state.settings.impostorCount,
        secretWord,
        state.settings.playerNames
      );

      return {
        ...state,
        phase: 'passing',
        players,
        secretWord,
        currentPlayerIndex: 0,
        currentVoterIndex: 0,
        round: state.round + 1,
        gameResult: null,
      };
    }

    case 'RESET_GAME': {
      return {
        ...INITIAL_GAME_STATE,
        settings: {
          ...INITIAL_GAME_STATE.settings,
          playerNames: [],
        },
      };
    }

    default:
      return state;
  }
};

// ============================================
// CONTEXT
// ============================================

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  currentPlayer: Player | null;
  currentVoter: Player | null;
  impostors: Player[];
  crewmates: Player[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  const currentPlayer = state.players[state.currentPlayerIndex] || null;
  const currentVoter = state.players[state.currentVoterIndex] || null;
  const impostors = state.players.filter((p) => p.isImpostor);
  const crewmates = state.players.filter((p) => !p.isImpostor);

  const value: GameContextType = {
    state,
    dispatch,
    currentPlayer,
    currentVoter,
    impostors,
    crewmates,
  };

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};