import { useMemo } from 'react'
import { getAllBallotCandidates, CURRENT_BALLOT_YEAR } from '@/data/current-ballot.ts'
import { getPlayerWAR, isHallOfFamer } from '@/services/war-service.ts'
import { calculateJAWS, compareToHOFAverage } from '@/utils/jaws.ts'
import { calculateHOFProbability, predictBallot } from '@/utils/hof-probability.ts'
import { calculateJAWSComponent, calculateTrajectoryComponent, assignTier } from '@/utils/scoring.ts'
import type { PositionCategory, HOFTier, JAWSComparison, SeasonWAR } from '@/types/index.ts'

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
  hofScore: number
  hofProbability: number
  ballotPrediction: { ballot: string; description: string }
}

/**
 * Calculates a simplified HOF score for ballot candidates
 * Uses JAWS as primary component plus trajectory
 */
function calculateBallotHOFScore(
  jawsComparison: JAWSComparison,
  seasons: SeasonWAR[],
): number {
  const jawsComponent = calculateJAWSComponent(jawsComparison)
  // Use 35 as age since these are retired players, not active
  const trajectoryComponent = calculateTrajectoryComponent(seasons, 35, false)

  // Simplified scoring: JAWS (40 max) + Trajectory (15 max) = 55 max from these components
  // Scale up to approximate full score range
  const baseScore = jawsComponent + trajectoryComponent
  // Add bonus based on career WAR ratio to approximate awards/milestones component
  const careerBonus = Math.min(jawsComparison.careerWARRatio * 20, 25)

  return Math.min(Math.round(baseScore + careerBonus), 100)
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
      let hofScore = 0
      let hofProbability = 0
      let ballotPrediction = { ballot: 'Unlikely', description: 'Insufficient data for prediction.' }

      if (warEntry && warEntry.seasons.length > 0) {
        const jawsResult = calculateJAWS(warEntry.seasons, candidate.positionCategory)
        const comparison = compareToHOFAverage(jawsResult)

        careerWAR = jawsResult.careerWAR
        peakWAR = jawsResult.peakWAR
        jaws = jawsResult.jaws
        jawsRatio = comparison.jawsRatio

        // Calculate HOF score and prediction
        hofScore = calculateBallotHOFScore(comparison, warEntry.seasons)
        hofProbability = calculateHOFProbability(hofScore)
        ballotPrediction = predictBallot(hofScore)

        tier = isHallOfFamer(candidate.playerId)
          ? 'Hall of Famer'
          : assignTier(hofScore)
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
        hofScore,
        hofProbability,
        ballotPrediction,
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
