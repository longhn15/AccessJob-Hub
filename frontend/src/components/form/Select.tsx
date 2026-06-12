import type { SelectHTMLAttributes } from 'react'
import styles from './Form.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  hasError?: boolean
  options: SelectOption[]
  placeholder?: string
}

export function Select({ hasError, disabled, options, placeholder, ...props }: SelectProps) {
  const className = hasError ? `${styles.control} ${styles.controlInvalid}` : styles.control

  return (
    <select {...props} className={className} disabled={disabled}>
      {placeholder && (
        <option value="">{placeholder}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
