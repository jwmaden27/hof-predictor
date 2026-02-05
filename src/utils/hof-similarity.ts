import type { SeasonWAR, PositionCategory } from '@/types/index.ts'
import { getAllPlayersWithWAR } from '@/services/war-service.ts'
import { HOF_BALLOT_DATA } from '@/data/hof-ballot-data.ts'

const PEAK_YEARS = 7

// ─── Types ──────────────────────────────────────────────────────────

type TrajectoryShape = 'early-peak' | 'late-bloomer' | 'consistent' | 'standard'

export interface SimilarityMetrics {
  careerWAR: number
  peakWAR: number
  jaws: number
  careerLength: number
  eliteSeasons: number
  solidSeasons: number
  peakSeasonWAR: number
  consistencyScore: number
  trajectoryShape: TrajectoryShape
}

export interface ComparisonDimension {
  label: string
  playerValue: number
  hofValue: number
  ratio: number
  status: 'strength' | 'close' | 'gap'
}

export interface ComparablePlayer {
  playerId: number
  playerName: string
  positionCategory: PositionCategory
  ballotLabel: string
  inductionYear: number
  votePercentage: number | null
  similarityScore: number
  metrics: SimilarityMetrics
  dimensions: ComparisonDimension[]
  strengths: ComparisonDimension[]
  gaps: ComparisonDimension[]
}

export interface ComparablesResult {
  comparables: ComparablePlayer[]
  playerMetrics: SimilarityMetrics
}

// ─── Metric Extraction ──────────────────────────────────────────────

export function extractMetrics(seasons: SeasonWAR[]): SimilarityMetrics {
  const sorted = [...seasons].sort((a, b) => b.war - a.war)
  const careerWAR = Math.round(seasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10
  const peakSeasons = sorted.slice(0, PEAK_YEARS)
  const peakWAR = Math.round(peakSeasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10
  const jaws = Math.round(((careerWAR + peakWAR) / 2) * 10) / 10

  const eliteSeasons = seasons.filter((s) => s.war >= 5.0).length
  const solidSeasons = seasons.filter((s) => s.war >= 3.0).length
  const peakSeasonWAR = sorted.length > 0 ? sorted[0].war : 0
  const careerLength = seasons.length

  const mean = careerWAR / Math.max(careerLength, 1)
  const variance =
    seasons.reduce((sum, s) => sum + (s.war - mean) ** 2, 0) /
    Math.max(careerLength, 1)
  const consistencyScore = Math.round(Math.sqrt(variance) * 10) / 10

  const trajectoryShape = classifyTrajectory(seasons)

  return {
    careerWAR,
    peakWAR,
    jaws,
    careerLength,
    eliteSeasons,
    solidSeasons,
    peakSeasonWAR,
    consistencyScore,
    trajectoryShape,
  }
}

// ─── Trajectory Classification ──────────────────────────────────────

function classifyTrajectory(seasons: SeasonWAR[]): TrajectoryShape {
  if (seasons.length < 5) return 'standard'

  const chronological = [...seasons].sort((a, b) => a.season - b.season)
  const totalSeasons = chronological.length
  const midpoint = Math.floor(totalSeasons / 2)

  const firstHalfWAR = chronological
    .slice(0, midpoint)
    .reduce((s, x) => s + x.war, 0)
  const secondHalfWAR = chronological
    .slice(midpoint)
    .reduce((s, x) => s + x.war, 0)
  const totalWAR = firstHalfWAR + secondHalfWAR

  if (totalWAR === 0) return 'standard'

  const firstHalfRatio = firstHalfWAR / totalWAR

  const wars = chronological.map((s) => s.war)
  const mean = totalWAR / totalSeasons
  const stddev = Math.sqrt(
    wars.reduce((s, w) => s + (w - mean) ** 2, 0) / totalSeasons,
  )
  const cv = mean > 0 ? stddev / mean : 0

  if (cv < 0.4 && Math.abs(firstHalfRatio - 0.5) < 0.1) return 'consistent'
  if (firstHalfRatio > 0.6) return 'early-peak'
  if (firstHalfRatio < 0.4) return 'late-bloomer'
  return 'standard'
}

// ─── Position Affinity ──────────────────────────────────────────────

const POSITION_GROUPS: Record<string, string[]> = {
  'corner-infield': ['1B', '3B'],
  'middle-infield': ['2B', 'SS'],
  'corner-outfield': ['LF', 'RF'],
  'center-outfield': ['CF'],
  catcher: ['C'],
  'starting-pitcher': ['SP'],
  'relief-pitcher': ['RP'],
}

const ADJACENCY: Record<string, string[]> = {
  C: ['1B'],
  '1B': ['C', '3B', 'LF'],
  '2B': ['SS', 'CF'],
  '3B': ['1B', 'SS'],
  SS: ['2B', '3B'],
  LF: ['CF', '1B', 'RF'],
  CF: ['LF', 'RF', '2B'],
  RF: ['CF', 'LF'],
  SP: [],
  RP: [],
}

function getPositionSimilarity(
  pos1: PositionCategory,
  pos2: PositionCategory,
): number {
  if (pos1 === pos2) return 1.0

  const isPitcher1 = pos1 === 'SP' || pos1 === 'RP'
  const isPitcher2 = pos2 === 'SP' || pos2 === 'RP'
  if (isPitcher1 !== isPitcher2) return 0.1
  if (isPitcher1 && isPitcher2) return 0.6

  for (const group of Object.values(POSITION_GROUPS)) {
    if (group.includes(pos1) && group.includes(pos2)) return 0.8
  }

  if (ADJACENCY[pos1]?.includes(pos2)) return 0.5

  return 0.3
}

// ─── Similarity Scoring ─────────────────────────────────────────────

interface WeightedDimension {
  key: keyof SimilarityMetrics
  weight: number
  normalize: (value: number) => number
}

const SIMILARITY_DIMENSIONS: WeightedDimension[] = [
  { key: 'careerWAR', weight: 0.20, normalize: (v) => v / 100 },
  { key: 'jaws', weight: 0.20, normalize: (v) => v / 80 },
  { key: 'peakWAR', weight: 0.18, normalize: (v) => v / 60 },
  { key: 'eliteSeasons', weight: 0.12, normalize: (v) => v / 12 },
  { key: 'peakSeasonWAR', weight: 0.10, normalize: (v) => v / 12 },
  { key: 'careerLength', weight: 0.08, normalize: (v) => v / 25 },
  { key: 'solidSeasons', weight: 0.07, normalize: (v) => v / 18 },
  { key: 'consistencyScore', weight: 0.05, normalize: (v) => v / 4 },
]

function calculateSimilarityScore(
  playerMetrics: SimilarityMetrics,
  hofMetrics: SimilarityMetrics,
  positionSimilarity: number,
): number {
  let weightedDistanceSq = 0
  let totalWeight = 0

  for (const dim of SIMILARITY_DIMENSIONS) {
    const playerVal = playerMetrics[dim.key]
    const hofVal = hofMetrics[dim.key]
    if (typeof playerVal !== 'number' || typeof hofVal !== 'number') continue

    const playerNorm = dim.normalize(playerVal)
    const hofNorm = dim.normalize(hofVal)
    const diff = playerNorm - hofNorm
    weightedDistanceSq += dim.weight * diff * diff
    totalWeight += dim.weight
  }

  const distance = Math.sqrt(weightedDistanceSq / totalWeight)

  let trajectoryBonus = 0
  if (playerMetrics.trajectoryShape === hofMetrics.trajectoryShape) {
    trajectoryBonus = 0.05
  }

  const rawSimilarity = Math.exp(-3 * distance) + trajectoryBonus
  const positionAdjusted = rawSimilarity * (0.6 + 0.4 * positionSimilarity)

  return Math.round(Math.min(Math.max(positionAdjusted, 0), 1) * 100)
}

// ─── Dimension Comparison ───────────────────────────────────────────

const DIMENSION_DEFS: { key: keyof SimilarityMetrics; label: string }[] = [
  { key: 'careerWAR', label: 'Career WAR' },
  { key: 'peakWAR', label: 'Peak WAR (7yr)' },
  { key: 'jaws', label: 'JAWS' },
  { key: 'eliteSeasons', label: 'Elite Seasons (5+ WAR)' },
  { key: 'solidSeasons', label: 'Solid Seasons (3+ WAR)' },
  { key: 'peakSeasonWAR', label: 'Best Single Season' },
  { key: 'careerLength', label: 'Career Length' },
]

function buildDimensions(
  playerMetrics: SimilarityMetrics,
  hofMetrics: SimilarityMetrics,
): ComparisonDimension[] {
  return DIMENSION_DEFS.map(({ key, label }) => {
    const playerValue = playerMetrics[key] as number
    const hofValue = hofMetrics[key] as number
    const ratio = hofValue !== 0 ? playerValue / hofValue : 1

    let status: 'strength' | 'close' | 'gap'
    if (ratio >= 0.95) status = 'strength'
    else if (ratio >= 0.75) status = 'close'
    else status = 'gap'

    return { label, playerValue, hofValue, ratio, status }
  })
}

// ─── Main Entry Point ───────────────────────────────────────────────

export function findComparableHOFPlayers(
  playerSeasons: SeasonWAR[],
  playerPosition: PositionCategory,
  excludePlayerId?: number,
): ComparablesResult {
  const allPlayers = getAllPlayersWithWAR()
  const hofPlayers = allPlayers.filter(
    (p) => p.isHOF === true && p.playerId !== excludePlayerId,
  )

  const playerMetrics = extractMetrics(playerSeasons)

  const scored: ComparablePlayer[] = hofPlayers.map((hofPlayer) => {
    const hofMetrics = extractMetrics(hofPlayer.seasons)
    const positionSimilarity = getPositionSimilarity(
      playerPosition,
      hofPlayer.positionCategory,
    )
    const similarityScore = calculateSimilarityScore(
      playerMetrics,
      hofMetrics,
      positionSimilarity,
    )
    const dimensions = buildDimensions(playerMetrics, hofMetrics)

    const strengths = dimensions.filter((d) => d.status === 'strength')
    const gaps = dimensions.filter((d) => d.status === 'gap')

    const ballot = HOF_BALLOT_DATA[hofPlayer.playerId]

    return {
      playerId: hofPlayer.playerId,
      playerName: hofPlayer.playerName,
      positionCategory: hofPlayer.positionCategory,
      ballotLabel: ballot?.ballotLabel ?? 'Unknown',
      inductionYear: ballot?.inductionYear ?? 0,
      votePercentage: ballot?.votePercentage ?? null,
      similarityScore,
      metrics: hofMetrics,
      dimensions,
      strengths,
      gaps,
    }
  })

  scored.sort((a, b) => b.similarityScore - a.similarityScore)
  const comparables = scored.slice(0, 3)

  return { comparables, playerMetrics }
}
