import { forwardRef } from 'react'
import type { EmployerChecklistScore } from '../../types/employerChecklist'
import styles from './EmployerChecklistResult.module.css'

interface EmployerChecklistResultProps {
  score: EmployerChecklistScore
  ariaLive?: 'polite' | 'assertive' | 'off'
}

export const EmployerChecklistResult = forwardRef<HTMLDivElement, EmployerChecklistResultProps>(
  function EmployerChecklistResult({ score, ariaLive = 'polite' }, ref) {
    return (
      <div
        ref={ref}
        className={styles.resultCard}
        role="status"
        aria-live={ariaLive}
        tabIndex={-1}
        aria-labelledby="employer-checklist-result-heading"
      >
        <h2 id="employer-checklist-result-heading" className={styles.heading}>
          Kết quả đánh giá
        </h2>

        <dl className={styles.scoreGrid}>
          <div className={styles.scoreItem}>
            <dt className={styles.scoreLabel}>Tổng điểm</dt>
            <dd className={styles.scoreValue}>
              {score.totalScore}/{score.maxScore}
            </dd>
          </div>
          <div className={styles.scoreItem}>
            <dt className={styles.scoreLabel}>Tỷ lệ</dt>
            <dd className={styles.scoreValue}>{score.percentage}%</dd>
          </div>
          <div className={styles.scoreItem}>
            <dt className={styles.scoreLabel}>Mức đánh giá</dt>
            <dd>
              <p className={styles.levelBadge} data-level={score.level}>
                {score.levelLabel}
              </p>
            </dd>
          </div>
        </dl>

        <p className={styles.meaning}>
          <strong>Ý nghĩa:</strong> {score.levelMeaning}
        </p>

        <section className={styles.section} aria-labelledby="employer-strengths-heading">
          <h3 id="employer-strengths-heading" className={styles.sectionTitle}>
            Điểm mạnh đã đạt ({score.strengths.length})
          </h3>
          {score.strengths.length > 0 ? (
            <ul className={styles.list}>
              {score.strengths.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyNote}>Chưa có tiêu chí nào được chọn.</p>
          )}
        </section>

        <section className={styles.section} aria-labelledby="employer-improvements-heading">
          <h3 id="employer-improvements-heading" className={styles.sectionTitle}>
            Gợi ý cải thiện ({score.improvements.length})
          </h3>
          {score.improvements.length > 0 ? (
            <ul className={styles.list}>
              {score.improvements.map((item) => (
                <li key={item.id}>{item.suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyNote}>
              Bạn đã tick tất cả tiêu chí — tin tuyển dụng thể hiện tinh thần hòa nhập rất tốt.
            </p>
          )}
        </section>
      </div>
    )
  },
)
