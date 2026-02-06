/**
 * YouTube Data API v3 service for searching and embedding videos
 *
 * To enable YouTube video embedding:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select an existing one
 * 3. Enable the YouTube Data API v3
 * 4. Create an API key (Credentials > Create Credentials > API Key)
 * 5. Add the key to your .env file as VITE_YOUTUBE_API_KEY
 */

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined
const YOUTUBE_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search'
const LOCALSTORAGE_KEY = 'youtube-video-cache'

export interface YouTubeSearchResult {
  videoId: string
  title: string
  channelTitle: string
  thumbnail: string
}

interface YouTubeAPIResponse {
  items?: Array<{
    id: {
      videoId: string
    }
    snippet: {
      title: string
      channelTitle: string
      thumbnails: {
        medium: {
          url: string
        }
      }
    }
  }>
}

// Cache entry can be a result or explicitly null (meaning no video found)
interface CacheEntry {
  result: YouTubeSearchResult | null
  timestamp: number
}

interface LocalStorageCache {
  [query: string]: CacheEntry
}

/**
 * Load cache from localStorage
 */
function loadCache(): LocalStorageCache {
  try {
    const cached = localStorage.getItem(LOCALSTORAGE_KEY)
    if (cached) {
      return JSON.parse(cached)
    }
  } catch {
    // Ignore parse errors
  }
  return {}
}

/**
 * Save cache to localStorage
 */
function saveCache(cache: LocalStorageCache): void {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cache))
  } catch {
    // Ignore storage errors (quota exceeded, etc.)
  }
}

/**
 * Get a cached result (returns undefined if not cached)
 */
export function getCachedVideo(query: string): YouTubeSearchResult | null | undefined {
  const cache = loadCache()
  const entry = cache[query]
  if (entry) {
    // Cache entries are permanent - once we find (or don't find) a video, it won't change
    return entry.result
  }
  return undefined // undefined means not cached yet
}

/**
 * Check if YouTube API is configured
 */
export function isYouTubeAPIConfigured(): boolean {
  return Boolean(YOUTUBE_API_KEY)
}

/**
 * Search YouTube for the best matching video and return the top result
 * Results are cached permanently in localStorage
 */
export async function searchYouTubeVideo(query: string): Promise<YouTubeSearchResult | null> {
  // Check localStorage cache first
  const cached = getCachedVideo(query)
  if (cached !== undefined) {
    return cached
  }

  if (!YOUTUBE_API_KEY) {
    return null
  }

  try {
    const params = new URLSearchParams({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: '1',
      key: YOUTUBE_API_KEY,
    })

    const response = await fetch(`${YOUTUBE_SEARCH_API}?${params}`)

    if (!response.ok) {
      console.warn('YouTube API error:', response.status)
      return null
    }

    const data: YouTubeAPIResponse = await response.json()

    const cache = loadCache()

    if (!data.items || data.items.length === 0) {
      // Cache the "no result" so we don't keep searching
      cache[query] = { result: null, timestamp: Date.now() }
      saveCache(cache)
      return null
    }

    const item = data.items[0]
    const result: YouTubeSearchResult = {
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
    }

    // Cache the result permanently
    cache[query] = { result, timestamp: Date.now() }
    saveCache(cache)

    return result
  } catch (error) {
    console.warn('YouTube API fetch error:', error)
    return null
  }
}

/**
 * Get YouTube embed URL for a video ID
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Get YouTube watch URL for a video ID
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}
