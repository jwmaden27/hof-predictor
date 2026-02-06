export interface NHLMilestone {
  label: string
  statKey: string
  threshold: number
  playerType: 'skater' | 'goalie'
  hofWeight: number
  hofAverage: number
  /** If true, this is a rate stat (GAA, SV%) -- displayed as a decimal, not a counting number */
  isRate?: boolean
  /** For rate stats: the lower bound of the display range */
  rateFloor?: number
  /** For rate stats where lower is better (GAA) */
  lowerIsBetter?: boolean
}

export const NHL_MILESTONES: NHLMilestone[] = [
  // Skater counting stats — hofAverage from real HHOF median (weighted across C/LW/RW/D)
  { label: '500 Goals', statKey: 'goals', threshold: 500, playerType: 'skater', hofWeight: 1.0, hofAverage: 490 },
  { label: '600 Goals', statKey: 'goals', threshold: 600, playerType: 'skater', hofWeight: 0.7, hofAverage: 490 },
  { label: '1,000 Points', statKey: 'points', threshold: 1000, playerType: 'skater', hofWeight: 0.95, hofAverage: 1169 },
  { label: '1,500 Points', statKey: 'points', threshold: 1500, playerType: 'skater', hofWeight: 0.6, hofAverage: 1169 },
  { label: '500 Assists', statKey: 'assists', threshold: 500, playerType: 'skater', hofWeight: 0.7, hofAverage: 698 },
  { label: '1,000 Assists', statKey: 'assists', threshold: 1000, playerType: 'skater', hofWeight: 0.5, hofAverage: 698 },
  { label: '1,500 Games', statKey: 'gamesPlayed', threshold: 1500, playerType: 'skater', hofWeight: 0.5, hofAverage: 1239 },
  { label: '100 PPG', statKey: 'powerPlayGoals', threshold: 100, playerType: 'skater', hofWeight: 0.4, hofAverage: 138 },

  // Goalie milestones — hofAverage from real HHOF goalie medians
  { label: '400 Wins', statKey: 'wins', threshold: 400, playerType: 'goalie', hofWeight: 1.0, hofAverage: 407 },
  { label: '300 Wins', statKey: 'wins', threshold: 300, playerType: 'goalie', hofWeight: 0.7, hofAverage: 407 },
  { label: '2.50 GAA', statKey: 'goalsAgainstAvg', threshold: 2.50, playerType: 'goalie', hofWeight: 0.7, hofAverage: 2.52, isRate: true, rateFloor: 1.50, lowerIsBetter: true },
  { label: '.915 SV%', statKey: 'savePctg', threshold: 0.915, playerType: 'goalie', hofWeight: 0.7, hofAverage: 0.910, isRate: true, rateFloor: 0.880 },
  { label: '60 Shutouts', statKey: 'shutouts', threshold: 60, playerType: 'goalie', hofWeight: 0.8, hofAverage: 66 },
]
