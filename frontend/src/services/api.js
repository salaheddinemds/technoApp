const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api'

async function request(path) {
  const response = await fetch(`${apiBaseUrl}${path}`)
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(payload?.error?.message ?? `L'API a répondu avec le statut ${response.status}.`)
    error.status = response.status
    throw error
  }

  if (typeof payload !== 'object' || payload === null || !('data' in payload)) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload
}

function toQueryString(params) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  }

  const serializedQuery = query.toString()
  return serializedQuery ? `?${serializedQuery}` : ''
}

export async function getProducts(params = {}) {
  const payload = await request(`/products${toQueryString(params)}`)

  if (!Array.isArray(payload.data) || !payload.meta) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return { products: payload.data, meta: payload.meta }
}

export async function getCategories() {
  const payload = await request('/categories')

  if (!Array.isArray(payload.data)) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export async function getBrands() {
  const payload = await request('/brands')

  if (!Array.isArray(payload.data)) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export async function getProductBySlug(slug) {
  const payload = await request(`/products/${encodeURIComponent(slug)}`)
  return payload.data
}
