import type { PositionCategory, HOFTier } from '@/types/index.ts'
import { ALL_POSITIONS, POSITION_LABELS } from '@/data/hof-averages.ts'

const TIER_OPTIONS: { label: string; value: HOFTier }[] = [
  { label: 'Hall of Famer', value: 'Hall of Famer' },
  { label: 'First Ballot Lock', value: 'First Ballot Lock' },
  { label: 'Strong Candidate', value: 'Strong Candidate' },
  { label: 'Solid Candidate', value: 'Solid Candidate' },
  { label: 'Borderline', value: 'Borderline' },
  { label: 'Unlikely', value: 'Unlikely' },
  { label: 'Not HOF Caliber', value: 'Not HOF Caliber' },
]

interface PlayerFiltersProps {
  positionFilter?: PositionCategory
  onPositionChange: (position?: PositionCategory) => void
  tierFilter?: HOFTier
  onTierChange?: (tier?: HOFTier) => void
  className?: string
}

export function PlayerFilters({
  positionFilter,
  onPositionChange,
  tierFilter,
  onTierChange,
  className = '',
}: PlayerFiltersProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {onTierChange && (
        <select
          value={tierFilter ?? ''}
          onChange={(e) =>
            onTierChange(e.target.value ? (e.target.value as HOFTier) : undefined)
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500"
        >
          <option value="">All Tiers</option>
          {TIER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPositionChange(undefined)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !positionFilter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {ALL_POSITIONS.map((pos) => (
          <button
            key={pos}
            onClick={() => onPositionChange(pos)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              positionFilter === pos
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title={POSITION_LABELS[pos]}
          >
            {pos}
          </button>
        ))}
      </div>
    </div>
  )
}
