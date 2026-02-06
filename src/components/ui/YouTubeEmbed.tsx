interface YouTubeEmbedProps {
  searchQuery: string
  onClose: () => void
}

export function YouTubeEmbed({ searchQuery, onClose }: YouTubeEmbedProps) {
  // Use YouTube's playlist search embed feature
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}`

  // Fallback to regular YouTube search
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-black dark:border-gray-700">
      <div className="flex items-center justify-between bg-gray-100 px-3 py-2 dark:bg-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          YouTube Search Results
        </span>
        <div className="flex items-center gap-2">
          <a
            href={searchUrl}
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
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
    </div>
  )
}

interface VideoIconButtonProps {
  onClick: () => void
  isActive: boolean
  disabled?: boolean
}

export function VideoIconButton({ onClick, isActive, disabled = false }: VideoIconButtonProps) {
  if (disabled) {
    return (
      <span
        className="inline-flex items-center justify-center rounded p-1.5 text-gray-300 dark:text-gray-600 cursor-not-allowed"
        title="Video highlights not available for this game"
        aria-label="Video highlights not available"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </span>
    )
  }

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
 * Check if a game is likely to have video highlights available on YouTube
 * MLB started consistently posting game highlights around 2015
 */
export function isVideoAvailable(gameDate: string): boolean {
  const date = new Date(gameDate)
  const year = date.getFullYear()
  // MLB YouTube highlights became consistent around 2015
  return year >= 2015
}
