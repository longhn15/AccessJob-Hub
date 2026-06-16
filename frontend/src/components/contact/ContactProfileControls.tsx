import { useId, useRef, useState } from 'react'
import {
  clearContactProfile,
  hasStoredContactProfile,
  loadContactProfile,
  type ContactProfile,
} from '../../utils/contactProfileStorage'
import styles from './ContactProfileControls.module.css'

interface ContactProfileControlsProps {
  mode: 'full' | 'email-only'
  onFill: (profile: ContactProfile) => void
  disabled?: boolean
  showSaveCheckbox?: boolean
  saveChecked?: boolean
  onSaveCheckedChange?: (checked: boolean) => void
  onProfileCleared?: () => void
}

export function ContactProfileControls({
  mode,
  onFill,
  disabled = false,
  showSaveCheckbox = false,
  saveChecked = false,
  onSaveCheckedChange,
  onProfileCleared,
}: ContactProfileControlsProps) {
  const statusId = useId()
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const hasStored = hasStoredContactProfile()

  function announce(message: string) {
    setStatusMessage(message)
    requestAnimationFrame(() => {
      statusRef.current?.focus()
    })
  }

  function handleFill() {
    const profile = loadContactProfile()
    if (!profile) {
      announce('Không còn thông tin liên hệ đã lưu trên thiết bị này.')
      return
    }

    onFill(profile)
    if (mode === 'email-only') {
      announce('Đã điền email đã lưu vào trường Email liên hệ.')
    } else {
      announce('Đã điền thông tin liên hệ đã lưu vào form.')
    }
  }

  function handleClear() {
    clearContactProfile()
    onProfileCleared?.()
    announce('Đã xóa thông tin liên hệ đã lưu trên thiết bị này.')
  }

  const fillLabel = mode === 'email-only' ? 'Dùng email đã lưu' : 'Điền thông tin đã lưu'

  return (
    <div className={styles.panel}>
      {hasStored ? (
        <>
          <p className={styles.intro}>
            {mode === 'email-only'
              ? 'Bạn có email liên hệ đã lưu trên thiết bị này. Bấm nút bên dưới để điền — không tự động điền.'
              : 'Bạn có thông tin liên hệ đã lưu trên thiết bị này. Bấm nút bên dưới để điền — không tự động điền.'}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleFill}
              disabled={disabled}
            >
              {fillLabel}
            </button>
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              disabled={disabled}
            >
              Xóa thông tin đã lưu
            </button>
          </div>
        </>
      ) : (
        <p className={styles.intro}>
          {mode === 'email-only'
            ? 'Chưa có email liên hệ đã lưu trên thiết bị này.'
            : 'Chưa có thông tin liên hệ đã lưu trên thiết bị này. Bạn có thể lưu sau khi gửi form ứng tuyển thành công.'}
        </p>
      )}

      {showSaveCheckbox && (
        <label className={styles.checkboxField}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            checked={saveChecked}
            onChange={(event) => onSaveCheckedChange?.(event.target.checked)}
            disabled={disabled}
          />
          Lưu thông tin liên hệ trên thiết bị này để điền nhanh lần sau
        </label>
      )}

      {statusMessage && (
        <p
          ref={statusRef}
          id={statusId}
          className={styles.statusMessage}
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          {statusMessage}
        </p>
      )}
    </div>
  )
}
