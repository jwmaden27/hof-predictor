import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { HOFScore } from '@/types/index.ts'

interface BallotPredictionProps {
  hofScore: HOFScore
}

function getProbabilityColor(probability: number): string {
  if (probability >= 90) return '#f59e0b' // amber
  if (probability >= 70) return '#10b981' // emerald
  if (probability >= 40) return '#3b82f6' // blue
  if (probability >= 15) return '#eab308' // yellow
  if (probability >= 5) return '#f97316' // orange
  return '#ef4444' // red
}

export function BallotPrediction({ hofScore }: BallotPredictionProps) {
  const chartTheme = useChartTheme()
  const { hofProbability, ballotPrediction } = hofScore

  const gaugeData = [
    { value: hofProbability },
    { value: 100 - hofProbability },
  ]

  const color = getProbabilityColor(hofProbability)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Gauge */}
      <div className="relative h-36 w-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={gaugeData}
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
            {hofProbability}%
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            HOF Probability
          </span>
        </div>
      </div>

      {/* Ballot prediction */}
      <div className="text-center">
        <div
          className="mb-1 text-lg font-semibold"
          style={{ color }}
        >
          {ballotPrediction.ballot}
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {ballotPrediction.description}
        </p>
      </div>
    </div>
  )
}
