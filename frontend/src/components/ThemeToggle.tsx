import { useTheme } from '@/lib/useTheme'
import type { Theme } from '@/types/theme'
import styles from './ThemeToggle.module.css'

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Claro', icon: '☀️' },
  { value: 'system', label: 'Sistema', icon: '💻' },
  { value: 'dark', label: 'Oscuro', icon: '🌙' },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.toggle} role="group" aria-label="Seleccionar tema">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.option} ${theme === opt.value ? styles.active : ''}`}
          onClick={() => setTheme(opt.value)}
          aria-pressed={theme === opt.value}
          title={opt.label}
        >
          <span aria-hidden="true">{opt.icon}</span>
        </button>
      ))}
    </div>
  )
}