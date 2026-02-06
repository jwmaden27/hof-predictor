import type { CareerProjection } from '@/utils/career-projection.ts'
import type { HOFScore } from '@/types/index.ts'
import { getTierBgColor } from '@/utils/stats-helpers.ts'

interface HofPathWidgetProps {
  projection: CareerProjection
  currentScore: HOFScore
}

function getLikelihoodColor(likelihood: number): string {
  if (likelihood >= 70) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
  if (likelihood >= 30) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
}

function getArrowColor(current: number, projected: number): string {
  if (projected > current) return 'text-emerald-500'
  if (projected < current) return 'text-red-500'
  return 'text-gray-400 dark:text-gray-500'
}

export function HofPathWidget({ projection, currentScore }: HofPathWidgetProps) {
  const scoreDelta = projection.projectedHOFScore - currentScore.overall
  const probDelta = projection.projectedProbability - currentScore.hofProbability

  const relevantMilestones = projection.milestoneProjections.filter(
    (m) => m.projectedProgress >= 20 || m.currentValue >= m.threshold * 0.2,
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {currentScore.overall}
            <span className={`mx-1 ${getArrowColor(currentScore.overall, projection.projectedHOFScore)}`}>
              &rarr;
            </span>
            {projection.projectedHOFScore}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            HOF Score
            {scoreDelta > 0 && (
              <span className="ml-1 text-emerald-500">(+{scoreDelta})</span>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ~{projection.projectedSeasons}
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            Seasons Left
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {currentScore.hofProbability}%
            <span className={`mx-1 ${getArrowColor(currentScore.hofProbability, projection.projectedProbability)}`}>
              &rarr;
            </span>
            {projection.projectedProbability}%
          </div>
          <div className="text-[10px] text-gray-500 dark:text-gray-400">
            HOF Probability
            {probDelta > 0 && (
              <span className="ml-1 text-emerald-500">(+{probDelta.toFixed(1)})</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span
          className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${getTierBgColor(currentScore.tier)}`}
        >
          {currentScore.tier}
        </span>
        <span className="text-gray-400 dark:text-gray-500">&rarr;</span>
        <span
          className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${getTierBgColor(projection.projectedTier)}`}
        >
          {projection.projectedTier}
        </span>
      </div>

      {relevantMilestones.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Milestone Roadmap
          </h4>
          <div className="space-y-1.5">
            {relevantMilestones.map((m) => (
              <div
                key={`${m.statKey}-${m.threshold}`}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-gray-600 dark:text-gray-400 truncate flex-1 min-w-0">
                  {m.label}
                </span>
                <span className="mx-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {m.currentValue.toLocaleString()}
                  <span className="mx-1 text-gray-400 dark:text-gray-500">&rarr;</span>
                  {m.projectedValue.toLocaleString()}
                </span>
                {m.currentValue >= m.threshold ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                    Reached
                  </span>
                ) : m.likelihood > 0 ? (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${getLikelihoodColor(m.likelihood)}`}
                  >
                    ~{m.likelihood}%
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    Unlikely
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400 dark:text-gray-500 italic text-center">
        Projected to retire at age {projection.projectedCareerEndAge} as{' '}
        {projection.projectedTier === 'First Ballot Lock' ? 'a ' : ''}
        {projection.projectedTier} with ~{projection.projectedProbability}% HOF probability
      </p>
    </div>
  )
}
