const TOKEN_KEY = 'technoapp_admin_token'

export function getAdminToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function saveAdminToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  window.localStorage.removeItem(TOKEN_KEY)
}
