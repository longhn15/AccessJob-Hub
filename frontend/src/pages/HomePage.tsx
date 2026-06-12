import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const FEATURES = [
  {
    title: 'Việc làm dễ tiếp cận',
    description: 'Danh sách việc làm có thông tin hỗ trợ tiếp cận và bộ lọc rõ ràng.',
    to: '/jobs',
    cta: 'Xem việc làm',
  },
  {
    title: 'Tài nguyên học tập',
    description: 'Tài liệu WCAG, kỹ năng số và hướng dẫn tìm việc cho người khuyết tật.',
    to: '/resources',
    cta: 'Xem tài nguyên',
  },
  {
    title: 'Accessibility Statement',
    description: 'Cam kết WCAG 2.2 và kế hoạch kiểm thử bàn phím, axe, Lighthouse, screen reader.',
    to: '/accessibility',
    cta: 'Đọc tuyên bố',
  },
  {
    title: 'Thiết kế inclusive',
    description: 'Font dễ đọc, contrast cao, focus visible và điều hướng bằng bàn phím.',
    to: '/accessibility',
    cta: 'Tìm hiểu thêm',
  },
]

export function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroCopy}>
          <h1 id="home-heading" className={styles.title}>
            Chào mừng đến với AccessJob Hub
          </h1>
          <p className={styles.lead}>
            Website hỗ trợ người khuyết tật tiếp cận thông tin việc làm, tài nguyên học tập và các
            công cụ theo tiêu chuẩn WCAG 2.2.
          </p>
          <div className={styles.heroActions}>
            <Link to="/jobs" className={styles.primaryButton}>
              Tìm việc làm
            </Link>
            <Link to="/resources" className={styles.secondaryButton}>
              Khám phá tài nguyên
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.sectionTitle}>
          Bắt đầu tại đây
        </h2>
        <ul className={styles.featureGrid}>
          {FEATURES.map((feature, index) => (
            <li key={feature.title}>
              <article className={styles.featureCard} aria-labelledby={`feature-${index}`}>
                <h3 id={`feature-${index}`} className={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={styles.featureText}>{feature.description}</p>
                <Link to={feature.to} className={styles.featureLink}>
                  {feature.cta}
                  <span aria-hidden="true"> →</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
