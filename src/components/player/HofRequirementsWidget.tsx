import { useMemo } from 'react'
import type {
  HOFScore,
  SeasonWAR,
  Award,
  PositionCategory,
} from '@/types/index.ts'
import { HOF_AVERAGES } from '@/data/hof-averages.ts'
import { calculatePeakWAR } from '@/utils/jaws.ts'
import { getTierBgColor } from '@/utils/stats-helpers.ts'

const RETIREMENT_AGE = 39

const AWARD_IDS = {
  MVP: ['ALMVP', 'NLMVP'],
  ALL_STAR: ['ALAS', 'NLAS'],
  SILVER_SLUGGER: ['ALSS', 'NLSS'],
} as const

function countAward(awards: Award[], ids: readonly string[]): number {
  return awards.filter((a) => ids.includes(a.id)).length
}

interface HofRequirementsWidgetProps {
  hofScore: HOFScore
  careerStats: Record<string, unknown> | null
  warSeasons: SeasonWAR[]
  awards: Award[]
  currentAge: number
  positionCategory: PositionCategory
}

interface RequiredSeasonLine {
  label: string
  value: string
  note?: string
}

interface AwardSuggestion {
  label: string
  count: number
}

interface Requirements {
  targetTier: string
  targetScore: number
  remainingSeasons: number
  warPerSeason: number
  seasonLines: RequiredSeasonLine[]
  awardPath: AwardSuggestion[]
}

function getStatNum(stats: Record<string, unknown> | null, key: string): number {
  if (!stats) return 0
  const v = stats[key]
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const parsed = parseFloat(v)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function computeRequirements(
  hofScore: HOFScore,
  careerStats: Record<string, unknown> | null,
  warSeasons: SeasonWAR[],
  awards: Award[],
  currentAge: number,
  positionCategory: PositionCategory,
): Requirements | null {
  const remainingSeasons = Math.max(RETIREMENT_AGE - currentAge, 1)
  const currentScore = hofScore.overall

  // Determine target tier
  let targetScore: number
  let targetTier: string
  if (currentScore < 60) {
    targetScore = 60
    targetTier = 'Solid Candidate'
  } else if (currentScore < 75) {
    targetScore = 75
    targetTier = 'Strong Candidate'
  } else {
    targetScore = 90
    targetTier = 'First Ballot Lock'
  }

  const gap = targetScore - currentScore
  if (gap <= 0) return null

  // --- WAR per season calculation ---
  const currentCareerWAR = warSeasons.reduce((sum, s) => sum + s.war, 0)
  const hofAvg = HOF_AVERAGES[positionCategory]

  // Simulate the full projected score at different WAR/season levels.
  // Find the WAR/season that, when combined with realistic awards and
  // trajectory gains, achieves the target overall score.
  // JAWS is the biggest lever (max 40 of 100 points) and is directly
  // driven by WAR accumulation, so we solve for it holistically.

  // Estimate additional trajectory points from future seasons at a given WAR
  const currentElite = warSeasons.filter((s) => s.war >= 5.0).length
  const currentSolid = warSeasons.filter((s) => s.war >= 3.0).length

  // Estimate additional awards points (realistic: a few more All-Stars)
  const currentAwardsPoints = hofScore.awardsComponent
  const realisticAwardsGain = Math.min(gap * 0.15, 25 - currentAwardsPoints, 5)

  // Estimate additional milestones points (modest)
  const realisticMilestonesGain = Math.min(gap * 0.1, 20 - hofScore.milestonesComponent, 4)

  // The JAWS + trajectory components need to make up the rest
  const nonJAWSGain = realisticAwardsGain + realisticMilestonesGain
  const jawsTrajectoryTarget = gap - nonJAWSGain

  // Binary search for WAR/season that achieves the combined JAWS + trajectory target
  let lo = 0
  let hi = 12
  for (let iter = 0; iter < 30; iter++) {
    const mid = (lo + hi) / 2
    const projCareerWAR = currentCareerWAR + mid * remainingSeasons

    // Build projected seasons for peak calculation
    const projSeasons: SeasonWAR[] = [...warSeasons]
    for (let y = 1; y <= remainingSeasons; y++) {
      projSeasons.push({ season: 2025 + y, war: mid, age: currentAge + y })
    }
    const { peakWAR: projPeakWAR } = calculatePeakWAR(projSeasons)
    const projJAWS = (projCareerWAR + projPeakWAR) / 2

    const jawsRatio = projJAWS / hofAvg.jaws
    const careerWARRatio = projCareerWAR / hofAvg.careerWAR
    const peakWARRatio = projPeakWAR / hofAvg.peakWAR
    const compositeRatio = jawsRatio * 0.6 + careerWARRatio * 0.2 + peakWARRatio * 0.2

    let jawsComponent: number
    if (compositeRatio >= 1.25) jawsComponent = 40
    else if (compositeRatio >= 1.0) jawsComponent = 32 + (compositeRatio - 1.0) * 32
    else if (compositeRatio >= 0.75) jawsComponent = 20 + (compositeRatio - 0.75) * 48
    else if (compositeRatio >= 0.5) jawsComponent = 10 + (compositeRatio - 0.5) * 40
    else jawsComponent = compositeRatio * 20

    // Trajectory: count elite/solid seasons with future WAR at this level
    const futureElite = mid >= 5.0 ? remainingSeasons : 0
    const futureSolid = mid >= 3.0 ? remainingSeasons : 0
    const projElite = currentElite + futureElite
    const projSolid = currentSolid + futureSolid
    let trajectoryComponent = Math.min(projElite * 1.5, 7.5) + Math.min(projSolid * 0.5, 5)
    trajectoryComponent = Math.min(trajectoryComponent, 15)

    const jawsTrajectoryGain =
      (jawsComponent - hofScore.jawsComponent) +
      (trajectoryComponent - hofScore.trajectoryComponent)

    if (jawsTrajectoryGain < jawsTrajectoryTarget) {
      lo = mid
    } else {
      hi = mid
    }
  }
  // Enforce a realistic minimum — building a HOF case requires solid play
  const warPerSeason = Math.max(Math.round(((lo + hi) / 2) * 10) / 10, 3.5)

  // --- Counting stats per season ---
  // Instead of targeting career milestones, derive what a HOF-caliber
  // average season looks like based on the WAR/season needed.
  // A ~5 WAR season for a hitter historically correlates with roughly:
  //   ~30 HR, ~100 RBI, ~95 Runs, .290 AVG, .370 OBP
  // Scale linearly from WAR target, with sensible floors/ceilings.
  const currentAvg = getStatNum(careerStats, 'avg')
  const currentOBP = getStatNum(careerStats, 'obp')

  // Base stat rates for a 5.0 WAR hitter season
  const BASE_WAR = 5.0
  const warRatio = Math.max(warPerSeason / BASE_WAR, 0.4)

  const targetHR = Math.round(Math.min(Math.max(30 * warRatio, 15), 50))
  const targetRBI = Math.round(Math.min(Math.max(100 * warRatio, 60), 140))
  const targetRuns = Math.round(Math.min(Math.max(95 * warRatio, 55), 130))

  // Build season lines
  const seasonLines: RequiredSeasonLine[] = []

  // AVG — rate stat, shown relative to current
  if (currentAvg >= 0.300) {
    seasonLines.push({ label: 'AVG', value: currentAvg.toFixed(3).replace(/^0/, ''), note: 'Maintain' })
  } else if (currentAvg >= 0.280) {
    seasonLines.push({ label: 'AVG', value: '.300+', note: 'Improve to' })
  } else {
    seasonLines.push({ label: 'AVG', value: '.285+', note: 'Target' })
  }

  // OBP — rate stat
  if (currentOBP >= 0.370) {
    seasonLines.push({ label: 'OBP', value: currentOBP.toFixed(3).replace(/^0/, ''), note: 'Maintain' })
  } else if (currentOBP >= 0.340) {
    seasonLines.push({ label: 'OBP', value: '.370+', note: 'Improve to' })
  } else {
    seasonLines.push({ label: 'OBP', value: '.350+', note: 'Target' })
  }

  // Counting stats scaled from WAR target
  seasonLines.push({ label: 'HR', value: String(targetHR) })
  seasonLines.push({ label: 'RBI', value: String(targetRBI) })
  seasonLines.push({ label: 'Runs', value: String(targetRuns) })

  // --- Awards path ---
  const currentMVPs = countAward(awards, AWARD_IDS.MVP)
  const currentAS = countAward(awards, AWARD_IDS.ALL_STAR)
  const currentSS = countAward(awards, AWARD_IDS.SILVER_SLUGGER)
  const awardsGapTarget = Math.max(realisticAwardsGain, 0)

  const awardPath: AwardSuggestion[] = []
  let awardsPointsNeeded = Math.max(awardsGapTarget, 0)

  // Suggest All-Stars first (0.5 pts each, max 5 pts total = 10 selections)
  if (currentAS < 10 && awardsPointsNeeded > 0) {
    const asNeeded = Math.min(
      Math.ceil(Math.min(awardsPointsNeeded, 5 - currentAS * 0.5) / 0.5),
      remainingSeasons,
      10 - currentAS,
    )
    if (asNeeded > 0) {
      awardPath.push({ label: 'All-Star', count: asNeeded })
      awardsPointsNeeded -= asNeeded * 0.5
    }
  }

  // Silver Sluggers (0.5 pts each, max 2.5 pts total = 5 selections)
  if (currentSS < 5 && awardsPointsNeeded > 0) {
    const ssNeeded = Math.min(
      Math.ceil(Math.min(awardsPointsNeeded, 2.5 - currentSS * 0.5) / 0.5),
      remainingSeasons,
      5 - currentSS,
    )
    if (ssNeeded > 0) {
      awardPath.push({ label: 'Silver Slugger', count: ssNeeded })
      awardsPointsNeeded -= ssNeeded * 0.5
    }
  }

  // MVPs (5 pts each, max 15 pts total = 3 selections) — only if gap is large
  if (currentMVPs < 3 && awardsPointsNeeded > 2) {
    const mvpNeeded = Math.min(
      Math.ceil(awardsPointsNeeded / 5),
      3 - currentMVPs,
      Math.floor(remainingSeasons / 3), // an MVP every ~3 seasons is realistic
    )
    if (mvpNeeded > 0) {
      awardPath.push({ label: 'MVP', count: mvpNeeded })
    }
  }

  return {
    targetTier,
    targetScore,
    remainingSeasons,
    warPerSeason,
    seasonLines,
    awardPath,
  }
}

export function HofRequirementsWidget({
  hofScore,
  careerStats,
  warSeasons,
  awards,
  currentAge,
  positionCategory,
}: HofRequirementsWidgetProps) {
  const requirements = useMemo(
    () =>
      computeRequirements(
        hofScore,
        careerStats,
        warSeasons,
        awards,
        currentAge,
        positionCategory,
      ),
    [hofScore, careerStats, warSeasons, awards, currentAge, positionCategory],
  )

  if (!requirements) return null

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Path to
          </span>
          <span
            className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${getTierBgColor(requirements.targetTier)}`}
          >
            {requirements.targetTier}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Assuming retirement at age {RETIREMENT_AGE} ({requirements.remainingSeasons} season{requirements.remainingSeasons !== 1 ? 's' : ''} remaining)
        </p>
      </div>

      {/* Per-season stat targets */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Per-Season Averages Needed
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {requirements.seasonLines.map((line) => (
            <div
              key={line.label}
              className="rounded-lg bg-gray-50 px-2 py-2 text-center dark:bg-gray-800"
            >
              <div className="text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {line.label}
              </div>
              <div className="mt-0.5 text-base font-bold text-gray-900 dark:text-gray-100">
                {line.value}
              </div>
              {line.note && (
                <div className="mt-0.5 text-[9px] text-gray-400 dark:text-gray-500">
                  {line.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WAR target */}
      <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Target WAR per season:
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
          ~{requirements.warPerSeason.toFixed(1)}
        </span>
      </div>

      {/* Awards path */}
      {requirements.awardPath.length > 0 && (
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Sample Awards Path
          </h4>
          <div className="flex flex-wrap gap-2">
            {requirements.awardPath.map((a) => (
              <span
                key={a.label}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                {a.count}&times; {a.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-[10px] italic text-gray-400 dark:text-gray-500">
        Based on scoring model projections. Actual HOF outcomes depend on many factors beyond statistics.
      </p>
    </div>
  )
}
