import type { NHLSkaterStats, NHLGoalieStats, NHLPositionCategory } from '@/types/nhl-player.ts'
import type { NHLSeasonPS } from '@/utils/nhl-jaws.ts'
import type { NHLSeasonStats } from '@/types/nhl-player.ts'
import { NHL_HOF_DATA } from '@/data/nhl-hof-ballot-data.ts'

/**
 * Estimates Point Shares from NHL season stats.
 *
 * Hockey Reference's Point Shares formula is proprietary, but we can
 * approximate it based on the core components:
 * - Offensive Point Shares (OPS): based on goals and assists relative to team/league
 * - Defensive Point Shares (DPS): based on plus/minus and defensive play
 * - Goalie Point Shares (GPS): based on wins, save %, goals against avg
 *
 * Our approximation uses a simplified model that produces values
 * in the same general range as hockey-reference PS.
 */
function estimateSkaterPS(stat: NHLSkaterStats): number {
  if (stat.gamesPlayed === 0) return 0

  // Scale factor: a full season of ~82 games for an average player ≈ 5 PS
  const gamesScale = stat.gamesPlayed / 82

  // Offensive contribution (goals + assists weighted)
  const offensivePS = (stat.goals * 0.12 + stat.assists * 0.07) * gamesScale

  // Plus/minus contribution (small but meaningful)
  const defensivePS = Math.max(0, stat.plusMinus * 0.03) * gamesScale

  // Special teams bonus
  const specialTeamsPS =
    (stat.powerPlayGoals * 0.02 + stat.shorthandedGoals * 0.05) * gamesScale

  // Game-winning goals bonus
  const clutchPS = stat.gameWinningGoals * 0.03

  const total = offensivePS + defensivePS + specialTeamsPS + clutchPS

  // Clamp to reasonable range (0–30 per season)
  return Math.round(Math.max(0, Math.min(total, 30)) * 10) / 10
}

function estimateGoaliePS(stat: NHLGoalieStats): number {
  if (stat.gamesPlayed === 0) return 0

  // Goalie PS is primarily based on wins and save percentage
  const winsContribution = stat.wins * 0.25

  // Save percentage bonus (above .900 baseline)
  const savePctBonus = stat.savePctg > 0
    ? Math.max(0, (stat.savePctg - 0.900) * 100) * stat.gamesPlayed * 0.015
    : 0

  // GAA bonus (below 3.00 baseline)
  const gaaBonus = stat.goalsAgainstAvg > 0
    ? Math.max(0, (3.00 - stat.goalsAgainstAvg)) * stat.gamesPlayed * 0.02
    : 0

  // Shutout bonus
  const shutoutBonus = stat.shutouts * 0.4

  const total = winsContribution + savePctBonus + gaaBonus + shutoutBonus

  return Math.round(Math.max(0, Math.min(total, 30)) * 10) / 10
}

/**
 * Convert NHL season stats into Point Shares seasons for JAWS calculation.
 */
export function convertToSeasonPS(
  seasonStats: NHLSeasonStats[],
  position: NHLPositionCategory,
): NHLSeasonPS[] {
  const isGoalie = position === 'G'

  return seasonStats
    .filter((s) => s.leagueAbbrev === 'NHL' && s.gameTypeId === 2)
    .map((s) => {
      const ps = isGoalie
        ? estimateGoaliePS(s.stat as NHLGoalieStats)
        : estimateSkaterPS(s.stat as NHLSkaterStats)

      return {
        season: s.season,
        ps,
        team: s.teamName,
      }
    })
}

/**
 * Get career stats as a flat Record<string, number> for milestone checking.
 */
export function flattenCareerStats(
  careerStats: NHLSkaterStats | NHLGoalieStats,
): Record<string, number> {
  const record: Record<string, number> = {}
  for (const [key, value] of Object.entries(careerStats)) {
    if (typeof value === 'number') {
      record[key] = value
    }
  }
  return record
}

/**
 * Check if a player is in the Hockey Hall of Fame.
 */
export function isNHLHallOfFamer(playerId: number): boolean {
  const info = NHL_HOF_DATA[playerId]
  return info !== undefined && info.inductionYear !== null
}
