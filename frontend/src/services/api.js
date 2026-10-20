const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api'

async function request(path) {
  const response = await fetch(`${apiBaseUrl}${path}`)
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(payload?.error?.message ?? `L'API a répondu avec le statut ${response.status}.`)
    error.status = response.status
    throw error
  }

  if (!payload?.data) {
    throw new Error("La réponse de l'API est invalide.")
  }

  return payload.data
}

export function getProductBySlug(slug) {
  return request(`/products/${encodeURIComponent(slug)}`)
}
