import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { App } from './App.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { PlayerDetailPage } from './pages/PlayerDetailPage.tsx'
import { SearchPage } from './pages/SearchPage.tsx'
import { HallOfFamePage } from './pages/HallOfFamePage.tsx'
import { AllPlayersPage } from './pages/AllPlayersPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'player/:playerId', element: <PlayerDetailPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'players', element: <AllPlayersPage /> },
      { path: 'hall-of-fame', element: <HallOfFamePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
