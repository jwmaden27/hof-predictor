import { useChartTheme } from '@/hooks/useChartTheme.ts'

interface SemiCircleGaugeProps {
  /** 0–100 fill percentage */
  percentage: number
  /** Color of the filled arc */
  color: string
  /** Large center label (e.g., "75.8" or "50%") */
  label: string
  /** Small subtitle below the label */
  subtitle: string
}

const WIDTH = 200
const HEIGHT = 112
const CX = WIDTH / 2
const CY = HEIGHT - 6
const OUTER_R = 88
const INNER_R = 54
const STROKE_WIDTH = OUTER_R - INNER_R
const R = (OUTER_R + INNER_R) / 2
const CIRCUMFERENCE = Math.PI * R // half-circle

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const startRad = (startAngle * Math.PI) / 180
  const endRad = (endAngle * Math.PI) / 180
  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

export function SemiCircleGauge({
  percentage,
  color,
  label,
  subtitle,
}: SemiCircleGaugeProps) {
  const chartTheme = useChartTheme()
  const clamped = Math.max(0, Math.min(100, percentage))
  const filledLength = (clamped / 100) * CIRCUMFERENCE
  const emptyLength = CIRCUMFERENCE - filledLength

  // Arc from 180° (left) to 0° (right), i.e., a top-facing semicircle
  const arcPath = describeArc(CX, CY, R, 180, 0)

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block"
    >
      {/* Background arc */}
      <path
        d={arcPath}
        fill="none"
        stroke={chartTheme.emptyGaugeFill}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
      />
      {/* Filled arc */}
      {clamped > 0 && (
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${emptyLength}`}
        />
      )}
      {/* Center label */}
      <text
        x={CX}
        y={CY - 18}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[28px] font-bold"
        fill={color}
      >
        {label}
      </text>
      {/* Subtitle */}
      <text
        x={CX}
        y={CY - 0}
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px]"
        fill={chartTheme.axisTickColor}
      >
        {subtitle}
      </text>
    </svg>
  )
}
