import { useState } from 'react'
import { Tabs } from '@/components/ui/Tabs.tsx'
import {
  NHL_HOF_POSITIONAL_STATS,
  type NHLHOFSkaterPositionalStats,
  type NHLHOFGoaliePositionalStats,
} from '@/data/nhl-hof-positional-stats.ts'
import type { NHLPositionCategory } from '@/types/nhl-player.ts'

const POSITION_TABS = [
  { label: 'Center', value: 'C' },
  { label: 'Left Wing', value: 'LW' },
  { label: 'Right Wing', value: 'RW' },
  { label: 'Defense', value: 'D' },
  { label: 'Goalie', value: 'G' },
]

/** Display labels for stat keys */
const STAT_LABELS: Record<string, string> = {
  gamesPlayed: 'Games Played',
  goals: 'Goals',
  assists: 'Assists',
  points: 'Points',
  plusMinus: 'Plus/Minus',
  pim: 'PIM',
  powerPlayGoals: 'Power Play Goals',
  powerPlayPoints: 'Power Play Points',
  shorthandedGoals: 'Shorthanded Goals',
  shorthandedPoints: 'Shorthanded Points',
  gameWinningGoals: 'Game-Winning Goals',
  shots: 'Shots',
  shootingPctg: 'Shooting %',
  faceoffWinningPctg: 'Faceoff Win %',
  gamesStarted: 'Games Started',
  wins: 'Wins',
  losses: 'Losses',
  otLosses: 'OT Losses',
  goalsAgainstAvg: 'GAA',
  savePctg: 'Save %',
  shutouts: 'Shutouts',
  shotsAgainst: 'Shots Against',
  goalsAgainst: 'Goals Against',
}

/** Stats where lower is better */
const LOWER_IS_BETTER = new Set(['goalsAgainstAvg', 'losses', 'otLosses', 'goalsAgainst'])

/** Rate stats displayed as decimals */
const RATE_STATS = new Set(['shootingPctg', 'faceoffWinningPctg', 'goalsAgainstAvg', 'savePctg'])

/** Stats to highlight (most important for HOF evaluation) */
const SKATER_PRIMARY_STATS = [
  'gamesPlayed', 'goals', 'assists', 'points', 'powerPlayGoals', 'gameWinningGoals',
]
const GOALIE_PRIMARY_STATS = [
  'gamesPlayed', 'wins', 'goalsAgainstAvg', 'savePctg', 'shutouts',
]

function formatStatValue(key: string, value: number): string {
  if (key === 'savePctg') return value > 0 ? `.${(value * 1000).toFixed(0)}` : '—'
  if (key === 'goalsAgainstAvg') return value.toFixed(2)
  if (key === 'shootingPctg' || key === 'faceoffWinningPctg') {
    return `${(value * 100).toFixed(1)}%`
  }
  if (Number.isInteger(value)) return value.toLocaleString()
  return value.toFixed(1)
}

function getComparisonColor(
  playerValue: number,
  medianValue: number,
  statKey: string,
): string {
  if (playerValue === 0 && !RATE_STATS.has(statKey)) return ''
  const ratio = playerValue / medianValue
  const isLowerBetter = LOWER_IS_BETTER.has(statKey)

  if (isLowerBetter) {
    if (ratio <= 0.9) return 'text-green-600 dark:text-green-400'
    if (ratio >= 1.1) return 'text-red-600 dark:text-red-400'
    return ''
  }

  if (ratio >= 1.1) return 'text-green-600 dark:text-green-400'
  if (ratio <= 0.9) return 'text-red-600 dark:text-red-400'
  return ''
}

interface NHLPositionalStandardsProps {
  /** If provided, shows player's stats alongside HOF averages for comparison */
  playerStats?: Record<string, number>
  /** Player's position — pre-selects the tab if provided */
  playerPosition?: NHLPositionCategory
}

export function NHLPositionalStandards({
  playerStats,
  playerPosition,
}: NHLPositionalStandardsProps) {
  const [activeTab, setActiveTab] = useState<string>(playerPosition ?? 'C')

  const position = activeTab as NHLPositionCategory
  const posData = NHL_HOF_POSITIONAL_STATS[position]
  const isGoalie = position === 'G'
  const primaryStats = isGoalie ? GOALIE_PRIMARY_STATS : SKATER_PRIMARY_STATS

  // Type guard: get the stats object
  const stats = posData.stats as Record<string, { mean: number; median: number }>

  // Get the stats to display — show primary stats first, then the rest
  const allStatKeys = Object.keys(stats)
  const sortedStatKeys = [
    ...primaryStats.filter((k) => allStatKeys.includes(k)),
    ...allStatKeys.filter((k) => !primaryStats.includes(k)),
  ]

  return (
    <div>
      {!playerPosition && (
        <Tabs
          tabs={POSITION_TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-4"
        />
      )}

      <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
        Based on {posData.sampleSize} Hall of Fame {
          isGoalie ? 'goalies' : position === 'D' ? 'defensemen' : 'forwards'
        }
        {playerPosition && (
          <span className="ml-1">
            ({POSITION_TABS.find((t) => t.value === position)?.label})
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Stat
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                HOF Median
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                HOF Mean
              </th>
              {playerStats && (
                <>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    Player
                  </th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    % of Median
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedStatKeys.map((key) => {
              const stat = stats[key]
              if (!stat) return null
              const isPrimary = primaryStats.includes(key)
              const playerValue = playerStats?.[key]
              const hasPlayerValue = playerValue !== undefined && playerValue !== null

              let pctOfMedian = 0
              if (hasPlayerValue && stat.median !== 0) {
                pctOfMedian = Math.round((playerValue / stat.median) * 100)
              }

              return (
                <tr
                  key={key}
                  className={`border-b border-gray-100 dark:border-gray-800 ${
                    isPrimary ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <td className={`px-3 py-1.5 ${isPrimary ? 'font-medium' : ''} text-gray-900 dark:text-gray-100`}>
                    {STAT_LABELS[key] ?? key}
                  </td>
                  <td className="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-gray-100">
                    {formatStatValue(key, stat.median)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-gray-500 dark:text-gray-400">
                    {formatStatValue(key, stat.mean)}
                  </td>
                  {playerStats && (
                    <>
                      <td className={`px-3 py-1.5 text-right font-medium ${
                        hasPlayerValue ? getComparisonColor(playerValue, stat.median, key) : 'text-gray-400'
                      }`}>
                        {hasPlayerValue ? formatStatValue(key, playerValue) : '—'}
                      </td>
                      <td className={`px-3 py-1.5 text-right text-xs ${
                        hasPlayerValue ? getComparisonColor(playerValue, stat.median, key) : 'text-gray-400'
                      }`}>
                        {hasPlayerValue && stat.median !== 0 ? `${pctOfMedian}%` : '—'}
                      </td>
                    </>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
