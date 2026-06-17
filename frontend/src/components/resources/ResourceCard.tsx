import { Link } from 'react-router-dom'
import type { Resource } from '../../types/resource'
import {
  formatDifficultyLevel,
  formatResourceType,
  resourceDisplaySummary,
} from '../../utils/resourceLabels'
import { Badge } from '../common/Badge'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: Resource
}

function formatAudienceShort(audience: string[]): string {
  if (audience.length === 0) return ''
  if (audience.length <= 2) return audience.join(', ')
  return `${audience.slice(0, 2).join(', ')}…`
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const summary = resourceDisplaySummary(resource)
  const typeLabel = formatResourceType(resource.resourceType)
  const difficultyLabel = formatDifficultyLevel(resource.difficultyLevel)
  const audienceShort = formatAudienceShort(resource.audience ?? [])
  const takeaways = (resource.keyTakeaways ?? []).slice(0, 2)
  const tags = resource.tags ?? []
  const readMinutes = resource.estimatedReadMinutes

  return (
    <article className={styles.card} aria-labelledby={`resource-title-${resource.id}`}>
      <div className={styles.metaRow}>
        <Badge label={resource.category} ariaLabel={`Danh mục: ${resource.category}`} />
        {typeLabel && (
          <span className={styles.metaChip}>{typeLabel}</span>
        )}
        {difficultyLabel && (
          <span className={styles.metaChip}>{difficultyLabel}</span>
        )}
        {readMinutes != null && readMinutes > 0 && (
          <span className={styles.metaChip}>{readMinutes} phút đọc</span>
        )}
      </div>

      <h3 id={`resource-title-${resource.id}`} className={styles.title}>
        <Link to={`/resources/${resource.id}`} className={styles.titleLink}>
          {resource.title}
        </Link>
      </h3>

      <p className={styles.summary}>{summary}</p>

      {audienceShort && (
        <p className={styles.audience}>
          <span className={styles.labelInline}>Phù hợp với:</span> {audienceShort}
        </p>
      )}

      {takeaways.length > 0 && (
        <div className={styles.takeaways}>
          <p className={styles.takeawaysHeading}>Bạn sẽ biết:</p>
          <ul className={styles.takeawaysList}>
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <ul className={styles.tagList} aria-label="Thẻ liên quan">
          {tags.slice(0, 4).map((tag) => (
            <li key={tag}>
              <span className={styles.tag}>{tag}</span>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.cta}>
        <Link
          to={`/resources/${resource.id}`}
          className={styles.detailLink}
          aria-label={`Xem hướng dẫn: ${resource.title}`}
        >
          Xem hướng dẫn
          <span aria-hidden="true"> →</span>
        </Link>
      </p>
    </article>
  )
}
