/**
 * Utility functions for YouTube video search and embedding
 */

/**
 * Generate a YouTube search query for MLB game highlights
 */
export function generateGameHighlightSearchQuery(
  playerName: string,
  opponent: string,
  date: string,
  isHome: boolean,
): string {
  const gameDate = new Date(date)
  const year = gameDate.getFullYear()
  const month = gameDate.toLocaleDateString('en-US', { month: 'long' })
  const day = gameDate.getDate()

  // Create a search-friendly query
  // Format: "Player Name highlights vs Opponent Month Day Year"
  const vsAt = isHome ? 'vs' : '@'
  return `${playerName} highlights ${vsAt} ${opponent} ${month} ${day} ${year} MLB`
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
