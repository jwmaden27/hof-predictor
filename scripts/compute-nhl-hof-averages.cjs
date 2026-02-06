/**
 * Computes real career stat averages for all HHOF player inductees,
 * grouped by position (C, LW, RW, D, G).
 *
 * Fetches data from the NHL API (api-web.nhle.com/v1/player/{id}/landing)
 * for each inducted player in nhl-hof-ballot-data.ts and computes
 * mean + median for every career stat.
 *
 * Output: TypeScript-ready data for nhl-hof-positional-stats.ts
 *
 * Usage: node scripts/compute-nhl-hof-averages.cjs
 */

const fs = require('fs')
const path = require('path')

const DELAY_MS = 300 // Polite delay between API calls
const BASE_URL = 'https://api-web.nhle.com/v1'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

/**
 * Map NHL API position codes to our NHLPositionCategory.
 */
function mapPosition(apiPos) {
  switch (apiPos) {
    case 'L': return 'LW'
    case 'R': return 'RW'
    case 'C': return 'C'
    case 'D': return 'D'
    case 'G': return 'G'
    default: return 'C'
  }
}

/**
 * Extract all inducted player IDs from the ballot data file.
 * Parses the TypeScript source to find entries with non-null inductionYear.
 */
function getInductedPlayerIds() {
  const filePath = path.join(
    __dirname, '..', 'apps', 'web', 'src', 'data', 'nhl-hof-ballot-data.ts'
  )
  const content = fs.readFileSync(filePath, 'utf-8')

  const ids = []
  // Match patterns like: 8447400: {
  //   name: '...', inductionYear: 2025,
  const entryRegex = /(\d{7}):\s*\{[^}]*inductionYear:\s*(\d{4}|null)/g
  let match
  while ((match = entryRegex.exec(content)) !== null) {
    const id = parseInt(match[1], 10)
    const year = match[2]
    if (year !== 'null') {
      ids.push(id)
    }
  }

  return ids
}

function median(arr) {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
}

function mean(arr) {
  if (arr.length === 0) return 0
  return arr.reduce((s, v) => s + v, 0) / arr.length
}

/**
 * For rate stats, compute weighted average instead of simple mean.
 * - shootingPctg: weighted by shots
 * - savePctg: weighted by shotsAgainst
 * - goalsAgainstAvg: weighted by gamesPlayed
 * - faceoffWinningPctg: weighted by gamesPlayed
 */
function weightedMean(values, weights) {
  if (values.length === 0) return 0
  let totalWeight = 0
  let weightedSum = 0
  for (let i = 0; i < values.length; i++) {
    // Skip zero-weight entries (no meaningful sample)
    if (weights[i] <= 0) continue
    weightedSum += values[i] * weights[i]
    totalWeight += weights[i]
  }
  return totalWeight > 0 ? weightedSum / totalWeight : 0
}

// Skater stat keys to collect
const SKATER_STAT_KEYS = [
  'gamesPlayed', 'goals', 'assists', 'points', 'plusMinus', 'pim',
  'powerPlayGoals', 'powerPlayPoints', 'shorthandedGoals', 'shorthandedPoints',
  'gameWinningGoals', 'shots', 'shootingPctg', 'faceoffWinningPctg',
]

// Goalie stat keys to collect
const GOALIE_STAT_KEYS = [
  'gamesPlayed', 'gamesStarted', 'wins', 'losses', 'otLosses',
  'goalsAgainstAvg', 'savePctg', 'shutouts', 'shotsAgainst', 'goalsAgainst',
]

// Rate stats that need weighted averaging
const SKATER_RATE_STATS = {
  shootingPctg: 'shots',       // weight by shots
  faceoffWinningPctg: 'gamesPlayed', // weight by GP
}

const GOALIE_RATE_STATS = {
  goalsAgainstAvg: 'gamesPlayed',   // weight by GP
  savePctg: 'shotsAgainst',         // weight by shots against
}

async function main() {
  const playerIds = getInductedPlayerIds()
  console.log(`Found ${playerIds.length} inducted HHOF players\n`)

  // Grouped data: position -> array of player stat records
  const groups = { C: [], LW: [], RW: [], D: [], G: [] }
  let fetched = 0
  let failed = 0

  for (const id of playerIds) {
    try {
      const data = await fetchJSON(`${BASE_URL}/player/${id}/landing`)
      const position = mapPosition(data.position)
      const name = `${data.firstName.default} ${data.lastName.default}`
      const careerStats = data.careerTotals?.regularSeason

      if (!careerStats) {
        console.log(`  SKIP ${name} (${id}): no career totals`)
        failed++
        continue
      }

      const isGoalie = position === 'G'
      const statKeys = isGoalie ? GOALIE_STAT_KEYS : SKATER_STAT_KEYS

      const record = { name, id, position }
      for (const key of statKeys) {
        record[key] = careerStats[key] ?? 0
      }

      groups[position].push(record)
      fetched++
      console.log(`  [${fetched}/${playerIds.length}] ${name} → ${position} (GP: ${record.gamesPlayed})`)
    } catch (err) {
      console.log(`  FAIL ${id}: ${err.message}`)
      failed++
    }

    await sleep(DELAY_MS)
  }

  console.log(`\nFetched: ${fetched}, Failed: ${failed}\n`)

  // Compute averages per position
  const output = {}

  for (const [pos, players] of Object.entries(groups)) {
    if (players.length === 0) continue

    const isGoalie = pos === 'G'
    const statKeys = isGoalie ? GOALIE_STAT_KEYS : SKATER_STAT_KEYS
    const rateStats = isGoalie ? GOALIE_RATE_STATS : SKATER_RATE_STATS

    const stats = {}
    for (const key of statKeys) {
      const values = players.map(p => p[key]).filter(v => typeof v === 'number')

      if (key in rateStats) {
        // Weighted average for rate stats
        const weightKey = rateStats[key]
        const weights = players.map(p => p[weightKey] ?? 0)
        const validValues = []
        const validWeights = []
        for (let i = 0; i < players.length; i++) {
          const v = players[i][key]
          const w = players[i][weightKey] ?? 0
          if (typeof v === 'number' && v > 0 && w > 0) {
            validValues.push(v)
            validWeights.push(w)
          }
        }
        stats[key] = {
          mean: round(weightedMean(validValues, validWeights), key === 'savePctg' ? 4 : 2),
          median: round(median(validValues), key === 'savePctg' ? 4 : 2),
        }
      } else {
        stats[key] = {
          mean: round(mean(values), 1),
          median: round(median(values), 1),
        }
      }
    }

    output[pos] = {
      sampleSize: players.length,
      stats,
    }

    console.log(`\n${pos} (${players.length} players):`)
    for (const [key, val] of Object.entries(stats)) {
      console.log(`  ${key}: mean=${val.mean}, median=${val.median}`)
    }
  }

  // Generate TypeScript output
  console.log('\n\n===== TypeScript Output =====\n')
  generateTypeScript(output)

  // Also write to a JSON file for easy reference
  const jsonPath = path.join(__dirname, 'nhl-hof-positional-stats.json')
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2))
  console.log(`\nJSON saved to: ${jsonPath}`)
}

function round(val, decimals) {
  const factor = Math.pow(10, decimals)
  return Math.round(val * factor) / factor
}

function generateTypeScript(data) {
  const lines = []
  lines.push(`import type { NHLPositionCategory } from '@/types/nhl-player.ts'`)
  lines.push('')
  lines.push(`export interface NHLHOFStatAverage {`)
  lines.push(`  mean: number`)
  lines.push(`  median: number`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export interface NHLHOFSkaterPositionalStats {`)
  lines.push(`  sampleSize: number`)
  lines.push(`  stats: {`)
  const skaterKeys = SKATER_STAT_KEYS
  for (const key of skaterKeys) {
    lines.push(`    ${key}: NHLHOFStatAverage`)
  }
  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export interface NHLHOFGoaliePositionalStats {`)
  lines.push(`  sampleSize: number`)
  lines.push(`  stats: {`)
  const goalieKeys = GOALIE_STAT_KEYS
  for (const key of goalieKeys) {
    lines.push(`    ${key}: NHLHOFStatAverage`)
  }
  lines.push(`  }`)
  lines.push(`}`)
  lines.push('')
  lines.push(`export type NHLHOFPositionalStats = NHLHOFSkaterPositionalStats | NHLHOFGoaliePositionalStats`)
  lines.push('')
  lines.push(`/**`)
  lines.push(` * Real computed career stat averages for Hockey Hall of Fame inductees,`)
  lines.push(` * grouped by position. Mean uses weighted averaging for rate stats.`)
  lines.push(` * Generated by: node scripts/compute-nhl-hof-averages.cjs`)
  lines.push(` */`)
  lines.push(`export const NHL_HOF_POSITIONAL_STATS: Record<NHLPositionCategory, NHLHOFPositionalStats> = {`)

  for (const pos of ['C', 'LW', 'RW', 'D', 'G']) {
    const posData = data[pos]
    if (!posData) continue
    lines.push(`  ${pos}: {`)
    lines.push(`    sampleSize: ${posData.sampleSize},`)
    lines.push(`    stats: {`)
    for (const [key, val] of Object.entries(posData.stats)) {
      lines.push(`      ${key}: { mean: ${val.mean}, median: ${val.median} },`)
    }
    lines.push(`    },`)
    lines.push(`  },`)
  }

  lines.push(`}`)
  lines.push('')

  const ts = lines.join('\n')
  console.log(ts)

  // Write the TS file directly
  const tsPath = path.join(
    __dirname, '..', 'apps', 'web', 'src', 'data', 'nhl-hof-positional-stats.ts'
  )
  fs.writeFileSync(tsPath, ts)
  console.log(`\nTypeScript file written to: ${tsPath}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
