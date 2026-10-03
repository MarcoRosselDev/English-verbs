import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSubmit?: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBar({
  value,
  onChange,
  suggestions,
  onSubmit,
  placeholder = 'Buscar un verbo...',
  autoFocus = false,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Abre el dropdown cuando hay sugerencias y el input tiene foco
  useEffect(() => {
    if (suggestions.length > 0 && document.activeElement === inputRef.current) {
      setIsOpen(true)
    } else if (suggestions.length === 0) {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }, [suggestions])

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    setIsOpen(false)
    setActiveIndex(-1)
    onSubmit?.(suggestion)
    inputRef.current?.blur()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit(value)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % suggestions.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0) {
          selectSuggestion(suggestions[activeIndex])
        } else if (onSubmit) {
          onSubmit(value)
          setIsOpen(false)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Buscar verbo"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="search-suggestions"
        aria-activedescendant={
          activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
        }
        spellCheck={false}
        autoComplete="off"
      />

      {isOpen && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          className={styles.dropdown}
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`${styles.option} ${
                index === activeIndex ? styles.optionActive : ''
              }`}
              onMouseDown={(e) => {
                // onMouseDown en lugar de onClick para que se ejecute
                // antes del blur del input
                e.preventDefault()
                selectSuggestion(suggestion)
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}