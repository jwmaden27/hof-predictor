import type { PositionCategory } from '@/types/index.ts'

const POSITION_CODE_MAP: Record<string, PositionCategory> = {
  '2': 'C',
  '3': '1B',
  '4': '2B',
  '5': '3B',
  '6': 'SS',
  '7': 'LF',
  '8': 'CF',
  '9': 'RF',
}

export function mapPositionToCategory(position: {
  code: string
  abbreviation: string
}): PositionCategory {
  if (position.code === '1') {
    return position.abbreviation === 'RP' || position.abbreviation === 'CP'
      ? 'RP'
      : 'SP'
  }
  if (position.code === '10') return '1B'
  return POSITION_CODE_MAP[position.code] ?? 'RF'
}

export function isPitcher(positionCode: string): boolean {
  return positionCode === '1'
}

export function getPlayerType(positionCode: string): 'hitter' | 'pitcher' {
  return isPitcher(positionCode) ? 'pitcher' : 'hitter'
}

export function formatAvg(avg: string): string {
  const num = parseFloat(avg)
  if (isNaN(num)) return avg
  return num.toFixed(3).replace(/^0/, '')
}

export function formatERA(era: string): string {
  const num = parseFloat(era)
  if (isNaN(num)) return era
  return num.toFixed(2)
}

export function formatWAR(war: number): string {
  return war.toFixed(1)
}

export function formatNumber(n: number): string {
  return n.toLocaleString()
}

export function formatIP(ip: string): string {
  return ip
}

export function getTierColor(tier: string): string {
  switch (tier) {
    case 'Hall of Famer':
      return 'text-indigo-500'
    case 'First Ballot Lock':
      return 'text-amber-500'
    case 'Strong Candidate':
      return 'text-emerald-500'
    case 'Solid Candidate':
      return 'text-blue-500'
    case 'Borderline':
      return 'text-yellow-500'
    case 'Unlikely':
      return 'text-orange-500'
    case 'Not HOF Caliber':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export function getTierBgColor(tier: string): string {
  switch (tier) {
    case 'Hall of Famer':
      return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30'
    case 'First Ballot Lock':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/30'
    case 'Strong Candidate':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
    case 'Solid Candidate':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/30'
    case 'Borderline':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
    case 'Unlikely':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/30'
    case 'Not HOF Caliber':
      return 'bg-red-500/10 text-red-500 border-red-500/30'
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/30'
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#f59e0b' // amber
  if (score >= 75) return '#10b981' // emerald
  if (score >= 60) return '#3b82f6' // blue
  if (score >= 45) return '#eab308' // yellow
  if (score >= 25) return '#f97316' // orange
  return '#ef4444' // red
}
