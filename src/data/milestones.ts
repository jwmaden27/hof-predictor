export interface Milestone {
  label: string
  statKey: string
  threshold: number
  playerType: 'hitter' | 'pitcher'
  hofWeight: number
  hofAverage: number
}

export const MILESTONES: Milestone[] = [
  { label: '3,000 Hits', statKey: 'hits', threshold: 3000, playerType: 'hitter', hofWeight: 1.0, hofAverage: 2153 },
  { label: '600 Home Runs', statKey: 'homeRuns', threshold: 600, playerType: 'hitter', hofWeight: 1.0, hofAverage: 270 },
  { label: '500 Home Runs', statKey: 'homeRuns', threshold: 500, playerType: 'hitter', hofWeight: 0.95, hofAverage: 270 },
  { label: '2,000 RBI', statKey: 'rbi', threshold: 2000, playerType: 'hitter', hofWeight: 0.7, hofAverage: 1261 },
  { label: '1,500 RBI', statKey: 'rbi', threshold: 1500, playerType: 'hitter', hofWeight: 0.4, hofAverage: 1261 },
  { label: '300 Wins', statKey: 'wins', threshold: 300, playerType: 'pitcher', hofWeight: 1.0, hofAverage: 223 },
  { label: '3,000 Strikeouts', statKey: 'strikeOuts', threshold: 3000, playerType: 'pitcher', hofWeight: 0.85, hofAverage: 2217 },
  { label: '250 Wins', statKey: 'wins', threshold: 250, playerType: 'pitcher', hofWeight: 0.6, hofAverage: 223 },
  { label: '200 Wins', statKey: 'wins', threshold: 200, playerType: 'pitcher', hofWeight: 0.3, hofAverage: 223 },
  { label: '500 Saves', statKey: 'saves', threshold: 500, playerType: 'pitcher', hofWeight: 0.7, hofAverage: 216 },
  { label: '2,000 Strikeouts', statKey: 'strikeOuts', threshold: 2000, playerType: 'pitcher', hofWeight: 0.4, hofAverage: 2217 },
]
