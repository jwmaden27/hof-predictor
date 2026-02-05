import { useMemo } from 'react'
import { getAllPlayersWithWAR, isHallOfFamer } from '@/services/war-service.ts'
import { calculateJAWS, compareToHOFAverage } from '@/utils/jaws.ts'
import type { JAWSComparison, SeasonWAR, PositionCategory, HOFTier } from '@/types/index.ts'

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

/**
 * Assigns a tier based on JAWS ratio and WAR trajectory.
 * Used on the dashboard where we only have WAR data (no awards or career stats).
 * Uses JAWS ratio as the primary signal since it directly measures a player
 * against the HOF average at their position — the core JAWS methodology.
 */
function assignJAWSTier(comparison: JAWSComparison, seasons: SeasonWAR[]): HOFTier {
  const { jawsRatio, careerWARRatio, peakWARRatio } = comparison
  // Composite weighted ratio — same weights as the JAWS component in scoring.ts
  const composite = jawsRatio * 0.6 + careerWARRatio * 0.2 + peakWARRatio * 0.2

  // Trajectory bonus: elite peak seasons indicate award-caliber play
  const eliteSeasons = seasons.filter((s) => s.war >= 5.0).length
  const mvpCaliberSeasons = seasons.filter((s) => s.war >= 7.0).length
  const trajectoryBonus =
    Math.min(mvpCaliberSeasons * 0.04, 0.12) + Math.min(eliteSeasons * 0.015, 0.075)

  const adjusted = composite + trajectoryBonus

  if (adjusted >= 1.15) return 'First Ballot Lock'
  if (adjusted >= 0.95) return 'Strong Candidate'
  if (adjusted >= 0.75) return 'Solid Candidate'
  if (adjusted >= 0.55) return 'Borderline'
  if (adjusted >= 0.35) return 'Unlikely'
  return 'Not HOF Caliber'
}

export function useLeaderboard(positionFilter?: PositionCategory, tierFilter?: HOFTier) {
  const entries = useMemo(() => {
    const allPlayers = getAllPlayersWithWAR().filter((p) => p.seasons.length > 0)
    const leaderboard: LeaderboardEntry[] = allPlayers.map((player) => {
      const jawsResult = calculateJAWS(player.seasons, player.positionCategory)
      const comparison = compareToHOFAverage(jawsResult)

      return {
        playerId: player.playerId,
        playerName: player.playerName,
        careerWAR: jawsResult.careerWAR,
        peakWAR: jawsResult.peakWAR,
        jaws: jawsResult.jaws,
        jawsRatio: comparison.jawsRatio,
        positionCategory: jawsResult.positionCategory,
        tier: isHallOfFamer(player.playerId)
          ? 'Hall of Famer'
          : assignJAWSTier(comparison, player.seasons),
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
