import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { NHL_HOF_DATA } from '@/data/nhl-hof-ballot-data.ts'

interface NHLHOFPlayer {
  playerId: number
  name: string
  inductionYear: number
  inductionCategory: string
  description: string
}

function getNHLHeadshotUrl(playerId: number): string {
  return `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`
}

export function NHLHallOfFamePage() {
  const hofPlayers = useMemo(() => {
    const players: NHLHOFPlayer[] = []

    for (const [idStr, info] of Object.entries(NHL_HOF_DATA)) {
      if (info.inductionYear === null) continue
      const id = parseInt(idStr, 10)

      players.push({
        playerId: id,
        name: info.name,
        inductionYear: info.inductionYear,
        inductionCategory: info.inductionCategory,
        description: info.description,
      })
    }

    return players.sort((a, b) => b.inductionYear - a.inductionYear)
  }, [])

  // Group by decade
  const byDecade = useMemo(() => {
    const decades = new Map<number, NHLHOFPlayer[]>()
    for (const player of hofPlayers) {
      const decade = Math.floor(player.inductionYear / 10) * 10
      if (!decades.has(decade)) {
        decades.set(decade, [])
      }
      decades.get(decade)!.push(player)
    }
    return Array.from(decades.entries()).sort((a, b) => b[0] - a[0])
  }, [hofPlayers])

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Hockey Hall of Fame
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {hofPlayers.length} players inducted into the Hockey Hall of Fame
        </p>
      </div>

      {byDecade.map(([decade, players]) => (
        <section key={decade} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {decade}s
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {players.map((player) => (
              <Link
                key={player.playerId}
                to={`/nhl/player/${player.playerId}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <img
                  src={getNHLHeadshotUrl(player.playerId)}
                  alt={player.name}
                  className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://assets.nhle.com/mugs/nhl/latest/default-skater.png'
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {player.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {player.inductionCategory}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {player.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </PageContainer>
  )
}
