/**
 * Vercel serverless function: /api/war?playerId=592332
 *
 * Fetches season-by-season WAR data for a player from FanGraphs.
 * Used as a CORS proxy since FanGraphs doesn't allow browser requests.
 *
 * Steps:
 * 1. Look up the player's FanGraphs ID using the leaderboard API (searches by MLBAM ID)
 * 2. Fetch their season-by-season WAR from the FanGraphs player stats API
 * 3. Return formatted WAR seasons
 */

const FG_CACHE = new Map()

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`FanGraphs API returned ${res.status}`)
  return res.json()
}

async function findFanGraphsId(mlbamId) {
  // Check recent years of leaderboards to find the player's FanGraphs ID
  const years = [2025, 2024, 2023, 2022, 2021, 2020]

  for (const year of years) {
    // Check hitters first (larger pool)
    const hitData = await fetchJSON(
      `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=bat&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`
    )
    const hitter = (hitData.data || []).find(p => p.xMLBAMID === mlbamId)
    if (hitter) return { fgId: hitter.playerid, isPitcher: false }

    // Check pitchers
    const pitData = await fetchJSON(
      `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=pit&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`
    )
    const pitcher = (pitData.data || []).find(p => p.xMLBAMID === mlbamId)
    if (pitcher) return { fgId: pitcher.playerid, isPitcher: true }
  }

  return null
}

async function fetchPlayerWAR(fgId, isPitcher) {
  const stats = isPitcher ? 'pit' : 'bat'
  const position = isPitcher ? 'P' : 'OF'
  const url = `https://www.fangraphs.com/api/players/stats?playerid=${fgId}&position=${position}&stats=${stats}&type=6&ind=1`

  const data = await fetchJSON(url)
  if (!data.data) return []

  const mlbSeasons = data.data.filter(r => r.type === 0)

  return mlbSeasons
    .map(r => ({
      season: r.aseason,
      war: Math.round((r.WAR || 0) * 10) / 10,
      team: r.ateam === '- - -' ? undefined : r.ateam,
      age: r.Age,
    }))
    .sort((a, b) => a.season - b.season)
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')

  const { playerId } = req.query
  if (!playerId) {
    return res.status(400).json({ error: 'playerId query parameter is required' })
  }

  const mlbamId = parseInt(playerId, 10)
  if (isNaN(mlbamId)) {
    return res.status(400).json({ error: 'playerId must be a number' })
  }

  try {
    // Find FanGraphs ID
    const fg = await findFanGraphsId(mlbamId)
    if (!fg) {
      return res.status(404).json({ error: 'Player not found in FanGraphs data', playerId: mlbamId })
    }

    // Fetch WAR seasons
    const seasons = await fetchPlayerWAR(fg.fgId, fg.isPitcher)
    const careerWAR = Math.round(seasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10

    return res.status(200).json({
      playerId: mlbamId,
      seasons,
      careerWAR,
    })
  } catch (e) {
    console.error('WAR fetch error:', e)
    return res.status(500).json({ error: 'Failed to fetch WAR data' })
  }
}
