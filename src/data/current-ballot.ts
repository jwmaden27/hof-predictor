import type { PositionCategory } from '@/types/index.ts'

export interface BallotCandidate {
  playerId: number
  playerName: string
  positionCategory: PositionCategory
  ballotYear: number
  votePercentage: number | null // null for candidates who haven't been voted on yet
  votes: number | null
  isElected: boolean
  isNewToAllot: boolean
}

/**
 * 2026 BBWAA Hall of Fame Ballot
 * Source: Baseball Reference, Baseball Hall of Fame
 *
 * Election results announced January 21, 2026
 * 425 ballots cast, 319 votes needed for election (75%)
 */
export const CURRENT_BALLOT_YEAR = 2026

export const CURRENT_BALLOT: BallotCandidate[] = [
  // Elected
  { playerId: 111062, playerName: 'Carlos Beltrán', positionCategory: 'CF', ballotYear: 4, votePercentage: 84.2, votes: 358, isElected: true, isNewToAllot: false },
  { playerId: 116662, playerName: 'Andruw Jones', positionCategory: 'CF', ballotYear: 9, votePercentage: 78.4, votes: 333, isElected: true, isNewToAllot: false },

  // Returning candidates (in order of vote percentage)
  { playerId: 400284, playerName: 'Chase Utley', positionCategory: '2B', ballotYear: 3, votePercentage: 59.1, votes: 251, isElected: false, isNewToAllot: false },
  { playerId: 120485, playerName: 'Andy Pettitte', positionCategory: 'SP', ballotYear: 8, votePercentage: 48.5, votes: 206, isElected: false, isNewToAllot: false },
  { playerId: 433587, playerName: 'Félix Hernández', positionCategory: 'SP', ballotYear: 2, votePercentage: 46.1, votes: 196, isElected: false, isNewToAllot: false },
  { playerId: 121347, playerName: 'Alex Rodriguez', positionCategory: 'SS', ballotYear: 5, votePercentage: 40.0, votes: 170, isElected: false, isNewToAllot: false },
  { playerId: 120820, playerName: 'Manny Ramirez', positionCategory: 'LF', ballotYear: 10, votePercentage: 38.8, votes: 165, isElected: false, isNewToAllot: false },
  { playerId: 110253, playerName: 'Bobby Abreu', positionCategory: 'RF', ballotYear: 7, votePercentage: 30.8, votes: 131, isElected: false, isNewToAllot: false },
  { playerId: 276519, playerName: 'Jimmy Rollins', positionCategory: 'SS', ballotYear: 5, votePercentage: 25.4, votes: 108, isElected: false, isNewToAllot: false },
  { playerId: 430935, playerName: 'Cole Hamels', positionCategory: 'SP', ballotYear: 1, votePercentage: 23.8, votes: 101, isElected: false, isNewToAllot: true },
  { playerId: 456030, playerName: 'Dustin Pedroia', positionCategory: '2B', ballotYear: 2, votePercentage: 20.7, votes: 88, isElected: false, isNewToAllot: false },
  { playerId: 279824, playerName: 'Mark Buehrle', positionCategory: 'SP', ballotYear: 6, votePercentage: 20.0, votes: 85, isElected: false, isNewToAllot: false },
  { playerId: 113781, playerName: 'Omar Vizquel', positionCategory: 'SS', ballotYear: 9, votePercentage: 18.4, votes: 78, isElected: false, isNewToAllot: false },
  { playerId: 431151, playerName: 'David Wright', positionCategory: '3B', ballotYear: 3, votePercentage: 14.8, votes: 63, isElected: false, isNewToAllot: false },
  { playerId: 408061, playerName: 'Francisco Rodríguez', positionCategory: 'RP', ballotYear: 4, votePercentage: 11.8, votes: 50, isElected: false, isNewToAllot: false },
  { playerId: 408312, playerName: 'Torii Hunter', positionCategory: 'CF', ballotYear: 6, votePercentage: 5.1, votes: 22, isElected: false, isNewToAllot: false },

  // First-year candidates (new to ballot in 2026)
  { playerId: 501981, playerName: 'Ryan Braun', positionCategory: 'LF', ballotYear: 1, votePercentage: 4.0, votes: 17, isElected: false, isNewToAllot: true },
  { playerId: 461314, playerName: 'Matt Kemp', positionCategory: 'CF', ballotYear: 1, votePercentage: 3.5, votes: 15, isElected: false, isNewToAllot: true },
  { playerId: 435062, playerName: 'Howie Kendrick', positionCategory: '2B', ballotYear: 1, votePercentage: 1.2, votes: 5, isElected: false, isNewToAllot: true },
  { playerId: 502517, playerName: 'Daniel Murphy', positionCategory: '2B', ballotYear: 1, votePercentage: 0.9, votes: 4, isElected: false, isNewToAllot: true },
  { playerId: 461829, playerName: 'Rick Porcello', positionCategory: 'SP', ballotYear: 1, votePercentage: 0.7, votes: 3, isElected: false, isNewToAllot: true },
  { playerId: 461121, playerName: 'Gio González', positionCategory: 'SP', ballotYear: 1, votePercentage: 0.5, votes: 2, isElected: false, isNewToAllot: true },
  { playerId: 429665, playerName: 'Edwin Encarnación', positionCategory: '1B', ballotYear: 1, votePercentage: 0.5, votes: 2, isElected: false, isNewToAllot: true },
  { playerId: 460086, playerName: 'Alex Gordon', positionCategory: 'LF', ballotYear: 1, votePercentage: 0.2, votes: 1, isElected: false, isNewToAllot: true },
  { playerId: 425783, playerName: 'Shin-Soo Choo', positionCategory: 'RF', ballotYear: 1, votePercentage: 0.2, votes: 1, isElected: false, isNewToAllot: true },
  { playerId: 455976, playerName: 'Nick Markakis', positionCategory: 'RF', ballotYear: 1, votePercentage: 0.0, votes: 0, isElected: false, isNewToAllot: true },
  { playerId: 452254, playerName: 'Hunter Pence', positionCategory: 'RF', ballotYear: 1, votePercentage: 0.0, votes: 0, isElected: false, isNewToAllot: true },
]

// Get only players still on the ballot (not elected, and received >= 5% votes or are first-year)
export function getActiveBallotCandidates(): BallotCandidate[] {
  return CURRENT_BALLOT.filter(c => !c.isElected && (c.votePercentage === null || c.votePercentage >= 5 || c.ballotYear === 1))
}

// Get players who were elected this year
export function getNewlyElected(): BallotCandidate[] {
  return CURRENT_BALLOT.filter(c => c.isElected)
}

// Get all candidates sorted by vote percentage
export function getAllBallotCandidates(): BallotCandidate[] {
  return [...CURRENT_BALLOT].sort((a, b) => (b.votePercentage ?? 0) - (a.votePercentage ?? 0))
}
