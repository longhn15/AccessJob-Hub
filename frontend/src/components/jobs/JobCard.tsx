import { Link } from 'react-router-dom'
import type { Job } from '../../types/job'
import { Badge } from '../common/Badge'
import styles from './JobCard.module.css'

interface JobCardProps {
  job: Job
}

function formatWorkType(workType: string): string {
  const map: Record<string, string> = {
    'full-time': 'Toàn thời gian',
    'part-time': 'Bán thời gian',
    contract: 'Hợp đồng',
    internship: 'Thực tập',
  }
  return map[workType] ?? workType
}

export function JobCard({ job }: JobCardProps) {
  const workTypeLabel = formatWorkType(job.workType)

  return (
    <article className={styles.card} aria-labelledby={`job-title-${job.id}`}>
      <header className={styles.header}>
        <h3 id={`job-title-${job.id}`} className={styles.title}>
          <Link to={`/jobs/${job.id}`} className={styles.titleLink}>
            {job.title}
          </Link>
        </h3>
        <p className={styles.meta}>
          <span>{job.companyName}</span>
          <span aria-hidden="true"> · </span>
          <span>{job.location}</span>
        </p>
        <div className={styles.badges}>
          <Badge label={workTypeLabel} ariaLabel={`Hình thức: ${workTypeLabel}`} />
          {job.remoteAvailable && (
            <Badge label="Từ xa" ariaLabel="Hình thức: Có thể làm từ xa" />
          )}
        </div>
      </header>

      <p className={styles.description}>{job.shortDescription}</p>

      {job.accessibilitySupport && (
        <div className={styles.accessibilityBlock}>
          <h4 className={styles.accessibilityHeading}>Hỗ trợ tiếp cận</h4>
          <p>{job.accessibilitySupport}</p>
        </div>
      )}

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
