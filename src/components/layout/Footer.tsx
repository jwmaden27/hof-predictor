export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            HOF Predictor - JAWS-based Hall of Fame analysis
          </p>
          <div className="flex gap-4 text-sm text-gray-400 dark:text-gray-500">
            <span>Data: MLB Stats API</span>
            <span>WAR: Baseball-Reference</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
