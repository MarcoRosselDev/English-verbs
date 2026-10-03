import { useEffect, useState } from 'react'
import { getSuggestions } from '../api'

interface UseVerbSuggestionsResult {
  suggestions: string[]
  loading: boolean
}

export function useVerbSuggestions(
  query: string,
  debounceMs = 150,
  limit = 8,
): UseVerbSuggestionsResult {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()

    // Con menos de 2 caracteres no vale la pena pedir sugerencias
    if (trimmed.length < 2) {
      setSuggestions([])
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await getSuggestions(trimmed, limit)
        if (!controller.signal.aborted) {
          setSuggestions(data)
        }
      } catch {
        // Silencioso: si falla, simplemente no mostramos sugerencias
        if (!controller.signal.aborted) {
          setSuggestions([])
        }
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
  }, [query, debounceMs, limit])

  return { suggestions, loading }
}