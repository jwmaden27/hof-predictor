import type { SeasonStats } from '@/types/index.ts'

interface PlayerStatTableProps {
  careerStats: Record<string, unknown> | null
  seasonStats: SeasonStats[]
  isPitcher: boolean
}

const HITTING_COLUMNS = [
  { key: 'gamesPlayed', label: 'G' },
  { key: 'atBats', label: 'AB' },
  { key: 'hits', label: 'H' },
  { key: 'doubles', label: '2B' },
  { key: 'triples', label: '3B' },
  { key: 'homeRuns', label: 'HR' },
  { key: 'rbi', label: 'RBI' },
  { key: 'runs', label: 'R' },
  { key: 'baseOnBalls', label: 'BB' },
  { key: 'strikeOuts', label: 'SO' },
  { key: 'stolenBases', label: 'SB' },
  { key: 'avg', label: 'AVG' },
  { key: 'obp', label: 'OBP' },
  { key: 'slg', label: 'SLG' },
  { key: 'ops', label: 'OPS' },
]

const PITCHING_COLUMNS = [
  { key: 'wins', label: 'W' },
  { key: 'losses', label: 'L' },
  { key: 'era', label: 'ERA' },
  { key: 'gamesPlayed', label: 'G' },
  { key: 'gamesStarted', label: 'GS' },
  { key: 'inningsPitched', label: 'IP' },
  { key: 'strikeOuts', label: 'SO' },
  { key: 'baseOnBalls', label: 'BB' },
  { key: 'saves', label: 'SV' },
  { key: 'whip', label: 'WHIP' },
  { key: 'completeGames', label: 'CG' },
  { key: 'shutouts', label: 'SHO' },
  { key: 'strikeoutsPer9Inn', label: 'K/9' },
]

function formatStat(value: unknown): string {
  if (value === undefined || value === null) return '-'
  if (typeof value === 'number') return value.toLocaleString()
  return String(value)
}

export function PlayerStatTable({
  careerStats,
  seasonStats,
  isPitcher,
}: PlayerStatTableProps) {
  const columns = isPitcher ? PITCHING_COLUMNS : HITTING_COLUMNS

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="sticky left-0 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
              Season
            </th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">
              Team
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-right font-medium text-gray-500 dark:text-gray-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {seasonStats.map((season, i) => (
            <tr key={`${season.season}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="sticky left-0 bg-white dark:bg-gray-900 px-3 py-2 font-medium text-gray-900 dark:text-gray-100">
                {season.season}
              </td>
              <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                {season.team.name}
              </td>
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">
                  {formatStat((season.stat as unknown as Record<string, unknown>)[col.key])}
                </td>
              ))}
            </tr>
          ))}

          {/* Career totals row */}
          {careerStats && (
            <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 font-semibold">
              <td className="sticky left-0 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                Career
              </td>
              <td className="px-3 py-2" />
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-2 text-right text-gray-900 dark:text-gray-100">
                  {formatStat(careerStats[col.key])}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
