import type { PositionCategory } from './player.ts'

export interface SeasonWAR {
  season: number
  war: number
  team?: string
  age?: number
}

export interface PlayerWARData {
  playerId: number
  playerName: string
  bbrefId: string
  positionCategory: PositionCategory
  seasons: SeasonWAR[]
  careerWAR: number
}
