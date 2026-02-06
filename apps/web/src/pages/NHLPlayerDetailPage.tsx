import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx'
import { Badge } from '@/components/ui/Badge.tsx'
import { useNHLPlayerData } from '@/hooks/useNHLPlayerData.ts'
import { NHL_POSITION_LABELS } from '@/data/nhl-hof-averages.ts'
import { NHL_PLAYER_DESCRIPTIONS } from '@/data/nhl-player-descriptions.ts'
import { NHLMilestoneIndicator } from '@/components/player/NHLMilestoneIndicator.tsx'
import { NHLPositionalStandards } from '@/components/player/NHLPositionalStandards.tsx'
import { flattenCareerStats } from '@/services/nhl-ps-service.ts'
import type { NHLSkaterStats, NHLGoalieStats } from '@/types/nhl-player.ts'

function getTierColor(tier: string): string {
  switch (tier) {
    case 'Hall of Famer':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    case 'First Ballot Lock':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    case 'Strong Candidate':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    case 'Solid Candidate':
      return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
    case 'Borderline':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    case 'Unlikely':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  }
}

function getNHLHeadshotUrl(playerId: number): string {
  return `https://assets.nhle.com/mugs/nhl/latest/${playerId}.png`
}

function SkaterStatsTable({ stats }: { stats: NHLSkaterStats }) {
  const rows = [
    { label: 'Games Played', value: stats.gamesPlayed },
    { label: 'Goals', value: stats.goals },
    { label: 'Assists', value: stats.assists },
    { label: 'Points', value: stats.points },
    { label: 'Plus/Minus', value: stats.plusMinus > 0 ? `+${stats.plusMinus}` : stats.plusMinus },
    { label: 'PIM', value: stats.pim },
    { label: 'Power Play Goals', value: stats.powerPlayGoals },
    { label: 'Power Play Points', value: stats.powerPlayPoints },
    { label: 'Shorthanded Goals', value: stats.shorthandedGoals },
    { label: 'Game-Winning Goals', value: stats.gameWinningGoals },
    { label: 'Shots', value: stats.shots },
    { label: 'Shooting %', value: `${(stats.shootingPctg * 100).toFixed(1)}%` },
  ]
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{r.value}</div>
        </div>
      ))}
    </div>
  )
}

function GoalieStatsTable({ stats }: { stats: NHLGoalieStats }) {
  const rows = [
    { label: 'Games Played', value: stats.gamesPlayed },
    { label: 'Games Started', value: stats.gamesStarted },
    { label: 'Wins', value: stats.wins },
    { label: 'Losses', value: stats.losses },
    { label: 'OT Losses', value: stats.otLosses },
    { label: 'GAA', value: stats.goalsAgainstAvg.toFixed(2) },
    { label: 'Save %', value: stats.savePctg > 0 ? `.${(stats.savePctg * 1000).toFixed(0)}` : '—' },
    { label: 'Shutouts', value: stats.shutouts },
  ]
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{r.value}</div>
        </div>
      ))}
    </div>
  )
}

export function NHLPlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>()
  const { data, isLoading, error } = useNHLPlayerData(
    playerId ? parseInt(playerId, 10) : null,
  )

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </PageContainer>
    )
  }

  if (error || !data) {
    return (
      <PageContainer>
        <div className="py-20 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {error ?? 'Player not found'}
          </h2>
        </div>
      </PageContainer>
    )
  }

  const { bio, careerStats, awards, hofScore, jawsResult, psSeasons, isGoalie } = data
  const description = NHL_PLAYER_DESCRIPTIONS[bio.id]

  return (
    <PageContainer>
      {/* Player Header */}
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <img
          src={getNHLHeadshotUrl(bio.id)}
          alt={bio.fullName}
          className="h-32 w-32 rounded-full bg-gray-200 object-cover dark:bg-gray-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://assets.nhle.com/mugs/nhl/latest/default-skater.png'
          }}
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {bio.fullName}
            </h1>
            {hofScore && (
              <Badge className={`${getTierColor(hofScore.tier)} text-sm`}>
                {hofScore.tier}
              </Badge>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{NHL_POSITION_LABELS[bio.position] ?? bio.position}</span>
            {bio.currentTeam && (
              <>
                <span>|</span>
                <span>{bio.currentTeam.name}</span>
              </>
            )}
            <span>|</span>
            <span>{bio.active ? 'Active' : 'Retired'}</span>
            {bio.sweaterNumber && (
              <>
                <span>|</span>
                <span>#{bio.sweaterNumber}</span>
              </>
            )}
          </div>
          <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Born {bio.birthDate} in {bio.birthCity}, {bio.birthCountry}
            {bio.draftDetails && (
              <> | Drafted {bio.draftDetails.year} Round {bio.draftDetails.round}, Pick {bio.draftDetails.overallPick}</>
            )}
          </div>
          {description && (
            <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              {description.description}
            </p>
          )}
        </div>
      </div>

      {/* HOF Score Section */}
      {hofScore && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
            Hall of Fame Analysis
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {hofScore.overall}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {hofScore.jawsComponent}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">JAWS (40)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {hofScore.awardsComponent}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Awards (25)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {hofScore.milestonesComponent}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Milestones (20)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {hofScore.trajectoryComponent}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Trajectory (15)</div>
            </div>
          </div>

          {/* Score bar */}
          <div className="mt-4">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${Math.min(hofScore.overall, 100)}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-gray-400 dark:text-gray-500">
              <span>0</span>
              <span>HOF Probability: {hofScore.hofProbability}%</span>
              <span>100</span>
            </div>
          </div>
        </div>
      )}

      {/* JAWS Section */}
      {jawsResult && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
            JAWS Analysis (Point Shares)
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {jawsResult.careerPS.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Career PS</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {jawsResult.peakPS.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Peak 7yr PS</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {jawsResult.jaws.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">JAWS</div>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Section */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          Milestones
        </h2>
        <NHLMilestoneIndicator
          careerStats={flattenCareerStats(careerStats)}
          playerType={isGoalie ? 'goalie' : 'skater'}
        />
      </div>

      {/* vs. HHOF Average Section */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          vs. HHOF Average
        </h2>
        <NHLPositionalStandards
          playerStats={flattenCareerStats(careerStats)}
          playerPosition={data.positionCategory}
        />
      </div>

      {/* Awards Section */}
      {awards.length > 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
            Awards
          </h2>
          <div className="flex flex-wrap gap-2">
            {awards.map((award) => (
              <Badge
                key={award.trophy}
                className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {award.trophy} ({award.seasons.length}x)
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Career Stats Section */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          Career Stats
        </h2>
        {isGoalie ? (
          <GoalieStatsTable stats={careerStats as NHLGoalieStats} />
        ) : (
          <SkaterStatsTable stats={careerStats as NHLSkaterStats} />
        )}
      </div>

      {/* Season-by-Season Point Shares */}
      {psSeasons.length > 0 && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
            Season-by-Season Point Shares
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Season</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Team</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">PS</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Visual</th>
                </tr>
              </thead>
              <tbody>
                {psSeasons.map((s) => {
                  const seasonStr = `${String(s.season).slice(0, 4)}-${String(s.season).slice(4)}`
                  return (
                    <tr key={s.season} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="px-3 py-1.5 text-gray-900 dark:text-gray-100">{seasonStr}</td>
                      <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.team}</td>
                      <td className="px-3 py-1.5 text-right font-medium text-gray-900 dark:text-gray-100">{s.ps.toFixed(1)}</td>
                      <td className="px-3 py-1.5">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className={`h-full rounded-full ${s.ps >= 10 ? 'bg-blue-500' : s.ps >= 6 ? 'bg-blue-400' : 'bg-gray-400'}`}
                            style={{ width: `${Math.min((s.ps / 20) * 100, 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageContainer>
  )
}
