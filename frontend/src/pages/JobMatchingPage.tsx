import { JobMatchingWizard } from '../components/matching/JobMatchingWizard'
import styles from './JobMatchingPage.module.css'

export function JobMatchingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Tìm việc phù hợp</h1>
        <p className={styles.lead}>
          Trả lời vài câu hỏi ngắn về hình thức làm việc và nhu cầu tiếp cận — hệ thống sẽ gợi ý
          việc làm phù hợp từ dữ liệu hiện có, không dùng AI.
        </p>
      </header>

      <JobMatchingWizard />
    </div>
  )
}
