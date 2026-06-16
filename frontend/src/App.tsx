import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AccessibilityPreferencesProvider } from './components/accessibility/AccessibilityPreferencesProvider'
import { Layout } from './components/Layout/Layout'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { HomePage } from './pages/HomePage'
import { JobDetailPage } from './pages/JobDetailPage'
import { JobMatchingPage } from './pages/JobMatchingPage'
import { JobsListPage } from './pages/JobsListPage'
import { ResourceDetailPage } from './pages/ResourceDetailPage'
import { ResourcesListPage } from './pages/ResourcesListPage'
import { Wcag22ConformancePage } from './pages/Wcag22ConformancePage'

function App() {
  return (
    <AccessibilityPreferencesProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/job-matching" element={<JobMatchingPage />} />
            <Route path="/resources" element={<ResourcesListPage />} />
            <Route path="/resources/:id" element={<ResourceDetailPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/wcag-22" element={<Wcag22ConformancePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AccessibilityPreferencesProvider>
  )
}

export default App
