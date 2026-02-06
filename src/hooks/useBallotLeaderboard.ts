import { useMemo } from 'react'
import { getAllBallotCandidates, CURRENT_BALLOT_YEAR } from '@/data/current-ballot.ts'
import { getPlayerWAR, isHallOfFamer } from '@/services/war-service.ts'
import { calculateJAWS, compareToHOFAverage } from '@/utils/jaws.ts'
import type { PositionCategory, HOFTier } from '@/types/index.ts'

export interface BallotLeaderboardEntry {
  playerId: number
  playerName: string
  careerWAR: number
  peakWAR: number
  jaws: number
  jawsRatio: number
  positionCategory: PositionCategory
  tier: HOFTier
  ballotYear: number
  votePercentage: number | null
  isElected: boolean
  isNewToAllot: boolean
}

/**
 * Assigns a tier based on JAWS ratio and WAR trajectory.
 */
function assignJAWSTier(jawsRatio: number, careerWARRatio: number, peakWARRatio: number): HOFTier {
  const composite = jawsRatio * 0.6 + careerWARRatio * 0.2 + peakWARRatio * 0.2

  if (composite >= 1.15) return 'First Ballot Lock'
  if (composite >= 0.95) return 'Strong Candidate'
  if (composite >= 0.75) return 'Solid Candidate'
  if (composite >= 0.55) return 'Borderline'
  if (composite >= 0.35) return 'Unlikely'
  return 'Not HOF Caliber'
}

export function useBallotLeaderboard(positionFilter?: PositionCategory, tierFilters: HOFTier[] = []) {
  const entries = useMemo(() => {
    const candidates = getAllBallotCandidates()
    const leaderboard: BallotLeaderboardEntry[] = []

    for (const candidate of candidates) {
      // Get WAR data if available
      const warEntry = getPlayerWAR(candidate.playerId)

      let careerWAR = 0
      let peakWAR = 0
      let jaws = 0
      let jawsRatio = 0
      let tier: HOFTier = 'Not HOF Caliber'

      if (warEntry && warEntry.seasons.length > 0) {
        const jawsResult = calculateJAWS(warEntry.seasons, candidate.positionCategory)
        const comparison = compareToHOFAverage(jawsResult)

        careerWAR = jawsResult.careerWAR
        peakWAR = jawsResult.peakWAR
        jaws = jawsResult.jaws
        jawsRatio = comparison.jawsRatio

        tier = isHallOfFamer(candidate.playerId)
          ? 'Hall of Famer'
          : assignJAWSTier(comparison.jawsRatio, comparison.careerWARRatio, comparison.peakWARRatio)
      }

      leaderboard.push({
        playerId: candidate.playerId,
        playerName: candidate.playerName,
        careerWAR,
        peakWAR,
        jaws,
        jawsRatio,
        positionCategory: candidate.positionCategory,
        tier,
        ballotYear: candidate.ballotYear,
        votePercentage: candidate.votePercentage,
        isElected: candidate.isElected,
        isNewToAllot: candidate.isNewToAllot,
      })
    }

    // Filter by position
    let filtered = positionFilter
      ? leaderboard.filter((e) => e.positionCategory === positionFilter)
      : leaderboard

    // Filter by tier
    if (tierFilters.length > 0) {
      filtered = filtered.filter((e) => tierFilters.includes(e.tier))
    }

    // Sort by vote percentage (elected first, then by percentage)
    return filtered.sort((a, b) => {
      if (a.isElected !== b.isElected) return a.isElected ? -1 : 1
      return (b.votePercentage ?? 0) - (a.votePercentage ?? 0)
    })
  }, [positionFilter, tierFilters])

  return { entries, ballotYear: CURRENT_BALLOT_YEAR }
}
