import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <h1 id="home-heading" className={styles.title}>
          Chào mừng đến với AccessJob Hub
        </h1>
        <p className={styles.lead}>
          Website hỗ trợ người khuyết tật tiếp cận thông tin việc làm, tài nguyên học tập
          và gửi form quan tâm theo hướng dễ tiếp cận.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.sectionTitle}>
          Đang phát triển
        </h2>
        <ul className={styles.list}>
          <li>Danh sách việc làm</li>
          <li>Chi tiết việc làm và form ứng tuyển</li>
          <li>Tài nguyên học tập</li>
          <li>Accessibility Statement và form phản hồi</li>
        </ul>
      </section>
    </>
  )
}
