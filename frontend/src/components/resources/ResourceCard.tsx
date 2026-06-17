import { Link } from 'react-router-dom'
import { getResourceGuide } from '../../data/resourceGuides'
import type { Resource } from '../../types/resource'
import { Badge } from '../common/Badge'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const guide = getResourceGuide(resource.id)
  const actionLabel = `Xem hướng dẫn: ${resource.title}`

  if (!guide) {
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
        <p className={styles.cta}>
          <Link
            to={`/resources/${resource.id}`}
            className={styles.detailLink}
            aria-label={actionLabel}
          >
            Xem hướng dẫn
            <span aria-hidden="true"> →</span>
          </Link>
        </p>
      </article>
    )
  }

  const topOutcomes = guide.outcomes.slice(0, 2)

  return (
    <article className={styles.card} aria-labelledby={`resource-title-${resource.id}`}>
      <header className={styles.header}>
        <h3 id={`resource-title-${resource.id}`} className={styles.title}>
          <Link to={`/resources/${resource.id}`} className={styles.titleLink}>
            {resource.title}
          </Link>
        </h3>
        <p className={styles.categoryLine}>
          <span className={styles.categoryLabel}>Danh mục:</span> {resource.category}
        </p>
        <p className={styles.metaLine}>
          <Badge label={guide.type} ariaLabel={`Loại tài nguyên: ${guide.type}`} />
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <span>{guide.readingMinutes} phút đọc</span>
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <span>
            Mức độ: <strong>{guide.level}</strong>
          </span>
        </p>
      </header>

      <section className={styles.audienceBlock} aria-labelledby={`resource-audience-${resource.id}`}>
        <h4 id={`resource-audience-${resource.id}`} className={styles.subheading}>
          Phù hợp với
        </h4>
        <p className={styles.audienceText}>{guide.audience.join(', ')}</p>
      </section>

      <section className={styles.outcomesBlock} aria-labelledby={`resource-outcomes-${resource.id}`}>
        <h4 id={`resource-outcomes-${resource.id}`} className={styles.subheading}>
          Bạn sẽ biết
        </h4>
        <ul className={styles.outcomesList}>
          {topOutcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <p className={styles.cta}>
        <Link
          to={`/resources/${resource.id}`}
          className={styles.detailLink}
          aria-label={actionLabel}
        >
          Xem hướng dẫn
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  )
}
