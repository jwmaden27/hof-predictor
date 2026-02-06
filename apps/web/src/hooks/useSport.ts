import { useParams } from 'react-router-dom'

export type Sport = 'mlb' | 'nhl'

export interface SportConfig {
  id: Sport
  name: string
  fullName: string
  hallName: string
}

export const SPORTS: Record<Sport, SportConfig> = {
  mlb: {
    id: 'mlb',
    name: 'MLB',
    fullName: 'Major League Baseball',
    hallName: 'Baseball Hall of Fame',
  },
  nhl: {
    id: 'nhl',
    name: 'NHL',
    fullName: 'National Hockey League',
    hallName: 'Hockey Hall of Fame',
  },
}

export function useSport(): SportConfig {
  const { sport } = useParams<{ sport: string }>()
  const sportKey = sport === 'nhl' ? 'nhl' : 'mlb'
  return SPORTS[sportKey]
}

export function useSportPrefix(): string {
  const sport = useSport()
  return `/${sport.id}`
}
