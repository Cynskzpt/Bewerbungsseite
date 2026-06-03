const SESSION_KEY = 'cynthia-edit-unlocked'
const PASSWORD = import.meta.env.VITE_EDIT_PASSWORD ?? ''
const PASSWORD_HASH = import.meta.env.VITE_EDIT_PASSWORD_HASH ?? ''
const PASSWORD_SALT = import.meta.env.VITE_EDIT_PASSWORD_SALT ?? 'cynthia-portfolio-v1'

export const isEditPasswordConfigured = Boolean(PASSWORD || PASSWORD_HASH)

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

export async function hashEditPassword(value) {
  const data = new TextEncoder().encode(`${PASSWORD_SALT}:${value}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function verifyEditPassword(candidate) {
  if (!isEditPasswordConfigured || !candidate) return false

  if (PASSWORD_HASH) {
    const hash = await hashEditPassword(candidate)
    return timingSafeEqual(hash, PASSWORD_HASH)
  }

  return timingSafeEqual(candidate, PASSWORD)
}

export function isEditSessionActive() {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

export function unlockEditSession() {
  sessionStorage.setItem(SESSION_KEY, '1')
}

export function lockEditSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
