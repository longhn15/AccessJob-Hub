import { forwardRef, useId } from 'react'
import type { FieldErrors } from '../../utils/formErrors'
import { focusFieldFromSummaryLink } from '../../utils/formErrors'
import styles from './Form.module.css'

const FIELD_LABELS: Record<string, string> = {
  fullName: 'Họ và tên',
  email: 'Email',
  phone: 'Số điện thoại',
  message: 'Tin nhắn',
  category: 'Danh mục phản hồi',
  description: 'Mô tả',
  contactEmail: 'Email liên hệ',
  jobId: 'Việc làm',
}

interface ErrorSummaryProps {
  errors: FieldErrors
  formId?: string
}

export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  function ErrorSummary({ errors, formId }, ref) {
    const titleId = useId()
    const entries = Object.entries(errors)
    if (entries.length === 0) return null

    const summaryId = formId ? `${formId}-error-summary` : 'form-error-summary'
    const title =
      entries.length === 1
        ? 'Có 1 lỗi trong form. Vui lòng sửa trường sau:'
        : `Có ${entries.length} lỗi trong form. Vui lòng sửa các trường sau:`

    return (
      <div
        ref={ref}
        id={summaryId}
        className={`${styles.errorSummary} ${styles.messageFocusTarget}`}
        role="alert"
        aria-live="assertive"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <p id={titleId} className={styles.errorSummaryTitle}>
          {title}
        </p>
        <ul className={styles.errorSummaryList}>
          {entries.map(([field, message]) => (
            <li key={field}>
              <button
                type="button"
                className={styles.errorSummaryLink}
                onClick={() => focusFieldFromSummaryLink(field)}
              >
                {FIELD_LABELS[field] ?? field}: {message}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  },
)
