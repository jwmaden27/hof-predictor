import type { HOFScore, HOFTier, ScoringBreakdown } from '@/types/scoring.ts'
import type { NHLAward } from '@/types/nhl-player.ts'
import type { NHLJAWSComparison } from '@/utils/nhl-jaws.ts'
import type { NHLSeasonPS } from '@/utils/nhl-jaws.ts'
import { NHL_MILESTONES } from '@/data/nhl-milestones.ts'
import { calculateHOFProbability } from '@/utils/hof-probability.ts'

const NHL_AWARD_NAMES = {
  HART: 'Hart Memorial Trophy',
  NORRIS: 'James Norris Memorial Trophy',
  VEZINA: 'Vezina Trophy',
  SELKE: 'Frank J. Selke Trophy',
  ART_ROSS: 'Art Ross Trophy',
  CONN_SMYTHE: 'Conn Smythe Trophy',
  CALDER: 'Calder Memorial Trophy',
  LADY_BYNG: 'Lady Byng Memorial Trophy',
  STANLEY_CUP: 'Stanley Cup',
  TED_LINDSAY: 'Ted Lindsay Award',
  RICHARD: 'Maurice Richard Trophy',
} as const

function countNHLAward(awards: NHLAward[], trophyName: string): number {
  const found = awards.find((a) => a.trophy === trophyName)
  return found ? found.seasons.length : 0
}

export function calculateNHLJAWSComponent(jawsComparison: NHLJAWSComparison): number {
  const { jawsRatio, careerPSRatio, peakPSRatio } = jawsComparison
  const compositeRatio =
    jawsRatio * 0.6 + careerPSRatio * 0.2 + peakPSRatio * 0.2

  if (compositeRatio >= 1.25) return 40
  if (compositeRatio >= 1.0) return 32 + (compositeRatio - 1.0) * 32
  if (compositeRatio >= 0.75) return 20 + (compositeRatio - 0.75) * 48
  if (compositeRatio >= 0.5) return 10 + (compositeRatio - 0.5) * 40
  return compositeRatio * 20
}

function calculateNHLAwardsComponent(awards: NHLAward[]): number {
  const hartCount = countNHLAward(awards, NHL_AWARD_NAMES.HART)
  const norrisCount = countNHLAward(awards, NHL_AWARD_NAMES.NORRIS)
  const vezinaCount = countNHLAward(awards, NHL_AWARD_NAMES.VEZINA)
  const selkeCount = countNHLAward(awards, NHL_AWARD_NAMES.SELKE)
  const artRossCount = countNHLAward(awards, NHL_AWARD_NAMES.ART_ROSS)
  const connSmytheCount = countNHLAward(awards, NHL_AWARD_NAMES.CONN_SMYTHE)
  const stanleyCupCount = countNHLAward(awards, NHL_AWARD_NAMES.STANLEY_CUP)
  const lindsayCount = countNHLAward(awards, NHL_AWARD_NAMES.TED_LINDSAY)

  let points = 0
  // Hart MVP — 5 pts each, max 15
  points += Math.min(hartCount * 5, 15)
  // Position-specific awards — 4 pts each, max 8
  points += Math.min((norrisCount + vezinaCount) * 4, 8)
  // Scoring titles & Selke — 2 pts each, max 6
  points += Math.min((artRossCount + selkeCount) * 2, 6)
  // Conn Smythe — 3 pts each, max 6
  points += Math.min(connSmytheCount * 3, 6)
  // Stanley Cup — 1 pt each, max 3
  points += Math.min(stanleyCupCount * 1, 3)
  // Ted Lindsay — 1.5 pts each, max 3
  points += Math.min(lindsayCount * 1.5, 3)

  return Math.min(points, 25)
}

function calculateNHLMilestonesComponent(
  careerStats: Record<string, number>,
  playerType: 'skater' | 'goalie',
): { points: number; milestoneHits: string[] } {
  const applicable = NHL_MILESTONES.filter((m) => m.playerType === playerType)
  const milestoneHits: string[] = []
  let points = 0

  for (const milestone of applicable) {
    const statValue = careerStats[milestone.statKey] ?? 0

    if (milestone.lowerIsBetter) {
      if (statValue > 0 && statValue <= milestone.threshold) {
        milestoneHits.push(milestone.label)
        points += milestone.hofWeight * 10
      } else if (statValue > 0 && statValue <= milestone.threshold * 1.15) {
        const ratio = milestone.threshold / statValue
        points += milestone.hofWeight * 10 * ((ratio - 0.87) / 0.13) * 0.5
      }
    } else {
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

function calculateNHLTrajectoryComponent(
  seasons: NHLSeasonPS[],
  currentAge: number,
  isActive: boolean,
): number {
  let points = 0

  // Elite seasons (PS >= 10 is roughly like 5+ WAR in baseball)
  const eliteSeasons = seasons.filter((s) => s.ps >= 10).length
  points += Math.min(eliteSeasons * 1.5, 7.5)

  // Solid seasons (PS >= 6)
  const solidSeasons = seasons.filter((s) => s.ps >= 6).length
  points += Math.min(solidSeasons * 0.5, 5)

  // Active player bonus
  if (isActive && currentAge <= 30) {
    points += 2.5
  }

  return Math.min(points, 15)
}

function predictNHLInduction(score: number): { ballot: string; description: string; predictedVotePct: number } {
  // NHL uses a selection committee (no public vote %), so predictedVotePct represents estimated likelihood
  const predictedVotePct = Math.round(Math.max(0, Math.min(99, score)) * 10) / 10
  if (score >= 90) return { ballot: 'First Eligible', description: 'Likely inducted in first year of eligibility', predictedVotePct }
  if (score >= 75) return { ballot: 'Strong Candidate', description: 'Likely inducted within 1-3 years of eligibility', predictedVotePct }
  if (score >= 60) return { ballot: 'Eventual Induction', description: 'May be inducted after extended consideration', predictedVotePct }
  if (score >= 45) return { ballot: 'Borderline', description: 'Possible induction but not certain', predictedVotePct }
  return { ballot: 'Unlikely', description: 'Unlikely to be inducted by selection committee', predictedVotePct }
}

export function assignNHLTier(score: number): HOFTier {
  if (score >= 90) return 'First Ballot Lock'
  if (score >= 75) return 'Strong Candidate'
  if (score >= 60) return 'Solid Candidate'
  if (score >= 45) return 'Borderline'
  if (score >= 25) return 'Unlikely'
  return 'Not HOF Caliber'
}

export function calculateNHLHOFScore(
  jawsComparison: NHLJAWSComparison,
  awards: NHLAward[],
  careerStats: Record<string, number>,
  playerType: 'skater' | 'goalie',
  seasons: NHLSeasonPS[],
  currentAge: number,
  isActive: boolean,
): HOFScore {
  const jawsComponent = calculateNHLJAWSComponent(jawsComparison)
  const awardsComponent = calculateNHLAwardsComponent(awards)
  const { points: milestonesComponent, milestoneHits } =
    calculateNHLMilestonesComponent(careerStats, playerType)
  const trajectoryComponent = calculateNHLTrajectoryComponent(
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

  const hartCount = countNHLAward(awards, NHL_AWARD_NAMES.HART)
  const norrisCount = countNHLAward(awards, NHL_AWARD_NAMES.NORRIS)
  const vezinaCount = countNHLAward(awards, NHL_AWARD_NAMES.VEZINA)
  const selkeCount = countNHLAward(awards, NHL_AWARD_NAMES.SELKE)
  const connSmytheCount = countNHLAward(awards, NHL_AWARD_NAMES.CONN_SMYTHE)

  const breakdown: ScoringBreakdown = {
    jawsRatio: jawsComparison.jawsRatio,
    mvpCount: hartCount,
    cyYoungCount: norrisCount + vezinaCount, // Re-using field for position awards
    allStarCount: connSmytheCount,
    goldGloveCount: selkeCount,
    silverSluggerCount: 0,
    milestoneHits,
    peakSeasonsAbove5WAR: seasons.filter((s) => s.ps >= 10).length,
    careerLengthYears: seasons.length,
  }

  return {
    overall,
    jawsComponent: Math.round(jawsComponent * 10) / 10,
    awardsComponent: Math.round(awardsComponent * 10) / 10,
    milestonesComponent: Math.round(milestonesComponent * 10) / 10,
    trajectoryComponent: Math.round(trajectoryComponent * 10) / 10,
    breakdown,
    tier: assignNHLTier(overall),
    hofProbability: calculateHOFProbability(overall),
    ballotPrediction: predictNHLInduction(overall),
  }
}
