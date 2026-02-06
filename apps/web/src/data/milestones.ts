export interface Milestone {
  label: string
  statKey: string
  threshold: number
  playerType: 'hitter' | 'sp' | 'rp'
  hofWeight: number
  hofAverage: number
  /** If true, this is a rate stat (avg, OBP, ERA, WHIP) — displayed as a decimal, not a counting number */
  isRate?: boolean
  /** For rate stats: the lower bound of the display range */
  rateFloor?: number
  /** For rate stats where lower is better (ERA, WHIP) */
  lowerIsBetter?: boolean
  /** For milestones that only apply to players debuting before a certain year */
  maxDebutYear?: number
  /** For milestones that only apply to players debuting on or after a certain year */
  minDebutYear?: number
}

export const MILESTONES: Milestone[] = [
  // Hitter counting stats
  { label: '3,000 Hits', statKey: 'hits', threshold: 3000, playerType: 'hitter', hofWeight: 1.0, hofAverage: 2153 },
  { label: '500 Home Runs', statKey: 'homeRuns', threshold: 500, playerType: 'hitter', hofWeight: 0.95, hofAverage: 270 },
  { label: '2,000 RBI', statKey: 'rbi', threshold: 2000, playerType: 'hitter', hofWeight: 0.7, hofAverage: 1261 },
  // Hitter rate / career stats
  { label: '.300 Career AVG', statKey: 'avg', threshold: 0.300, playerType: 'hitter', hofWeight: 0.7, hofAverage: 0.276, isRate: true, rateFloor: 0.200 },
  { label: '.370 Career OBP', statKey: 'obp', threshold: 0.370, playerType: 'hitter', hofWeight: 0.7, hofAverage: 0.350, isRate: true, rateFloor: 0.280 },
  { label: '60 Career WAR', statKey: 'careerWAR', threshold: 60, playerType: 'hitter', hofWeight: 0.8, hofAverage: 66.5 },
  // Starting Pitcher milestones
  { label: '300 Wins', statKey: 'wins', threshold: 300, playerType: 'sp', hofWeight: 1.0, hofAverage: 223 },
  { label: '250 Wins', statKey: 'wins', threshold: 250, playerType: 'sp', hofWeight: 0.7, hofAverage: 223 },
  { label: '3,000 Strikeouts', statKey: 'strikeOuts', threshold: 3000, playerType: 'sp', hofWeight: 0.85, hofAverage: 2217 },
  { label: '2,500 Strikeouts', statKey: 'strikeOuts', threshold: 2500, playerType: 'sp', hofWeight: 0.6, hofAverage: 2217 },
  { label: '3.00 Career ERA', statKey: 'era', threshold: 3.00, playerType: 'sp', hofWeight: 0.7, hofAverage: 3.15, isRate: true, rateFloor: 2.00, lowerIsBetter: true },
  { label: '1.18 Career WHIP', statKey: 'whip', threshold: 1.18, playerType: 'sp', hofWeight: 0.6, hofAverage: 1.22, isRate: true, rateFloor: 0.90, lowerIsBetter: true },
  { label: '3,000 Innings', statKey: 'inningsPitched', threshold: 3000, playerType: 'sp', hofWeight: 0.5, hofAverage: 3200 },
  { label: '1,500 Innings', statKey: 'inningsPitched', threshold: 1500, playerType: 'sp', hofWeight: 0.3, hofAverage: 3200 },
  // Relief Pitcher milestones - saves for pre-2018 debut, holds for 2018+ debut
  // HOF RP average saves: 414, 20% above = 496
  { label: '496 Saves', statKey: 'saves', threshold: 496, playerType: 'rp', hofWeight: 1.0, hofAverage: 414, maxDebutYear: 2017 },
  { label: '300 Saves', statKey: 'saves', threshold: 300, playerType: 'rp', hofWeight: 0.6, hofAverage: 414, maxDebutYear: 2017 },
  // Holds milestones for modern relievers (2018+ debut) - career leader ~246
  { label: '200 Holds', statKey: 'holds', threshold: 200, playerType: 'rp', hofWeight: 1.0, hofAverage: 150, minDebutYear: 2018 },
  { label: '100 Holds', statKey: 'holds', threshold: 100, playerType: 'rp', hofWeight: 0.6, hofAverage: 150, minDebutYear: 2018 },
]
