/**
 * Discovers and adds retired post-2010 MLB players with 10+ career WAR
 * to war-data.json by scanning FanGraphs leaderboards.
 *
 * Process:
 * 1. Scan FanGraphs leaderboards (2010-2023) to discover players
 * 2. Filter out players already in the dataset
 * 3. Fetch full career WAR from FanGraphs player stats API
 * 4. Keep only players with 10+ career WAR whose last season < 2024
 * 5. Resolve specific position categories via MLB Stats API
 * 6. Merge into war-data.json
 */

const fs = require('fs')
const path = require('path')

const WAR_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'war-data.json')
const FG_DELAY_MS = 300
const MLB_API_DELAY_MS = 100
const LEADERBOARD_YEARS = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
]
const MIN_CAREER_WAR = 10
const MIN_LEADERBOARD_WAR = 8 // Pre-filter buffer (some WAR from pre-2010 seasons)
const RETIREMENT_CUTOFF = 2024 // Last season must be before this year

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

// ---------------------------------------------------------------------------
// Phase 1: Scan FanGraphs leaderboards to discover players
// ---------------------------------------------------------------------------

async function scanLeaderboards() {
  // mlbamId -> { fgId, playerName, fgPosition, isPitcher, yearWARs: Map<year, war> }
  const candidates = new Map()

  for (const year of LEADERBOARD_YEARS) {
    console.log(`  Scanning ${year} leaderboards...`)

    // Pitchers
    try {
      const pitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=pit&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`,
      )
      for (const p of pitData.data || []) {
        if (!p.xMLBAMID) continue
        const id = p.xMLBAMID
        if (!candidates.has(id)) {
          candidates.set(id, {
            mlbamId: id,
            fgId: p.playerid,
            playerName: p.PlayerName,
            fgPosition: 'P',
            isPitcher: true,
            yearWARs: new Map(),
          })
        }
        const c = candidates.get(id)
        const existing = c.yearWARs.get(year) || 0
        const war = p.WAR || 0
        if (war > existing) {
          c.yearWARs.set(year, war)
        }
      }
    } catch (e) {
      console.warn(`  Warning: failed to fetch ${year} pitchers:`, e.message)
    }

    await sleep(FG_DELAY_MS)

    // Hitters
    try {
      const hitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=bat&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`,
      )
      for (const p of hitData.data || []) {
        if (!p.xMLBAMID) continue
        const id = p.xMLBAMID
        if (!candidates.has(id)) {
          candidates.set(id, {
            mlbamId: id,
            fgId: p.playerid,
            playerName: p.PlayerName,
            fgPosition: p.position || 'OF',
            isPitcher: false,
            yearWARs: new Map(),
          })
        } else {
          // Update position if this is a hitter entry and existing was pitcher
          // (hitter position is more specific for position players)
          const c = candidates.get(id)
          if (c.isPitcher && p.position !== 'P') {
            c.fgPosition = p.position || 'OF'
            c.isPitcher = false
          }
        }
        const c = candidates.get(id)
        const existing = c.yearWARs.get(year) || 0
        const war = p.WAR || 0
        if (war > existing) {
          c.yearWARs.set(year, war)
        }
      }
    } catch (e) {
      console.warn(`  Warning: failed to fetch ${year} hitters:`, e.message)
    }

    await sleep(FG_DELAY_MS)
  }

  return candidates
}

// ---------------------------------------------------------------------------
// Phase 3: Fetch full career WAR for a player from FanGraphs
// ---------------------------------------------------------------------------

async function fetchFullCareerWAR(fgId, isPitcher) {
  const stats = isPitcher ? 'pit' : 'bat'
  const position = isPitcher ? 'P' : 'OF'
  const url = `https://www.fangraphs.com/api/players/stats?playerid=${fgId}&position=${position}&stats=${stats}&type=6&ind=1`

  const data = await fetchJSON(url)

  // Extract player info
  const playerInfo = data.playerInfo || {}
  const playerName = playerInfo.firstLastName || ''
  const maxSeason = playerInfo.maxSeason || 0

  if (!data.data) return { seasons: [], careerWAR: 0, playerName, lastSeason: maxSeason }

  // type === 0 means MLB level
  const mlbSeasons = data.data.filter((r) => r.type === 0)

  const seasons = mlbSeasons
    .map((r) => ({
      season: r.aseason,
      war: Math.round((r.WAR || 0) * 10) / 10,
      team: r.ateam === '- - -' ? undefined : r.ateam,
      age: r.Age,
    }))
    .sort((a, b) => a.season - b.season)

  const careerWAR = Math.round(seasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10
  const lastSeason = maxSeason || (seasons.length > 0 ? seasons[seasons.length - 1].season : 0)

  return { seasons, careerWAR, playerName: playerName || '', lastSeason }
}

// ---------------------------------------------------------------------------
// Phase 4: Resolve position category via MLB Stats API
// ---------------------------------------------------------------------------

const POSITION_CODE_MAP = {
  '2': 'C', '3': '1B', '4': '2B', '5': '3B', '6': 'SS',
  '7': 'LF', '8': 'CF', '9': 'RF',
}

async function resolvePosition(mlbamId, fgPosition) {
  // Always use MLB API for authoritative position — FanGraphs can return
  // multi-position strings like "3B/SS" or generic "OF"/"P"
  try {
    const data = await fetchJSON(`https://statsapi.mlb.com/api/v1/people/${mlbamId}`)
    const person = data.people?.[0]
    if (!person?.primaryPosition) throw new Error('No position data')

    const abbr = person.primaryPosition.abbreviation
    const code = person.primaryPosition.code

    // Pitcher
    if (code === '1') {
      return abbr === 'RP' || abbr === 'CP' ? 'RP' : 'SP'
    }
    // DH
    if (code === '10') return '1B'
    // Standard field positions by code
    if (POSITION_CODE_MAP[code]) return POSITION_CODE_MAP[code]

    // Fallback
    return fgPosition === 'P' ? 'SP' : 'RF'
  } catch {
    // Fallback on API failure — take first valid position from FG string
    const valid = new Set(['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'SP', 'RP'])
    const parts = fgPosition.split('/')
    const first = parts.find((p) => valid.has(p))
    if (first) return first
    return fgPosition === 'P' ? 'SP' : 'RF'
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Add Retired Post-2010 Players (10+ Career WAR) ===\n')

  // Phase 1: Scan leaderboards
  console.log('Phase 1: Scanning FanGraphs leaderboards (2010-2023)...')
  const candidates = await scanLeaderboards()
  console.log(`  Found ${candidates.size} unique players across all leaderboards\n`)

  // Phase 2: Filter
  console.log('Phase 2: Filtering candidates...')
  const warData = JSON.parse(fs.readFileSync(WAR_DATA_PATH, 'utf-8'))
  const existingIds = new Set(warData.map((p) => p.playerId))

  const toFetch = []
  let skippedExisting = 0
  let skippedLowWAR = 0

  for (const [mlbamId, candidate] of candidates) {
    if (existingIds.has(mlbamId)) {
      skippedExisting++
      continue
    }

    // Sum accumulated WAR from leaderboard appearances
    let totalLeaderboardWAR = 0
    for (const war of candidate.yearWARs.values()) {
      totalLeaderboardWAR += war
    }

    if (totalLeaderboardWAR < MIN_LEADERBOARD_WAR) {
      skippedLowWAR++
      continue
    }

    toFetch.push(candidate)
  }

  console.log(`  Already in dataset: ${skippedExisting}`)
  console.log(`  Below ${MIN_LEADERBOARD_WAR} leaderboard WAR: ${skippedLowWAR}`)
  console.log(`  Candidates to fetch full WAR: ${toFetch.length}\n`)

  // Phase 3: Fetch full career WAR
  console.log('Phase 3: Fetching full career WAR for candidates...')
  const qualified = []
  let fetched = 0
  let failed = 0
  let belowWAR = 0
  let notRetired = 0

  for (const candidate of toFetch) {
    try {
      const result = await fetchFullCareerWAR(candidate.fgId, candidate.isPitcher)

      if (result.lastSeason >= RETIREMENT_CUTOFF) {
        notRetired++
      } else if (result.careerWAR < MIN_CAREER_WAR) {
        belowWAR++
      } else {
        qualified.push({
          mlbamId: candidate.mlbamId,
          fgPosition: candidate.fgPosition,
          isPitcher: candidate.isPitcher,
          playerName: result.playerName || candidate.playerName,
          seasons: result.seasons,
          careerWAR: result.careerWAR,
          lastSeason: result.lastSeason,
        })
        fetched++
      }

      if ((fetched + failed + belowWAR + notRetired) % 25 === 0) {
        console.log(
          `  Progress: ${fetched} qualified, ${belowWAR} below WAR, ${notRetired} not retired, ${failed} failed (${fetched + belowWAR + notRetired + failed}/${toFetch.length})`,
        )
      }
    } catch (e) {
      failed++
      console.warn(`  Failed for ${candidate.playerName} (${candidate.mlbamId}): ${e.message}`)
    }

    await sleep(FG_DELAY_MS)
  }

  console.log(`\n  Qualified players: ${qualified.length}`)
  console.log(`  Below ${MIN_CAREER_WAR} career WAR: ${belowWAR}`)
  console.log(`  Still active (last season >= ${RETIREMENT_CUTOFF}): ${notRetired}`)
  console.log(`  Failed to fetch: ${failed}\n`)

  if (qualified.length === 0) {
    console.log('No new players to add.')
    return
  }

  // Phase 4: Resolve position categories (use MLB API for all — FG can return multi-position strings)
  console.log('Phase 4: Resolving position categories...')
  const needsResolution = qualified
  console.log(`  ${needsResolution.length} players need MLB API position lookup`)

  for (const player of needsResolution) {
    player.positionCategory = await resolvePosition(player.mlbamId, player.fgPosition)
    await sleep(MLB_API_DELAY_MS)
  }

  // Set position for players that didn't need resolution
  for (const player of qualified) {
    if (!player.positionCategory) {
      player.positionCategory = player.fgPosition
    }
  }
  console.log('  Done\n')

  // Phase 5 & 6: Build entries and merge
  console.log('Phase 5: Building entries and merging...')
  const newEntries = qualified.map((p) => ({
    playerId: p.mlbamId,
    playerName: p.playerName,
    bbrefId: '',
    positionCategory: p.positionCategory,
    seasons: p.seasons,
    careerWAR: p.careerWAR,
  }))

  // Append to existing data
  for (const entry of newEntries) {
    warData.push(entry)
  }

  // Sort by careerWAR descending
  warData.sort((a, b) => (b.careerWAR || 0) - (a.careerWAR || 0))

  // Write
  console.log('Phase 6: Writing updated war-data.json...')
  fs.writeFileSync(WAR_DATA_PATH, JSON.stringify(warData, null, 2) + '\n')

  const totalWithWAR = warData.filter((p) => p.seasons && p.seasons.length > 0).length
  console.log(`\n=== Summary ===`)
  console.log(`  New players added: ${newEntries.length}`)
  console.log(`  Total players in dataset: ${warData.length}`)
  console.log(`  Players with WAR data: ${totalWithWAR}`)

  // Print notable additions
  const notable = [...newEntries].sort((a, b) => b.careerWAR - a.careerWAR).slice(0, 20)
  console.log(`\n  Top additions by career WAR:`)
  for (const p of notable) {
    console.log(`    ${p.playerName} (${p.positionCategory}) — ${p.careerWAR} WAR, last season: ${p.seasons[p.seasons.length - 1]?.season}`)
  }
}

main().catch(console.error)
