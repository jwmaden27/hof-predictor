import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { getAllPlayersWithWAR } from '@/services/war-service.ts'
import { HOF_BALLOT_DATA } from '@/data/hof-ballot-data.ts'
import { HOF_AVERAGES, POSITION_LABELS } from '@/data/hof-averages.ts'
import { calculateJAWS } from '@/utils/jaws.ts'
import type { PositionCategory } from '@/types/index.ts'

interface HOVGPlayer {
  playerId: number
  playerName: string
  positionCategory: PositionCategory
  careerWAR: number
  peakWAR: number
  jaws: number
  jawsRatio: number
  ballotLabel: string
  votePercentage: number | null
  fellOffYear: number
}

function getHeadshotUrl(playerId: number): string {
  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`
}

function extractFellOffYear(ballotLabel: string): number | null {
  const match = ballotLabel.match(/\((\d{4})\)/)
  return match ? parseInt(match[1], 10) : null
}

export function HallOfVeryGoodPage() {
  const location = useLocation()
  const sportPrefix = location.pathname.startsWith('/nhl') ? '/nhl' : '/mlb'

  const hovgPlayers = useMemo(() => {
    const allPlayers = getAllPlayersWithWAR()
    const players: HOVGPlayer[] = []

    for (const player of allPlayers) {
      // Skip Hall of Famers
      if (player.isHOF) continue

      // Get ballot info - must have fallen off the ballot (inductionYear === null)
      const ballotInfo = HOF_BALLOT_DATA[player.playerId]
      if (!ballotInfo || ballotInfo.inductionYear !== null) continue

      // Calculate JAWS
      const jawsResult = calculateJAWS(player.seasons, player.positionCategory)
      const hofAverage = HOF_AVERAGES[player.positionCategory]
      const jawsRatio = jawsResult.jaws / hofAverage.jaws

      // Only include players with JAWS >= 50% of HOF average
      if (jawsRatio < 0.5) continue

      const fellOffYear = extractFellOffYear(ballotInfo.ballotLabel)
      if (!fellOffYear) continue

      players.push({
        playerId: player.playerId,
        playerName: player.playerName,
        positionCategory: player.positionCategory,
        careerWAR: jawsResult.careerWAR,
        peakWAR: jawsResult.peakWAR,
        jaws: jawsResult.jaws,
        jawsRatio,
        ballotLabel: ballotInfo.ballotLabel,
        votePercentage: ballotInfo.votePercentage,
        fellOffYear,
      })
    }

    // Sort by fell-off year (most recent first), then by JAWS ratio
    return players.sort((a, b) => {
      if (b.fellOffYear !== a.fellOffYear) {
        return b.fellOffYear - a.fellOffYear
      }
      return b.jawsRatio - a.jawsRatio
    })
  }, [])

  // Group by decade of falling off ballot
  const byDecade = useMemo(() => {
    const decades = new Map<number, HOVGPlayer[]>()
    for (const player of hovgPlayers) {
      const decade = Math.floor(player.fellOffYear / 10) * 10
      if (!decades.has(decade)) {
        decades.set(decade, [])
      }
      decades.get(decade)!.push(player)
    }
    return Array.from(decades.entries()).sort((a, b) => b[0] - a[0])
  }, [hovgPlayers])

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Hall of Very Good
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {hovgPlayers.length} players who fell off the HOF ballot with a JAWS score at least 50% of the Hall of Fame average for their position
        </p>
      </div>

      {byDecade.length === 0 ? (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No players currently match the Hall of Very Good criteria.
        </div>
      ) : (
        byDecade.map(([decade, players]) => (
          <section key={decade} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              {decade}s
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {players.map((player) => (
                <Link
                  key={player.playerId}
                  to={`${sportPrefix}/player/${player.playerId}`}
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
                      <span>{player.jaws.toFixed(1)} JAWS</span>
                      <span className="text-amber-600 dark:text-amber-400">
                        ({(player.jawsRatio * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {player.ballotLabel}
                      {player.votePercentage && ` — ${player.votePercentage.toFixed(1)}%`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <h3 className="mb-2 font-semibold text-amber-800 dark:text-amber-200">
          What is the Hall of Very Good?
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          The "Hall of Very Good" recognizes excellent players who fell short of Hall of Fame induction.
          These players achieved at least 50% of the average JAWS score for Hall of Famers at their position,
          indicating careers of significant value even though they didn't meet the ultimate standard for Cooperstown.
        </p>
      </div>
    </PageContainer>
  )
}
