import { Link } from 'react-router-dom'
import type { Resource } from '../../types/resource'
import { Badge } from '../common/Badge'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: Resource
}

const CATEGORY_HINTS: Record<string, string> = {
  'Tiêu chuẩn web': 'WCAG · Web dễ tiếp cận',
  'Việc làm': 'Tìm việc · Quyền lợi',
  'Kỹ năng số': 'Bàn phím · Công cụ',
  'Hồ sơ ứng tuyển': 'CV · Hồ sơ',
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const topicHint = CATEGORY_HINTS[resource.category]
  const actionLabel = `Xem tài nguyên: ${resource.title}`

  return (
    <article className={styles.card} aria-labelledby={`resource-title-${resource.id}`}>
      <header className={styles.header}>
        <h3 id={`resource-title-${resource.id}`} className={styles.title}>
          <Link to={`/resources/${resource.id}`} className={styles.titleLink}>
            {resource.title}
          </Link>
        </h3>
        <div className={styles.tags}>
          <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
          {topicHint && <span className={styles.topicHint}>{topicHint}</span>}
        </div>
      </header>

      <p className={styles.description}>{resource.description}</p>

      {resource.url && (
        <p className={styles.external}>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Mở liên kết ngoài: ${resource.title} (mở tab mới)`}
          >
            Mở liên kết ngoài
            <span className={styles.srOnly}> (mở tab mới)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </p>
      )}

      <p className={styles.cta}>
        <Link
          to={`/resources/${resource.id}`}
          className={styles.detailLink}
          aria-label={actionLabel}
        >
          <span className={styles.ctaPrefix}>Xem tài nguyên:</span>
          <span className={styles.ctaTitle}>{resource.title}</span>
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  )
}
