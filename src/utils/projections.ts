import type {
  SeasonWAR,
  Award,
  ProjectionPoint,
  PositionCategory,
} from '@/types/index.ts'
import { calculateJAWS, compareToHOFAverage } from './jaws.ts'
import { calculateHOFScore } from './scoring.ts'

const MAX_PROJECTION_YEARS = 15

export function projectFutureScores(
  currentSeasons: SeasonWAR[],
  positionCategory: PositionCategory,
  awards: Award[],
  careerStats: Record<string, number>,
  playerType: 'hitter' | 'pitcher',
  currentAge: number,
  futureWARPerSeason: number,
  maxYears: number = MAX_PROJECTION_YEARS,
): ProjectionPoint[] {
  const points: ProjectionPoint[] = []
  const projectedSeasons = [...currentSeasons]

  // Add current state as year 0
  const currentJaws = calculateJAWS(projectedSeasons, positionCategory)
  const currentComparison = compareToHOFAverage(currentJaws)
  const currentScore = calculateHOFScore(
    currentComparison,
    awards,
    careerStats,
    playerType,
    projectedSeasons,
    currentAge,
    true,
  )
  points.push({
    year: 0,
    projectedJAWS: currentJaws.jaws,
    projectedScore: currentScore.overall,
    tier: currentScore.tier,
  })

  for (let year = 1; year <= maxYears; year++) {
    const futureSeason: SeasonWAR = {
      season: new Date().getFullYear() + year,
      war: futureWARPerSeason,
      age: currentAge + year,
    }
    projectedSeasons.push(futureSeason)

    const jaws = calculateJAWS(projectedSeasons, positionCategory)
    const comparison = compareToHOFAverage(jaws)
    const score = calculateHOFScore(
      comparison,
      awards,
      careerStats,
      playerType,
      projectedSeasons,
      currentAge + year,
      true,
    )

    points.push({
      year,
      projectedJAWS: jaws.jaws,
      projectedScore: score.overall,
      tier: score.tier,
    })

    // Stop if already maxed out
    if (score.overall >= 100) break
  }

  return points
}

export interface TierThreshold {
  tier: string
  seasonsNeeded: number | null // null if unreachable within maxYears
}

export function findTierThresholds(
  projectionPoints: ProjectionPoint[],
): TierThreshold[] {
  const tiers = [
    'Borderline',
    'Solid Candidate',
    'Strong Candidate',
    'First Ballot Lock',
  ]
  const thresholds = [45, 60, 75, 90]

  return tiers.map((tier, i) => {
    const threshold = thresholds[i]
    const point = projectionPoints.find((p) => p.projectedScore >= threshold)
    return {
      tier,
      seasonsNeeded: point ? point.year : null,
    }
  })
}

export function getProjectionSummary(
  projectionPoints: ProjectionPoint[],
  futureWARPerSeason: number,
): string {
  const thresholds = findTierThresholds(projectionPoints)
  const reachable = thresholds.filter((t) => t.seasonsNeeded !== null)
  const alreadyReached = thresholds.filter((t) => t.seasonsNeeded === 0)
  const future = reachable.filter((t) => t.seasonsNeeded !== null && t.seasonsNeeded > 0)

  if (alreadyReached.length === thresholds.length) {
    return 'This player already meets the First Ballot Lock threshold.'
  }

  const parts: string[] = []

  if (alreadyReached.length > 0) {
    const highest = alreadyReached[alreadyReached.length - 1]
    parts.push(`Already at ${highest.tier} level.`)
  }

  for (const t of future) {
    parts.push(
      `${t.tier} in ${t.seasonsNeeded} season${t.seasonsNeeded === 1 ? '' : 's'}`,
    )
  }

  const unreachable = thresholds.filter((t) => t.seasonsNeeded === null)
  if (unreachable.length > 0 && future.length > 0) {
    parts.push(
      `${unreachable[0].tier} may not be reachable at ${futureWARPerSeason} WAR/season`,
    )
  }

  return `At ${futureWARPerSeason} WAR/season: ${parts.join('. ')}.`
}
