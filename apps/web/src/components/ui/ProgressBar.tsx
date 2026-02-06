import { getScoreColor } from '@/utils/stats-helpers.ts'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: string
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const barColor = color ?? getScoreColor(value)

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && <span className="text-gray-600 dark:text-gray-400">{label}</span>}
          {showValue && (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {value.toFixed(1)}
              {max !== 100 && ` / ${max}`}
            </span>
          )}
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  )
}
