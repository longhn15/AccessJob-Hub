import type { ReactNode } from 'react'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <a href="#main-content" className={styles.skipLink}>
        Chuyển đến nội dung chính
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logo}>
            AccessJob Hub
          </a>
          <nav aria-label="Điều hướng chính">
            <ul className={styles.navList}>
              <li>
                <a href="/" aria-current="page">
                  Trang chủ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>AccessJob Hub — Nền tảng việc làm dễ tiếp cận theo tiêu chuẩn WCAG 2.2.</p>
        </div>
      </footer>
    </div>
  )
}
