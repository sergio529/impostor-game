import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  GameState,
  Player,
  Category,
  VoteRoundResult,
  GameResult,
  INITIAL_GAME_STATE,
} from '../types/game';
import { getRandomWord } from '../data/categories';
import {
  createPlayers,
  createRandomPlayerOrder,
  processVoteRound,
  getMaxImpostors,
  resetPlayersForVoting,
  getAlivePlayers,
} from '../utils/gameLogic';

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
  | { type: 'HIDE_ROLE' }
  | { type: 'START_DISCUSSION' }
  | { type: 'START_VOTING' }
  | { type: 'CAST_VOTE'; payload: { voterId: number; targetId: number | null } }
  | { type: 'NEXT_VOTER' }
  | { type: 'PROCESS_VOTES' }
  | { type: 'CONTINUE_GAME' }
  | { type: 'END_GAME' }
  | { type: 'NEW_ROUND' }
  | { type: 'RESET_GAME' };

// ============================================
// REDUCER
// ============================================

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_PLAYER_COUNT': {
      const newPlayerCount = action.payload;
      const maxImpostors = getMaxImpostors(newPlayerCount);

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

      const playerOrder = createRandomPlayerOrder(state.settings.playerCount);

      return {
        ...state,
        phase: 'passing',
        players,
        secretWord,
        currentPlayerIndex: 0,
        currentVoterIndex: 0,
        round: state.round + 1,
        voteRound: 0,
        lastVoteResult: null,
        gameResult: null,
        playerOrder,
      };
    }

    case 'PLAYER_READY': {
      return {
        ...state,
        phase: 'revealing',
      };
    }

    case 'PLAYER_SAW_ROLE': {
      const actualPlayerIndex = state.playerOrder[state.currentPlayerIndex];

      const updatedPlayers = state.players.map((player, index) =>
        index === actualPlayerIndex
          ? { ...player, hasSeenRole: true }
          : player
      );

      return {
        ...state,
        players: updatedPlayers,
        phase: 'hiding',
      };
    }

    case 'HIDE_ROLE': {
      const nextIndex = state.currentPlayerIndex + 1;
      const allPlayersSawRole = nextIndex >= state.players.length;

      if (allPlayersSawRole) {
        return {
          ...state,
          phase: 'discussion',
          currentPlayerIndex: 0,
        };
      }

      return {
        ...state,
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
      const resetPlayers = resetPlayersForVoting(state.players);

      return {
        ...state,
        phase: 'voting',
        players: resetPlayers,
        currentVoterIndex: 0,
        voteRound: state.voteRound + 1,
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
      const alivePlayers = getAlivePlayers(state.players);
      const allVoted = alivePlayers.every(p => p.hasVoted);

      if (allVoted) {
        const voteResult = processVoteRound(state.players);

        const updatedPlayers = voteResult.eliminatedPlayer
          ? state.players.map(p =>
              p.id === voteResult.eliminatedPlayer!.id
                ? { ...p, isEliminated: true }
                : p
            )
          : state.players;

        return {
          ...state,
          players: updatedPlayers,
          phase: 'votingResults',
          lastVoteResult: voteResult,
        };
      }

      return {
        ...state,
        currentVoterIndex: state.currentVoterIndex + 1,
      };
    }

    case 'PROCESS_VOTES': {
      const voteResult = processVoteRound(state.players);

      const updatedPlayers = voteResult.eliminatedPlayer
        ? state.players.map(p =>
            p.id === voteResult.eliminatedPlayer!.id
              ? { ...p, isEliminated: true }
              : p
          )
        : state.players;

      return {
        ...state,
        players: updatedPlayers,
        phase: 'votingResults',
        lastVoteResult: voteResult,
      };
    }

    case 'CONTINUE_GAME': {
      const resetPlayers = resetPlayersForVoting(state.players);

      return {
        ...state,
        players: resetPlayers,
        phase: 'discussion',
        currentVoterIndex: 0,
      };
    }

    case 'END_GAME': {
      const survivingPlayers = state.players.filter(p => !p.isEliminated);
      const eliminatedPlayers = state.players.filter(p => p.isEliminated);
      const aliveImpostors = survivingPlayers.filter(p => p.isImpostor);

      const gameResult: GameResult = {
        crewmatesWin: aliveImpostors.length === 0,
        impostorsWin: aliveImpostors.length > 0,
        endReason: aliveImpostors.length === 0 ? 'impostor_eliminated' : 'impostor_majority',
        allVoteRounds: state.lastVoteResult ? [state.lastVoteResult] : [],
        survivingPlayers,
        eliminatedPlayers,
      };

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

      const playerOrder = createRandomPlayerOrder(state.settings.playerCount);

      return {
        ...state,
        phase: 'passing',
        players,
        secretWord,
        currentPlayerIndex: 0,
        currentVoterIndex: 0,
        round: state.round + 1,
        voteRound: 0,
        lastVoteResult: null,
        gameResult: null,
        playerOrder,
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
  alivePlayers: Player[];
  aliveImpostors: Player[];
  aliveCrewmates: Player[];
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

  const actualPlayerIndex = state.playerOrder[state.currentPlayerIndex] ?? 0;
  const currentPlayer = state.players[actualPlayerIndex] || null;

  const alivePlayers = state.players.filter(p => !p.isEliminated);
  const alivePlayersWhoNeedToVote = alivePlayers.filter(p => !p.hasVoted);
  const currentVoter = alivePlayersWhoNeedToVote[0] || null;

  const impostors = state.players.filter(p => p.isImpostor);
  const crewmates = state.players.filter(p => !p.isImpostor);
  const aliveImpostors = alivePlayers.filter(p => p.isImpostor);
  const aliveCrewmates = alivePlayers.filter(p => !p.isImpostor);

  const value: GameContextType = {
    state,
    dispatch,
    currentPlayer,
    currentVoter,
    impostors,
    crewmates,
    alivePlayers,
    aliveImpostors,
    aliveCrewmates,
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