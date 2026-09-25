import { useEffect, useState } from 'react'

/**
 * Devuelve una versión "retrasada" de un valor.
 * Útil para inputs de búsqueda: solo dispara el efecto cuando el usuario deja de escribir.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delayMs])

  return debouncedValue
}