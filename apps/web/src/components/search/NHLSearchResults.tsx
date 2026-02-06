import type { NHLSearchResult } from '@/types/nhl-player.ts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx'
import { isNHLHallOfFamer } from '@/services/nhl-ps-service.ts'

interface NHLSearchResultsProps {
  results: NHLSearchResult[]
  isLoading: boolean
  onSelect: (playerId: number) => void
}

export function NHLSearchResults({ results, isLoading, onSelect }: NHLSearchResultsProps) {
  return (
    <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-950/50">
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
        results.map((player) => {
          const numericId = parseInt(player.playerId, 10)
          return (
            <button
              key={player.playerId}
              onClick={() => onSelect(numericId)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {player.name}
                  </span>
                  {isNHLHallOfFamer(numericId) && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                      HHOF
                    </span>
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{player.positionCode}</span>
                  {player.teamAbbrev && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span>{player.teamAbbrev}</span>
                    </>
                  )}
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span>{player.active ? 'Active' : 'Retired'}</span>
                </div>
              </div>
            </button>
          )
        })}
    </div>
  )
}
