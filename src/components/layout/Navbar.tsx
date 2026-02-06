import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle.tsx'
import { SearchBar } from '@/components/search/SearchBar.tsx'

const navLinks = [
  { to: '/', label: 'HOF Predictor' },
  { to: '/players', label: 'All Players' },
  { to: '/hall-of-fame', label: 'Hall of Fame' },
  { to: '/hall-of-very-good', label: 'Hall of Very Good' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">HOF Predictor</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Persistent search bar — hidden on dashboard which has its own */}
        {!isDashboard && (
          <div className="hidden flex-1 md:block md:max-w-sm lg:max-w-md">
            <SearchBar />
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {/* Mobile search bar */}
          {!isDashboard && (
            <div className="mt-2 px-3">
              <SearchBar />
            </div>
          )}
        </nav>
      )}
    </header>
  )
}
