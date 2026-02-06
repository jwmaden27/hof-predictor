import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePlayerSearch } from '@/hooks/usePlayerSearch.ts'
import { SearchResults } from './SearchResults.tsx'

interface SearchBarProps {
  variant?: 'default' | 'large'
  className?: string
}

export function SearchBar({ variant = 'default', className = '' }: SearchBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { query, setQuery, results, isLoading, clearSearch } = usePlayerSearch()
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sportPrefix = location.pathname.startsWith('/nhl') ? '/nhl' : '/mlb'

  const handleSelect = (playerId: number) => {
    clearSearch()
    setIsFocused(false)
    inputRef.current?.blur()
    navigate(`${sportPrefix}/player/${playerId}`)
  }

  const inputClasses =
    variant === 'large'
      ? 'w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-5 py-4 pl-12 text-lg shadow-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 dark:placeholder-gray-500'
      : 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 dark:placeholder-gray-500'

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <svg
          className={`absolute left-3 text-gray-400 dark:text-gray-500 ${variant === 'large' ? 'top-4.5 h-5 w-5' : 'top-2.5 h-4 w-4'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search for a player..."
          className={inputClasses}
        />
        {query && (
          <button
            onClick={clearSearch}
            className={`absolute right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 ${variant === 'large' ? 'top-4.5' : 'top-2.5'}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isFocused && (query.length >= 2 || results.length > 0) && (
        <SearchResults
          results={results}
          isLoading={isLoading}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}
