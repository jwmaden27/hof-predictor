import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { SearchBar } from '@/components/search/SearchBar.tsx'
import { PlayerFilters } from '@/components/search/PlayerFilters.tsx'
import { PlayerCard } from '@/components/player/PlayerCard.tsx'
import { LeaderboardChart } from '@/components/charts/LeaderboardChart.tsx'
import { useLeaderboard } from '@/hooks/useLeaderboard.ts'
import type { PositionCategory, HOFTier } from '@/types/index.ts'

export function DashboardPage() {
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
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 text-center text-white dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Baseball Hall of Fame Predictor
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            JAWS-based analysis of active and recent players. Evaluate HOF
            likelihood using career WAR, peak performance, awards, and
            milestones.
          </p>
          <SearchBar variant="large" className="mx-auto max-w-xl" />
        </div>
      </div>

      <PageContainer>
        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Players
            </h2>
          </div>
          <PlayerFilters
            positionFilter={positionFilter}
            onPositionChange={setPositionFilter}
            tierFilters={tierFilters}
            onTierChange={setTierFilters}
          />
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {leaderboard.slice(0, 20).map((entry) => (
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
    </>
  )
}
