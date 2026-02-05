export interface PlayerBio {
  id: number
  fullName: string
  firstName: string
  lastName: string
  primaryPosition: PositionInfo
  birthDate: string
  currentAge: number
  birthCity: string
  birthCountry: string
  height: string
  weight: number
  batSide: { code: string; description: string }
  pitchHand: { code: string; description: string }
  active: boolean
  mlbDebutDate: string
  currentTeam?: { id: number; name: string }
  primaryNumber?: string
}

export interface PositionInfo {
  code: string
  name: string
  type: string
  abbreviation: string
}

export type PositionCategory =
  | 'C'
  | '1B'
  | '2B'
  | '3B'
  | 'SS'
  | 'LF'
  | 'CF'
  | 'RF'
  | 'SP'
  | 'RP'

export interface HittingStats {
  gamesPlayed: number
  atBats: number
  hits: number
  doubles: number
  triples: number
  homeRuns: number
  rbi: number
  runs: number
  baseOnBalls: number
  strikeOuts: number
  stolenBases: number
  avg: string
  obp: string
  slg: string
  ops: string
  plateAppearances: number
}

export interface PitchingStats {
  gamesPlayed: number
  gamesStarted: number
  wins: number
  losses: number
  era: string
  inningsPitched: string
  strikeOuts: number
  baseOnBalls: number
  saves: number
  whip: string
  completeGames: number
  shutouts: number
  homeRuns: number
  hits: number
  earnedRuns: number
  winPercentage: string
  strikeoutWalkRatio: string
  strikeoutsPer9Inn: string
  hitsPer9Inn: string
}

export interface SeasonStats {
  season: string
  team: { id: number; name: string }
  stat: HittingStats | PitchingStats
  gameType: string
}

export interface Award {
  id: string
  name: string
  season: string
  date: string
}
