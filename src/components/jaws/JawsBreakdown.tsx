import { formatWAR } from '@/utils/stats-helpers.ts'
import type { JAWSComparison } from '@/types/index.ts'

interface JawsBreakdownProps {
  comparison: JAWSComparison
}

export function JawsBreakdown({ comparison }: JawsBreakdownProps) {
  const { player, hofAverage } = comparison

  const rows = [
    {
      label: 'Career WAR',
      playerValue: player.careerWAR,
      hofValue: hofAverage.careerWAR,
      ratio: comparison.careerWARRatio,
    },
    {
      label: 'Peak WAR (7yr)',
      playerValue: player.peakWAR,
      hofValue: hofAverage.peakWAR,
      ratio: comparison.peakWARRatio,
    },
    {
      label: 'JAWS',
      playerValue: player.jaws,
      hofValue: hofAverage.jaws,
      ratio: comparison.jawsRatio,
    },
  ]

  return (
    <div className="space-y-4">
      {rows.map((row) => {
        const barWidth = Math.min((row.ratio) * 100, 150)
        const isAboveAvg = row.ratio >= 1

        return (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {formatWAR(row.playerValue)}
                </span>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatWAR(row.hofValue)} avg
                </span>
              </div>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              {/* HOF average marker */}
              <div
                className="absolute top-0 h-full w-0.5 bg-gray-400 dark:bg-gray-500"
                style={{ left: `${(1 / 1.5) * 100}%` }}
              />
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isAboveAvg ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                style={{ width: `${(barWidth / 150) * 100}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
