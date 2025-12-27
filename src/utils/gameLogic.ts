import { Player, VoteRoundResult, GameResult, VoteSummary, GameEndReason } from '../types/game';

// ============================================
// CREATE PLAYERS
// ============================================

export const createPlayers = (
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
// RANDOMIZE PLAYER ORDER
// ============================================

export const createRandomPlayerOrder = (playerCount: number): number[] => {
  const order = Array.from({ length: playerCount }, (_, i) => i);
  // Fisher-Yates shuffle
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

// ============================================
// CALCULATE VOTES
// ============================================

export const calculateVotes = (players: Player[]): VoteSummary[] => {
  const alivePlayers = players.filter(p => !p.isEliminated);
  
  return alivePlayers.map(player => ({
    playerId: player.id,
    playerName: player.displayName,
    votesReceived: alivePlayers.filter(p => p.votedFor === player.id).length,
    votedFor: player.votedFor,
  }));
};

// ============================================
// CHECK WIN CONDITIONS
// ============================================

export const checkWinCondition = (players: Player[]): { 
  gameEnded: boolean; 
  crewmatesWin: boolean; 
  impostorsWin: boolean;
  endReason: GameEndReason | null;
} => {
  const alivePlayers = players.filter(p => !p.isEliminated);
  const aliveImpostors = alivePlayers.filter(p => p.isImpostor);
  const aliveCrewmates = alivePlayers.filter(p => !p.isImpostor);

  // All impostors eliminated - Crewmates win
  if (aliveImpostors.length === 0) {
    return { 
      gameEnded: true, 
      crewmatesWin: true, 
      impostorsWin: false,
      endReason: 'impostor_eliminated'
    };
  }

  // Impostors >= Crewmates - Impostors win
  if (aliveImpostors.length >= aliveCrewmates.length) {
    return { 
      gameEnded: true, 
      crewmatesWin: false, 
      impostorsWin: true,
      endReason: 'impostor_majority'
    };
  }

  // Game continues
  return { 
    gameEnded: false, 
    crewmatesWin: false, 
    impostorsWin: false,
    endReason: null
  };
};

// ============================================
// PROCESS VOTE ROUND
// ============================================

export const processVoteRound = (players: Player[]): VoteRoundResult => {
  const voteSummary = calculateVotes(players);
  
  // Find max votes among alive players
  const maxVotes = Math.max(...voteSummary.map(v => v.votesReceived));
  
  // Find players with max votes
  const playersWithMaxVotes = voteSummary.filter(v => v.votesReceived === maxVotes);
  
  // Check for tie (multiple players with same max votes or no votes cast)
  const isTie = playersWithMaxVotes.length > 1 || maxVotes === 0;
  
  if (isTie) {
    // No elimination on tie
    const winCheck = checkWinCondition(players);
    return {
      eliminatedPlayer: null,
      wasImpostor: false,
      isTie: true,
      voteSummary,
      gameEnded: winCheck.gameEnded,
      endReason: winCheck.endReason,
    };
  }
  
  // Find eliminated player
  const eliminatedPlayerId = playersWithMaxVotes[0].playerId;
  const eliminatedPlayer = players.find(p => p.id === eliminatedPlayerId) || null;
  const wasImpostor = eliminatedPlayer?.isImpostor || false;
  
  // Create updated players list with elimination
  const updatedPlayers = players.map(p => 
    p.id === eliminatedPlayerId ? { ...p, isEliminated: true } : p
  );
  
  // Check win condition after elimination
  const winCheck = checkWinCondition(updatedPlayers);
  
  return {
    eliminatedPlayer,
    wasImpostor,
    isTie: false,
    voteSummary,
    gameEnded: winCheck.gameEnded,
    endReason: winCheck.endReason,
  };
};

// ============================================
// CREATE FINAL GAME RESULT
// ============================================

export const createGameResult = (
  players: Player[],
  allVoteRounds: VoteRoundResult[],
  endReason: GameEndReason
): GameResult => {
  const survivingPlayers = players.filter(p => !p.isEliminated);
  const eliminatedPlayers = players.filter(p => p.isEliminated);
  const aliveImpostors = survivingPlayers.filter(p => p.isImpostor);
  
  return {
    crewmatesWin: aliveImpostors.length === 0,
    impostorsWin: aliveImpostors.length > 0,
    endReason,
    allVoteRounds,
    survivingPlayers,
    eliminatedPlayers,
  };
};

// ============================================
// GET MAX IMPOSTORS
// ============================================

export const getMaxImpostors = (playerCount: number): number => {
  return Math.max(1, Math.floor((playerCount - 1) / 3));
};

// ============================================
// GET ALIVE PLAYERS
// ============================================

export const getAlivePlayers = (players: Player[]): Player[] => {
  return players.filter(p => !p.isEliminated);
};

// ============================================
// RESET PLAYERS FOR NEW VOTE ROUND
// ============================================

export const resetPlayersForVoting = (players: Player[]): Player[] => {
  return players.map(p => ({
    ...p,
    hasVoted: false,
    votedFor: null,
  }));
};