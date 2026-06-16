import { useId, useRef, useState } from 'react'
import { MATCH_TIER_LABELS } from '../../types/jobMatching'
import {
  clearSavedJobMatching,
  formatSavedAt,
  loadSavedJobMatching,
  type SavedJobMatchingResult,
} from '../../utils/savedJobMatchingStorage'
import styles from './SavedJobMatchingPanel.module.css'

interface SavedJobMatchingPanelProps {
  onRestore: (saved: SavedJobMatchingResult) => void
}

export function SavedJobMatchingPanel({ onRestore }: SavedJobMatchingPanelProps) {
  const statusId = useId()
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [saved, setSaved] = useState(() => loadSavedJobMatching())
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  function announce(message: string) {
    setStatusMessage(message)
    requestAnimationFrame(() => {
      statusRef.current?.focus()
    })
  }

  function handleRestore() {
    const current = loadSavedJobMatching()
    if (!current) {
      setSaved(null)
      announce('Không còn kết quả gợi ý việc làm đã lưu.')
      return
    }
    onRestore(current)
    announce('Đang tải lại kết quả gợi ý việc làm đã lưu.')
  }

  function handleClear() {
    clearSavedJobMatching()
    setSaved(null)
    announce('Đã xóa kết quả gợi ý việc làm đã lưu.')
  }

  if (!saved) {
    return null
  }

  return (
    <section className={styles.panel} aria-labelledby="saved-matching-heading">
      <h2 id="saved-matching-heading" className={styles.heading}>
        Kết quả đã lưu gần đây
      </h2>
      <p className={styles.meta}>Lưu lúc: {formatSavedAt(saved.savedAt)}</p>

      {saved.matchSummary.length > 0 ? (
        <ul className={styles.jobList}>
          {saved.matchSummary.map((item) => (
            <li key={item.jobId} className={styles.jobItem}>
              <span className={styles.jobTitle}>{item.jobTitle}</span>
              <span className={styles.jobMeta}>
                {' '}
                — {MATCH_TIER_LABELS[item.tier]} (điểm {item.score})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyNote}>
          Không có danh sách việc làm trong bản lưu. Bạn vẫn có thể xem lại theo câu trả lời đã
          chọn.
        </p>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={handleRestore}>
          Xem lại
        </button>
        <button type="button" className={styles.secondaryButton} onClick={handleClear}>
          Xóa kết quả đã lưu
        </button>
      </div>

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
    </section>
  )
}
