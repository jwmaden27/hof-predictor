import { NavLink } from 'react-router-dom'
import { SPORTS, type Sport } from '@/hooks/useSport.ts'

const sportOrder: Sport[] = ['mlb', 'nhl']

export function SportSwitcher() {
  return (
    <div className="border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-0" aria-label="Sport selector">
          {sportOrder.map((sportId) => {
            const sport = SPORTS[sportId]
            return (
              <NavLink
                key={sportId}
                to={`/${sportId}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {sport.name}
                    {isActive && (
                      <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t bg-blue-600 dark:bg-blue-400" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
