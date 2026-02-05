import warDataRaw from '@/data/war-data.json'
import type { PlayerWARData, SeasonWAR } from '@/types/index.ts'

const warData = warDataRaw as PlayerWARData[]

const warIndex = new Map<number, PlayerWARData>(
  warData.map((player) => [player.playerId, player]),
)

export function getPlayerWAR(playerId: number): PlayerWARData | null {
  return warIndex.get(playerId) ?? null
}

export function getPlayerSeasonWARs(playerId: number): SeasonWAR[] {
  return warIndex.get(playerId)?.seasons ?? []
}

export function getAllPlayersWithWAR(): PlayerWARData[] {
  return warData
}

export function getPlayerCareerWARTotal(playerId: number): number {
  return warIndex.get(playerId)?.careerWAR ?? 0
}

export function hasWARData(playerId: number): boolean {
  return warIndex.has(playerId)
}

export function isHallOfFamer(playerId: number): boolean {
  return warIndex.get(playerId)?.isHOF === true
}
