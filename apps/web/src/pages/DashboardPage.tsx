import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { SearchBar } from '@/components/search/SearchBar.tsx'
import { BallotPlayerCard } from '@/components/player/BallotPlayerCard.tsx'
import { useBallotLeaderboard } from '@/hooks/useBallotLeaderboard.ts'

export function DashboardPage() {
  const { entries: ballotCandidates, ballotYear } = useBallotLeaderboard()

  // Separate elected from still on ballot
  const elected = ballotCandidates.filter(c => c.isElected)
  const onBallot = ballotCandidates.filter(c => !c.isElected)

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 text-center text-white dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Baseball Hall of Fame Predictor
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            JAWS-based analysis of active and recent players. Evaluate HOF
            likelihood using career WAR, peak performance, awards, and
            milestones.
          </p>
          <SearchBar variant="large" className="mx-auto max-w-xl" />
        </div>
      </div>

      <PageContainer>
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {ballotYear} BBWAA Hall of Fame Ballot
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            75% of the vote required for election
          </p>
        </div>

        {/* Elected Section */}
        {elected.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Elected to the Hall of Fame
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {elected.map((entry) => (
                <BallotPlayerCard key={entry.playerId} player={entry} />
              ))}
            </div>
          </div>
        )}

        {/* On Ballot Section */}
        {onBallot.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Current Ballot Candidates
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {onBallot.map((entry) => (
                <BallotPlayerCard key={entry.playerId} player={entry} />
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </>
  )
}
