import { formatAvg, formatERA, formatWAR } from '@/utils/stats-helpers.ts'
import type { PlayerAnalysis } from '@/hooks/usePlayerData.ts'

interface CareerStatsRibbonProps {
  data: PlayerAnalysis
}

interface StatItem {
  label: string
  value: string
}

function getHitterStats(stats: Record<string, unknown>, war: number): StatItem[] {
  const g = stats.gamesPlayed as number | undefined
  const h = stats.hits as number | undefined
  const hr = stats.homeRuns as number | undefined
  const rbi = stats.rbi as number | undefined
  const r = stats.runs as number | undefined
  const sb = stats.stolenBases as number | undefined
  const avg = stats.avg as string | undefined
  const obp = stats.obp as string | undefined
  const slg = stats.slg as string | undefined
  const ops = stats.ops as string | undefined

  const items: StatItem[] = []
  if (g !== undefined) items.push({ label: 'G', value: g.toLocaleString() })
  if (avg) items.push({ label: 'AVG', value: formatAvg(avg) })
  if (h !== undefined) items.push({ label: 'H', value: h.toLocaleString() })
  if (hr !== undefined) items.push({ label: 'HR', value: hr.toLocaleString() })
  if (rbi !== undefined) items.push({ label: 'RBI', value: rbi.toLocaleString() })
  if (r !== undefined) items.push({ label: 'R', value: r.toLocaleString() })
  if (sb !== undefined) items.push({ label: 'SB', value: sb.toLocaleString() })
  if (obp) items.push({ label: 'OBP', value: formatAvg(obp) })
  if (slg) items.push({ label: 'SLG', value: formatAvg(slg) })
  if (ops) items.push({ label: 'OPS', value: formatAvg(ops) })
  items.push({ label: 'WAR', value: formatWAR(war) })

  return items
}

function getPitcherStats(stats: Record<string, unknown>, war: number): StatItem[] {
  const w = stats.wins as number | undefined
  const l = stats.losses as number | undefined
  const era = stats.era as string | undefined
  const g = stats.gamesPlayed as number | undefined
  const gs = stats.gamesStarted as number | undefined
  const sv = stats.saves as number | undefined
  const ip = stats.inningsPitched as string | undefined
  const so = stats.strikeOuts as number | undefined
  const whip = stats.whip as string | undefined

  const items: StatItem[] = []
  if (w !== undefined && l !== undefined) items.push({ label: 'W-L', value: `${w}-${l}` })
  if (era) items.push({ label: 'ERA', value: formatERA(era) })
  if (g !== undefined) items.push({ label: 'G', value: g.toLocaleString() })
  if (gs !== undefined) items.push({ label: 'GS', value: gs.toLocaleString() })
  if (sv !== undefined && sv > 0) items.push({ label: 'SV', value: sv.toLocaleString() })
  if (ip) items.push({ label: 'IP', value: ip })
  if (so !== undefined) items.push({ label: 'SO', value: so.toLocaleString() })
  if (whip) items.push({ label: 'WHIP', value: parseFloat(whip).toFixed(2) })
  items.push({ label: 'WAR', value: formatWAR(war) })

  return items
}

export function CareerStatsRibbon({ data }: CareerStatsRibbonProps) {
  const { careerStats, isPitcher, warSeasons } = data
  if (!careerStats) return null

  const careerWAR = warSeasons.reduce((sum, s) => sum + s.war, 0)
  const stats = isPitcher
    ? getPitcherStats(careerStats, careerWAR)
    : getHitterStats(careerStats, careerWAR)

  if (stats.length === 0) return null

  return (
    <div className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5 text-sm">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
