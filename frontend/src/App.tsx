import { useEffect, useState } from 'react'
import { getVerbs } from '@/features/verbs/api'
import { searchVerbs } from '@/features/search/api'
import { ApiError } from '@/types/api'
import type { Verb, SearchResult } from '@/types/verb'

function App() {
  const [verbs, setVerbs] = useState<Verb[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Prueba 1: listar primeros 5 verbos
  useEffect(() => {
    getVerbs({ limit: 5 })
      .then(setVerbs)
      .catch((err) => {
        if (err instanceof ApiError) setError(err.detail)
        else setError('Error desconocido')
      })
  }, [])

  // Prueba 2: buscar un término
  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await searchVerbs('ir')
      setSearchResults(results)
    } catch (err) {
      if (err instanceof ApiError) setError(err.detail)
      else setError('Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Verb Conjugator</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Primeros 5 verbos</h2>
      <ul>
        {verbs.map((v) => (
          <li key={v.id}>
            <strong>{v.infinitive}</strong> — {v.spanish_translation}
          </li>
        ))}
      </ul>

      <h2>Buscar "ir"</h2>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      <ul>
        {searchResults.map((r) => (
          <li key={`${r.id}-${r.relevance_score}`}>
            {r.infinitive} — {r.spanish_translation} (score: {r.relevance_score})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App