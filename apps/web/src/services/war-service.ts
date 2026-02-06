import warDataRaw from '@/data/war-data.json'
import type { PlayerWARData, SeasonWAR } from '@/types/index.ts'

const warData = warDataRaw as PlayerWARData[]

const warIndex = new Map<number, PlayerWARData>(
  warData.map((player) => [player.playerId, player]),
)

export function getPlayerWAR(playerId: number): PlayerWARData | null {
  return warIndex.get(playerId) ?? null
}

export function getPlayerSeasonWARs(playerId: number): SeasonWAR[] {
  return warIndex.get(playerId)?.seasons ?? []
}

export function getAllPlayersWithWAR(): PlayerWARData[] {
  return warData
}

export function getPlayerCareerWARTotal(playerId: number): number {
  return warIndex.get(playerId)?.careerWAR ?? 0
}

export function hasWARData(playerId: number): boolean {
  const entry = warIndex.get(playerId)
  return entry !== undefined && entry.seasons.length > 0
}

export function isHallOfFamer(playerId: number): boolean {
  return warIndex.get(playerId)?.isHOF === true
}

/**
 * Fetches WAR data on-demand from the /api/war serverless function
 * and caches it in the in-memory index for the session.
 * Returns the seasons if found, or empty array if not.
 */
export async function fetchAndCacheWAR(
  playerId: number,
  playerName: string,
  positionCategory: string,
): Promise<SeasonWAR[]> {
  // Already have data
  if (hasWARData(playerId)) {
    return warIndex.get(playerId)!.seasons
  }

  try {
    const res = await fetch(`/api/war?playerId=${playerId}`)
    if (!res.ok) return []

    const data = await res.json()
    if (!data.seasons || data.seasons.length === 0) return []

    const seasons: SeasonWAR[] = data.seasons
    const entry: PlayerWARData = {
      playerId,
      playerName,
      bbrefId: '',
      positionCategory: positionCategory as PlayerWARData['positionCategory'],
      seasons,
      careerWAR: data.careerWAR ?? 0,
    }

    // Cache in the in-memory index
    warIndex.set(playerId, entry)

    return seasons
  } catch {
    return []
  }
}
