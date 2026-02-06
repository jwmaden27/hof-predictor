import { useState, useEffect } from 'react'
import { getNHLPlayerComplete } from '@/services/nhl-api.ts'
import { convertToSeasonPS, flattenCareerStats, isNHLHallOfFamer } from '@/services/nhl-ps-service.ts'
import { calculateNHLJAWS, compareToNHLHOFAverage } from '@/utils/nhl-jaws.ts'
import { calculateNHLHOFScore } from '@/utils/nhl-scoring.ts'
import type {
  NHLPlayerBio,
  NHLSkaterStats,
  NHLGoalieStats,
  NHLSeasonStats,
  NHLAward,
  NHLPositionCategory,
} from '@/types/nhl-player.ts'
import type { NHLJAWSResult, NHLJAWSComparison, NHLSeasonPS } from '@/utils/nhl-jaws.ts'
import type { HOFScore } from '@/types/scoring.ts'

export interface NHLPlayerAnalysis {
  bio: NHLPlayerBio
  careerStats: NHLSkaterStats | NHLGoalieStats
  seasonStats: NHLSeasonStats[]
  awards: NHLAward[]
  jawsResult: NHLJAWSResult | null
  jawsComparison: NHLJAWSComparison | null
  hofScore: HOFScore | null
  psSeasons: NHLSeasonPS[]
  positionCategory: NHLPositionCategory
  isGoalie: boolean
}

export function useNHLPlayerData(playerId: number | null) {
  const [data, setData] = useState<NHLPlayerAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!playerId) {
      setData(null)
      return
    }

    let cancelled = false

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { bio, careerStats, seasonStats, awards } =
          await getNHLPlayerComplete(playerId)

        if (cancelled) return

        const isGoalie = bio.position === 'G'
        const positionCategory = bio.position

        // Convert season stats to Point Shares
        const psSeasons = convertToSeasonPS(seasonStats, positionCategory)

        let jawsResult: NHLJAWSResult | null = null
        let jawsComparison: NHLJAWSComparison | null = null
        let hofScore: HOFScore | null = null

        if (psSeasons.length > 0) {
          jawsResult = calculateNHLJAWS(psSeasons, positionCategory)
          jawsComparison = compareToNHLHOFAverage(jawsResult)

          const statsRecord = flattenCareerStats(careerStats)
          const playerType = isGoalie ? 'goalie' : 'skater'

          hofScore = calculateNHLHOFScore(
            jawsComparison,
            awards,
            statsRecord,
            playerType,
            psSeasons,
            bio.currentAge,
            bio.active,
          )

          if (isNHLHallOfFamer(playerId)) {
            hofScore = { ...hofScore, tier: 'Hall of Famer' }
          }
        }

        if (cancelled) return

        setData({
          bio,
          careerStats,
          seasonStats,
          awards,
          jawsResult,
          jawsComparison,
          hofScore,
          psSeasons,
          positionCategory,
          isGoalie,
        })
      } catch {
        if (!cancelled) setError('Failed to load player data')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [playerId])

  return { data, isLoading, error }
}
