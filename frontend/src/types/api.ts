// Error estructurado que lanzará nuestro cliente
export class ApiError extends Error {
  status: number
  detail: string

  constructor(status: number, detail: string) {
    super(detail)
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

// Forma típica de un error de FastAPI
export interface ApiErrorResponse {
  detail: string | { msg: string; type: string }[]
}