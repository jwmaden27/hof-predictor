import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { SeasonWAR } from '@/types/index.ts'

interface WarProgressionChartProps {
  seasons: SeasonWAR[]
}

export function WarProgressionChart({ seasons }: WarProgressionChartProps) {
  const chartTheme = useChartTheme()
  const sortedSeasons = [...seasons].sort((a, b) => a.season - b.season)

  let cumulative = 0
  const data = sortedSeasons.map((s) => {
    cumulative += s.war
    return {
      season: s.season,
      war: s.war,
      cumulativeWAR: Math.round(cumulative * 10) / 10,
    }
  })

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        WAR Progression
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridStroke} />
          <XAxis
            dataKey="season"
            tick={{ fontSize: 11, fill: chartTheme.axisTickColor }}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="war"
            tick={{ fontSize: 12, fill: chartTheme.axisTickColor }}
            label={{
              value: 'Season WAR',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 11, fill: chartTheme.axisTickColor },
            }}
          />
          <YAxis
            yAxisId="cumulative"
            orientation="right"
            tick={{ fontSize: 12, fill: chartTheme.axisTickColor }}
            label={{
              value: 'Cumulative WAR',
              angle: 90,
              position: 'insideRight',
              style: { fontSize: 11, fill: chartTheme.axisTickColor },
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              Number(value).toFixed(1),
              name === 'war' ? 'Season WAR' : 'Cumulative WAR',
            ]}
            labelFormatter={(label) => `Season: ${label}`}
            contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipTextColor }}
          />
          <ReferenceLine yAxisId="war" y={0} stroke={chartTheme.referenceLineStroke} />
          <Area
            yAxisId="cumulative"
            type="monotone"
            dataKey="cumulativeWAR"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={0.3}
          />
          <Area
            yAxisId="war"
            type="monotone"
            dataKey="war"
            fill="#bbf7d0"
            stroke="#22c55e"
            strokeWidth={2}
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
