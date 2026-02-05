import type { PositionCategory } from '@/types/index.ts'
import { ALL_POSITIONS, POSITION_LABELS } from '@/data/hof-averages.ts'

interface PlayerFiltersProps {
  positionFilter?: PositionCategory
  onPositionChange: (position?: PositionCategory) => void
  className?: string
}

export function PlayerFilters({
  positionFilter,
  onPositionChange,
  className = '',
}: PlayerFiltersProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
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
  )
}
