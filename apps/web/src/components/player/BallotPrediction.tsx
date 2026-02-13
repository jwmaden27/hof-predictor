import { SemiCircleGauge } from '@/components/ui/SemiCircleGauge.tsx'
import type { HOFScore } from '@/types/index.ts'

interface BallotPredictionProps {
  hofScore: HOFScore
}

function getVoteColor(votePct: number): string {
  if (votePct >= 75) return '#f59e0b' // amber — 75%+ needed for induction
  if (votePct >= 50) return '#10b981' // emerald — strong support
  if (votePct >= 25) return '#3b82f6' // blue — moderate support
  if (votePct >= 10) return '#eab308' // yellow — some support
  if (votePct >= 5) return '#f97316' // orange — minimal (5% needed to stay on ballot)
  return '#ef4444' // red — likely to fall off
}

export function BallotPrediction({ hofScore }: BallotPredictionProps) {
  const { ballotPrediction } = hofScore
  const { predictedVotePct } = ballotPrediction
  const color = getVoteColor(predictedVotePct)

  return (
    <div className="flex flex-col items-center gap-3">
      <SemiCircleGauge
        percentage={predictedVotePct}
        color={color}
        label={`${predictedVotePct}%`}
        subtitle="Predicted Peak Vote"
      />

      <div className="text-center">
        <div className="mb-1 text-lg font-semibold leading-tight" style={{ color }}>
          {ballotPrediction.ballot}
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {ballotPrediction.description}
        </p>
        {predictedVotePct >= 75 && (
          <p className="mt-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            75% needed for induction
          </p>
        )}
        {predictedVotePct >= 5 && predictedVotePct < 75 && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            75% needed for induction · 5% to stay on ballot
          </p>
        )}
        {predictedVotePct < 5 && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">
            Below 5% — likely to fall off ballot in first year
          </p>
        )}
      </div>
    </div>
  )
}
