import { Link } from 'react-router-dom'
import type { JobMatchResult } from '../../types/jobMatching'
import { MATCH_TIER_LABELS } from '../../types/jobMatching'
import { Badge } from '../common/Badge'
import styles from './MatchResultCard.module.css'

interface MatchResultCardProps {
  result: JobMatchResult
}

export function MatchResultCard({ result }: MatchResultCardProps) {
  const { job, tier, reasons } = result
  const tierLabel = MATCH_TIER_LABELS[tier]

  return (
    <article className={styles.card} aria-labelledby={`match-job-title-${job.id}`}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h3 id={`match-job-title-${job.id}`} className={styles.title}>
            <Link to={`/jobs/${job.id}`} className={styles.titleLink}>
              {job.title}
            </Link>
          </h3>
          <Badge
            label={tierLabel}
            ariaLabel={`Mức phù hợp: ${tierLabel}`}
          />
        </div>
        <p className={styles.meta}>
          <span>{job.companyName}</span>
          <span aria-hidden="true"> · </span>
          <span>{job.location}</span>
        </p>
      </header>

      <p className={styles.description}>{job.shortDescription}</p>

      <div className={styles.reasonsBlock}>
        <h4 className={styles.reasonsHeading}>Vì sao gợi ý</h4>
        <ul className={styles.reasonsList}>
          {reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <p className={styles.cta}>
        <Link
          to={`/jobs/${job.id}`}
          className={styles.detailLink}
          aria-label={`Xem chi tiết: ${job.title}`}
        >
          Xem chi tiết
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  )
}
