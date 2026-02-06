import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            For entertainment purposes only. Not affiliated with MLB or the
            Baseball Hall of Fame.
          </p>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:w-full">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              HOF Predictor - JAWS-based Hall of Fame analysis
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
              <span>Data: MLB Stats API</span>
              <span>WAR: FanGraphs</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Link
                to="/terms"
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
