import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useChartTheme } from '@/hooks/useChartTheme.ts'
import type { JAWSComparison } from '@/types/index.ts'
import { POSITION_LABELS } from '@/data/hof-averages.ts'

interface PositionComparisonProps {
  comparison: JAWSComparison
}

export function PositionComparison({ comparison }: PositionComparisonProps) {
  const chartTheme = useChartTheme()
  const { player, hofAverage } = comparison
  const posLabel = POSITION_LABELS[player.positionCategory] ?? player.positionCategory

  const data = [
    {
      name: 'Career WAR',
      Player: player.careerWAR,
      'HOF Average': hofAverage.careerWAR,
    },
    {
      name: 'Peak WAR',
      Player: player.peakWAR,
      'HOF Average': hofAverage.peakWAR,
    },
    {
      name: 'JAWS',
      Player: player.jaws,
      'HOF Average': hofAverage.jaws,
    },
  ]

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        vs. HOF Average ({posLabel})
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.gridStroke} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <YAxis tick={{ fontSize: 12, fill: chartTheme.axisTickColor }} />
          <Tooltip contentStyle={{ backgroundColor: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipTextColor }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Player" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="HOF Average" fill={chartTheme.referenceLineStroke} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
