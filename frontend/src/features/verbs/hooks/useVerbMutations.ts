import { useState } from 'react'
import { createVerb, updateVerb, deleteVerb } from '../api'
import { ApiError } from '@/types/api'
import type { Verb, VerbCreate, VerbUpdate } from '@/types/verb'

interface UseVerbMutationsResult {
  saving: boolean
  deleting: boolean
  error: string | null
  create: (payload: VerbCreate) => Promise<Verb | null>
  update: (id: number, payload: VerbUpdate) => Promise<Verb | null>
  remove: (id: number) => Promise<boolean>
  clearError: () => void
}

export function useVerbMutations(): UseVerbMutationsResult {
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: unknown) => {
    if (err instanceof ApiError) setError(err.detail)
    else if (err instanceof Error) setError(err.message)
    else setError('Error desconocido')
  }

  const create = async (payload: VerbCreate): Promise<Verb | null> => {
    setSaving(true)
    setError(null)
    try {
      return await createVerb(payload)
    } catch (err) {
      handleError(err)
      return null
    } finally {
      setSaving(false)
    }
  }

  const update = async (id: number, payload: VerbUpdate): Promise<Verb | null> => {
    setSaving(true)
    setError(null)
    try {
      return await updateVerb(id, payload)
    } catch (err) {
      handleError(err)
      return null
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    setDeleting(true)
    setError(null)
    try {
      await deleteVerb(id)
      return true
    } catch (err) {
      handleError(err)
      return false
    } finally {
      setDeleting(false)
    }
  }

  return {
    saving,
    deleting,
    error,
    create,
    update,
    remove,
    clearError: () => setError(null),
  }
}