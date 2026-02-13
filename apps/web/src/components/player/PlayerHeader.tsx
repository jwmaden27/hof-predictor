import { Badge } from '@/components/ui/Badge.tsx'
import { AwardBadges } from '@/components/player/AwardBadges.tsx'
import { getTierBgColor, getScoreColor } from '@/utils/stats-helpers.ts'
import { POSITION_LABELS } from '@/data/hof-averages.ts'
import { HOF_BALLOT_DATA } from '@/data/hof-ballot-data.ts'
import type { PlayerAnalysis, HOFEligibility } from '@/hooks/usePlayerData.ts'

interface PlayerHeaderProps {
  data: PlayerAnalysis
}

function getHeadshotUrl(playerId: number): string {
  return `https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/${playerId}/headshot/67/current`
}

function getSeasonsLabel(data: PlayerAnalysis): string | null {
  const { bio, seasonStats } = data
  if (seasonStats.length > 0) {
    const seasons = new Set(seasonStats.map((s) => s.season)).size
    return bio.active ? `${seasons} Seasons (Active)` : `${seasons} Seasons`
  }
  if (bio.mlbDebutDate) {
    const debutYear = new Date(bio.mlbDebutDate).getFullYear()
    const currentYear = new Date().getFullYear()
    const years = currentYear - debutYear + (bio.active ? 1 : 0)
    if (years > 0) {
      return bio.active ? `${years} Seasons (Active)` : `${years} Seasons`
    }
  }
  return null
}

function getAgeDisplay(bio: PlayerAnalysis['bio']): string {
  if (bio.deathDate && bio.birthDate) {
    const birthYear = new Date(bio.birthDate).getFullYear()
    const deathYear = new Date(bio.deathDate).getFullYear()
    const ageAtDeath = deathYear - birthYear
    return `Age ${ageAtDeath} (${birthYear}-${deathYear})`
  }
  return `Age ${bio.currentAge}`
}

function getEligibilityDisplay(eligibility: HOFEligibility): { text: string; className: string } | null {
  switch (eligibility.status) {
    case 'future':
      return {
        text: `Eligible ${eligibility.eligibilityStartYear}`,
        className: 'text-gray-400',
      }
    case 'active':
      return {
        text: `Year ${eligibility.ballotYear} of 10`,
        className: 'text-cyan-400',
      }
    case 'expired':
      return {
        text: 'Ballot Expired',
        className: 'text-red-400',
      }
    default:
      return null
  }
}

export function PlayerHeader({ data }: PlayerHeaderProps) {
  const { bio, hofScore, positionCategory, hofEligibility } = data
  const seasonsLabel = getSeasonsLabel(data)
  const ageDisplay = getAgeDisplay(bio)
  const eligibilityDisplay = getEligibilityDisplay(hofEligibility)
  const ballotInfo = HOF_BALLOT_DATA[bio.id] ?? null

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={getHeadshotUrl(bio.id)}
              alt={bio.fullName}
              className="h-20 w-20 rounded-full border-2 border-gray-600 bg-gray-700 object-cover"
            />
            <div>
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold">{bio.fullName}</h1>
                {bio.primaryNumber && (
                  <span className="text-2xl font-light text-gray-400 dark:text-gray-500">
                    #{bio.primaryNumber}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 dark:text-gray-400">
                <span>{POSITION_LABELS[positionCategory] ?? positionCategory}</span>
                {bio.currentTeam && (
                  <>
                    <span className="text-gray-600 dark:text-gray-500">|</span>
                    <span>{bio.currentTeam.name}</span>
                  </>
                )}
                <span className="text-gray-600 dark:text-gray-500">|</span>
                <span>{ageDisplay}</span>
                <span className="text-gray-600 dark:text-gray-500">|</span>
                <span>
                  {bio.batSide.description}/{bio.pitchHand.description}
                </span>
                {seasonsLabel && (
                  <>
                    <span className="text-gray-600 dark:text-gray-500">|</span>
                    <span>{seasonsLabel}</span>
                  </>
                )}
                <Badge variant={bio.active ? 'success' : 'default'}>
                  {bio.active ? 'Active' : 'Retired'}
                </Badge>
              </div>
              {data.awards.length > 0 && (
                <div className="mt-2">
                  <AwardBadges awards={data.awards} />
                </div>
              )}
            </div>
          </div>

          {hofScore && (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div
                  className="text-5xl font-bold"
                  style={{ color: getScoreColor(hofScore.overall) }}
                >
                  {hofScore.overall}
                </div>
                <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">HOF Score</div>
              </div>
              {hofScore.tier === 'Hall of Famer' && ballotInfo && (
                <>
                  {ballotInfo.votePercentage !== null && (
                    <div className="text-center">
                      <div className="text-5xl font-bold text-amber-400">
                        {ballotInfo.votePercentage}%
                      </div>
                      <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        Induction Vote
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-amber-400">
                      {ballotInfo.ballotLabel}
                    </div>
                    <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      {ballotInfo.ballotType ?? 'Committee'} {ballotInfo.inductionYear}
                    </div>
                  </div>
                </>
              )}
              {hofScore.tier !== 'Hall of Famer' && (
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyan-400">
                    {hofScore.hofProbability}%
                  </div>
                  <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    HOF Probability
                  </div>
                </div>
              )}
              {hofScore.tier !== 'Hall of Famer' && ballotInfo && ballotInfo.votePercentage !== null && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">
                    {ballotInfo.votePercentage}%
                  </div>
                  <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Peak Vote
                  </div>
                </div>
              )}
              {eligibilityDisplay && hofScore.tier !== 'Hall of Famer' && (
                <div className="text-center">
                  <div className={`text-2xl font-semibold ${eligibilityDisplay.className}`}>
                    {eligibilityDisplay.text}
                  </div>
                  <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Ballot Window
                  </div>
                </div>
              )}
              <div>
                <span
                  className={`inline-block rounded-lg border px-3 py-1.5 text-sm font-semibold ${getTierBgColor(hofScore.tier)}`}
                >
                  {hofScore.tier}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
