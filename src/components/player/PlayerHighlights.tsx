import { useState, useEffect } from 'react'
import {
  searchYouTubeVideo,
  getCachedVideo,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
  isYouTubeAPIConfigured,
  type YouTubeSearchResult,
} from '@/services/youtube-api.ts'

interface PlayerHighlightsProps {
  playerName: string
}

/**
 * Generate a search query for player career highlights
 */
function generatePlayerHighlightQuery(playerName: string): string {
  return `${playerName} MLB career highlights`
}

export function PlayerHighlights({ playerName }: PlayerHighlightsProps) {
  const [video, setVideo] = useState<YouTubeSearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const searchQuery = generatePlayerHighlightQuery(playerName)
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`

  useEffect(() => {
    let cancelled = false

    async function fetchVideo() {
      // Check cache first
      const cached = getCachedVideo(searchQuery)
      if (cached !== undefined) {
        if (cached) {
          setVideo(cached)
        } else {
          setNotFound(true)
        }
        setIsLoading(false)
        return
      }

      // If API not configured, show fallback
      if (!isYouTubeAPIConfigured()) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        const result = await searchYouTubeVideo(searchQuery)
        if (cancelled) return

        if (result) {
          setVideo(result)
        } else {
          setNotFound(true)
        }
      } catch {
        // On error, just show fallback
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchVideo()
    return () => {
      cancelled = true
    }
  }, [searchQuery])

  // Don't render if confirmed no video found
  if (notFound) {
    return null
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Career Highlights
        </h3>
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
        </div>
      </div>
    )
  }

  // If we have a video, show embedded player
  if (video) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Career Highlights
          </h3>
          <a
            href={getYouTubeWatchUrl(video.videoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
          >
            Watch on YouTube
          </a>
        </div>
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={getYouTubeEmbedUrl(video.videoId)}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        </div>
        <p className="mt-3 truncate text-xs text-gray-500 dark:text-gray-400" title={video.title}>
          {video.title}
        </p>
      </div>
    )
  }

  // Fallback: show search link (when API not configured)
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Career Highlights
      </h3>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
          <svg className="h-8 w-8 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Watch {playerName}'s career highlights
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Search on YouTube
        </a>
      </div>
    </div>
  )
}
