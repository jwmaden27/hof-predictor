import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { getScoreColor } from '@/utils/stats-helpers.ts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { JAWSComparison } from '@/types/index.ts'

interface JawsGaugeProps {
  comparison: JAWSComparison
}

export function JawsGauge({ comparison }: JawsGaugeProps) {
  const chartTheme = useChartTheme()
  const { player, hofAverage } = comparison
  const ratio = Math.min(comparison.jawsRatio, 1.5)
  const percentage = (ratio / 1.5) * 100
  const color = getScoreColor(ratio >= 1 ? 80 : ratio >= 0.75 ? 50 : 20)

  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-40 w-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={chartTheme.emptyGaugeFill} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {player.jaws.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            HOF Avg: {hofAverage.jaws.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="mt-1 text-center">
        <span className="text-sm font-medium" style={{ color }}>
          {(comparison.jawsRatio * 100).toFixed(0)}% of HOF Average
        </span>
      </div>
    </div>
  )
}
