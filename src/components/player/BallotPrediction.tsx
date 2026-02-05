import { SemiCircleGauge } from '@/components/ui/SemiCircleGauge.tsx'
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
  const { hofProbability, ballotPrediction } = hofScore
  const color = getProbabilityColor(hofProbability)

  return (
    <div className="flex flex-col items-center gap-3">
      <SemiCircleGauge
        percentage={hofProbability}
        color={color}
        label={`${hofProbability}%`}
        subtitle="HOF Probability"
      />

      <div className="text-center">
        <div className="mb-1 text-lg font-semibold leading-tight" style={{ color }}>
          {ballotPrediction.ballot}
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {ballotPrediction.description}
        </p>
      </div>
    </div>
  )
}
