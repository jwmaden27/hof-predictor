import type { HOFPositionalAverage, PositionCategory } from '@/types/index.ts'

export const HOF_AVERAGES: Record<PositionCategory, HOFPositionalAverage> = {
  C:    { position: 'C',  careerWAR: 53.6, peakWAR: 34.9, jaws: 44.3 },
  '1B': { position: '1B', careerWAR: 65.0, peakWAR: 41.8, jaws: 53.4 },
  '2B': { position: '2B', careerWAR: 69.6, peakWAR: 44.4, jaws: 57.0 },
  '3B': { position: '3B', careerWAR: 69.4, peakWAR: 43.3, jaws: 56.3 },
  SS:   { position: 'SS', careerWAR: 67.7, peakWAR: 43.2, jaws: 55.4 },
  LF:   { position: 'LF', careerWAR: 65.5, peakWAR: 41.6, jaws: 53.6 },
  CF:   { position: 'CF', careerWAR: 71.7, peakWAR: 44.7, jaws: 58.2 },
  RF:   { position: 'RF', careerWAR: 71.1, peakWAR: 42.4, jaws: 56.7 },
  SP:   { position: 'SP', careerWAR: 73.0, peakWAR: 49.9, jaws: 61.4 },
  RP:   { position: 'RP', careerWAR: 35.8, peakWAR: 23.6, jaws: 30.1 },
}

export const POSITION_LABELS: Record<PositionCategory, string> = {
  C: 'Catcher',
  '1B': 'First Base',
  '2B': 'Second Base',
  '3B': 'Third Base',
  SS: 'Shortstop',
  LF: 'Left Field',
  CF: 'Center Field',
  RF: 'Right Field',
  SP: 'Starting Pitcher',
  RP: 'Relief Pitcher',
}

export const ALL_POSITIONS: PositionCategory[] = [
  'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'SP', 'RP',
]
