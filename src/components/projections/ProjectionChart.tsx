import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { ProjectionPoint } from '@/types/index.ts'
import { getScoreColor } from '@/utils/stats-helpers.ts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'

interface ProjectionChartProps {
  points: ProjectionPoint[]
}

const TIER_LINES = [
  { value: 45, label: 'Borderline', color: '#eab308' },
  { value: 60, label: 'Solid', color: '#3b82f6' },
  { value: 75, label: 'Strong', color: '#10b981' },
  { value: 90, label: 'Lock', color: '#f59e0b' },
]

export function ProjectionChart({ points }: ProjectionChartProps) {
  const chartTheme = useChartTheme()
  const data = points.map((p) => ({
    year: p.year === 0 ? 'Now' : `+${p.year}`,
    score: p.projectedScore,
    jaws: p.projectedJAWS,
  }))

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Projected HOF Score Over Future Seasons
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridStroke} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <Tooltip
            formatter={(value, name) => [
              name === 'score' ? Number(value) : Number(value).toFixed(1),
              name === 'score' ? 'HOF Score' : 'JAWS',
            ]}
            contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipTextColor }}
          />
          {TIER_LINES.map((tier) => (
            <ReferenceLine
              key={tier.value}
              y={tier.value}
              stroke={tier.color}
              strokeDasharray="5 5"
              strokeOpacity={0.6}
              label={{
                value: tier.label,
                position: 'right',
                fill: tier.color,
                fontSize: 10,
              }}
            />
          ))}
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={(props: Record<string, unknown>) => {
              const { cx, cy, payload } = props as {
                cx: number
                cy: number
                payload: { score: number }
              }
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={getScoreColor(payload.score)}
                  stroke={chartTheme.surfaceBg}
                  strokeWidth={2}
                />
              )
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
