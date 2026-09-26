import type { SearchResult } from '@/types/verb'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  results: SearchResult[]
  loading: boolean
  error: string | null
  hasSearched: boolean
  query: string
  onEdit: (verb: SearchResult) => void
  onDelete: (verb: SearchResult) => void
}

export function SearchResults({
  results,
  loading,
  error,
  hasSearched,
  query,
  onEdit,
  onDelete,
}: SearchResultsProps) {
  if (loading) return <p className={styles.message}>Buscando...</p>
  if (error) return <p className={`${styles.message} ${styles.error}`}>Error: {error}</p>
  if (!hasSearched) return null

  if (results.length === 0) {
    return (
      <p className={styles.message}>
        No se encontraron resultados para "{query}".
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.count}>
        {results.length} resultado{results.length !== 1 && 's'}
      </p>

      <ul className={styles.list}>
        {results.map((verb) => (
          <li key={verb.id} className={styles.item}>
            <div className={styles.mainInfo}>
              <div className={styles.header}>
                <h3 className={styles.infinitive}>{verb.infinitive}</h3>
                {verb.is_regular ? (
                  <span className={`${styles.badge} ${styles.regular}`}>regular</span>
                ) : (
                  <span className={`${styles.badge} ${styles.irregular}`}>irregular</span>
                )}
              </div>

              {verb.spanish_translation && (
                <p className={styles.translation}>{verb.spanish_translation}</p>
              )}

              <dl className={styles.forms}>
                {verb.past_simple && (
                  <>
                    <dt>Pasado</dt>
                    <dd>{verb.past_simple}</dd>
                  </>
                )}
                {verb.past_participle && (
                  <>
                    <dt>Participio</dt>
                    <dd>{verb.past_participle}</dd>
                  </>
                )}
                {verb.present_participle && (
                  <>
                    <dt>Gerundio</dt>
                    <dd>{verb.present_participle}</dd>
                  </>
                )}
                {verb.third_person_singular && (
                  <>
                    <dt>3ª persona</dt>
                    <dd>{verb.third_person_singular}</dd>
                  </>
                )}
              </dl>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => onEdit(verb)}
                aria-label={`Editar ${verb.infinitive}`}
              >
                Editar
              </button>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDelete(verb)}
                aria-label={`Eliminar ${verb.infinitive}`}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}