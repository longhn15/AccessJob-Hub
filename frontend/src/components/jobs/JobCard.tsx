import { Link } from 'react-router-dom'
import type { Job } from '../../types/job'
import {
  formatExperienceLevel,
  formatSalaryRange,
  formatWorkMode,
  formatWorkType,
} from '../../utils/jobLabels'
import { Badge } from '../common/Badge'
import styles from './JobCard.module.css'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const workTypeLabel = formatWorkType(job.workType)
  const workModeLabel = formatWorkMode(job)
  const experienceLabel = formatExperienceLevel(job.experienceLevel)
  const salaryLabel = formatSalaryRange(job.salaryRange)

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
          <Badge label={workModeLabel} ariaLabel={`Hình thức làm việc: ${workModeLabel}`} />
          <Badge label={workTypeLabel} ariaLabel={`Loại hình: ${workTypeLabel}`} />
          {experienceLabel && (
            <Badge
              label={experienceLabel}
              ariaLabel={`Kinh nghiệm: ${experienceLabel}`}
            />
          )}
          {salaryLabel && (
            <Badge label={salaryLabel} ariaLabel={`Mức lương: ${salaryLabel}`} />
          )}
        </div>
      </header>

      <p className={styles.description}>{job.shortDescription}</p>

      {job.accessibilitySupport && (
        <div className={styles.accessibilityBlock}>
          <h4 className={styles.accessibilityHeading}>Hỗ trợ tiếp cận</h4>
          <p className={styles.accessibilityText}>{job.accessibilitySupport}</p>
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
