import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar un verbo...',
  autoFocus = false,
}: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Buscar verbo"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  )
}