import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { App } from './App.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { PlayerDetailPage } from './pages/PlayerDetailPage.tsx'
import { SearchPage } from './pages/SearchPage.tsx'
import { HallOfFamePage } from './pages/HallOfFamePage.tsx'
import { HallOfVeryGoodPage } from './pages/HallOfVeryGoodPage.tsx'
import { AllPlayersPage } from './pages/AllPlayersPage.tsx'
import { AboutPage } from './pages/AboutPage.tsx'
import { TermsPage } from './pages/TermsPage.tsx'
import { PrivacyPage } from './pages/PrivacyPage.tsx'
import { ComingSoonPage } from './pages/ComingSoonPage.tsx'
import './index.css'

const mlbRoutes = [
  { index: true, element: <DashboardPage /> },
  { path: 'player/:playerId', element: <PlayerDetailPage /> },
  { path: 'search', element: <SearchPage /> },
  { path: 'players', element: <AllPlayersPage /> },
  { path: 'hall-of-fame', element: <HallOfFamePage /> },
  { path: 'hall-of-very-good', element: <HallOfVeryGoodPage /> },
]

const nhlRoutes = [
  { index: true, element: <ComingSoonPage sport="nhl" sportName="NHL" /> },
  { path: '*', element: <ComingSoonPage sport="nhl" sportName="NHL" /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Redirect root to /mlb
      { index: true, element: <Navigate to="/mlb" replace /> },
      // MLB routes
      { path: 'mlb', children: mlbRoutes },
      // NHL routes
      { path: 'nhl', children: nhlRoutes },
      // Shared routes (no sport prefix)
      { path: 'about', element: <AboutPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      // Legacy redirects — old routes without sport prefix
      { path: 'player/:playerId', element: <Navigate to="/mlb" replace /> },
      { path: 'search', element: <Navigate to="/mlb/search" replace /> },
      { path: 'players', element: <Navigate to="/mlb/players" replace /> },
      { path: 'hall-of-fame', element: <Navigate to="/mlb/hall-of-fame" replace /> },
      { path: 'hall-of-very-good', element: <Navigate to="/mlb/hall-of-very-good" replace /> },
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
