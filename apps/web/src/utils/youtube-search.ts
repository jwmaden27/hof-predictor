/**
 * Utility functions for YouTube video search and embedding
 */

/**
 * Generate a YouTube search query for MLB game highlights
 * Searches for game highlights (team vs team) rather than player-specific
 */
export function generateGameHighlightSearchQuery(
  opponent: string,
  date: string,
  isHome: boolean,
  playerTeam?: string,
): string {
  const gameDate = new Date(date)
  const year = gameDate.getFullYear()
  const month = gameDate.toLocaleDateString('en-US', { month: 'long' })
  const day = gameDate.getDate()

  // If we have the player's team, use it for a more specific search
  if (playerTeam) {
    // Format: "Team vs Opponent Month Day Year highlights" or "Opponent vs Team" for away games
    const homeTeam = isHome ? playerTeam : opponent
    const awayTeam = isHome ? opponent : playerTeam
    return `${awayTeam} vs ${homeTeam} ${month} ${day} ${year} MLB highlights`
  }

  // Fallback: just use opponent and date
  return `${opponent} ${month} ${day} ${year} MLB game highlights`
}

/**
 * Generate a YouTube search URL
 */
export function getYouTubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

/**
 * Generate a YouTube embed URL for search results
 * Uses YouTube's embed with search parameter
 */
export function getYouTubeEmbedSearchUrl(query: string): string {
  // YouTube doesn't support direct search embeds, so we'll use a workaround
  // by searching for the first result programmatically or linking to search
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`
}
