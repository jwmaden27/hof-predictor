import { MILESTONES } from '@/data/milestones.ts'
import type { MilestoneProjection } from '@/utils/career-projection.ts'

interface MilestoneIndicatorProps {
  careerStats: Record<string, unknown> | null
  playerType: 'hitter' | 'pitcher'
  milestoneProjections?: MilestoneProjection[]
}

export function MilestoneIndicator({
  careerStats,
  playerType,
  milestoneProjections,
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
      const hofAveragePercent = Math.min(
        (milestone.hofAverage / milestone.threshold) * 100,
        100,
      )
      const reached = value >= milestone.threshold

      // Find matching projection for this milestone
      const proj = milestoneProjections?.find(
        (p) => p.statKey === milestone.statKey && p.threshold === milestone.threshold,
      )
      const projectedPercent = proj
        ? Math.min((proj.projectedValue / milestone.threshold) * 100, 100)
        : null
      const projectedValue = proj?.projectedValue ?? null

      return { ...milestone, value, progress, hofAveragePercent, reached, projectedPercent, projectedValue }
    })
    .filter((m) => m.progress >= 20)

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
          <div className="relative h-2.5 w-full overflow-visible rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${m.progress}%`,
                backgroundColor: m.reached ? '#10b981' : '#3b82f6',
              }}
            />
            <div
              className="absolute top-0 h-full w-0.5 bg-amber-500"
              style={{ left: `${m.hofAveragePercent}%` }}
              title={`HOF Avg: ${m.hofAverage.toLocaleString()}`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-amber-500">
                HOF Avg
              </div>
            </div>
            {m.projectedPercent !== null && !m.reached && m.projectedPercent > m.progress && (
              <div
                className="absolute top-0 h-full w-0.5 bg-cyan-500"
                style={{ left: `${m.projectedPercent}%` }}
                title={`Projected: ${m.projectedValue?.toLocaleString()}`}
              >
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium text-cyan-500 dark:text-cyan-400">
                  Proj.
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
