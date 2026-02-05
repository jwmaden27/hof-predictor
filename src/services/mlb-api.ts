import type {
  MLBSearchResult,
  PlayerBio,
  Award,
  HittingStats,
  PitchingStats,
  SeasonStats,
} from '@/types/index.ts'

const BASE_URL = 'https://statsapi.mlb.com/api/v1'

const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function cachedFetch<T>(url: string): Promise<T> {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`MLB API error: ${response.status}`)
  }
  const data = await response.json()
  cache.set(url, { data, timestamp: Date.now() })
  return data as T
}

export async function searchPlayers(
  query: string,
): Promise<MLBSearchResult[]> {
  if (query.length < 2) return []
  const data = await cachedFetch<{ people?: MLBSearchResult[] }>(
    `${BASE_URL}/people/search?names=${encodeURIComponent(query)}&sportIds=1`,
  )
  return data.people ?? []
}

export async function getPlayerBio(playerId: number): Promise<PlayerBio> {
  const data = await cachedFetch<{ people: PlayerBio[] }>(
    `${BASE_URL}/people/${playerId}`,
  )
  return data.people[0]
}

export async function getPlayerCareerStats(
  playerId: number,
  group: 'hitting' | 'pitching',
): Promise<Record<string, unknown> | null> {
  const data = await cachedFetch<{
    stats: Array<{ splits: Array<{ stat: Record<string, unknown> }> }>
  }>(`${BASE_URL}/people/${playerId}/stats?stats=career&group=${group}`)
  return data.stats?.[0]?.splits?.[0]?.stat ?? null
}

export async function getPlayerSeasonStats(
  playerId: number,
  group: 'hitting' | 'pitching',
): Promise<SeasonStats[]> {
  const data = await cachedFetch<{
    stats: Array<{
      splits: Array<{
        season?: string
        stat: HittingStats | PitchingStats
        team?: { id: number; name: string }
        gameType?: string
      }>
    }>
  }>(`${BASE_URL}/people/${playerId}/stats?stats=yearByYear&group=${group}`)

  const splits = data.stats?.[0]?.splits ?? []
  return splits
    .filter((s) => s.gameType === 'R')
    .map((s) => ({
      season: s.season ?? '',
      team: s.team ?? { id: 0, name: 'Unknown' },
      stat: s.stat,
      gameType: s.gameType ?? 'R',
    }))
}

export async function getPlayerAwards(playerId: number): Promise<Award[]> {
  const data = await cachedFetch<{ people: Array<{ awards?: Award[] }> }>(
    `${BASE_URL}/people/${playerId}?hydrate=awards`,
  )
  return data.people?.[0]?.awards ?? []
}

export async function getPlayerComplete(playerId: number) {
  const bio = await getPlayerBio(playerId)
  const isPitcher = bio.primaryPosition.code === '1'
  const group = isPitcher ? 'pitching' : 'hitting'

  const [careerStats, seasonStats, awards] = await Promise.all([
    getPlayerCareerStats(playerId, group),
    getPlayerSeasonStats(playerId, group),
    getPlayerAwards(playerId),
  ])

  return { bio, careerStats, seasonStats, awards, isPitcher }
}
