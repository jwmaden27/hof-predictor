import type {
  JAWSComparison,
  HOFScore,
  HOFTier,
  ScoringBreakdown,
  Award,
  SeasonWAR,
} from '@/types/index.ts'
import { MILESTONES } from '@/data/milestones.ts'
import { calculateHOFProbability, predictBallot } from '@/utils/hof-probability.ts'

const AWARD_IDS = {
  MVP: ['ALMVP', 'NLMVP'],
  CY_YOUNG: ['ALCY', 'NLCY', 'MLBCY'],
  ALL_STAR: ['ALAS', 'NLAS'],
  GOLD_GLOVE: ['ALGG', 'NLGG', 'MLGG'],
  SILVER_SLUGGER: ['ALSS', 'NLSS'],
} as const

function countAward(awards: Award[], ids: readonly string[]): number {
  return awards.filter((a) => ids.includes(a.id)).length
}

export function calculateJAWSComponent(jawsComparison: JAWSComparison): number {
  const { jawsRatio, careerWARRatio, peakWARRatio } = jawsComparison
  const compositeRatio =
    jawsRatio * 0.6 + careerWARRatio * 0.2 + peakWARRatio * 0.2

  if (compositeRatio >= 1.25) return 40
  if (compositeRatio >= 1.0) return 32 + (compositeRatio - 1.0) * 32
  if (compositeRatio >= 0.75) return 20 + (compositeRatio - 0.75) * 48
  if (compositeRatio >= 0.5) return 10 + (compositeRatio - 0.5) * 40
  return compositeRatio * 20
}

function calculateAwardsComponent(awards: Award[]): number {
  const mvpCount = countAward(awards, AWARD_IDS.MVP)
  const cyCount = countAward(awards, AWARD_IDS.CY_YOUNG)
  const asCount = countAward(awards, AWARD_IDS.ALL_STAR)
  const ggCount = countAward(awards, AWARD_IDS.GOLD_GLOVE)
  const ssCount = countAward(awards, AWARD_IDS.SILVER_SLUGGER)

  let points = 0
  points += Math.min(mvpCount * 5, 15)
  points += Math.min(cyCount * 5, 10)
  points += Math.min(asCount * 0.5, 5)
  points += Math.min(ggCount * 0.5, 2.5)
  points += Math.min(ssCount * 0.5, 2.5)

  return Math.min(points, 25)
}

function getMilestonePlayerType(playerType: 'hitter' | 'pitcher', positionCategory?: string): 'hitter' | 'sp' | 'rp' {
  if (playerType === 'hitter') return 'hitter'
  // For pitchers, check if they're a reliever based on position category
  if (positionCategory === 'RP') return 'rp'
  return 'sp'
}

function calculateMilestonesComponent(
  careerStats: Record<string, number>,
  playerType: 'hitter' | 'pitcher',
  positionCategory?: string,
): { points: number; milestoneHits: string[] } {
  const milestoneType = getMilestonePlayerType(playerType, positionCategory)
  const applicable = MILESTONES.filter((m) => m.playerType === milestoneType)
  const milestoneHits: string[] = []
  let points = 0

  for (const milestone of applicable) {
    const statValue = careerStats[milestone.statKey] ?? 0

    // Handle "lower is better" stats like ERA and WHIP
    if (milestone.lowerIsBetter) {
      // For these stats, being at or below the threshold is good
      if (statValue > 0 && statValue <= milestone.threshold) {
        milestoneHits.push(milestone.label)
        points += milestone.hofWeight * 10
      } else if (statValue > 0 && statValue <= milestone.threshold * 1.15) {
        // Partial credit if within 15% above threshold
        const ratio = milestone.threshold / statValue
        points += milestone.hofWeight * 10 * ((ratio - 0.87) / 0.13) * 0.5
      }
    } else {
      // Standard "higher is better" logic
      if (statValue >= milestone.threshold) {
        milestoneHits.push(milestone.label)
        points += milestone.hofWeight * 10
      } else if (statValue >= milestone.threshold * 0.8) {
        const progress = statValue / milestone.threshold
        points += milestone.hofWeight * 10 * ((progress - 0.8) / 0.2) * 0.5
      }
    }
  }

  return { points: Math.min(points, 20), milestoneHits }
}

export function calculateTrajectoryComponent(
  seasons: SeasonWAR[],
  currentAge: number,
  isActive: boolean,
): number {
  let points = 0

  const eliteSeasons = seasons.filter((s) => s.war >= 5.0).length
  points += Math.min(eliteSeasons * 1.5, 7.5)

  const solidSeasons = seasons.filter((s) => s.war >= 3.0).length
  points += Math.min(solidSeasons * 0.5, 5)

  if (isActive && currentAge <= 30) {
    points += 2.5
  }

  return Math.min(points, 15)
}

export function assignTier(score: number): HOFTier {
  if (score >= 90) return 'First Ballot Lock'
  if (score >= 75) return 'Strong Candidate'
  if (score >= 60) return 'Solid Candidate'
  if (score >= 45) return 'Borderline'
  if (score >= 25) return 'Unlikely'
  return 'Not HOF Caliber'
}

export function calculateHOFScore(
  jawsComparison: JAWSComparison,
  awards: Award[],
  careerStats: Record<string, number>,
  playerType: 'hitter' | 'pitcher',
  seasons: SeasonWAR[],
  currentAge: number,
  isActive: boolean,
  positionCategory?: string,
): HOFScore {
  const jawsComponent = calculateJAWSComponent(jawsComparison)
  const awardsComponent = calculateAwardsComponent(awards)
  const { points: milestonesComponent, milestoneHits } =
    calculateMilestonesComponent(careerStats, playerType, positionCategory)
  const trajectoryComponent = calculateTrajectoryComponent(
    seasons,
    currentAge,
    isActive,
  )

  const overall = Math.min(
    Math.round(
      jawsComponent + awardsComponent + milestonesComponent + trajectoryComponent,
    ),
    100,
  )

  const breakdown: ScoringBreakdown = {
    jawsRatio: jawsComparison.jawsRatio,
    mvpCount: countAward(awards, AWARD_IDS.MVP),
    cyYoungCount: countAward(awards, AWARD_IDS.CY_YOUNG),
    allStarCount: countAward(awards, AWARD_IDS.ALL_STAR),
    goldGloveCount: countAward(awards, AWARD_IDS.GOLD_GLOVE),
    silverSluggerCount: countAward(awards, AWARD_IDS.SILVER_SLUGGER),
    milestoneHits,
    peakSeasonsAbove5WAR: seasons.filter((s) => s.war >= 5.0).length,
    careerLengthYears: seasons.length,
  }

  return {
    overall,
    jawsComponent: Math.round(jawsComponent * 10) / 10,
    awardsComponent: Math.round(awardsComponent * 10) / 10,
    milestonesComponent: Math.round(milestonesComponent * 10) / 10,
    trajectoryComponent: Math.round(trajectoryComponent * 10) / 10,
    breakdown,
    tier: assignTier(overall),
    hofProbability: calculateHOFProbability(overall),
    ballotPrediction: predictBallot(overall),
  }
}
