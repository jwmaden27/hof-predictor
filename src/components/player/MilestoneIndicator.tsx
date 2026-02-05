import { ProgressBar } from '@/components/ui/ProgressBar.tsx'
import { MILESTONES } from '@/data/milestones.ts'

interface MilestoneIndicatorProps {
  careerStats: Record<string, unknown> | null
  playerType: 'hitter' | 'pitcher'
}

export function MilestoneIndicator({
  careerStats,
  playerType,
}: MilestoneIndicatorProps) {
  if (!careerStats) return null

  const applicable = MILESTONES.filter((m) => m.playerType === playerType)
  const milestoneProgress = applicable
    .map((milestone) => {
      const rawValue = careerStats[milestone.statKey]
      const value =
        typeof rawValue === 'number'
          ? rawValue
          : typeof rawValue === 'string'
            ? parseFloat(rawValue)
            : 0
      const progress = Math.min((value / milestone.threshold) * 100, 100)
      const reached = value >= milestone.threshold
      return { ...milestone, value, progress, reached }
    })
    .filter((m) => m.progress >= 20) // Only show milestones the player has meaningful progress toward

  if (milestoneProgress.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">No milestone progress to display</p>
    )
  }

  return (
    <div className="space-y-3">
      {milestoneProgress.map((m) => (
        <div key={m.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5">
              {m.reached && (
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className={m.reached ? 'font-medium text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
                {m.label}
              </span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {m.value.toLocaleString()} / {m.threshold.toLocaleString()}
            </span>
          </div>
          <ProgressBar
            value={m.progress}
            showValue={false}
            color={m.reached ? '#10b981' : '#3b82f6'}
          />
        </div>
      ))}
    </div>
  )
}
