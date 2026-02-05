import type {
  SeasonWAR,
  SeasonStats,
  Award,
  PositionCategory,
  HOFTier,
} from '@/types/index.ts'
import { MILESTONES } from '@/data/milestones.ts'
import { calculateJAWS, compareToHOFAverage } from './jaws.ts'
import { calculateHOFScore } from './scoring.ts'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MilestoneProjection {
  label: string
  statKey: string
  threshold: number
  currentValue: number
  projectedValue: number
  needed: number
  likelihood: number
  projectedProgress: number
}

export interface CareerProjection {
  projectedSeasons: number
  projectedCareerEndAge: number
  cumulativePlayProbability: number
  projectedStats: Record<string, number>
  projectedWARSeasons: SeasonWAR[]
  projectedCareerWAR: number
  projectedHOFScore: number
  projectedTier: HOFTier
  projectedProbability: number
  milestoneProjections: MilestoneProjection[]
}

export interface CareerProjectionParams {
  warSeasons: SeasonWAR[]
  seasonStats: SeasonStats[]
  careerStats: Record<string, unknown> | null
  awards: Award[]
  positionCategory: PositionCategory
  currentAge: number
  isPitcher: boolean
}

// ---------------------------------------------------------------------------
// Aging curves
// ---------------------------------------------------------------------------

const HITTER_AGING: [number, number][] = [
  [21, 0.70], [22, 0.78], [23, 0.85], [24, 0.91], [25, 0.96],
  [26, 0.99], [27, 1.00], [28, 1.00], [29, 0.97], [30, 0.93],
  [31, 0.88], [32, 0.83], [33, 0.77], [34, 0.71], [35, 0.64],
  [36, 0.56], [37, 0.48], [38, 0.40], [39, 0.32], [40, 0.24],
  [41, 0.16],
]

const PITCHER_AGING: [number, number][] = [
  [21, 0.60], [22, 0.70], [23, 0.80], [24, 0.88], [25, 0.94],
  [26, 0.98], [27, 1.00], [28, 0.99], [29, 0.96], [30, 0.92],
  [31, 0.87], [32, 0.82], [33, 0.76], [34, 0.69], [35, 0.61],
  [36, 0.53], [37, 0.44], [38, 0.36], [39, 0.28], [40, 0.20],
  [41, 0.13],
]

function interpolateAnchors(age: number, anchors: [number, number][]): number {
  if (age <= anchors[0][0]) return anchors[0][1]
  if (age >= anchors[anchors.length - 1][0]) return anchors[anchors.length - 1][1]
  for (let i = 0; i < anchors.length - 1; i++) {
    const [a1, v1] = anchors[i]
    const [a2, v2] = anchors[i + 1]
    if (age >= a1 && age <= a2) {
      const t = (age - a1) / (a2 - a1)
      return v1 + t * (v2 - v1)
    }
  }
  return anchors[anchors.length - 1][1]
}

export function getWARAgingMultiplier(age: number, isPitcher: boolean): number {
  return interpolateAnchors(age, isPitcher ? PITCHER_AGING : HITTER_AGING)
}

// ---------------------------------------------------------------------------
// Play probability
// ---------------------------------------------------------------------------

const PLAY_PROB_ANCHORS: [number, number][] = [
  [25, 0.95], [30, 0.95], [31, 0.92], [32, 0.88], [33, 0.83],
  [34, 0.76], [35, 0.67], [36, 0.55], [37, 0.42], [38, 0.30],
  [39, 0.20], [40, 0.12], [41, 0.06],
]

export function getPlayProbability(age: number, projectedWAR: number): number {
  const base = interpolateAnchors(age, PLAY_PROB_ANCHORS)
  let bonus = 0
  if (projectedWAR >= 3) bonus += interpolateAnchors(age, [
    [25, 0.03], [30, 0.03], [31, 0.04], [32, 0.05], [33, 0.06],
    [34, 0.07], [35, 0.08], [36, 0.10], [37, 0.10], [38, 0.10],
    [39, 0.08], [40, 0.05], [41, 0.03],
  ])
  if (projectedWAR >= 5) bonus += interpolateAnchors(age, [
    [25, 0.02], [30, 0.02], [31, 0.03], [32, 0.04], [33, 0.05],
    [34, 0.06], [35, 0.07], [36, 0.08], [37, 0.08], [38, 0.08],
    [39, 0.06], [40, 0.04], [41, 0.02],
  ])
  return Math.min(base + bonus, 1.0)
}

// ---------------------------------------------------------------------------
// Baseline WAR from recent seasons
// ---------------------------------------------------------------------------

export function getBaselineWAR(warSeasons: SeasonWAR[]): number {
  if (warSeasons.length === 0) return 0.5

  const sorted = [...warSeasons].sort((a, b) => b.season - a.season)
  const recent = sorted.slice(0, 3)

  const weights = [3, 2, 1]
  let weightedSum = 0
  let totalWeight = 0
  for (let i = 0; i < recent.length; i++) {
    weightedSum += recent[i].war * weights[i]
    totalWeight += weights[i]
  }

  return Math.max(weightedSum / totalWeight, 0.5)
}

// ---------------------------------------------------------------------------
// Stat rate projection
// ---------------------------------------------------------------------------

const HITTER_STAT_KEYS = ['hits', 'homeRuns', 'rbi', 'runs', 'stolenBases'] as const
const PITCHER_STAT_KEYS = ['wins', 'strikeOuts', 'saves'] as const

function getPerSeasonRates(
  seasonStats: SeasonStats[],
  statKeys: readonly string[],
): Record<string, number> {
  const rates: Record<string, number> = {}
  if (seasonStats.length === 0) return rates

  // Use last 3 seasons with recency weighting
  const sorted = [...seasonStats].sort((a, b) => parseInt(b.season) - parseInt(a.season))
  const recent = sorted.slice(0, 3)
  const weights = [3, 2, 1]
  let totalWeight = 0
  for (let i = 0; i < recent.length; i++) {
    totalWeight += weights[i]
  }

  for (const key of statKeys) {
    let weightedSum = 0
    for (let i = 0; i < recent.length; i++) {
      const stat = recent[i].stat as unknown as Record<string, unknown>
      const val = typeof stat[key] === 'number' ? (stat[key] as number) : 0
      weightedSum += val * weights[i]
    }
    rates[key] = weightedSum / totalWeight
  }

  return rates
}

// ---------------------------------------------------------------------------
// Main projection function
// ---------------------------------------------------------------------------

const MIN_CUMULATIVE_PROB = 0.05
const MAX_PROJECTION_AGE = 42

export function projectCareerEnd(params: CareerProjectionParams): CareerProjection | null {
  const {
    warSeasons,
    seasonStats,
    careerStats,
    awards,
    positionCategory,
    currentAge,
    isPitcher,
  } = params

  if (warSeasons.length === 0) return null

  const actualPlayerType = isPitcher ? 'pitcher' as const : 'hitter' as const
  const statKeys = isPitcher ? PITCHER_STAT_KEYS : HITTER_STAT_KEYS
  const baselineWAR = getBaselineWAR(warSeasons)
  const baseMultiplier = getWARAgingMultiplier(currentAge, isPitcher)
  // Normalize baseline so we can apply future aging curves correctly
  const peakWAR = baseMultiplier > 0 ? baselineWAR / baseMultiplier : baselineWAR

  const perSeasonRates = getPerSeasonRates(seasonStats, statKeys)
  // Normalize rates to peak level as well
  const peakRates: Record<string, number> = {}
  for (const key of statKeys) {
    peakRates[key] = baseMultiplier > 0
      ? (perSeasonRates[key] ?? 0) / baseMultiplier
      : (perSeasonRates[key] ?? 0)
  }

  // Current career stat totals
  const currentStats: Record<string, number> = {}
  for (const key of statKeys) {
    const raw = careerStats?.[key]
    currentStats[key] = typeof raw === 'number' ? raw : typeof raw === 'string' ? parseFloat(raw) : 0
  }

  // Project future seasons
  const projectedWARSeasons: SeasonWAR[] = []
  const accumulatedStats: Record<string, number> = { ...currentStats }
  let cumulativeProb = 1.0
  const currentYear = new Date().getFullYear()

  // Track when each milestone stat value is reached, for likelihood calculation
  const milestoneReachedProb: Record<string, number> = {}
  const currentCareerWAR = warSeasons.reduce((sum, s) => sum + s.war, 0)
  let runningWAR = currentCareerWAR

  for (let yearOffset = 1; yearOffset <= MAX_PROJECTION_AGE - currentAge; yearOffset++) {
    const futureAge = currentAge + yearOffset
    const agingMult = getWARAgingMultiplier(futureAge, isPitcher)
    const projectedSeasonWAR = Math.max(peakWAR * agingMult, 0)

    const playProb = getPlayProbability(futureAge, projectedSeasonWAR)
    cumulativeProb *= playProb

    if (cumulativeProb < MIN_CUMULATIVE_PROB) break

    projectedWARSeasons.push({
      season: currentYear + yearOffset,
      war: Math.round(projectedSeasonWAR * 10) / 10,
      age: futureAge,
    })

    // Accumulate stats (expected values)
    for (const key of statKeys) {
      const seasonRate = (peakRates[key] ?? 0) * agingMult * cumulativeProb
      accumulatedStats[key] = (accumulatedStats[key] ?? 0) + seasonRate
    }

    // Track running WAR total for milestone detection
    runningWAR += projectedSeasonWAR
    accumulatedStats.careerWAR = Math.round(runningWAR * 10) / 10

    // Check if any milestone thresholds are crossed this season
    const applicable = MILESTONES.filter((m) => m.playerType === actualPlayerType && !m.isRate)
    for (const milestone of applicable) {
      const key = `${milestone.statKey}_${milestone.threshold}`
      if (milestoneReachedProb[key] === undefined && accumulatedStats[milestone.statKey] >= milestone.threshold) {
        milestoneReachedProb[key] = cumulativeProb
      }
    }
  }

  const totalSeasons = projectedWARSeasons.length
  const endAge = currentAge + totalSeasons

  // Calculate projected career WAR (currentCareerWAR defined above loop)
  const futureWAR = projectedWARSeasons.reduce((sum, s) => sum + s.war, 0)
  const projectedCareerWAR = Math.round((currentCareerWAR + futureWAR) * 10) / 10

  // Ensure accumulatedStats has final projected careerWAR
  accumulatedStats.careerWAR = projectedCareerWAR

  // Inject rate stats (avg, obp) from careerStats — these don't accumulate over seasons
  if (careerStats) {
    for (const key of ['avg', 'obp']) {
      const raw = careerStats[key]
      if (typeof raw === 'number') accumulatedStats[key] = raw
      else if (typeof raw === 'string') {
        const parsed = parseFloat(raw)
        if (!isNaN(parsed)) accumulatedStats[key] = parsed
      }
    }
  }

  // Build projected seasons array (current + future) for JAWS/score calculation
  const allSeasons: SeasonWAR[] = [...warSeasons, ...projectedWARSeasons]

  // Calculate projected HOF score
  const projectedCareerStatsForScoring: Record<string, number> = {}
  for (const [k, v] of Object.entries(accumulatedStats)) {
    projectedCareerStatsForScoring[k] = Math.round(v)
  }
  // Keep rate stats unrounded
  for (const key of ['avg', 'obp']) {
    if (key in accumulatedStats) {
      projectedCareerStatsForScoring[key] = accumulatedStats[key]
    }
  }
  // Also include any existing career stats not in our projection keys
  if (careerStats) {
    for (const [k, v] of Object.entries(careerStats)) {
      if (!(k in projectedCareerStatsForScoring) && typeof v === 'number') {
        projectedCareerStatsForScoring[k] = v
      }
    }
  }

  const projectedJaws = calculateJAWS(allSeasons, positionCategory)
  const projectedComparison = compareToHOFAverage(projectedJaws)
  const projectedScore = calculateHOFScore(
    projectedComparison,
    awards,
    projectedCareerStatsForScoring,
    actualPlayerType,
    allSeasons,
    endAge,
    false, // retired at career end
  )

  // Build milestone projections
  const applicable2 = MILESTONES.filter((m) => m.playerType === actualPlayerType)
  const milestoneProjections: MilestoneProjection[] = applicable2
    .map((milestone) => {
      const raw = careerStats?.[milestone.statKey]
      const currentValue = typeof raw === 'number' ? raw : typeof raw === 'string' ? parseFloat(raw) : 0

      // For rate stats, use current value as projected (rates don't accumulate).
      // For careerWAR, use the projected total from WAR projections.
      // For other counting stats, use accumulated projected stats.
      let projectedValue: number
      if (milestone.isRate) {
        projectedValue = currentValue // AVG/OBP won't meaningfully change in projection
      } else if (milestone.statKey === 'careerWAR') {
        projectedValue = projectedCareerWAR
      } else {
        projectedValue = Math.round(accumulatedStats[milestone.statKey] ?? currentValue)
      }

      const needed = Math.max(milestone.threshold - currentValue, 0)
      const key = `${milestone.statKey}_${milestone.threshold}`

      let likelihood: number
      if (currentValue >= milestone.threshold) {
        likelihood = 100
      } else if (projectedValue >= milestone.threshold) {
        // Player is projected to reach it; likelihood = probability of still playing at that point
        if (milestone.statKey === 'careerWAR') {
          // For WAR, use the cumulative probability at the point WAR crosses threshold
          likelihood = Math.round((milestoneReachedProb[key] ?? cumulativeProb) * 100)
        } else {
          likelihood = Math.round((milestoneReachedProb[key] ?? 0) * 100)
        }
      } else {
        // Not projected to reach it even with full career
        likelihood = 0
      }

      const projectedProgress = Math.min((projectedValue / milestone.threshold) * 100, 100)

      return {
        label: milestone.label,
        statKey: milestone.statKey,
        threshold: milestone.threshold,
        currentValue,
        projectedValue,
        needed,
        likelihood,
        projectedProgress,
      }
    })
    .filter((m) => m.currentValue > 0 || m.projectedValue > 0)

  return {
    projectedSeasons: totalSeasons,
    projectedCareerEndAge: endAge,
    cumulativePlayProbability: cumulativeProb,
    projectedStats: accumulatedStats,
    projectedWARSeasons,
    projectedCareerWAR,
    projectedHOFScore: projectedScore.overall,
    projectedTier: projectedScore.tier,
    projectedProbability: projectedScore.hofProbability,
    milestoneProjections,
  }
}
