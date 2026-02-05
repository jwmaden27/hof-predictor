import { SemiCircleGauge } from '@/components/ui/SemiCircleGauge.tsx'
import { getScoreColor } from '@/utils/stats-helpers.ts'
import type { JAWSComparison } from '@/types/index.ts'

interface JawsGaugeProps {
  comparison: JAWSComparison
}

export function JawsGauge({ comparison }: JawsGaugeProps) {
  const { player, hofAverage } = comparison
  const ratio = Math.min(comparison.jawsRatio, 1.5)
  const percentage = (ratio / 1.5) * 100
  const color = getScoreColor(ratio >= 1 ? 80 : ratio >= 0.75 ? 50 : 20)

  return (
    <div className="flex flex-col items-center">
      <SemiCircleGauge
        percentage={percentage}
        color={color}
        label={player.jaws.toFixed(1)}
        subtitle={`HOF Avg: ${hofAverage.jaws.toFixed(1)}`}
      />
      <div className="mt-1 text-center">
        <span className="text-sm font-medium" style={{ color }}>
          {(comparison.jawsRatio * 100).toFixed(0)}% of HOF Average
        </span>
      </div>
    </div>
  )
}
