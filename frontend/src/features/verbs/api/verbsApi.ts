import { apiClient } from '../../../lib/api'
import type { Verb, VerbCreate, VerbUpdate } from '../../../types/verb'

/**
 * GET /api/verbs/
 * Lista de verbos con paginación y búsqueda opcional.
 */
export function getVerbs(params?: {
  skip?: number
  limit?: number
  search?: string
}): Promise<Verb[]> {
  return apiClient.get<Verb[]>('/api/verbs/', params)
}

/**
 * GET /api/verbs/count
 * Cuenta total de verbos (con filtro opcional).
 */
export function countVerbs(params?: { search?: string }): Promise<number> {
  return apiClient.get<number>('/api/verbs/count', params)
}

/**
 * GET /api/verbs/{id}
 */
export function getVerbById(id: number): Promise<Verb> {
  return apiClient.get<Verb>(`/api/verbs/${id}`)
}

/**
 * POST /api/verbs/
 */
export function createVerb(payload: VerbCreate): Promise<Verb> {
  return apiClient.post<Verb>('/api/verbs/', payload)
}

/**
 * PUT /api/verbs/{id}
 */
export function updateVerb(id: number, payload: VerbUpdate): Promise<Verb> {
  return apiClient.put<Verb>(`/api/verbs/${id}`, payload)
}

/**
 * DELETE /api/verbs/{id}
 */
export function deleteVerb(id: number): Promise<void> {
  return apiClient.delete<void>(`/api/verbs/${id}`)
}