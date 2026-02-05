import type { PositionCategory } from './player.ts'

export interface JAWSResult {
  careerWAR: number
  peakWAR: number
  jaws: number
  peakSeasons: PeakSeason[]
  positionCategory: PositionCategory
}

export interface PeakSeason {
  season: number
  war: number
  rank: number
}

export interface HOFPositionalAverage {
  position: PositionCategory
  careerWAR: number
  peakWAR: number
  jaws: number
}

export interface JAWSComparison {
  player: JAWSResult
  hofAverage: HOFPositionalAverage
  careerWARRatio: number
  peakWARRatio: number
  jawsRatio: number
}
