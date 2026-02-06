import { useState } from 'react'
import { useTopGames, type TopGame } from '@/hooks/useTopGames.ts'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx'
import { YouTubeEmbed, VideoIconButton } from '@/components/ui/YouTubeEmbed.tsx'
import { generateGameHighlightSearchQuery } from '@/utils/youtube-search.ts'
import type { HittingStats, PitchingStats } from '@/types/index.ts'

interface TopGamesTableProps {
  playerId: number
  seasons: number[]
  isPitcher: boolean
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface GameRowProps {
  game: TopGame
  rank: number
  isVideoExpanded: boolean
  onToggleVideo: () => void
  isPitcher: boolean
}

function HitterGameRow({ game, rank, isVideoExpanded, onToggleVideo }: GameRowProps) {
  const stat = game.stat as HittingStats
  const hits = stat.hits ?? 0
  const atBats = stat.atBats ?? 0
  const homeRuns = stat.homeRuns ?? 0
  const rbi = stat.rbi ?? 0
  const runs = stat.runs ?? 0
  const baseOnBalls = stat.baseOnBalls ?? 0
  const strikeOuts = stat.strikeOuts ?? 0
  const doubles = stat.doubles ?? 0
  const triples = stat.triples ?? 0
  const stolenBases = stat.stolenBases ?? 0

  const searchQuery = generateGameHighlightSearchQuery(
    game.opponent,
    game.date,
    game.isHome,
    game.team,
  )

  return (
    <>
      <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td className="py-3 px-2 text-center font-bold text-gray-400 dark:text-gray-500">
          {rank}
        </td>
        <td className="py-3 px-2">
          <div className="flex items-center gap-2">
            <VideoIconButton onClick={onToggleVideo} isActive={isVideoExpanded} />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {formatDate(game.date)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {game.isHome ? 'vs' : '@'} {game.opponent}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-2 text-center">
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            game.isWin
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {game.isWin ? 'W' : 'L'}
          </span>
        </td>
        <td className="py-3 px-2 text-center font-semibold text-gray-900 dark:text-gray-100">
          {hits}-{atBats}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {homeRuns}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {rbi}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {runs}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {doubles}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {triples}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {baseOnBalls}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {strikeOuts}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {stolenBases}
        </td>
        <td className="py-3 px-2 text-center font-bold text-blue-600 dark:text-blue-400">
          {game.gameScore.toFixed(1)}
        </td>
      </tr>
      {isVideoExpanded && (
        <tr>
          <td colSpan={13} className="px-2 pb-4">
            <YouTubeEmbed searchQuery={searchQuery} onClose={onToggleVideo} />
          </td>
        </tr>
      )}
    </>
  )
}

function PitcherGameRow({ game, rank, isVideoExpanded, onToggleVideo }: GameRowProps) {
  const stat = game.stat as PitchingStats
  const inningsPitched = stat.inningsPitched ?? '0'
  const hits = stat.hits ?? 0
  const earnedRuns = stat.earnedRuns ?? 0
  const strikeOuts = stat.strikeOuts ?? 0
  const baseOnBalls = stat.baseOnBalls ?? 0
  const homeRuns = stat.homeRuns ?? 0

  const searchQuery = generateGameHighlightSearchQuery(
    game.opponent,
    game.date,
    game.isHome,
    game.team,
  )

  return (
    <>
      <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
        <td className="py-3 px-2 text-center font-bold text-gray-400 dark:text-gray-500">
          {rank}
        </td>
        <td className="py-3 px-2">
          <div className="flex items-center gap-2">
            <VideoIconButton onClick={onToggleVideo} isActive={isVideoExpanded} />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {formatDate(game.date)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {game.isHome ? 'vs' : '@'} {game.opponent}
              </div>
            </div>
          </div>
        </td>
        <td className="py-3 px-2 text-center">
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
            game.isWin
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {game.isWin ? 'W' : 'L'}
          </span>
        </td>
        <td className="py-3 px-2 text-center font-semibold text-gray-900 dark:text-gray-100">
          {inningsPitched}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {hits}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {earnedRuns}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {strikeOuts}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {baseOnBalls}
        </td>
        <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
          {homeRuns}
        </td>
        <td className="py-3 px-2 text-center font-bold text-blue-600 dark:text-blue-400">
          {game.gameScore.toFixed(1)}
        </td>
      </tr>
      {isVideoExpanded && (
        <tr>
          <td colSpan={10} className="px-2 pb-4">
            <YouTubeEmbed searchQuery={searchQuery} onClose={onToggleVideo} />
          </td>
        </tr>
      )}
    </>
  )
}

export function TopGamesTable({ playerId, seasons, isPitcher }: TopGamesTableProps) {
  const { topGames, isLoading, error } = useTopGames(playerId, seasons, isPitcher, 10)
  const [expandedVideoIndex, setExpandedVideoIndex] = useState<number | null>(null)

  const handleToggleVideo = (index: number) => {
    setExpandedVideoIndex(expandedVideoIndex === index ? null : index)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="md" />
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading top games...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    )
  }

  if (topGames.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        No game data available for this player.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 dark:border-gray-700">
            <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
              #
            </th>
            <th className="py-2 px-2 text-left text-xs font-semibold text-gray-500 dark:text-gray-400">
              Date
            </th>
            <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
              Result
            </th>
            {isPitcher ? (
              <>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  IP
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  H
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  ER
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  K
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  BB
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  HR
                </th>
              </>
            ) : (
              <>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  H-AB
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  HR
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  RBI
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  R
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  2B
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  3B
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  BB
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  K
                </th>
                <th className="py-2 px-2 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                  SB
                </th>
              </>
            )}
            <th className="py-2 px-2 text-center text-xs font-semibold text-blue-600 dark:text-blue-400">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {topGames.map((game, index) =>
            isPitcher ? (
              <PitcherGameRow
                key={game.gamePk}
                game={game}
                rank={index + 1}
                isVideoExpanded={expandedVideoIndex === index}
                onToggleVideo={() => handleToggleVideo(index)}
                isPitcher={true}
              />
            ) : (
              <HitterGameRow
                key={game.gamePk}
                game={game}
                rank={index + 1}
                isVideoExpanded={expandedVideoIndex === index}
                onToggleVideo={() => handleToggleVideo(index)}
                isPitcher={false}
              />
            )
          )}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {isPitcher ? (
          <p>Game Score based on modified Bill James formula: 50 + outs + (K-4)*2 - H*2 - ER*4 - BB*2</p>
        ) : (
          <p>Game Score: 1B=1, 2B=2, 3B=3, HR=4, RBI=1, R=1, BB=0.5, SB=0.5, K=-0.25</p>
        )}
        <p className="mt-1 text-gray-400 dark:text-gray-500">
          Click the video icon to search for game highlights on YouTube.
        </p>
      </div>
    </div>
  )
}
