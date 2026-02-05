import { useTheme } from '@/hooks/useTheme.ts'

export interface ChartThemeColors {
  gridStroke: string
  axisTickColor: string
  tooltipBg: string
  tooltipBorder: string
  tooltipTextColor: string
  referenceLineStroke: string
  emptyGaugeFill: string
  surfaceBg: string
}

export const useChartTheme = (): ChartThemeColors => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return {
    gridStroke: isDark ? '#374151' : '#e5e7eb',
    axisTickColor: isDark ? '#9ca3af' : '#6b7280',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipBorder: isDark ? '#374151' : '#e5e7eb',
    tooltipTextColor: isDark ? '#f3f4f6' : '#111827',
    referenceLineStroke: isDark ? '#6b7280' : '#9ca3af',
    emptyGaugeFill: isDark ? '#374151' : '#f3f4f6',
    surfaceBg: isDark ? '#111827' : '#ffffff',
  }
}
