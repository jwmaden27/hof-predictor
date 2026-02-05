import type { PositionCategory, HOFTier } from '@/types/index.ts'
import { ALL_POSITIONS, POSITION_LABELS } from '@/data/hof-averages.ts'
import { getTierBgColor } from '@/utils/stats-helpers.ts'

const TIER_OPTIONS: { label: string; value: HOFTier }[] = [
  { label: 'Hall of Famer', value: 'Hall of Famer' },
  { label: 'First Ballot Lock', value: 'First Ballot Lock' },
  { label: 'Strong Candidate', value: 'Strong Candidate' },
  { label: 'Solid Candidate', value: 'Solid Candidate' },
  { label: 'Borderline', value: 'Borderline' },
  { label: 'Unlikely', value: 'Unlikely' },
  { label: 'Not HOF Caliber', value: 'Not HOF Caliber' },
]

/** Short labels for tier tags to keep them compact */
const TIER_SHORT_LABELS: Record<HOFTier, string> = {
  'Hall of Famer': 'HOF',
  'First Ballot Lock': '1st Ballot',
  'Strong Candidate': 'Strong',
  'Solid Candidate': 'Solid',
  'Borderline': 'Borderline',
  'Unlikely': 'Unlikely',
  'Not HOF Caliber': 'Not HOF',
}

interface PlayerFiltersProps {
  positionFilter?: PositionCategory
  onPositionChange: (position?: PositionCategory) => void
  tierFilters?: HOFTier[]
  onTierChange?: (tiers: HOFTier[]) => void
  className?: string
}

export function PlayerFilters({
  positionFilter,
  onPositionChange,
  tierFilters = [],
  onTierChange,
  className = '',
}: PlayerFiltersProps) {
  const handleTierToggle = (tier: HOFTier) => {
    if (!onTierChange) return
    if (tierFilters.includes(tier)) {
      onTierChange(tierFilters.filter((t) => t !== tier))
    } else {
      onTierChange([...tierFilters, tier])
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Tier filter tags */}
      {onTierChange && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onTierChange([])}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              tierFilters.length === 0
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            All Tiers
          </button>
          {TIER_OPTIONS.map((opt) => {
            const isActive = tierFilters.includes(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => handleTierToggle(opt.value)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? getTierBgColor(opt.value)
                    : 'border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
                title={opt.label}
              >
                {TIER_SHORT_LABELS[opt.value]}
              </button>
            )
          })}
        </div>
      )}

      {/* Position filter tags */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onPositionChange(undefined)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !positionFilter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
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
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
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
