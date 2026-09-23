import { apiClient } from '../../../lib/api'
import type { SearchResult } from '../../../types/verb'

/**
 * GET /api/search/?q=term
 * Búsqueda avanzada usando la función PostgreSQL.
 */
export function searchVerbs(query: string): Promise<SearchResult[]> {
  return apiClient.get<SearchResult[]>('/api/search/', { q: query })
}

/**
 * GET /api/search/suggestions?q=term
 * Sugerencias para autocompletado.
 */
export function getSuggestions(query: string, limit = 10): Promise<string[]> {
  return apiClient.get<string[]>('/api/search/suggestions', { q: query, limit })
}