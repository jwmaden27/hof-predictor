import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { NHLSearchBar } from '@/components/search/NHLSearchBar.tsx'

export function NHLSearchPage() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Search NHL Players
        </h1>
        <NHLSearchBar variant="large" className="max-w-2xl" />
      </div>

      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">Search for any NHL player above</p>
        <p className="mt-2 text-sm">
          Enter a player name to see their Hall of Fame analysis, career stats, and JAWS score
        </p>
      </div>
    </PageContainer>
  )
}
