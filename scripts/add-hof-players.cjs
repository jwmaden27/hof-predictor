/**
 * Adds all missing Baseball Hall of Fame players (post-1900 MLB careers)
 * to war-data.json by scanning FanGraphs leaderboards decade-by-decade.
 *
 * Process:
 * 1. Curated list of all HOF players who played MLB after 1900
 * 2. Cross-reference against existing war-data.json
 * 3. Scan FanGraphs leaderboards (1901-2023) to find FanGraphs IDs via MLBAM ID mapping
 * 4. Fetch full career WAR for each missing HOF player
 * 5. Resolve positions via MLB Stats API
 * 6. Merge into war-data.json with isHOF: true
 *
 * Also tags existing players who are newly inducted HOFers (e.g., Sabathia, Ortiz, Helton).
 */

const fs = require('fs')
const path = require('path')

const WAR_DATA_PATH = path.join(__dirname, '..', 'src', 'data', 'war-data.json')
const FG_DELAY_MS = 300
const MLB_API_DELAY_MS = 100

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

// ---------------------------------------------------------------------------
// Complete list of MLB HOF players who played after 1900
// Excludes: managers, umpires, executives, pioneers, and Negro League-only players
// (Negro League players who also played MLB are included)
// ---------------------------------------------------------------------------

const HOF_PLAYERS = [
  // Already in dataset (62) — included so we can tag any that are missing isHOF
  'Hank Aaron', 'Roberto Alomar', 'Jeff Bagwell', 'Ernie Banks', 'Adrian Beltre',
  'Johnny Bench', 'Yogi Berra', 'Craig Biggio', 'Wade Boggs', 'George Brett',
  'Roy Campanella', 'Rod Carew', 'Steve Carlton', 'Gary Carter', 'Roberto Clemente',
  'Joe DiMaggio', 'Dennis Eckersley', 'Carlton Fisk', 'Frank Thomas', 'Bob Gibson',
  'Tom Glavine', 'Ken Griffey Jr.', 'Tony Gwynn', 'Roy Halladay', 'Rickey Henderson',
  'Trevor Hoffman', 'Chipper Jones', 'Derek Jeter', 'Randy Johnson', 'Sandy Koufax',
  'Barry Larkin', 'Greg Maddux', 'Mickey Mantle', 'Pedro Martinez', 'Joe Mauer',
  'Willie Mays', 'Willie McCovey', 'Joe Morgan', 'Eddie Murray', 'Mike Mussina',
  'Nolan Ryan', 'Mike Piazza', 'Cal Ripken Jr.', 'Mariano Rivera', 'Frank Robinson',
  'Ivan Rodriguez', 'Scott Rolen', 'Babe Ruth', 'Ryne Sandberg', 'Mike Schmidt',
  'Tom Seaver', 'Ozzie Smith', 'John Smoltz', 'Jim Thome', 'Alan Trammell',
  'Vladimir Guerrero', 'Larry Walker', 'Dave Winfield', 'Carl Yastrzemski',
  'Robin Yount', 'Ted Williams', 'Ichiro Suzuki',

  // 2022-2026 inductees not in our existing 62
  'David Ortiz', 'Gil Hodges', 'Jim Kaat', 'Minnie Minoso', 'Tony Oliva',
  'Fred McGriff', 'Todd Helton', 'Dick Allen',
  'Dave Parker', 'CC Sabathia', 'Billy Wagner',
  'Carlos Beltran', 'Andruw Jones', 'Jeff Kent',

  // Pre-existing era HOFers missing from dataset
  'Grover Alexander', 'Luis Aparicio', 'Luke Appling', 'Richie Ashburn',
  'Earl Averill', 'Harold Baines', 'Frank Baker', 'Dave Bancroft',
  'Chief Bender', 'Bert Blyleven', 'Jim Bottomley', 'Lou Boudreau',
  'Roger Bresnahan', 'Lou Brock', 'Mordecai Brown',
  'Jim Bunning', 'Jesse Burkett', 'Max Carey',
  'Orlando Cepeda', 'Jack Chesbro', 'Fred Clarke',
  'Ty Cobb', 'Mickey Cochrane', 'Eddie Collins', 'Jimmy Collins',
  'Earle Combs', 'Roger Connor', 'Stan Coveleski', 'Sam Crawford',
  'Joe Cronin', 'Kiki Cuyler',
  'Andre Dawson', 'Dizzy Dean', 'Ed Delahanty',
  'Bill Dickey', 'Bobby Doerr', 'Don Drysdale', 'Hugh Duffy',
  'Red Faber', 'Bob Feller', 'Rick Ferrell', 'Rollie Fingers',
  'Elmer Flick', 'Whitey Ford', 'Nellie Fox', 'Jimmie Foxx',
  'Frankie Frisch', 'Pud Galvin', 'Lou Gehrig', 'Charlie Gehringer',
  'Lefty Gomez', 'Joe Gordon', 'Goose Goslin', 'Rich Gossage',
  'Hank Greenberg', 'Burleigh Grimes', 'Lefty Grove',
  'Chick Hafey', 'Jesse Haines', 'Billy Hamilton', 'Gabby Hartnett',
  'Harry Heilmann', 'Billy Herman', 'Harry Hooper',
  'Rogers Hornsby', 'Waite Hoyt', 'Carl Hubbell', 'Catfish Hunter',
  'Monte Irvin', 'Reggie Jackson', 'Travis Jackson', 'Fergie Jenkins',
  'Hughie Jennings', 'Walter Johnson',
  'Addie Joss', 'Al Kaline', 'Tim Keefe', 'Willie Keeler',
  'George Kell', 'Joe Kelley', 'George Kelly', 'King Kelly',
  'Harmon Killebrew', 'Ralph Kiner', 'Chuck Klein',
  'Nap Lajoie', 'Tony Lazzeri', 'Bob Lemon',
  'Freddie Lindstrom', 'Ernie Lombardi', 'Ted Lyons',
  'Heinie Manush', 'Rabbit Maranville',
  'Juan Marichal', 'Rube Marquard', 'Edgar Martinez',
  'Eddie Mathews', 'Christy Mathewson',
  'Bill Mazeroski', 'Tommy McCarthy',
  'Joe McGinnity', 'Bid McPhee', 'Joe Medwick',
  'Johnny Mize', 'Paul Molitor',
  'Jack Morris', 'Stan Musial', 'Hal Newhouser',
  'Kid Nichols', 'Phil Niekro',
  'Tony Perez', 'Mel Ott', 'Satchel Paige',
  'Jim Palmer', 'Herb Pennock', 'Gaylord Perry',
  'Eddie Plank', 'Kirby Puckett', 'Old Hoss Radbourn',
  'Tim Raines', 'Pee Wee Reese', 'Jim Rice', 'Sam Rice',
  'Eppa Rixey', 'Phil Rizzuto', 'Robin Roberts',
  'Brooks Robinson', 'Jackie Robinson',
  'Edd Roush', 'Red Ruffing', 'Amos Rusie',
  'Ron Santo',
  'Ray Schalk', 'Red Schoendienst',
  'Joe Sewell', 'Al Simmons', 'Ted Simmons',
  'George Sisler', 'Enos Slaughter', 'Lee Smith',
  'Duke Snider', 'Warren Spahn', 'Tris Speaker',
  'Willie Stargell', 'Bruce Sutter', 'Don Sutton',
  'Bill Terry', 'Sam Thompson', 'Joe Tinker',
  'Pie Traynor', 'Dazzy Vance', 'Arky Vaughan',
  'Rube Waddell', 'Honus Wagner', 'Bobby Wallace', 'Ed Walsh',
  'Lloyd Waner', 'Paul Waner', 'John Ward', 'Mickey Welch',
  'Zack Wheat', 'Deacon White', 'Hoyt Wilhelm',
  'Billy Williams', 'Hack Wilson',
  'Early Wynn', 'Cy Young', 'Ross Youngs',
]

// Name normalization for matching
function normalize(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Build lookup set of normalized HOF names
const HOF_NAME_SET = new Set(HOF_PLAYERS.map(normalize))

// ---------------------------------------------------------------------------
// FanGraphs leaderboard scanning — decade by decade
// ---------------------------------------------------------------------------

const LEADERBOARD_YEARS = []
for (let y = 1901; y <= 2023; y += 3) {
  LEADERBOARD_YEARS.push(y)
}
// Make sure we include key years
for (const y of [1901, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2005, 2010, 2015, 2020, 2023]) {
  if (!LEADERBOARD_YEARS.includes(y)) LEADERBOARD_YEARS.push(y)
}
LEADERBOARD_YEARS.sort((a, b) => a - b)

async function scanLeaderboards() {
  // mlbamId -> { fgId, playerName, fgPosition, isPitcher }
  const players = new Map()

  for (const year of LEADERBOARD_YEARS) {
    process.stdout.write(`  ${year}...`)

    // Pitchers
    try {
      const pitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=pit&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`,
      )
      for (const p of pitData.data || []) {
        if (!p.xMLBAMID) continue
        if (!players.has(p.xMLBAMID)) {
          players.set(p.xMLBAMID, {
            mlbamId: p.xMLBAMID,
            fgId: p.playerid,
            playerName: p.PlayerName,
            fgPosition: 'P',
            isPitcher: true,
          })
        }
      }
    } catch (e) {
      process.stdout.write(`(pit err)`)
    }

    await sleep(FG_DELAY_MS)

    // Hitters
    try {
      const hitData = await fetchJSON(
        `https://www.fangraphs.com/api/leaders/major-league/data?pos=all&stats=bat&lg=all&qual=0&season=${year}&season1=${year}&ind=0&month=0&team=0&pageitems=5000&pagenum=1&type=8`,
      )
      for (const p of hitData.data || []) {
        if (!p.xMLBAMID) continue
        if (!players.has(p.xMLBAMID)) {
          players.set(p.xMLBAMID, {
            mlbamId: p.xMLBAMID,
            fgId: p.playerid,
            playerName: p.PlayerName,
            fgPosition: p.position || 'OF',
            isPitcher: false,
          })
        } else {
          const existing = players.get(p.xMLBAMID)
          if (existing.isPitcher && p.position !== 'P') {
            existing.fgPosition = p.position || 'OF'
            existing.isPitcher = false
          }
        }
      }
    } catch (e) {
      process.stdout.write(`(bat err)`)
    }

    await sleep(FG_DELAY_MS)
  }

  console.log(' done')
  return players
}

// ---------------------------------------------------------------------------
// Fetch career WAR
// ---------------------------------------------------------------------------

async function fetchFullCareerWAR(fgId, isPitcher) {
  const stats = isPitcher ? 'pit' : 'bat'
  const position = isPitcher ? 'P' : 'OF'
  const url = `https://www.fangraphs.com/api/players/stats?playerid=${fgId}&position=${position}&stats=${stats}&type=6&ind=1`

  const data = await fetchJSON(url)
  const playerInfo = data.playerInfo || {}
  const playerName = playerInfo.firstLastName || ''

  if (!data.data) return { seasons: [], careerWAR: 0, playerName }

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
  return { seasons, careerWAR, playerName: playerName || '' }
}

// ---------------------------------------------------------------------------
// Position resolution
// ---------------------------------------------------------------------------

const POSITION_CODE_MAP = {
  '2': 'C', '3': '1B', '4': '2B', '5': '3B', '6': 'SS',
  '7': 'LF', '8': 'CF', '9': 'RF',
}

async function resolvePosition(mlbamId) {
  try {
    const data = await fetchJSON(`https://statsapi.mlb.com/api/v1/people/${mlbamId}`)
    const person = data.people?.[0]
    if (!person?.primaryPosition) return null

    const abbr = person.primaryPosition.abbreviation
    const code = person.primaryPosition.code

    if (code === '1') return abbr === 'RP' || abbr === 'CP' ? 'RP' : 'SP'
    if (code === '10') return '1B'
    if (POSITION_CODE_MAP[code]) return POSITION_CODE_MAP[code]
    return null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Add Missing HOF Players (Post-1900 MLB Careers) ===\n')

  // Load existing data
  const warData = JSON.parse(fs.readFileSync(WAR_DATA_PATH, 'utf-8'))
  const existingById = new Map()
  for (const p of warData) {
    existingById.set(p.playerId, p)
  }

  // First, tag any existing players that should have isHOF but don't
  console.log('Step 1: Checking existing players for missing HOF tags...')
  let tagged = 0
  for (const p of warData) {
    const norm = normalize(p.playerName)
    if (HOF_NAME_SET.has(norm) && !p.isHOF) {
      p.isHOF = true
      tagged++
      console.log(`  Tagged: ${p.playerName} (${p.playerId})`)
    }
  }
  console.log(`  Tagged ${tagged} existing players as HOF\n`)

  // Count how many HOF players we already have
  const existingHOFNames = new Set()
  for (const p of warData) {
    if (p.isHOF) existingHOFNames.add(normalize(p.playerName))
  }

  const missingHOF = HOF_PLAYERS.filter((name) => !existingHOFNames.has(normalize(name)))
  console.log(`  HOF players already in dataset: ${existingHOFNames.size}`)
  console.log(`  HOF players still missing: ${missingHOF.length}`)
  if (missingHOF.length > 0) {
    console.log(`  Missing: ${missingHOF.slice(0, 20).join(', ')}${missingHOF.length > 20 ? '...' : ''}\n`)
  }

  if (missingHOF.length === 0 && tagged === 0) {
    console.log('Nothing to do — all HOF players accounted for!')
    // Still save if we tagged any
    return
  }

  // Scan FanGraphs leaderboards to build player discovery map
  console.log('Step 2: Scanning FanGraphs leaderboards (1901-2023)...')
  const fgPlayers = await scanLeaderboards()
  console.log(`  Found ${fgPlayers.size} unique players across all leaderboards\n`)

  // Match missing HOF players against FanGraphs data by name
  console.log('Step 3: Matching missing HOF players to FanGraphs data...')
  const normalizedFGByName = new Map()
  for (const [mlbamId, player] of fgPlayers) {
    const norm = normalize(player.playerName)
    if (!normalizedFGByName.has(norm)) {
      normalizedFGByName.set(norm, [])
    }
    normalizedFGByName.get(norm).push(player)
  }

  const matched = []
  const unmatched = []

  for (const name of missingHOF) {
    const norm = normalize(name)
    const candidates = normalizedFGByName.get(norm)
    if (candidates && candidates.length > 0) {
      // Take the first match (usually correct for HOF players)
      matched.push({ hofName: name, ...candidates[0] })
    } else {
      unmatched.push(name)
    }
  }

  console.log(`  Matched: ${matched.length}`)
  console.log(`  Unmatched: ${unmatched.length}`)
  if (unmatched.length > 0) {
    console.log(`  Unmatched names: ${unmatched.join(', ')}`)
  }
  console.log()

  // Fetch career WAR for matched players
  console.log('Step 4: Fetching career WAR for matched HOF players...')
  const newEntries = []
  let fetched = 0
  let failed = 0

  for (const player of matched) {
    if (existingById.has(player.mlbamId)) {
      // Player exists by ID but name didn't match — tag it
      const existing = existingById.get(player.mlbamId)
      if (!existing.isHOF) {
        existing.isHOF = true
        console.log(`  Tagged by ID: ${existing.playerName} (${player.hofName})`)
        tagged++
      }
      continue
    }

    try {
      const result = await fetchFullCareerWAR(player.fgId, player.isPitcher)

      if (result.seasons.length > 0) {
        // Resolve position
        let position = await resolvePosition(player.mlbamId)
        if (!position) {
          // Fallback from FanGraphs
          if (player.isPitcher) position = 'SP'
          else if (['C', '1B', '2B', '3B', 'SS'].includes(player.fgPosition)) position = player.fgPosition
          else position = 'RF'
        }
        await sleep(MLB_API_DELAY_MS)

        newEntries.push({
          playerId: player.mlbamId,
          playerName: result.playerName || player.hofName,
          bbrefId: '',
          positionCategory: position,
          seasons: result.seasons,
          careerWAR: result.careerWAR,
          isHOF: true,
        })
        fetched++

        if (fetched % 20 === 0) {
          console.log(`  Progress: ${fetched} fetched, ${failed} failed`)
        }
      } else {
        failed++
        console.log(`  No data: ${player.hofName} (FG ID: ${player.fgId})`)
      }
    } catch (e) {
      failed++
      console.log(`  Failed: ${player.hofName}: ${e.message}`)
    }

    await sleep(FG_DELAY_MS)
  }

  console.log(`\n  Fetched: ${fetched}`)
  console.log(`  Failed: ${failed}`)
  console.log(`  Tagged existing: ${tagged}\n`)

  // Merge
  if (newEntries.length > 0 || tagged > 0) {
    console.log('Step 5: Merging into war-data.json...')
    for (const entry of newEntries) {
      warData.push(entry)
    }

    // Sort by careerWAR descending
    warData.sort((a, b) => (b.careerWAR || 0) - (a.careerWAR || 0))

    fs.writeFileSync(WAR_DATA_PATH, JSON.stringify(warData, null, 2) + '\n')

    const totalHOF = warData.filter((p) => p.isHOF).length
    console.log(`\n=== Summary ===`)
    console.log(`  New HOF players added: ${newEntries.length}`)
    console.log(`  Existing players tagged as HOF: ${tagged}`)
    console.log(`  Total HOF players in dataset: ${totalHOF}`)
    console.log(`  Total players in dataset: ${warData.length}`)

    // Print new additions
    if (newEntries.length > 0) {
      const sorted = [...newEntries].sort((a, b) => b.careerWAR - a.careerWAR)
      console.log(`\n  New HOF additions (by WAR):`)
      for (const p of sorted.slice(0, 30)) {
        const range = `${p.seasons[0]?.season}-${p.seasons[p.seasons.length - 1]?.season}`
        console.log(`    ${p.playerName} (${p.positionCategory}) — ${p.careerWAR} WAR (${range})`)
      }
      if (sorted.length > 30) {
        console.log(`    ...and ${sorted.length - 30} more`)
      }
    }

    // Report still unmatched
    if (unmatched.length > 0) {
      console.log(`\n  Still unmatched (may need manual addition):`)
      for (const name of unmatched) {
        console.log(`    ${name}`)
      }
    }
  }
}

main().catch(console.error)
