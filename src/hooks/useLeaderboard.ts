import { useMemo } from 'react'
import { getAllPlayersWithWAR, isHallOfFamer } from '@/services/war-service.ts'
import { calculateJAWS, compareToHOFAverage } from '@/utils/jaws.ts'
import { assignTier } from '@/utils/scoring.ts'
import type { PositionCategory, HOFTier } from '@/types/index.ts'

export interface LeaderboardEntry {
  playerId: number
  playerName: string
  careerWAR: number
  peakWAR: number
  jaws: number
  jawsRatio: number
  positionCategory: PositionCategory
  tier: HOFTier
}

export function useLeaderboard(positionFilter?: PositionCategory, tierFilter?: HOFTier) {
  const entries = useMemo(() => {
    const allPlayers = getAllPlayersWithWAR().filter((p) => p.seasons.length > 0)
    const leaderboard: LeaderboardEntry[] = allPlayers.map((player) => {
      const jawsResult = calculateJAWS(player.seasons, player.positionCategory)
      const comparison = compareToHOFAverage(jawsResult)

      // Simplified tier from JAWS ratio alone (full scoring needs API data)
      const estimatedScore = Math.min(
        Math.round(comparison.jawsRatio * 60 + Math.min(player.seasons.filter(s => s.war >= 5).length * 2, 15)),
        100,
      )

      return {
        playerId: player.playerId,
        playerName: player.playerName,
        careerWAR: jawsResult.careerWAR,
        peakWAR: jawsResult.peakWAR,
        jaws: jawsResult.jaws,
        jawsRatio: comparison.jawsRatio,
        positionCategory: jawsResult.positionCategory,
        tier: isHallOfFamer(player.playerId) ? 'Hall of Famer' : assignTier(estimatedScore),
      }
    })

    let filtered = positionFilter
      ? leaderboard.filter((e) => e.positionCategory === positionFilter)
      : leaderboard

    if (tierFilter) {
      filtered = filtered.filter((e) => e.tier === tierFilter)
    }

    return filtered.sort((a, b) => b.jaws - a.jaws)
  }, [positionFilter, tierFilter])

  return entries
}
