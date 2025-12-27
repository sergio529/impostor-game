import { Player, GameResult, VoteSummary } from '../types/game';

export const createPlayers = (
  playerCount: number,
  impostorCount: number,
  secretWord: string
): Player[] => {
  // Create array of impostor indices
  const impostorIndices = new Set<number>();
  while (impostorIndices.size < impostorCount) {
    impostorIndices.add(Math.floor(Math.random() * playerCount));
  }

  // Create players
  return Array.from({ length: playerCount }, (_, index) => ({
    id: index + 1,
    displayName: `Player ${index + 1}`,
    isImpostor: impostorIndices.has(index),
    secretWord: impostorIndices.has(index) ? '???' : secretWord,
    hasSeenRole: false,
    hasVoted: false,
    votedFor: null,
    isEliminated: false,
    votesReceived: 0,
  }));
};

export const calculateVotes = (players: Player[]): VoteSummary[] => {
  return players.map(player => ({
    playerId: player.id,
    playerName: player.displayName,
    votesReceived: players.filter(p => p.votedFor === player.id).length,
    votedFor: player.votedFor,
  }));
};

export const determineGameResult = (players: Player[]): GameResult => {
  const voteSummary = calculateVotes(players);
  
  // Find max votes
  const maxVotes = Math.max(...voteSummary.map(v => v.votesReceived));
  
  // Find players with max votes
  const playersWithMaxVotes = voteSummary.filter(v => v.votesReceived === maxVotes);
  
  // Check for tie
  const isTie = playersWithMaxVotes.length > 1 || maxVotes === 0;
  
  if (isTie) {
    return {
      eliminatedPlayer: null,
      wasImpostor: false,
      crewmatesWin: false,
      impostorsWin: true,
      isTie: true,
      voteSummary,
    };
  }
  
  // Find eliminated player
  const eliminatedPlayerId = playersWithMaxVotes[0].playerId;
  const eliminatedPlayer = players.find(p => p.id === eliminatedPlayerId) || null;
  const wasImpostor = eliminatedPlayer?.isImpostor || false;
  
  return {
    eliminatedPlayer,
    wasImpostor,
    crewmatesWin: wasImpostor,
    impostorsWin: !wasImpostor,
    isTie: false,
    voteSummary,
  };
};

export const getMaxImpostors = (playerCount: number): number => {
  return Math.max(1, Math.floor((playerCount - 1) / 3));
};