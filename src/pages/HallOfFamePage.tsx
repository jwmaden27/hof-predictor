import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { getAllPlayersWithWAR, isHallOfFamer } from '@/services/war-service.ts'
import { HOF_BALLOT_DATA } from '@/data/hof-ballot-data.ts'
import { POSITION_LABELS } from '@/data/hof-averages.ts'
import type { PositionCategory } from '@/types/index.ts'

interface HOFPlayer {
  playerId: number
  playerName: string
  positionCategory: PositionCategory
  careerWAR: number
  inductionYear: number
  ballotLabel: string
  votePercentage: number | null
}

function getHeadshotUrl(playerId: number): string {
  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`
}

export function HallOfFamePage() {
  const hofPlayers = useMemo(() => {
    const allPlayers = getAllPlayersWithWAR()
    const players: HOFPlayer[] = []

    for (const player of allPlayers) {
      if (!isHallOfFamer(player.playerId)) continue

      const ballotInfo = HOF_BALLOT_DATA[player.playerId]
      if (!ballotInfo) continue

      const careerWAR = player.seasons.reduce((sum, s) => sum + s.war, 0)

      players.push({
        playerId: player.playerId,
        playerName: player.playerName,
        positionCategory: player.positionCategory,
        careerWAR,
        inductionYear: ballotInfo.inductionYear,
        ballotLabel: ballotInfo.ballotLabel,
        votePercentage: ballotInfo.votePercentage,
      })
    }

    // Sort by induction year (most recent first), then by vote percentage
    return players.sort((a, b) => {
      if (b.inductionYear !== a.inductionYear) {
        return b.inductionYear - a.inductionYear
      }
      return (b.votePercentage ?? 0) - (a.votePercentage ?? 0)
    })
  }, [])

  // Group by decade
  const byDecade = useMemo(() => {
    const decades = new Map<number, HOFPlayer[]>()
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
          Baseball Hall of Fame
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {hofPlayers.length} players inducted into the National Baseball Hall of Fame
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
                to={`/player/${player.playerId}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <img
                  src={getHeadshotUrl(player.playerId)}
                  alt={player.playerName}
                  className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-700"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-900 dark:text-gray-100">
                    {player.playerName}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{POSITION_LABELS[player.positionCategory] ?? player.positionCategory}</span>
                    <span>•</span>
                    <span>{player.careerWAR.toFixed(1)} WAR</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {player.inductionYear} — {player.ballotLabel}
                    {player.votePercentage && ` (${player.votePercentage.toFixed(1)}%)`}
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
