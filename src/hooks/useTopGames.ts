import { useState, useEffect } from 'react'
import { getPlayerAllGameLogs } from '@/services/mlb-api.ts'
import type { HittingStats, PitchingStats } from '@/types/index.ts'

export interface TopGame {
  date: string
  season: string
  opponent: string
  isHome: boolean
  isWin: boolean
  gameScore: number
  stat: HittingStats | PitchingStats
  gamePk: number
}

/**
 * Calculate a game score for hitters based on offensive production
 * Weights: HR=4, 3B=3, 2B=2, H=1, RBI=1, R=1, BB=0.5, SB=0.5, K=-0.5
 */
function calculateHitterGameScore(stat: HittingStats): number {
  const hits = stat.hits ?? 0
  const doubles = stat.doubles ?? 0
  const triples = stat.triples ?? 0
  const homeRuns = stat.homeRuns ?? 0
  const rbi = stat.rbi ?? 0
  const runs = stat.runs ?? 0
  const baseOnBalls = stat.baseOnBalls ?? 0
  const stolenBases = stat.stolenBases ?? 0
  const strikeOuts = stat.strikeOuts ?? 0

  // Singles = hits - doubles - triples - homeRuns
  const singles = hits - doubles - triples - homeRuns

  return (
    singles * 1 +
    doubles * 2 +
    triples * 3 +
    homeRuns * 4 +
    rbi * 1 +
    runs * 1 +
    baseOnBalls * 0.5 +
    stolenBases * 0.5 -
    strikeOuts * 0.25
  )
}

/**
 * Calculate a game score for pitchers based on Bill James' Game Score formula (modified)
 * Start with 50, +1 per out, +2 per K after 4, -2 per H, -4 per ER, -2 per BB, +5 for CG, +5 for shutout
 */
function calculatePitcherGameScore(stat: PitchingStats): number {
  const inningsPitched = parseFloat(String(stat.inningsPitched ?? '0'))
  const outs = Math.floor(inningsPitched) * 3 + Math.round((inningsPitched % 1) * 10)
  const strikeOuts = stat.strikeOuts ?? 0
  const hits = stat.hits ?? 0
  const earnedRuns = stat.earnedRuns ?? 0
  const baseOnBalls = stat.baseOnBalls ?? 0
  const completeGames = stat.completeGames ?? 0
  const shutouts = stat.shutouts ?? 0

  let score = 50
  score += outs
  score += Math.max(0, strikeOuts - 4) * 2
  score -= hits * 2
  score -= earnedRuns * 4
  score -= baseOnBalls * 2
  score += completeGames * 5
  score += shutouts * 5

  return score
}

function isHittingStats(stat: HittingStats | PitchingStats): stat is HittingStats {
  return 'atBats' in stat
}

export function useTopGames(
  playerId: number | null,
  seasons: number[],
  isPitcher: boolean,
  limit: number = 10,
) {
  const [topGames, setTopGames] = useState<TopGame[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!playerId || seasons.length === 0) {
      setTopGames([])
      return
    }

    const fetchGames = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const group = isPitcher ? 'pitching' : 'hitting'
        const gameLogs = await getPlayerAllGameLogs(playerId, seasons, group)

        // Calculate game scores and sort
        const scoredGames: TopGame[] = gameLogs.map((game) => {
          const gameScore = isHittingStats(game.stat)
            ? calculateHitterGameScore(game.stat)
            : calculatePitcherGameScore(game.stat as PitchingStats)

          return {
            date: game.date,
            season: game.season,
            opponent: game.opponent.name,
            isHome: game.isHome,
            isWin: game.isWin,
            gameScore,
            stat: game.stat,
            gamePk: game.game.gamePk,
          }
        })

        // Sort by game score descending and take top N
        const sorted = scoredGames
          .sort((a, b) => b.gameScore - a.gameScore)
          .slice(0, limit)

        setTopGames(sorted)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch game logs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [playerId, seasons.join(','), isPitcher, limit])

  return { topGames, isLoading, error }
}
