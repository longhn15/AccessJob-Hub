import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/jobs', label: 'Việc làm', end: false },
  { to: '/resources', label: 'Tài nguyên', end: false },
  { to: '/accessibility', label: 'Accessibility', end: false },
] as const

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <a href="#main-content" className={styles.skipLink}>
        Chuyển đến nội dung chính
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            AccessJob Hub
          </Link>
          <nav aria-label="Điều hướng chính">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
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
          <p className={styles.footerLinks}>
            <Link to="/accessibility">Tuyên bố accessibility</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
