import { isValidEmail, LIMITS } from './validation'

export const CONTACT_PROFILE_STORAGE_KEY = 'accessjob:contact-profile'

export interface ContactProfile {
  fullName: string
  email: string
  phone?: string
}

function safeGetStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function safeRemoveStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseContactProfile(raw: unknown): ContactProfile | null {
  if (!isRecord(raw)) return null

  const fullName = typeof raw.fullName === 'string' ? raw.fullName.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  const phone =
    typeof raw.phone === 'string' && raw.phone.trim() ? raw.phone.trim() : undefined

  if (!fullName || !email || !isValidEmail(email)) return null
  if (fullName.length > LIMITS.fullName) return null
  if (phone && phone.length > LIMITS.phone) return null

  return { fullName, email, phone }
}

export function loadContactProfile(): ContactProfile | null {
  const raw = safeGetStorageItem(CONTACT_PROFILE_STORAGE_KEY)
  if (!raw) return null

  try {
    return parseContactProfile(JSON.parse(raw) as unknown)
  } catch {
    return null
  }
}

export function hasStoredContactProfile(): boolean {
  return loadContactProfile() !== null
}

export function saveContactProfile(profile: ContactProfile): boolean {
  const normalized: ContactProfile = {
    fullName: profile.fullName.trim(),
    email: profile.email.trim(),
    phone: profile.phone?.trim() || undefined,
  }

  if (!normalized.fullName || !normalized.email || !isValidEmail(normalized.email)) {
    return false
  }

  return safeSetStorageItem(CONTACT_PROFILE_STORAGE_KEY, JSON.stringify(normalized))
}

export function clearContactProfile(): boolean {
  return safeRemoveStorageItem(CONTACT_PROFILE_STORAGE_KEY)
}
