import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { PlayerFilters } from '@/components/search/PlayerFilters.tsx'
import { PlayerCard } from '@/components/player/PlayerCard.tsx'
import { LeaderboardChart } from '@/components/charts/LeaderboardChart.tsx'
import { useLeaderboard } from '@/hooks/useLeaderboard.ts'
import type { PositionCategory, HOFTier } from '@/types/index.ts'

export function AllPlayersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const positionFilter = (searchParams.get('position') as PositionCategory) || undefined
  const tierFilters: HOFTier[] = searchParams.get('tier')
    ? (searchParams.get('tier')!.split(',') as HOFTier[])
    : []

  const setPositionFilter = useCallback(
    (value: PositionCategory | undefined) => {
      setSearchParams((prev) => {
        if (value) {
          prev.set('position', value)
        } else {
          prev.delete('position')
        }
        return prev
      }, { replace: true })
    },
    [setSearchParams],
  )

  const setTierFilters = useCallback(
    (tiers: HOFTier[]) => {
      setSearchParams((prev) => {
        if (tiers.length > 0) {
          prev.set('tier', tiers.join(','))
        } else {
          prev.delete('tier')
        }
        return prev
      }, { replace: true })
    },
    [setSearchParams],
  )

  const leaderboard = useLeaderboard(positionFilter, tierFilters)

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          All Players
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Browse all players in the database with HOF analysis
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <PlayerFilters
          positionFilter={positionFilter}
          onPositionChange={setPositionFilter}
          tierFilters={tierFilters}
          onTierChange={setTierFilters}
        />
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leaderboard.map((entry) => (
          <PlayerCard key={entry.playerId} player={entry} />
        ))}
      </div>

      {leaderboard.length === 0 && (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
          No players found for the selected filters
        </div>
      )}

      {/* Leaderboard Chart */}
      {leaderboard.length > 0 && (
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <LeaderboardChart data={leaderboard} />
        </div>
      )}
    </PageContainer>
  )
}
