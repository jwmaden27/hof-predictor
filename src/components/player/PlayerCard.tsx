import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge.tsx'
import { formatWAR, getTierBgColor } from '@/utils/stats-helpers.ts'
import type { LeaderboardEntry } from '@/hooks/useLeaderboard.ts'

interface PlayerCardProps {
  player: LeaderboardEntry
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link
      to={`/player/${player.playerId}`}
      className="group block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600">
            {player.playerName}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{player.positionCategory}</span>
        </div>
        <Badge
          className={`${getTierBgColor(player.tier)} border text-[10px]`}
        >
          {player.tier}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Career WAR</div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatWAR(player.careerWAR)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Peak WAR</div>
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatWAR(player.peakWAR)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400">JAWS</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatWAR(player.jaws)}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all"
            style={{ width: `${Math.min(player.jawsRatio * 100, 100)}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
          <span>0%</span>
          <span>HOF Avg ({(player.jawsRatio * 100).toFixed(0)}%)</span>
        </div>
      </div>
    </Link>
  )
}
