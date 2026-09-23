import { ApiError, type ApiErrorResponse } from '../types/api'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('VITE_API_URL no está definida en el archivo .env')
}

// Opciones para cada request
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

/**
 * Construye la URL completa con query params.
 * Ej: buildUrl('/api/verbs', { skip: 0, limit: 10 })
 *     -> http://localhost:8000/api/verbs?skip=0&limit=10
 */
function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(`${API_URL}${path}`)
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    }
  }
  return url.toString()
}

/**
 * Extrae el mensaje de error del cuerpo de la respuesta de FastAPI.
 */
function extractErrorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') return 'Error desconocido'

  const errorData = data as ApiErrorResponse

  if (typeof errorData.detail === 'string') {
    return errorData.detail
  }

  if (Array.isArray(errorData.detail)) {
    return errorData.detail.map((e) => e.msg).join(', ')
  }

  return 'Error desconocido'
}

/**
 * Cliente HTTP base. Todos los requests pasan por aquí.
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options

  const response = await fetch(buildUrl(path, params), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  // 204 No Content (por ejemplo, DELETE exitoso)
  if (response.status === 204) {
    return undefined as T
  }

  // Intentamos parsear JSON
  let data: unknown
  try {
    data = await response.json()
  } catch {
    data = null
  }

  // Si la respuesta no fue exitosa, lanzamos ApiError
  if (!response.ok) {
    throw new ApiError(response.status, extractErrorMessage(data))
  }

  return data as T
}

/**
 * Cliente con métodos convenientes para cada verbo HTTP.
 */
export const apiClient = {
  get: <T>(path: string, params?: RequestOptions['params']) =>
    request<T>(path, { method: 'GET', params }),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),

  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
}