import { getPlayerDescription } from '@/data/player-descriptions.ts'

interface PlayerDescriptionProps {
  playerId: number
  playerName: string
}

export function PlayerDescription({ playerId, playerName }: PlayerDescriptionProps) {
  const description = getPlayerDescription(playerId)

  if (!description) {
    return null
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        About {playerName}
      </h3>
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
