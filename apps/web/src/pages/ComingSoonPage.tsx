import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { Link } from 'react-router-dom'

interface ComingSoonPageProps {
  sport: string
  sportName: string
}

export function ComingSoonPage({ sport, sportName }: ComingSoonPageProps) {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 text-6xl">
          {sport === 'nhl' ? '\u{1F3D2}' : '\u{26BE}'}
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {sportName} HOF Predictor
        </h1>
        <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
          Coming Soon
        </p>
        <p className="mb-8 max-w-md text-sm text-gray-500 dark:text-gray-500">
          We're building a {sportName} Hall of Fame prediction tool with the same
          JAWS-based analysis you know from our baseball predictor. Stay tuned!
        </p>
        <Link
          to="/mlb"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Check out MLB HOF Predictor
        </Link>
      </div>
    </PageContainer>
  )
}
