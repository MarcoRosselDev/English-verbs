import { useCallback, useEffect, useState } from 'react'
import type { Theme, ResolvedTheme } from '@/types/theme'

const STORAGE_KEY = 'verb-conjugator-theme'

/**
 * Determina el tema efectivo cuando el usuario elige "system".
 */
function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Lee la preferencia guardada o devuelve "system" por defecto.
 */
function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return 'system'
}

/**
 * Aplica el atributo data-theme al <html>.
 */
function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', resolved)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    getStoredTheme() === 'system' ? getSystemTheme() : (getStoredTheme() as ResolvedTheme),
  )

  // Aplicar tema cada vez que cambie
  useEffect(() => {
    const effective = theme === 'system' ? getSystemTheme() : theme
    setResolved(effective)
    applyTheme(effective)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Escuchar cambios del sistema cuando theme === 'system'
  useEffect(() => {
    if (theme !== 'system') return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const sys = getSystemTheme()
      setResolved(sys)
      applyTheme(sys)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, resolved, setTheme, toggle }
}