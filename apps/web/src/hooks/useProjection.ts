import { useState, useMemo } from 'react'
import {
  projectFutureScores,
  findTierThresholds,
  getProjectionSummary,
} from '@/utils/projections.ts'
import type {
  SeasonWAR,
  Award,
  PositionCategory,
  ProjectionPoint,
} from '@/types/index.ts'
import type { TierThreshold } from '@/utils/projections.ts'

interface UseProjectionParams {
  currentSeasons: SeasonWAR[]
  positionCategory: PositionCategory
  awards: Award[]
  careerStats: Record<string, number>
  playerType: 'hitter' | 'pitcher'
  currentAge: number
  isActive: boolean
}

export function useProjection(params: UseProjectionParams | null) {
  const [futureWAR, setFutureWAR] = useState(4.0)

  const projectionData = useMemo<{
    points: ProjectionPoint[]
    thresholds: TierThreshold[]
    summary: string
  } | null>(() => {
    if (!params || !params.isActive) return null

    const points = projectFutureScores(
      params.currentSeasons,
      params.positionCategory,
      params.awards,
      params.careerStats,
      params.playerType,
      params.currentAge,
      futureWAR,
    )

    const thresholds = findTierThresholds(points)
    const summary = getProjectionSummary(points, futureWAR)

    return { points, thresholds, summary }
  }, [params, futureWAR])

  return {
    futureWAR,
    setFutureWAR,
    projectionData,
  }
}
