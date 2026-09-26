import { ThemeToggle } from '@/components/ThemeToggle'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { SearchBar } from '@/features/search/components/SearchBar'
import { SearchResults } from '@/features/search/components/SearchResults'
import { useVerbSearch } from '@/features/search/hooks/useVerbSearch'
import { VerbForm } from '@/features/verbs/components/VerbForm'
import { useVerbMutations } from '@/features/verbs/hooks/useVerbMutations'
import { getVerbById } from '@/features/verbs/api'
import type { SearchResult, Verb, VerbCreate } from '@/types/verb'
import styles from './App.module.css'

function App() {
  const [query, setQuery] = useState('')
  const { results, loading, error, hasSearched } = useVerbSearch(query)

  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVerb, setEditingVerb] = useState<Verb | null>(null)

  const { saving, error: mutationError, create, update, remove, clearError } =
    useVerbMutations()

  // Refresca la búsqueda actual (forzando volver a consultar)
  const [refreshKey, setRefreshKey] = useState(0)
  const refresh = () => setRefreshKey((k) => k + 1)

  const openCreateModal = () => {
    setEditingVerb(null)
    clearError()
    setIsModalOpen(true)
  }

  const openEditModal = async (result: SearchResult) => {
    clearError()
    // Necesitamos los datos completos (con fechas) para el form
    try {
      const full = await getVerbById(result.id)
      setEditingVerb(full)
      setIsModalOpen(true)
    } catch {
      // Si falla, al menos mostramos lo que ya teníamos
      setEditingVerb({
        ...result,
        created_at: '',
        updated_at: '',
      })
      setIsModalOpen(true)
    }
  }

  const handleSubmit = async (payload: VerbCreate) => {
    const result = editingVerb
      ? await update(editingVerb.id, payload)
      : await create(payload)

    if (result) {
      setIsModalOpen(false)
      setEditingVerb(null)
      refresh()
    }
  }

  const handleDelete = async (verb: SearchResult) => {
    const confirmed = window.confirm(
      `¿Eliminar el verbo "${verb.infinitive}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    const success = await remove(verb.id)
    if (success) refresh()
  }

  return (
    <main className={styles.app}>
      <div className={styles.themeCorner}>
        <ThemeToggle />
      </div>
      <header className={styles.header}>
        <h1 className={styles.title}>Verb Conjugator</h1>
        <p className={styles.subtitle}>
          Busca verbos en inglés por su forma en inglés o español
        </p>
      </header>

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} autoFocus />
        <button className={styles.newBtn} onClick={openCreateModal}>
          + Nuevo verbo
        </button>
      </div>

      <SearchResults
        key={refreshKey}
        results={results}
        loading={loading}
        error={error}
        hasSearched={hasSearched}
        query={query}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingVerb(null)
        }}
        title={editingVerb ? 'Editar verbo' : 'Nuevo verbo'}
      >
        <VerbForm
          initialVerb={editingVerb}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingVerb(null)
          }}
          saving={saving}
          error={mutationError}
        />
      </Modal>
    </main>
  )
}

export default App