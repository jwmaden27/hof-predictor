import { useState, useEffect, useRef } from 'react'
import { searchPlayers } from '@/services/mlb-api.ts'
import type { MLBSearchResult } from '@/types/index.ts'

export function usePlayerSearch(debounceMs = 300) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MLBSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setError(null)
      return
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      setIsLoading(true)
      setError(null)
      try {
        const data = await searchPlayers(query)
        setResults(data.slice(0, 15))
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError('Failed to search players')
      } finally {
        setIsLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setError(null)
  }

  return { query, setQuery, results, isLoading, error, clearSearch }
}
