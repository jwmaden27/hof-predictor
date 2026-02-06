import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { getScoreColor } from '@/utils/stats-helpers.ts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { HOFScore } from '@/types/index.ts'

interface HofProbabilityGaugeProps {
  score: HOFScore
}

export function HofProbabilityGauge({ score }: HofProbabilityGaugeProps) {
  const chartTheme = useChartTheme()
  const data = [
    { value: score.overall },
    { value: 100 - score.overall },
  ]

  const color = getScoreColor(score.overall)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius="55%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={chartTheme.emptyGaugeFill} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span className="text-4xl font-bold" style={{ color }}>
            {score.overall}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">HOF Score</span>
        </div>
      </div>
    </div>
  )
}
