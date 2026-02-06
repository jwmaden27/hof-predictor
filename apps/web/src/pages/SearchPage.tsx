import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { SearchBar } from '@/components/search/SearchBar.tsx'
import { PlayerFilters } from '@/components/search/PlayerFilters.tsx'
import { PlayerCard } from '@/components/player/PlayerCard.tsx'
import { useLeaderboard } from '@/hooks/useLeaderboard.ts'
import type { PositionCategory } from '@/types/index.ts'

const PAGE_SIZE = 20

export function SearchPage() {
  const [positionFilter, setPositionFilter] = useState<
    PositionCategory | undefined
  >()
  const [page, setPage] = useState(0)
  const leaderboard = useLeaderboard(positionFilter)

  const totalPages = Math.ceil(leaderboard.length / PAGE_SIZE)
  const paginatedEntries = leaderboard.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  )

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Search Players
        </h1>
        <SearchBar variant="large" className="max-w-2xl" />
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Browse by Position
        </h2>
        <PlayerFilters
          positionFilter={positionFilter}
          onPositionChange={(pos) => {
            setPositionFilter(pos)
            setPage(0)
          }}
        />
      </div>

      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {paginatedEntries.length} of {leaderboard.length} players
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedEntries.map((entry) => (
          <PlayerCard key={entry.playerId} player={entry} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <span className="px-4 text-sm text-gray-600 dark:text-gray-400">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      )}
    </PageContainer>
  )
}
