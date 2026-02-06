import { useState, useEffect } from 'react'
import {
  searchYouTubeVideo,
  getCachedVideo,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
  isYouTubeAPIConfigured,
  type YouTubeSearchResult,
} from '@/services/youtube-api.ts'

interface YouTubeEmbedProps {
  searchQuery: string
  onClose: () => void
}

export function YouTubeEmbed({ searchQuery, onClose }: YouTubeEmbedProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`

  useEffect(() => {
    let cancelled = false

    async function fetchVideo() {
      // Check cache first for instant display
      const cached = getCachedVideo(searchQuery)
      if (cached !== undefined) {
        if (cached) {
          setVideoId(cached.videoId)
          setVideoTitle(cached.title)
        }
        setIsLoading(false)
        return
      }

      // If API is not configured, skip to fallback immediately
      if (!isYouTubeAPIConfigured()) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(false)

      try {
        const result = await searchYouTubeVideo(searchQuery)
        if (cancelled) return

        if (result) {
          setVideoId(result.videoId)
          setVideoTitle(result.title)
        }
      } catch {
        if (!cancelled) {
          setError(true)
        }
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

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 dark:bg-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Game Highlights
          </span>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-red-600" />
        </div>
      </div>
    )
  }

  // If we have a video ID, show the embedded player
  if (videoId) {
    return (
      <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-black dark:border-gray-700">
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 dark:bg-gray-800">
          <span className="max-w-[70%] truncate text-xs text-gray-600 dark:text-gray-300" title={videoTitle || undefined}>
            {videoTitle || 'Game Highlights'}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={getYouTubeWatchUrl(videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              Open in YouTube
            </a>
            <button
              onClick={onClose}
              className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Close video"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative aspect-video w-full">
          <iframe
            src={getYouTubeEmbedUrl(videoId)}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={videoTitle || 'YouTube video player'}
          />
        </div>
      </div>
    )
  }

  // Fallback: show search link (when API not configured or no results)
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between bg-gray-100 px-3 py-2 dark:bg-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Game Highlights
        </span>
        <button
          onClick={onClose}
          className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-gray-300"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-8">
        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
          <svg className="h-8 w-8 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </div>
        {error ? (
          <p className="mb-2 text-center text-sm text-red-600 dark:text-red-400">
            Unable to load video
          </p>
        ) : (
          <p className="mb-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Search YouTube for game highlights
          </p>
        )}
        <p className="mb-4 max-w-sm text-center text-xs text-gray-500 dark:text-gray-400">
          "{searchQuery}"
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
          Watch on YouTube
        </a>
      </div>
    </div>
  )
}

interface VideoIconButtonProps {
  onClick: () => void
  isActive: boolean
}

export function VideoIconButton({ onClick, isActive }: VideoIconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded p-1.5 transition-colors ${
        isActive
          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
          : 'text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-400'
      }`}
      title="Watch game highlights"
      aria-label="Watch game highlights on YouTube"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </button>
  )
}

/**
 * Hook to check video availability for a search query
 * Returns: { isAvailable, isLoading, videoData }
 * - isAvailable: true if video found, false if confirmed no video, null if unknown/loading
 * - isLoading: true while fetching
 * - videoData: the cached video data if available
 */
export function useVideoAvailability(searchQuery: string | null): {
  isAvailable: boolean | null
  isLoading: boolean
  videoData: YouTubeSearchResult | null
} {
  const [isLoading, setIsLoading] = useState(false)
  const [videoData, setVideoData] = useState<YouTubeSearchResult | null>(null)
  const [checkedQuery, setCheckedQuery] = useState<string | null>(null)

  useEffect(() => {
    if (!searchQuery) {
      setVideoData(null)
      setIsLoading(false)
      return
    }

    // Check cache first
    const cached = getCachedVideo(searchQuery)
    if (cached !== undefined) {
      setVideoData(cached)
      setCheckedQuery(searchQuery)
      setIsLoading(false)
      return
    }

    // If not cached and API is configured, fetch in background
    if (isYouTubeAPIConfigured()) {
      let cancelled = false
      setIsLoading(true)

      searchYouTubeVideo(searchQuery).then((result) => {
        if (!cancelled) {
          setVideoData(result)
          setCheckedQuery(searchQuery)
          setIsLoading(false)
        }
      }).catch(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

      return () => {
        cancelled = true
      }
    } else {
      // No API configured - assume video might be available (show icon, search on click)
      setVideoData(null)
      setCheckedQuery(null)
      setIsLoading(false)
    }
  }, [searchQuery])

  // Determine availability
  let isAvailable: boolean | null = null
  if (checkedQuery === searchQuery) {
    // We've checked this query - videoData being null means no video found
    isAvailable = videoData !== null
  } else if (!isYouTubeAPIConfigured()) {
    // No API - assume available (will show search fallback)
    isAvailable = true
  }

  return { isAvailable, isLoading, videoData }
}

/**
 * Check if a game date is within the range where YouTube highlights exist
 * MLB started consistently posting game highlights around 2015
 */
export function isVideoDateEligible(gameDate: string): boolean {
  const date = new Date(gameDate)
  const year = date.getFullYear()
  return year >= 2015
}
