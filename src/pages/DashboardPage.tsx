import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { SearchBar } from '@/components/search/SearchBar.tsx'
import { PlayerFilters } from '@/components/search/PlayerFilters.tsx'
import { PlayerCard } from '@/components/player/PlayerCard.tsx'
import { LeaderboardChart } from '@/components/charts/LeaderboardChart.tsx'
import { useLeaderboard } from '@/hooks/useLeaderboard.ts'
import type { PositionCategory, HOFTier } from '@/types/index.ts'

export function DashboardPage() {
  const [positionFilter, setPositionFilter] = useState<
    PositionCategory | undefined
  >()
  const [tierFilter, setTierFilter] = useState<HOFTier | undefined>()
  const leaderboard = useLeaderboard(positionFilter, tierFilter)

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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Players
          </h2>
          <PlayerFilters
            positionFilter={positionFilter}
            onPositionChange={setPositionFilter}
            tierFilter={tierFilter}
            onTierChange={setTierFilter}
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
