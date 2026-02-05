import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { SeasonWAR, PeakSeason } from '@/types/index.ts'

interface PeakSeasonsChartProps {
  seasons: SeasonWAR[]
  peakSeasons: PeakSeason[]
}

export function PeakSeasonsChart({ seasons, peakSeasons }: PeakSeasonsChartProps) {
  const chartTheme = useChartTheme()
  const peakYears = new Set(peakSeasons.map((p) => p.season))

  const data = seasons
    .filter((s) => s.war !== 0 || peakYears.has(s.season))
    .sort((a, b) => a.season - b.season)
    .map((s) => ({
      season: s.season,
      war: s.war,
      isPeak: peakYears.has(s.season),
    }))

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        WAR by Season (peak seasons highlighted)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridStroke} />
          <XAxis
            dataKey="season"
            tick={{ fontSize: 11, fill: chartTheme.axisTickColor }}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <Tooltip
            formatter={(value) => [Number(value).toFixed(1), 'WAR']}
            labelFormatter={(label) => `Season: ${label}`}
            contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipTextColor }}
          />
          <ReferenceLine y={0} stroke={chartTheme.referenceLineStroke} />
          <Bar dataKey="war" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isPeak ? '#f59e0b' : '#93c5fd'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-amber-500" />
          Peak 7 seasons
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-sm bg-blue-300" />
          Other seasons
        </span>
      </div>
    </div>
  )
}
