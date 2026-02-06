import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { JAWSComparison, HOFScore } from '@/types/index.ts'

interface RadarComparisonChartProps {
  comparison: JAWSComparison
  hofScore: HOFScore
}

export function RadarComparisonChart({
  comparison,
  hofScore,
}: RadarComparisonChartProps) {
  const chartTheme = useChartTheme()
  const data = [
    {
      metric: 'Career WAR',
      Player: Math.min(comparison.careerWARRatio * 100, 150),
      'HOF Avg': 100,
    },
    {
      metric: 'Peak WAR',
      Player: Math.min(comparison.peakWARRatio * 100, 150),
      'HOF Avg': 100,
    },
    {
      metric: 'JAWS',
      Player: Math.min(comparison.jawsRatio * 100, 150),
      'HOF Avg': 100,
    },
    {
      metric: 'Awards',
      Player: Math.min((hofScore.awardsComponent / 25) * 100, 150),
      'HOF Avg': 60,
    },
    {
      metric: 'Milestones',
      Player: Math.min((hofScore.milestonesComponent / 20) * 100, 150),
      'HOF Avg': 40,
    },
    {
      metric: 'Consistency',
      Player: Math.min((hofScore.trajectoryComponent / 15) * 100, 150),
      'HOF Avg': 60,
    },
  ]

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Multi-Dimensional Comparison
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke={chartTheme.gridStroke} />
          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: chartTheme.axisTickColor }} />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 150]}
            tick={{ fontSize: 10, fill: chartTheme.axisTickColor }}
            tickCount={4}
          />
          <Radar
            name="Player"
            dataKey="Player"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="HOF Avg"
            dataKey="HOF Avg"
            stroke={chartTheme.referenceLineStroke}
            fill="none"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
