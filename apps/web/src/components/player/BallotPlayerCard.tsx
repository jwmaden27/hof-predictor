import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge.tsx'
import { formatWAR } from '@/utils/stats-helpers.ts'
import type { BallotLeaderboardEntry } from '@/hooks/useBallotLeaderboard.ts'

interface BallotPlayerCardProps {
  player: BallotLeaderboardEntry
}

function getHeadshotUrl(playerId: number): string {
  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`
}

function getTierBadgeStyles(tier: string): string {
  switch (tier) {
    case 'Hall of Famer':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    case 'First Ballot Lock':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'Strong Candidate':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    case 'Solid Candidate':
      return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
    case 'Borderline':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'Unlikely':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  }
}

export function BallotPlayerCard({ player }: BallotPlayerCardProps) {
  const location = useLocation()
  const sportPrefix = location.pathname.startsWith('/nhl') ? '/nhl' : '/mlb'

  const voteColor = player.isElected
    ? 'text-emerald-600 dark:text-emerald-400'
    : (player.votePercentage ?? 0) >= 75
      ? 'text-emerald-600 dark:text-emerald-400'
      : (player.votePercentage ?? 0) >= 50
        ? 'text-blue-600 dark:text-blue-400'
        : (player.votePercentage ?? 0) >= 5
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-gray-500 dark:text-gray-400'

  // Determine what prediction to show
  const showPrediction = !player.isElected && player.hofScore > 0
  const isLikelyHOF = player.ballotPrediction.ballot !== 'Unlikely' && player.ballotPrediction.ballot !== 'Veterans Committee'

  return (
    <Link
      to={`${sportPrefix}/player/${player.playerId}`}
      className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <img
          src={getHeadshotUrl(player.playerId)}
          alt={player.playerName}
          className="h-14 w-14 rounded-full bg-gray-200 object-cover dark:bg-gray-700"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
                {player.playerName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{player.positionCategory}</span>
                <span>•</span>
                <span>Year {player.ballotYear}</span>
                {player.isNewToAllot && (
                  <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 text-[9px]">
                    NEW
                  </Badge>
                )}
              </div>
            </div>
            {player.isElected && (
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px] shrink-0">
                ELECTED
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <div>
              <span className={`text-2xl font-bold ${voteColor}`}>
                {player.votePercentage !== null ? `${player.votePercentage.toFixed(1)}%` : '—'}
              </span>
              <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">votes</span>
            </div>
            {player.jaws > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">{formatWAR(player.jaws)}</span> JAWS
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vote progress bar */}
      <div className="mt-3">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full rounded-full transition-all ${
              player.isElected || (player.votePercentage ?? 0) >= 75
                ? 'bg-emerald-500'
                : (player.votePercentage ?? 0) >= 50
                  ? 'bg-blue-500'
                  : (player.votePercentage ?? 0) >= 5
                    ? 'bg-amber-500'
                    : 'bg-gray-400'
            }`}
            style={{ width: `${Math.min(player.votePercentage ?? 0, 100)}%` }}
          />
          {/* 75% threshold marker */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-500" style={{ left: '75%' }} />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
          <span>0%</span>
          <span>75% needed</span>
          <span>100%</span>
        </div>
      </div>

      {/* Prediction and Tier */}
      {showPrediction && (
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge className={`${getTierBadgeStyles(player.tier)} text-[10px]`}>
              {player.tier}
            </Badge>
          </div>
          <div className="text-right">
            {isLikelyHOF ? (
              <div className="text-xs">
                <span className="text-gray-500 dark:text-gray-400">Predicted: </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{player.ballotPrediction.ballot}</span>
              </div>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {player.hofProbability > 0 ? `${player.hofProbability}% chance` : 'Low probability'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* WAR stats row */}
      {player.careerWAR > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="text-gray-400 dark:text-gray-500">Career</div>
            <div className="font-semibold text-gray-700 dark:text-gray-300">{formatWAR(player.careerWAR)}</div>
          </div>
          <div>
            <div className="text-gray-400 dark:text-gray-500">Peak</div>
            <div className="font-semibold text-gray-700 dark:text-gray-300">{formatWAR(player.peakWAR)}</div>
          </div>
          <div>
            <div className="text-gray-400 dark:text-gray-500">Score</div>
            <div className="font-semibold text-gray-700 dark:text-gray-300">{player.hofScore}</div>
          </div>
        </div>
      )}
    </Link>
  )
}
