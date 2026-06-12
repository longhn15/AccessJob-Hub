import type { InputHTMLAttributes } from 'react'
import styles from './Form.module.css'

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  hasError?: boolean
}

export function TextInput({ hasError, disabled, ...props }: TextInputProps) {
  const className = hasError ? `${styles.control} ${styles.controlInvalid}` : styles.control

  return <input {...props} className={className} disabled={disabled} />
}
