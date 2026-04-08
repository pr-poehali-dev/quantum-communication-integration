export interface User {
  id: number
  email: string
  full_name: string
  role: 'volunteer' | 'admin'
}

export interface AuthState {
  user: User | null
  token: string | null
}

export function saveAuth(user: User, token: string) {
  localStorage.setItem('vbr_user', JSON.stringify(user))
  localStorage.setItem('vbr_token', token)
}

export function loadAuth(): AuthState {
  try {
    const user = localStorage.getItem('vbr_user')
    const token = localStorage.getItem('vbr_token')
    return { user: user ? JSON.parse(user) : null, token }
  } catch {
    return { user: null, token: null }
  }
}

export function clearAuth() {
  localStorage.removeItem('vbr_user')
  localStorage.removeItem('vbr_token')
}
