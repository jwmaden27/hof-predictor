import type { TierThreshold } from '@/utils/projections.ts'
import { getTierBgColor } from '@/utils/stats-helpers.ts'

interface ProjectionSummaryProps {
  thresholds: TierThreshold[]
  summary: string
}

export function ProjectionSummary({
  thresholds,
  summary,
}: ProjectionSummaryProps) {
  return (
    <div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{summary}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {thresholds.map((t) => (
          <div
            key={t.tier}
            className={`rounded-lg border p-3 text-center ${getTierBgColor(t.tier)}`}
          >
            <div className="text-xs font-medium opacity-80">{t.tier}</div>
            <div className="mt-1 text-lg font-bold">
              {t.seasonsNeeded === null
                ? '15+'
                : t.seasonsNeeded === 0
                  ? 'Now'
                  : `${t.seasonsNeeded} yr${t.seasonsNeeded === 1 ? '' : 's'}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
