const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

export function isBlank(value: string): boolean {
  return value.trim().length === 0
}

export const LIMITS = {
  fullName: 255,
  email: 255,
  phone: 50,
  message: 5000,
  category: 100,
  description: 5000,
  contactEmail: 255,
} as const
