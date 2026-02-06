import type {
  NHLSearchResult,
  NHLPlayerBio,
  NHLSkaterStats,
  NHLGoalieStats,
  NHLSeasonStats,
  NHLAward,
  NHLPositionCategory,
} from '@/types/nhl-player.ts'

// Use Vite proxy in dev, Vercel serverless proxy in production (NHL API has no CORS headers)
const isDev = import.meta.env.DEV

const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function cachedFetch<T>(url: string): Promise<T> {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`NHL API error: ${response.status}`)
  }
  const data = await response.json()
  cache.set(url, { data, timestamp: Date.now() })
  return data as T
}

export async function searchNHLPlayers(
  query: string,
): Promise<NHLSearchResult[]> {
  if (query.length < 2) return []

  const url = isDev
    ? `/nhl-search-api/api/v1/search/player?culture=en-us&limit=20&q=${encodeURIComponent(query)}`
    : `/api/nhl-search?q=${encodeURIComponent(query)}&limit=20`

  const data = await cachedFetch<
    Array<{
      playerId: string
      name: string
      positionCode: string
      teamId: string | null
      teamAbbrev: string | null
      active: string
      sweaterNumber: number | null
    }>
  >(url)

  return data.map((p) => ({
    playerId: p.playerId,
    name: p.name,
    positionCode: p.positionCode,
    teamAbbrev: p.teamAbbrev,
    active: p.active === '1',
    sweaterNumber: p.sweaterNumber,
  }))
}

interface NHLLandingResponse {
  playerId: number
  isActive: boolean
  currentTeamId?: number
  currentTeamAbbrev?: string
  fullTeamName?: { default: string }
  firstName: { default: string }
  lastName: { default: string }
  position: string
  headshot: string
  heightInInches: number
  weightInPounds: number
  birthDate: string
  birthCity: { default: string }
  birthCountry: string
  shootsCatches: string
  sweaterNumber?: number
  draftDetails?: {
    year: number
    round: number
    pickInRound: number
    overallPick: number
    teamAbbrev: string
  }
  careerTotals: {
    regularSeason: Record<string, number>
  }
  seasonTotals: Array<{
    season: number
    teamName: { default: string }
    leagueAbbrev: string
    gameTypeId: number
    [key: string]: unknown
  }>
  awards?: Array<{
    trophy: { default: string }
    seasons: Array<{ seasonId: number; gameTypeId: number }>
  }>
}

export async function getNHLPlayerLanding(
  playerId: number,
): Promise<NHLLandingResponse> {
  const url = isDev
    ? `/nhl-api/v1/player/${playerId}/landing`
    : `/api/nhl-player?id=${playerId}`
  return cachedFetch<NHLLandingResponse>(url)
}

function parseSkaterStats(raw: Record<string, number>): NHLSkaterStats {
  return {
    gamesPlayed: raw.gamesPlayed ?? 0,
    goals: raw.goals ?? 0,
    assists: raw.assists ?? 0,
    points: raw.points ?? 0,
    plusMinus: raw.plusMinus ?? 0,
    pim: raw.pim ?? 0,
    powerPlayGoals: raw.powerPlayGoals ?? 0,
    powerPlayPoints: raw.powerPlayPoints ?? 0,
    shorthandedGoals: raw.shorthandedGoals ?? 0,
    shorthandedPoints: raw.shorthandedPoints ?? 0,
    gameWinningGoals: raw.gameWinningGoals ?? 0,
    shots: raw.shots ?? 0,
    shootingPctg: raw.shootingPctg ?? 0,
    faceoffWinningPctg: raw.faceoffWinningPctg ?? 0,
  }
}

function parseGoalieStats(raw: Record<string, number>): NHLGoalieStats {
  return {
    gamesPlayed: raw.gamesPlayed ?? 0,
    gamesStarted: raw.gamesStarted ?? 0,
    wins: raw.wins ?? 0,
    losses: raw.losses ?? 0,
    otLosses: raw.otLosses ?? 0,
    goalsAgainstAvg: raw.goalsAgainstAvg ?? 0,
    savePctg: raw.savePctg ?? 0,
    shutouts: raw.shutouts ?? 0,
    shotsAgainst: raw.shotsAgainst ?? 0,
    goalsAgainst: raw.goalsAgainst ?? 0,
  }
}

/**
 * NHL API returns 'L' and 'R' for wingers; map to our 'LW'/'RW' types.
 */
function mapNHLPosition(apiPosition: string): NHLPositionCategory {
  switch (apiPosition) {
    case 'L': return 'LW'
    case 'R': return 'RW'
    case 'C': return 'C'
    case 'D': return 'D'
    case 'G': return 'G'
    default: return 'C' // fallback
  }
}

function parseBio(landing: NHLLandingResponse): NHLPlayerBio {
  const bio: NHLPlayerBio = {
    id: landing.playerId,
    fullName: `${landing.firstName.default} ${landing.lastName.default}`,
    firstName: landing.firstName.default,
    lastName: landing.lastName.default,
    position: mapNHLPosition(landing.position),
    birthDate: landing.birthDate,
    currentAge: calculateAge(landing.birthDate),
    birthCity: landing.birthCity.default,
    birthCountry: landing.birthCountry,
    heightInInches: landing.heightInInches,
    weightInPounds: landing.weightInPounds,
    shootsCatches: landing.shootsCatches,
    active: landing.isActive,
    headshot: landing.headshot,
    playerSlug: `${landing.firstName.default}-${landing.lastName.default}`
      .toLowerCase()
      .replace(/\s+/g, '-'),
  }

  if (landing.currentTeamId && landing.currentTeamAbbrev) {
    bio.currentTeam = {
      id: landing.currentTeamId,
      name: landing.fullTeamName?.default ?? '',
      abbrev: landing.currentTeamAbbrev,
    }
  }

  if (landing.sweaterNumber) {
    bio.sweaterNumber = landing.sweaterNumber
  }

  if (landing.draftDetails) {
    bio.draftDetails = {
      year: landing.draftDetails.year,
      round: landing.draftDetails.round,
      pickInRound: landing.draftDetails.pickInRound,
      overallPick: landing.draftDetails.overallPick,
      teamAbbrev: landing.draftDetails.teamAbbrev,
    }
  }

  return bio
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

function parseSeasonStats(
  landing: NHLLandingResponse,
  isGoalie: boolean,
): NHLSeasonStats[] {
  return landing.seasonTotals
    .filter((s) => s.gameTypeId === 2 && s.leagueAbbrev === 'NHL')
    .map((s) => {
      const raw = s as unknown as Record<string, number>
      return {
        season: s.season,
        teamName: s.teamName.default,
        leagueAbbrev: s.leagueAbbrev,
        gameTypeId: s.gameTypeId,
        stat: isGoalie ? parseGoalieStats(raw) : parseSkaterStats(raw),
      }
    })
}

function parseAwards(landing: NHLLandingResponse): NHLAward[] {
  if (!landing.awards) return []

  return landing.awards.map((a) => ({
    trophy: a.trophy.default,
    seasons: a.seasons.map((s) => ({
      season: s.seasonId,
      gameTypeId: s.gameTypeId,
    })),
  }))
}

export async function getNHLPlayerComplete(playerId: number): Promise<{
  bio: NHLPlayerBio
  careerStats: NHLSkaterStats | NHLGoalieStats
  seasonStats: NHLSeasonStats[]
  awards: NHLAward[]
}> {
  const landing = await getNHLPlayerLanding(playerId)
  const isGoalie = landing.position === 'G'

  const bio = parseBio(landing)
  const careerStats = isGoalie
    ? parseGoalieStats(landing.careerTotals.regularSeason)
    : parseSkaterStats(landing.careerTotals.regularSeason)
  const seasonStats = parseSeasonStats(landing, isGoalie)
  const awards = parseAwards(landing)

  return { bio, careerStats, seasonStats, awards }
}
