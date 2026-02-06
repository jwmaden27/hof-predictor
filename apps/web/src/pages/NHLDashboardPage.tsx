import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { NHLSearchBar } from '@/components/search/NHLSearchBar.tsx'
import { NHL_HOF_DATA } from '@/data/nhl-hof-ballot-data.ts'
import { NHL_PLAYER_DESCRIPTIONS } from '@/data/nhl-player-descriptions.ts'

interface FeaturedPlayer {
  playerId: number
  name: string
  description: string | null
  inductionYear: number | null
}

function getNHLHeadshotUrl(playerId: number): string {
  return `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`
}

export function NHLDashboardPage() {
  const featuredPlayers = useMemo(() => {
    const players: FeaturedPlayer[] = []

    for (const [idStr, info] of Object.entries(NHL_HOF_DATA)) {
      const id = parseInt(idStr, 10)
      const desc = NHL_PLAYER_DESCRIPTIONS[id]

      players.push({
        playerId: id,
        name: info.name,
        description: desc?.description ?? null,
        inductionYear: info.inductionYear,
      })
    }

    // Sort: inducted first (by year desc), then non-inducted
    return players
      .sort((a, b) => {
        if (a.inductionYear && b.inductionYear) return b.inductionYear - a.inductionYear
        if (a.inductionYear) return -1
        if (b.inductionYear) return 1
        return 0
      })
      .slice(0, 12)
  }, [])

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 text-center text-white dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Hockey Hall of Fame Predictor
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Point Shares-based analysis of NHL players. Evaluate HHOF
            likelihood using career stats, peak performance, awards, and
            milestones.
          </p>
          <NHLSearchBar variant="large" className="mx-auto max-w-xl" />
        </div>
      </div>

      <PageContainer>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Featured Players
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Search for any NHL player above or browse featured players below
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPlayers.map((player) => (
            <Link
              key={player.playerId}
              to={`/nhl/player/${player.playerId}`}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
            >
              <img
                src={getNHLHeadshotUrl(player.playerId)}
                alt={player.name}
                className="h-14 w-14 rounded-full bg-gray-200 object-cover dark:bg-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://assets.nhle.com/mugs/nhl/latest/default-skater.png'
                }}
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100">
                  {player.name}
                </h3>
                {player.inductionYear && (
                  <span className="inline-block rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    HHOF {player.inductionYear}
                  </span>
                )}
                {player.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {player.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </>
  )
}
