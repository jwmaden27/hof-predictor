export type NHLPositionCategory = 'C' | 'LW' | 'RW' | 'D' | 'G'

export interface NHLPlayerBio {
  id: number
  fullName: string
  firstName: string
  lastName: string
  position: NHLPositionCategory
  birthDate: string
  currentAge: number
  birthCity: string
  birthCountry: string
  heightInInches: number
  weightInPounds: number
  shootsCatches: string
  active: boolean
  currentTeam?: { id: number; name: string; abbrev: string }
  sweaterNumber?: number
  draftDetails?: {
    year: number
    round: number
    pickInRound: number
    overallPick: number
    teamAbbrev: string
  }
  headshot: string
  playerSlug: string
}

export interface NHLSkaterStats {
  gamesPlayed: number
  goals: number
  assists: number
  points: number
  plusMinus: number
  pim: number
  powerPlayGoals: number
  powerPlayPoints: number
  shorthandedGoals: number
  shorthandedPoints: number
  gameWinningGoals: number
  shots: number
  shootingPctg: number
  faceoffWinningPctg: number
}

export interface NHLGoalieStats {
  gamesPlayed: number
  gamesStarted: number
  wins: number
  losses: number
  otLosses: number
  goalsAgainstAvg: number
  savePctg: number
  shutouts: number
  shotsAgainst: number
  goalsAgainst: number
}

export interface NHLSeasonStats {
  season: number
  teamName: string
  leagueAbbrev: string
  gameTypeId: number
  stat: NHLSkaterStats | NHLGoalieStats
}

export interface NHLAward {
  trophy: string
  seasons: { season: number; gameTypeId: number }[]
}

export interface NHLSearchResult {
  playerId: string
  name: string
  positionCode: string
  teamAbbrev: string | null
  active: boolean
  sweaterNumber: number | null
}
