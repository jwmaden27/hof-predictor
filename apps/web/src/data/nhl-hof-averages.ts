import type { NHLPositionCategory } from '@/types/nhl-player.ts'

export interface NHLHOFPositionalAverage {
  position: NHLPositionCategory
  careerPS: number  // Career Point Shares
  peakPS: number    // Peak 7 seasons Point Shares
  jaws: number      // (careerPS + peakPS) / 2
}

export const NHL_HOF_AVERAGES: Record<NHLPositionCategory, NHLHOFPositionalAverage> = {
  C:  { position: 'C',  careerPS: 119.0, peakPS: 74.0, jaws: 96.5 },
  LW: { position: 'LW', careerPS: 100.0, peakPS: 62.0, jaws: 81.0 },
  RW: { position: 'RW', careerPS: 98.0,  peakPS: 60.0, jaws: 79.0 },
  D:  { position: 'D',  careerPS: 95.0,  peakPS: 58.0, jaws: 76.5 },
  G:  { position: 'G',  careerPS: 85.0,  peakPS: 52.0, jaws: 68.5 },
}

export const NHL_POSITION_LABELS: Record<NHLPositionCategory, string> = {
  C: 'Center',
  LW: 'Left Wing',
  RW: 'Right Wing',
  D: 'Defenseman',
  G: 'Goaltender',
}

export const NHL_ALL_POSITIONS: NHLPositionCategory[] = ['C', 'LW', 'RW', 'D', 'G']
