export interface BallotPrediction {
  ballot: string
  description: string
  predictedVotePct: number
}

/**
 * Anchor points for piecewise linear interpolation from HOF Score → probability %.
 * Based on historical HOF voting patterns and JAWS analysis.
 */
const PROBABILITY_ANCHORS: [number, number][] = [
  [0, 0],
  [20, 1],
  [30, 2],
  [40, 5],
  [50, 15],
  [60, 30],
  [70, 50],
  [80, 75],
  [90, 95],
  [95, 99],
  [100, 99],
]

/**
 * Piecewise linear interpolation between anchor points.
 */
function interpolate(score: number, anchors: [number, number][]): number {
  if (score <= anchors[0][0]) return anchors[0][1]
  if (score >= anchors[anchors.length - 1][0]) return anchors[anchors.length - 1][1]

  for (let i = 0; i < anchors.length - 1; i++) {
    const [x0, y0] = anchors[i]
    const [x1, y1] = anchors[i + 1]
    if (score >= x0 && score <= x1) {
      const t = (score - x0) / (x1 - x0)
      return y0 + t * (y1 - y0)
    }
  }

  return 0
}

/**
 * Calculates HOF probability as a percentage (0–99) based on the player's HOF Score.
 * Uses piecewise linear interpolation between historical anchor points.
 */
export function calculateHOFProbability(score: number): number {
  const raw = interpolate(score, PROBABILITY_ANCHORS)
  return Math.round(raw * 10) / 10
}

/**
 * Anchor points for HOF Score → predicted peak BBWAA vote percentage.
 * Based on historical voting patterns: first-ballot locks get 90%+,
 * borderline HOFers peak around 50-75%, long-shots peak under 10%.
 */
const VOTE_PCT_ANCHORS: [number, number][] = [
  [0, 0],
  [20, 1],
  [30, 3],
  [40, 5],
  [50, 15],
  [60, 35],
  [70, 55],
  [80, 75],
  [90, 90],
  [95, 97],
  [100, 99],
]

/**
 * Calculates the predicted peak BBWAA vote percentage based on HOF Score.
 */
export function predictVotePercentage(score: number): number {
  const raw = interpolate(score, VOTE_PCT_ANCHORS)
  return Math.round(raw * 10) / 10
}

/**
 * Predicts which ballot a player would likely be elected on,
 * based on their HOF Score and historical precedent.
 */
export function predictBallot(score: number): BallotPrediction {
  const predictedVotePct = predictVotePercentage(score)

  if (score >= 95) {
    return {
      ballot: 'First Ballot',
      description:
        'Players with this profile have historically been elected on their first ballot with near-unanimous support.',
      predictedVotePct,
    }
  }
  if (score >= 90) {
    return {
      ballot: 'First Ballot',
      description:
        'Players with this profile have historically been elected on their first ballot.',
      predictedVotePct,
    }
  }
  if (score >= 80) {
    return {
      ballot: '1st–3rd Ballot',
      description:
        'Players with similar profiles have typically been elected within their first three appearances on the ballot.',
      predictedVotePct,
    }
  }
  if (score >= 70) {
    return {
      ballot: '3rd–6th Ballot',
      description:
        'Players with similar profiles often need several ballot appearances before gaining enough support for election.',
      predictedVotePct,
    }
  }
  if (score >= 60) {
    return {
      ballot: '6th–10th Ballot / Committee',
      description:
        'Players in this range frequently require extended time on the ballot or election through the Veterans Committee.',
      predictedVotePct,
    }
  }
  if (score >= 50) {
    return {
      ballot: 'Veterans Committee',
      description:
        'Players with this profile are most likely to reach the Hall of Fame through the Veterans Committee rather than the writers\' ballot.',
      predictedVotePct,
    }
  }
  return {
    ballot: 'Unlikely',
    description:
      'Players with this profile are unlikely to be elected to the Hall of Fame based on historical voting patterns.',
    predictedVotePct,
  }
}
