export interface HOFScore {
  overall: number
  jawsComponent: number
  awardsComponent: number
  milestonesComponent: number
  trajectoryComponent: number
  breakdown: ScoringBreakdown
  tier: HOFTier
}

export type HOFTier =
  | 'Hall of Famer'
  | 'First Ballot Lock'
  | 'Strong Candidate'
  | 'Solid Candidate'
  | 'Borderline'
  | 'Unlikely'
  | 'Not HOF Caliber'

export interface ScoringBreakdown {
  jawsRatio: number
  mvpCount: number
  cyYoungCount: number
  allStarCount: number
  goldGloveCount: number
  silverSluggerCount: number
  milestoneHits: string[]
  peakSeasonsAbove5WAR: number
  careerLengthYears: number
}

export interface ProjectionPoint {
  year: number
  projectedJAWS: number
  projectedScore: number
  tier: HOFTier
}
