import { useMemo } from 'react'
import { Badge } from '@/components/ui/Badge.tsx'
import { formatWAR } from '@/utils/stats-helpers.ts'
import { findComparableHOFPlayers } from '@/utils/hof-similarity.ts'
import type { ComparablePlayer, ComparisonDimension } from '@/utils/hof-similarity.ts'
import type { SeasonWAR, PositionCategory } from '@/types/index.ts'

interface ComparableHOFPlayersProps {
  warSeasons: SeasonWAR[]
  positionCategory: PositionCategory
  playerId: number
  isHallOfFamer?: boolean
}

function getBallotVariant(
  comp: ComparablePlayer,
): 'gold' | 'success' | 'info' | 'default' {
  const ballot = comp.ballotLabel
  if (ballot.startsWith('1st Ballot')) return 'gold'
  if (ballot.startsWith('2nd') || ballot.startsWith('3rd')) return 'success'
  if (ballot.includes('Committee') || ballot.includes('Special')) return 'default'
  return 'info'
}

function formatBallotLabel(comp: ComparablePlayer): string {
  if (comp.votePercentage != null) {
    return `${comp.ballotLabel} (${comp.votePercentage}%)`
  }
  return comp.ballotLabel
}

function formatDimensionValue(dim: ComparisonDimension): string {
  if (
    dim.label === 'Career Length' ||
    dim.label.includes('Seasons')
  ) {
    return String(Math.round(dim.playerValue))
  }
  return formatWAR(dim.playerValue)
}

function formatHofValue(dim: ComparisonDimension): string {
  if (
    dim.label === 'Career Length' ||
    dim.label.includes('Seasons')
  ) {
    return String(Math.round(dim.hofValue))
  }
  return formatWAR(dim.hofValue)
}

function DimensionRow({
  dim,
  showDeficit,
}: {
  dim: ComparisonDimension
  showDeficit?: boolean
}) {
  const deficit = dim.hofValue - dim.playerValue

  return (
    <div className="flex items-center justify-between gap-2 py-0.5">
      <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
        {dim.label}
      </span>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
          {formatDimensionValue(dim)}
        </span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          vs {formatHofValue(dim)}
        </span>
        {showDeficit && deficit > 0 && (
          <span className="text-[10px] font-medium text-orange-500">
            {dim.label === 'Career Length' || dim.label.includes('Seasons')
              ? `-${Math.round(deficit)}`
              : `-${formatWAR(deficit)}`}
          </span>
        )}
      </div>
    </div>
  )
}

function ComparableCard({
  comp,
  isHallOfFamer,
}: {
  comp: ComparablePlayer
  isHallOfFamer: boolean
}) {
  const closeDimensions = comp.dimensions.filter((d) => d.status === 'close')

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {comp.playerName}
          </div>
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            {comp.positionCategory} &middot; Inducted {comp.inductionYear}
          </div>
        </div>
        <Badge
          variant="info"
          className="shrink-0 text-[10px]"
        >
          {comp.similarityScore}% Match
        </Badge>
      </div>

      {/* Ballot Badge */}
      <div className="mb-3">
        <Badge variant={getBallotVariant(comp)} className="text-[10px]">
          {formatBallotLabel(comp)}
        </Badge>
      </div>

      {/* Where Similar */}
      {comp.strengths.length > 0 && (
        <div className="mb-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Where Similar
          </div>
          <div className="space-y-0.5">
            {comp.strengths.map((dim) => (
              <DimensionRow key={dim.label} dim={dim} />
            ))}
          </div>
        </div>
      )}

      {/* Close (optional — show if there are no strengths or gaps to fill space) */}
      {closeDimensions.length > 0 && comp.strengths.length < 3 && (
        <div className="mb-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
            Getting Close
          </div>
          <div className="space-y-0.5">
            {closeDimensions.slice(0, 2).map((dim) => (
              <DimensionRow key={dim.label} dim={dim} showDeficit />
            ))}
          </div>
        </div>
      )}

      {/* Needs Work / Key Differences */}
      {comp.gaps.length > 0 && (
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
            {isHallOfFamer ? 'Key Differences' : 'Needs Work'}
          </div>
          <div className="space-y-0.5">
            {comp.gaps.map((dim) => (
              <DimensionRow key={dim.label} dim={dim} showDeficit />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ComparableHOFPlayers({
  warSeasons,
  positionCategory,
  playerId,
  isHallOfFamer = false,
}: ComparableHOFPlayersProps) {
  const result = useMemo(() => {
    if (warSeasons.length === 0) return null
    return findComparableHOFPlayers(warSeasons, positionCategory, playerId)
  }, [warSeasons, positionCategory, playerId])

  if (!result || result.comparables.length === 0) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {isHallOfFamer
          ? 'Most Similar Hall of Famers'
          : 'Comparable Hall of Famers'}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {result.comparables.map((comp) => (
          <ComparableCard
            key={comp.playerId}
            comp={comp}
            isHallOfFamer={isHallOfFamer}
          />
        ))}
      </div>
    </div>
  )
}
