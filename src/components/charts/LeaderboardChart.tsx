import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { LeaderboardEntry } from '@/hooks/useLeaderboard.ts'

interface LeaderboardChartProps {
  data: LeaderboardEntry[]
}

const POSITION_COLORS: Record<string, string> = {
  C: '#8b5cf6',
  '1B': '#f97316',
  '2B': '#06b6d4',
  '3B': '#ef4444',
  SS: '#eab308',
  LF: '#22c55e',
  CF: '#3b82f6',
  RF: '#ec4899',
  SP: '#14b8a6',
  RP: '#a855f7',
}

export function LeaderboardChart({ data }: LeaderboardChartProps) {
  const chartTheme = useChartTheme()
  const chartData = data.slice(0, 20).map((entry) => ({
    name:
      entry.playerName.length > 15
        ? entry.playerName.slice(0, 14) + '...'
        : entry.playerName,
    jaws: entry.jaws,
    position: entry.positionCategory,
    fullName: entry.playerName,
  }))

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Top JAWS Scores
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 28)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={chartTheme.gridStroke} />
          <XAxis type="number" tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: chartTheme.axisTickColor }}
            width={120}
          />
          <Tooltip
            formatter={(value) => [Number(value).toFixed(1), 'JAWS']}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.fullName ?? ''
            }
            contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipTextColor }}
          />
          <Bar dataKey="jaws" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={POSITION_COLORS[entry.position] ?? '#6b7280'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
        {Object.entries(POSITION_COLORS).map(([pos, color]) => (
          <span key={pos} className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: color }}
            />
            {pos}
          </span>
        ))}
      </div>
    </div>
  )
}
