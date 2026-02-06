import type { NHLPositionCategory } from '@/types/nhl-player.ts'
import { NHL_HOF_AVERAGES, type NHLHOFPositionalAverage } from '@/data/nhl-hof-averages.ts'

const PEAK_YEARS = 7

export interface NHLSeasonPS {
  season: number
  ps: number
  team?: string
  age?: number
}

export interface NHLJAWSResult {
  careerPS: number
  peakPS: number
  jaws: number
  peakSeasons: NHLPeakSeason[]
  positionCategory: NHLPositionCategory
}

export interface NHLPeakSeason {
  season: number
  ps: number
  rank: number
}

export interface NHLJAWSComparison {
  player: NHLJAWSResult
  hofAverage: NHLHOFPositionalAverage
  careerPSRatio: number
  peakPSRatio: number
  jawsRatio: number
}

export function calculateCareerPS(seasons: NHLSeasonPS[]): number {
  return Math.round(seasons.reduce((sum, s) => sum + s.ps, 0) * 10) / 10
}

export function calculatePeakPS(seasons: NHLSeasonPS[]): {
  peakPS: number
  peakSeasons: NHLPeakSeason[]
} {
  const sorted = [...seasons]
    .sort((a, b) => b.ps - a.ps)
    .slice(0, PEAK_YEARS)

  const peakSeasons: NHLPeakSeason[] = sorted.map((s, i) => ({
    season: s.season,
    ps: s.ps,
    rank: i + 1,
  }))

  const peakPS =
    Math.round(sorted.reduce((sum, s) => sum + s.ps, 0) * 10) / 10

  return { peakPS, peakSeasons }
}

export function calculateNHLJAWS(
  seasons: NHLSeasonPS[],
  positionCategory: NHLPositionCategory,
): NHLJAWSResult {
  const careerPS = calculateCareerPS(seasons)
  const { peakPS, peakSeasons } = calculatePeakPS(seasons)
  const jaws = Math.round(((careerPS + peakPS) / 2) * 10) / 10

  return { careerPS, peakPS, jaws, peakSeasons, positionCategory }
}

export function compareToNHLHOFAverage(jawsResult: NHLJAWSResult): NHLJAWSComparison {
  const hofAverage = NHL_HOF_AVERAGES[jawsResult.positionCategory]

  return {
    player: jawsResult,
    hofAverage,
    careerPSRatio: jawsResult.careerPS / hofAverage.careerPS,
    peakPSRatio: jawsResult.peakPS / hofAverage.peakPS,
    jawsRatio: jawsResult.jaws / hofAverage.jaws,
  }
}
