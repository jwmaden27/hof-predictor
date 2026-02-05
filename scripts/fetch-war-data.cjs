/**
 * Fetches WAR data from FanGraphs for all players in war-data.json
 * that are missing season WAR data (seasons array is empty).
 *
 * Approach:
 * 1. Load FanGraphs leaderboards (hitters + pitchers) for recent seasons
 *    to build MLBAM ID -> FanGraphs ID mapping
 * 2. For each player missing WAR data, fetch their season-by-season stats
 *    from FanGraphs player stats API
 * 3. Update war-data.json with the fetched WAR seasons
 */

const fs = require('fs')
const path = require('path')

const WAR_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'war-data.json')
const DELAY_MS = 300 // Be polite to FanGraphs
const LEADERBOARD_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

/**
 * Build a map of MLBAM ID -> FanGraphs player ID + position type
 * by fetching leaderboards across multiple years
 */
async function buildMLBAMtoFGMap() {
  const map = new Map() // mlbamId -> { fgId, isPitcher }

  for (const year of LEADERBOARD_YEARS) {
    console.log(`  Fetching ${year} leaderboards...`)

    // Pitchers
    try {
      const pitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=pit&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`
      )
      for (const p of pitData.data || []) {
        if (p.xMLBAMID && !map.has(p.xMLBAMID)) {
          map.set(p.xMLBAMID, { fgId: p.playerid, isPitcher: true })
        }
      }
    } catch (e) {
      console.warn(`  Warning: failed to fetch ${year} pitchers:`, e.message)
    }

    // Hitters
    try {
      const hitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=bat&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`
      )
      for (const p of hitData.data || []) {
        if (p.xMLBAMID && !map.has(p.xMLBAMID)) {
          map.set(p.xMLBAMID, { fgId: p.playerid, isPitcher: false })
        }
      }
    } catch (e) {
      console.warn(`  Warning: failed to fetch ${year} hitters:`, e.message)
    }

    await sleep(DELAY_MS)
  }

  return map
}

/**
 * Fetch season-by-season WAR for a player from FanGraphs
 */
async function fetchPlayerWAR(fgId, isPitcher) {
  const stats = isPitcher ? 'pit' : 'bat'
  const position = isPitcher ? 'P' : 'OF'
  const url = `https://www.fangraphs.com/api/players/stats?playerid=${fgId}&position=${position}&stats=${stats}&type=6&ind=1`

  const data = await fetchJSON(url)
  if (!data.data) return []

  // type === 0 means MLB level
  const mlbSeasons = data.data.filter(r => r.type === 0)

  return mlbSeasons.map(r => ({
    season: r.aseason,
    war: Math.round((r.WAR || 0) * 10) / 10,
    team: r.ateam === '- - -' ? undefined : r.ateam,
    age: r.Age,
  })).sort((a, b) => a.season - b.season)
}

async function main() {
  console.log('Loading war-data.json...')
  const warData = JSON.parse(fs.readFileSync(WAR_DATA_PATH, 'utf-8'))

  const needsWAR = warData.filter(p => p.seasons.length === 0)
  const hasWAR = warData.filter(p => p.seasons.length > 0)
  console.log(`Total players: ${warData.length}`)
  console.log(`Already have WAR: ${hasWAR.length}`)
  console.log(`Need WAR data: ${needsWAR.length}`)

  if (needsWAR.length === 0) {
    console.log('All players already have WAR data!')
    return
  }

  console.log('\nBuilding MLBAM -> FanGraphs ID mapping...')
  const fgMap = await buildMLBAMtoFGMap()
  console.log(`Mapped ${fgMap.size} players from FanGraphs leaderboards`)

  // Check how many of our players we can map
  const mappable = needsWAR.filter(p => fgMap.has(p.playerId))
  const unmappable = needsWAR.filter(p => !fgMap.has(p.playerId))
  console.log(`Can fetch WAR for: ${mappable.length}`)
  console.log(`No FanGraphs mapping for: ${unmappable.length}`)

  let fetched = 0
  let failed = 0
  let noData = 0

  for (const player of mappable) {
    const fg = fgMap.get(player.playerId)
    try {
      const seasons = await fetchPlayerWAR(fg.fgId, fg.isPitcher)
      if (seasons.length > 0) {
        player.seasons = seasons
        player.careerWAR = Math.round(seasons.reduce((sum, s) => sum + s.war, 0) * 10) / 10
        fetched++
      } else {
        noData++
      }

      if ((fetched + failed + noData) % 50 === 0) {
        console.log(`  Progress: ${fetched} fetched, ${noData} no data, ${failed} failed (${fetched + noData + failed}/${mappable.length})`)
      }
    } catch (e) {
      failed++
      console.warn(`  Failed for ${player.playerName} (${player.playerId}): ${e.message}`)
    }

    await sleep(DELAY_MS)
  }

  console.log(`\nResults:`)
  console.log(`  Fetched WAR: ${fetched}`)
  console.log(`  No MLB WAR data: ${noData}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  No FG mapping: ${unmappable.length}`)

  // Save updated data
  console.log('\nSaving updated war-data.json...')
  fs.writeFileSync(WAR_DATA_PATH, JSON.stringify(warData, null, 2) + '\n')

  const totalWithWAR = warData.filter(p => p.seasons.length > 0).length
  console.log(`Total players with WAR data: ${totalWithWAR}/${warData.length}`)
}

main().catch(console.error)
