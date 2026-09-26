import { useState, type FormEvent } from 'react'
import type { Verb, VerbCreate } from '@/types/verb'
import styles from './VerbForm.module.css'

interface VerbFormProps {
  initialVerb?: Verb | null
  onSubmit: (payload: VerbCreate) => Promise<void>
  onCancel: () => void
  saving: boolean
  error: string | null
}

interface FormState {
  infinitive: string
  spanish_translation: string
  past_simple: string
  past_participle: string
  present_participle: string
  third_person_singular: string
  is_regular: boolean
}

const EMPTY_FORM: FormState = {
  infinitive: '',
  spanish_translation: '',
  past_simple: '',
  past_participle: '',
  present_participle: '',
  third_person_singular: '',
  is_regular: true,
}

export function VerbForm({
  initialVerb,
  onSubmit,
  onCancel,
  saving,
  error,
}: VerbFormProps) {
  const [form, setForm] = useState<FormState>(() =>
    initialVerb
      ? {
          infinitive: initialVerb.infinitive,
          spanish_translation: initialVerb.spanish_translation ?? '',
          past_simple: initialVerb.past_simple ?? '',
          past_participle: initialVerb.past_participle ?? '',
          present_participle: initialVerb.present_participle ?? '',
          third_person_singular: initialVerb.third_person_singular ?? '',
          is_regular: initialVerb.is_regular,
        }
      : EMPTY_FORM,
  )

  const [validationError, setValidationError] = useState<string | null>(null)

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!form.infinitive.trim()) {
      setValidationError('El infinitivo es obligatorio')
      return
    }

    setValidationError(null)

    const payload: VerbCreate = {
      infinitive: form.infinitive.trim().toLowerCase(),
      spanish_translation: form.spanish_translation.trim() || null,
      past_simple: form.past_simple.trim() || null,
      past_participle: form.past_participle.trim() || null,
      present_participle: form.present_participle.trim() || null,
      third_person_singular: form.third_person_singular.trim() || null,
      is_regular: form.is_regular,
    }

    await onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="infinitive">Infinitivo *</label>
        <input
          id="infinitive"
          type="text"
          value={form.infinitive}
          onChange={(e) => handleChange('infinitive', e.target.value)}
          placeholder="go"
          required
          autoFocus
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="spanish_translation">Traducción al español</label>
        <input
          id="spanish_translation"
          type="text"
          value={form.spanish_translation}
          onChange={(e) => handleChange('spanish_translation', e.target.value)}
          placeholder="ir"
        />
      </div>

      <div className={styles.checkbox}>
        <input
          id="is_regular"
          type="checkbox"
          checked={form.is_regular}
          onChange={(e) => handleChange('is_regular', e.target.checked)}
        />
        <label htmlFor="is_regular">Verbo regular</label>
      </div>

      <div className={styles.field}>
        <label htmlFor="past_simple">Pasado simple</label>
        <input
          id="past_simple"
          type="text"
          value={form.past_simple}
          onChange={(e) => handleChange('past_simple', e.target.value)}
          placeholder="went"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="past_participle">Participio pasado</label>
        <input
          id="past_participle"
          type="text"
          value={form.past_participle}
          onChange={(e) => handleChange('past_participle', e.target.value)}
          placeholder="gone"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="present_participle">Gerundio</label>
        <input
          id="present_participle"
          type="text"
          value={form.present_participle}
          onChange={(e) => handleChange('present_participle', e.target.value)}
          placeholder="going"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="third_person_singular">3ª persona singular</label>
        <input
          id="third_person_singular"
          type="text"
          value={form.third_person_singular}
          onChange={(e) => handleChange('third_person_singular', e.target.value)}
          placeholder="goes"
        />
      </div>

      {(validationError || error) && (
        <p className={styles.error}>{validationError || error}</p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className={styles.cancelBtn}
        >
          Cancelar
        </button>
        <button type="submit" disabled={saving} className={styles.submitBtn}>
          {saving ? 'Guardando...' : initialVerb ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}