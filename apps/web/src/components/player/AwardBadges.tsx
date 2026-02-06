import type { Award } from '@/types/index.ts'
import { Badge } from '@/components/ui/Badge.tsx'

interface AwardBadgesProps {
  awards: Award[]
}

interface AwardGroup {
  label: string
  ids: string[]
  variant: 'gold' | 'info' | 'success' | 'warning' | 'default'
}

const AWARD_GROUPS: AwardGroup[] = [
  { label: 'MVP', ids: ['ALMVP', 'NLMVP'], variant: 'gold' },
  { label: 'Cy Young', ids: ['ALCY', 'NLCY', 'MLBCY'], variant: 'gold' },
  { label: 'All-Star', ids: ['ALAS', 'NLAS'], variant: 'info' },
  { label: 'Gold Glove', ids: ['ALGG', 'NLGG', 'MLGG'], variant: 'warning' },
  { label: 'Silver Slugger', ids: ['ALSS', 'NLSS'], variant: 'default' },
  { label: 'ROY', ids: ['ALROY', 'NLROY'], variant: 'success' },
]

export function AwardBadges({ awards }: AwardBadgesProps) {
  const groupedAwards = AWARD_GROUPS.map((group) => {
    const count = awards.filter((a) => group.ids.includes(a.id)).length
    return { ...group, count }
  }).filter((g) => g.count > 0)

  if (groupedAwards.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">No major awards</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {groupedAwards.map((group) => (
        <Badge key={group.label} variant={group.variant}>
          {group.count}x {group.label}
        </Badge>
      ))}
    </div>
  )
}
