import { getAdminToken } from './auth'

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api'
const SERVICE_UNAVAILABLE_STATUSES = new Set([502, 503, 504])
const SERVICE_UNAVAILABLE_MESSAGE = 'Le service est momentanément indisponible. Veuillez réessayer dans un instant.'

async function request(path, options = {}) {
  let response

  try {
    const token = getAdminToken()
    const headers = new Headers(options.headers)

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers,
    })
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(SERVICE_UNAVAILABLE_MESSAGE, { cause: error })
    }

    throw error
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const message = SERVICE_UNAVAILABLE_STATUSES.has(response.status)
      ? SERVICE_UNAVAILABLE_MESSAGE
      : payload?.error?.message ?? `L'API a répondu avec le statut ${response.status}.`
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  if (response.status === 204) {
    return { data: null }
  }

  if (typeof payload !== 'object' || payload === null || !('data' in payload)) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload
}

export async function loginAdmin(email, password) {
  const payload = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (
    typeof payload.data?.token !== 'string'
    || !payload.data.admin
  ) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export async function getCurrentAdmin() {
  const payload = await request('/auth/me')

  if (!payload.data || typeof payload.data.email !== 'string') {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
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

export async function getAdminProducts(params = {}) {
  const payload = await request(`/admin/products${toQueryString(params)}`)

  if (!Array.isArray(payload.data) || !payload.meta) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return { products: payload.data, meta: payload.meta }
}

export async function getAdminProduct(productId) {
  const payload = await request(`/admin/products/${productId}`)

  if (!payload.data || typeof payload.data !== 'object') {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

async function saveAdminProduct(path, method, product) {
  const payload = await request(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })

  if (!payload.data || typeof payload.data !== 'object') {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export function createAdminProduct(product) {
  return saveAdminProduct('/admin/products', 'POST', product)
}

export function updateAdminProduct(productId, product) {
  return saveAdminProduct(`/admin/products/${productId}`, 'PUT', product)
}

export async function uploadAdminProductImages(productId, files) {
  const formData = new FormData()
  files.forEach((file) => formData.append('images', file))
  const payload = await request(`/admin/products/${productId}/images`, {
    method: 'POST',
    body: formData,
  })

  if (!Array.isArray(payload.data)) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export async function deleteAdminImage(imageId) {
  await request(`/admin/images/${imageId}`, { method: 'DELETE' })
}

export async function deleteAdminProduct(productId) {
  await request(`/admin/products/${productId}`, { method: 'DELETE' })
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
