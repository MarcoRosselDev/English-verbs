import { useEffect, useState } from 'react'
import { searchVerbs } from '../api'
import { ApiError } from '@/types/api'
import type { SearchResult } from '@/types/verb'

interface UseVerbSearchResult {
  results: SearchResult[]
  loading: boolean
  error: string | null
  hasSearched: boolean
}

export function useVerbSearch(query: string, debounceMs = 300): UseVerbSearchResult {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()

    // Si el término es muy corto, limpiamos
    if (trimmed.length < 2) {
      setResults([])
      setError(null)
      setLoading(false)
      setHasSearched(false)
      return
    }

    // AbortController permite cancelar requests previos si el usuario
    // sigue escribiendo mientras uno anterior está en vuelo.
    const controller = new AbortController()

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await searchVerbs(trimmed)
        if (!controller.signal.aborted) {
          setResults(data)
          setHasSearched(true)
        }
      } catch (err) {
        if (controller.signal.aborted) return

        if (err instanceof ApiError) {
          setError(err.detail)
        } else if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error desconocido')
        }
        setResults([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, debounceMs)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query, debounceMs])

  return { results, loading, error, hasSearched }
}