import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { PlayerHeader } from '@/components/player/PlayerHeader.tsx'
import { PlayerStatTable } from '@/components/player/PlayerStatTable.tsx'
import { MilestoneIndicator } from '@/components/player/MilestoneIndicator.tsx'
import { BallotPrediction } from '@/components/player/BallotPrediction.tsx'
import { CareerStatsRibbon } from '@/components/player/CareerStatsRibbon.tsx'
import { HofPathWidget } from '@/components/player/HofPathWidget.tsx'
import { JawsGauge } from '@/components/jaws/JawsGauge.tsx'
import { JawsBreakdown } from '@/components/jaws/JawsBreakdown.tsx'
import { PositionComparison } from '@/components/jaws/PositionComparison.tsx'
import { PeakSeasonsChart } from '@/components/jaws/PeakSeasonsChart.tsx'
import { WarProgressionChart } from '@/components/charts/WarProgressionChart.tsx'
import { RadarComparisonChart } from '@/components/charts/RadarComparisonChart.tsx'
import { ProjectionSlider } from '@/components/projections/ProjectionSlider.tsx'
import { ProjectionChart } from '@/components/projections/ProjectionChart.tsx'
import { ProjectionSummary } from '@/components/projections/ProjectionSummary.tsx'
import { Tabs } from '@/components/ui/Tabs.tsx'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner.tsx'
import { usePlayerData } from '@/hooks/usePlayerData.ts'
import { useProjection } from '@/hooks/useProjection.ts'
import { getPlayerType } from '@/utils/stats-helpers.ts'
import { projectCareerEnd } from '@/utils/career-projection.ts'
import { ComparableHOFPlayers } from '@/components/player/ComparableHOFPlayers.tsx'
import { HofRequirementsWidget } from '@/components/player/HofRequirementsWidget.tsx'

const TABS_WITH_PROJECTION = [
  { label: 'Overview', value: 'overview' },
  { label: 'JAWS Analysis', value: 'jaws' },
  { label: 'Projections', value: 'projections' },
  { label: 'Career Stats', value: 'stats' },
]

const TABS_WITHOUT_PROJECTION = [
  { label: 'Overview', value: 'overview' },
  { label: 'JAWS Analysis', value: 'jaws' },
  { label: 'Career Stats', value: 'stats' },
]

export function PlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>()
  const { data, isLoading, error } = usePlayerData(
    playerId ? parseInt(playerId, 10) : null,
  )
  const [activeTab, setActiveTab] = useState('overview')

  const projectionParams =
    data?.jawsComparison && data.bio.active
      ? {
          currentSeasons: data.warSeasons,
          positionCategory: data.positionCategory,
          awards: data.awards,
          careerStats: Object.fromEntries(
            Object.entries(data.careerStats ?? {})
              .filter(([, v]) => typeof v === 'number')
              .map(([k, v]) => [k, v as number]),
          ),
          playerType: getPlayerType(data.bio.primaryPosition.code),
          currentAge: data.bio.currentAge,
          isActive: data.bio.active,
        }
      : null
  const { futureWAR, setFutureWAR, projectionData } =
    useProjection(projectionParams)

  // Enrich careerStats with careerWAR from WAR seasons so MilestoneIndicator can display it
  const enrichedCareerStats = useMemo(() => {
    if (!data?.careerStats) return null
    const careerWAR = data.warSeasons.reduce((sum, s) => sum + s.war, 0)
    return { ...data.careerStats, careerWAR: Math.round(careerWAR * 10) / 10 }
  }, [data])

  const careerProjection = useMemo(() => {
    if (!data || !data.bio.active || !data.hasWAR || !data.hofScore) return null
    if (data.hofScore.tier === 'Hall of Famer') return null
    return projectCareerEnd({
      warSeasons: data.warSeasons,
      seasonStats: data.seasonStats,
      careerStats: data.careerStats,
      awards: data.awards,
      positionCategory: data.positionCategory,
      currentAge: data.bio.currentAge,
      isPitcher: data.isPitcher,
    })
  }, [data])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <PageContainer>
        <div className="py-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {error ?? 'Player not found'}
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Try searching for a different player.
          </p>
        </div>
      </PageContainer>
    )
  }

  const tabs = data.bio.active && data.hasWAR
    ? TABS_WITH_PROJECTION
    : TABS_WITHOUT_PROJECTION

  return (
    <>
      <PlayerHeader data={data} />
      <CareerStatsRibbon data={data} />

      <PageContainer>
        {!data.hasWAR && (
          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            WAR data is not available for this player. JAWS analysis cannot be
            computed.
          </div>
        )}

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {data.jawsComparison && data.hofScore && (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                      <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        JAWS Score
                      </h3>
                      <JawsGauge comparison={data.jawsComparison} />
                    </div>
                    {data.hofScore.tier !== 'Hall of Famer' ? (
                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          HOF Probability & Ballot Prediction
                        </h3>
                        <BallotPrediction hofScore={data.hofScore} />
                      </div>
                    ) : (
                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Milestones
                        </h3>
                        <MilestoneIndicator
                          careerStats={enrichedCareerStats}
                          playerType={getPlayerType(data.bio.primaryPosition.code)}
                        />
                      </div>
                    )}
                    {data.hofScore.tier !== 'Hall of Famer' && (
                      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Milestones
                        </h3>
                        <MilestoneIndicator
                          careerStats={enrichedCareerStats}
                          playerType={getPlayerType(data.bio.primaryPosition.code)}
                          milestoneProjections={careerProjection?.milestoneProjections}
                        />
                      </div>
                    )}
                  </div>

                  {data.bio.active && !data.isPitcher && data.hofScore.tier !== 'Hall of Famer' && (
                    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                      <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        What It Takes
                      </h3>
                      <HofRequirementsWidget
                        hofScore={data.hofScore}
                        careerStats={data.careerStats}
                        warSeasons={data.warSeasons}
                        awards={data.awards}
                        currentAge={data.bio.currentAge}
                        positionCategory={data.positionCategory}
                      />
                    </div>
                  )}

                  {data.hasWAR && data.warSeasons.length > 0 && (
                    <ComparableHOFPlayers
                      warSeasons={data.warSeasons}
                      positionCategory={data.positionCategory}
                      playerId={parseInt(playerId!, 10)}
                      isHallOfFamer={data.hofScore.tier === 'Hall of Famer'}
                    />
                  )}

                  {careerProjection && data.hofScore.tier !== 'Hall of Famer' && (
                    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                      <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        HOF Path Projection
                      </h3>
                      <HofPathWidget
                        projection={careerProjection}
                        currentScore={data.hofScore}
                      />
                    </div>
                  )}

                  <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <WarProgressionChart seasons={data.warSeasons} />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <RadarComparisonChart
                      comparison={data.jawsComparison}
                      hofScore={data.hofScore}
                    />
                  </div>
                </>
              )}

              {/* Score Breakdown */}
              {data.hofScore && (
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                  <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    HOF Score Breakdown
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        label: 'JAWS',
                        value: data.hofScore.jawsComponent,
                        max: 40,
                      },
                      {
                        label: 'Awards',
                        value: data.hofScore.awardsComponent,
                        max: 25,
                      },
                      {
                        label: 'Milestones',
                        value: data.hofScore.milestonesComponent,
                        max: 20,
                      },
                      {
                        label: 'Trajectory',
                        value: data.hofScore.trajectoryComponent,
                        max: 15,
                      },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {item.value.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.label} (max {item.max})
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'jaws' && data.jawsComparison && (
            <div className="space-y-8">
              <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  JAWS Breakdown
                </h3>
                <JawsBreakdown comparison={data.jawsComparison} />
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                <PositionComparison comparison={data.jawsComparison} />
              </div>

              {data.jawsResult && (
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                  <PeakSeasonsChart
                    seasons={data.warSeasons}
                    peakSeasons={data.jawsResult.peakSeasons}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'jaws' && !data.jawsComparison && (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              JAWS analysis requires WAR data, which is not available for this
              player.
            </div>
          )}

          {activeTab === 'projections' && (
            <div className="space-y-8">
              {projectionData ? (
                <>
                  <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <ProjectionSlider
                      value={futureWAR}
                      onChange={setFutureWAR}
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <ProjectionSummary
                      thresholds={projectionData.thresholds}
                      summary={projectionData.summary}
                    />
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                    <ProjectionChart points={projectionData.points} />
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                  Retired — projection not available
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <PlayerStatTable
                careerStats={data.careerStats}
                seasonStats={data.seasonStats}
                isPitcher={data.isPitcher}
              />
            </div>
          )}
        </div>
      </PageContainer>
    </>
  )
}
