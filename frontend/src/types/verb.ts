// Representa un verbo tal como lo devuelve el backend
export interface Verb {
  id: number
  infinitive: string
  past_simple: string | null
  past_participle: string | null
  present_participle: string | null
  third_person_singular: string | null
  is_regular: boolean
  spanish_translation: string | null
  created_at: string
  updated_at: string
}

// Payload para crear un verbo
export interface VerbCreate {
  infinitive: string
  past_simple?: string | null
  past_participle?: string | null
  present_participle?: string | null
  third_person_singular?: string | null
  is_regular: boolean
  spanish_translation?: string | null
}

// Payload para actualizar (todos opcionales)
export type VerbUpdate = Partial<VerbCreate>

// Resultado de la búsqueda avanzada
export interface SearchResult {
  id: number
  infinitive: string
  past_simple: string | null
  past_participle: string | null
  present_participle: string | null
  third_person_singular: string | null
  spanish_translation: string | null
  is_regular: boolean
  relevance_score: number
}