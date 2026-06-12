import { Link } from 'react-router-dom'
import type { Resource } from '../../types/resource'
import { Badge } from '../common/Badge'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className={styles.card} aria-labelledby={`resource-title-${resource.id}`}>
      <header className={styles.header}>
        <h3 id={`resource-title-${resource.id}`} className={styles.title}>
          <Link to={`/resources/${resource.id}`} className={styles.titleLink}>
            {resource.title}
          </Link>
        </h3>
        <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
      </header>

      <p className={styles.description}>{resource.description}</p>

      {resource.url && (
        <p className={styles.external}>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Liên kết ngoài
            <span className={styles.srOnly}> (mở tab mới)</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </p>
      )}

      <p className={styles.cta}>
        <Link to={`/resources/${resource.id}`} className={styles.detailLink}>
          Xem chi tiết
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  )
}
