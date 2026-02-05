import type { MLBSearchResult } from '@/types/index.ts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx'
import { hasWARData } from '@/services/war-service.ts'

interface SearchResultsProps {
  results: MLBSearchResult[]
  isLoading: boolean
  onSelect: (playerId: number) => void
}

export function SearchResults({ results, isLoading, onSelect }: SearchResultsProps) {
  return (
    <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-950/50">
      {isLoading && (
        <div className="flex items-center justify-center py-6">
          <LoadingSpinner size="sm" />
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          No players found
        </div>
      )}

      {!isLoading &&
        results.map((player) => (
          <button
            key={player.id}
            onClick={() => onSelect(player.id)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {player.fullName}
                </span>
                {hasWARData(player.id) && (
                  <span className="rounded bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-400">
                    JAWS
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{player.primaryPosition?.abbreviation}</span>
                {player.currentTeam && (
                  <>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <span>{player.currentTeam.name}</span>
                  </>
                )}
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <span>{player.active ? 'Active' : 'Retired'}</span>
              </div>
            </div>
          </button>
        ))}
    </div>
  )
}
