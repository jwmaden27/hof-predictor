export interface MLBSearchResult {
  id: number
  fullName: string
  firstName: string
  lastName: string
  primaryPosition: { code: string; name: string; abbreviation: string }
  currentTeam?: { id: number; name: string }
  active: boolean
  currentAge: number
  mlbDebutDate: string
  height: string
  weight: number
  birthCity: string
  birthCountry: string
  batSide: { code: string; description: string }
  pitchHand: { code: string; description: string }
  primaryNumber?: string
}

export interface MLBStatsResponse {
  stats: Array<{
    type: { displayName: string }
    group: { displayName: string }
    splits: MLBStatSplit[]
  }>
}

export interface MLBStatSplit {
  season?: string
  stat: Record<string, unknown>
  team?: { id: number; name: string }
  gameType?: string
}

export interface MLBPeopleResponse {
  people: Array<Record<string, unknown>>
}
