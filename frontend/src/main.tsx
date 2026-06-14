import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initAccessibilityPreferences } from './utils/accessibilityPreferences'
import './index.css'
import App from './App.tsx'

initAccessibilityPreferences()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
