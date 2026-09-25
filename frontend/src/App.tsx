import { useState } from 'react'
import { SearchBar } from '@/features/search/components/SearchBar'
import { SearchResults } from '@/features/search/components/SearchResults'
import { useVerbSearch } from '@/features/search/hooks/useVerbSearch'

function App() {
  const [query, setQuery] = useState('')
  const { results, loading, error, hasSearched } = useVerbSearch(query)

  return (
    <main style={{ padding: '2rem 1rem', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Verb Conjugator</h1>
        <p style={{ color: '#6b7280' }}>
          Busca verbos en inglés por su forma en inglés o español
        </p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        autoFocus
      />

      <SearchResults
        results={results}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
        query={query}
      />
    </main>
  )
}

export default App