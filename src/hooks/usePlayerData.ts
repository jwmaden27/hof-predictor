import { useState, useEffect } from 'react'
import { getPlayerComplete } from '@/services/mlb-api.ts'
import { getPlayerSeasonWARs, getPlayerWAR, hasWARData, isHallOfFamer, fetchAndCacheWAR } from '@/services/war-service.ts'
import { calculateJAWS, compareToHOFAverage } from '@/utils/jaws.ts'
import { calculateHOFScore } from '@/utils/scoring.ts'
import { mapPositionToCategory, getPlayerType } from '@/utils/stats-helpers.ts'
import type {
  PlayerBio,
  Award,
  SeasonStats,
  SeasonWAR,
  JAWSResult,
  JAWSComparison,
  HOFScore,
  PositionCategory,
} from '@/types/index.ts'

export interface PlayerAnalysis {
  bio: PlayerBio
  careerStats: Record<string, unknown> | null
  seasonStats: SeasonStats[]
  awards: Award[]
  jawsResult: JAWSResult | null
  jawsComparison: JAWSComparison | null
  hofScore: HOFScore | null
  warSeasons: SeasonWAR[]
  hasWAR: boolean
  positionCategory: PositionCategory
  isPitcher: boolean
}

export function usePlayerData(playerId: number | null) {
  const [data, setData] = useState<PlayerAnalysis | null>(null)
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
        const { bio, careerStats, seasonStats, awards, isPitcher } =
          await getPlayerComplete(playerId)

        if (cancelled) return

        const warEntry = getPlayerWAR(playerId)
        const positionCategory = warEntry?.positionCategory ??
          mapPositionToCategory(bio.primaryPosition)
        let warSeasons = getPlayerSeasonWARs(playerId)
        let playerHasWAR = hasWARData(playerId)

        // If no WAR data in static bundle, try fetching on-demand
        if (!playerHasWAR) {
          const fetched = await fetchAndCacheWAR(
            playerId,
            bio.fullName,
            positionCategory,
          )
          if (cancelled) return
          if (fetched.length > 0) {
            warSeasons = fetched
            playerHasWAR = true
          }
        }

        let jawsResult: JAWSResult | null = null
        let jawsComparison: JAWSComparison | null = null
        let hofScore: HOFScore | null = null

        if (playerHasWAR && warSeasons.length > 0) {
          jawsResult = calculateJAWS(warSeasons, positionCategory)
          jawsComparison = compareToHOFAverage(jawsResult)

          const playerType = getPlayerType(bio.primaryPosition.code)
          const statsRecord: Record<string, number> = {}
          if (careerStats) {
            for (const [key, value] of Object.entries(careerStats)) {
              if (typeof value === 'number') {
                statsRecord[key] = value
              } else if (typeof value === 'string') {
                const parsed = parseFloat(value)
                if (!isNaN(parsed)) statsRecord[key] = parsed
              }
            }
          }

          hofScore = calculateHOFScore(
            jawsComparison,
            awards,
            statsRecord,
            playerType,
            warSeasons,
            bio.currentAge,
            bio.active,
          )

          if (playerId && isHallOfFamer(playerId)) {
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
          warSeasons,
          hasWAR: playerHasWAR,
          positionCategory,
          isPitcher,
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
