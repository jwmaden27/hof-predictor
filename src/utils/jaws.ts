import type { SeasonWAR, JAWSResult, JAWSComparison, PeakSeason, PositionCategory } from '@/types/index.ts'
import { HOF_AVERAGES } from '@/data/hof-averages.ts'

const PEAK_YEARS = 7

export function calculateCareerWAR(seasons: SeasonWAR[]): number {
  return Math.round(seasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10
}

export function calculatePeakWAR(seasons: SeasonWAR[]): {
  peakWAR: number
  peakSeasons: PeakSeason[]
} {
  const sorted = [...seasons]
    .sort((a, b) => b.war - a.war)
    .slice(0, PEAK_YEARS)

  const peakSeasons: PeakSeason[] = sorted.map((s, i) => ({
    season: s.season,
    war: s.war,
    rank: i + 1,
  }))

  const peakWAR =
    Math.round(sorted.reduce((sum, s) => sum + s.war, 0) * 10) / 10

  return { peakWAR, peakSeasons }
}

export function calculateJAWS(
  seasons: SeasonWAR[],
  positionCategory: PositionCategory,
): JAWSResult {
  const careerWAR = calculateCareerWAR(seasons)
  const { peakWAR, peakSeasons } = calculatePeakWAR(seasons)
  const jaws = Math.round(((careerWAR + peakWAR) / 2) * 10) / 10

  return { careerWAR, peakWAR, jaws, peakSeasons, positionCategory }
}

export function compareToHOFAverage(jawsResult: JAWSResult): JAWSComparison {
  const hofAverage = HOF_AVERAGES[jawsResult.positionCategory]

  return {
    player: jawsResult,
    hofAverage,
    careerWARRatio: jawsResult.careerWAR / hofAverage.careerWAR,
    peakWARRatio: jawsResult.peakWAR / hofAverage.peakWAR,
    jawsRatio: jawsResult.jaws / hofAverage.jaws,
  }
}
