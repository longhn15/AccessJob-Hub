import { useCallback, useRef, useState } from 'react'
import {
  JobMatchingWizard,
  type JobMatchingWizardHandle,
} from '../components/matching/JobMatchingWizard'
import { SavedJobMatchingPanel } from '../components/matching/SavedJobMatchingPanel'
import type { SavedJobMatchingResult } from '../utils/savedJobMatchingStorage'
import styles from './JobMatchingPage.module.css'

export function JobMatchingPage() {
  const wizardRef = useRef<JobMatchingWizardHandle>(null)
  const [savedPanelKey, setSavedPanelKey] = useState(0)

  const handleRestore = useCallback((saved: SavedJobMatchingResult) => {
    wizardRef.current?.restoreFromSaved(saved)
  }, [])

  const handleSaved = useCallback(() => {
    setSavedPanelKey((value) => value + 1)
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Tìm việc phù hợp</h1>
        <p className={styles.lead}>
          Trả lời vài câu hỏi ngắn về hình thức làm việc và nhu cầu hỗ trợ tiếp cận — hệ thống sẽ
          gợi ý việc làm phù hợp từ dữ liệu hiện có, không dùng AI.
        </p>
      </header>

      <SavedJobMatchingPanel key={savedPanelKey} onRestore={handleRestore} />

      <JobMatchingWizard ref={wizardRef} onSaved={handleSaved} />
    </div>
  )
}
