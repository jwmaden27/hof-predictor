import { PageContainer } from '@/components/layout/PageContainer.tsx'
import { HOF_AVERAGES, POSITION_LABELS, ALL_POSITIONS } from '@/data/hof-averages.ts'

export function AboutPage() {
  return (
    <PageContainer className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        About the HOF Predictor
      </h1>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        {/* JAWS */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            What is JAWS?
          </h2>
          <p className="mb-3 leading-relaxed">
            JAWS (Jaffe WAR Score) is a metric created by Jay Jaffe to evaluate
            a player's Hall of Fame worthiness. It balances career value with
            peak performance to address "compilers" (long careers, modest peak)
            versus "peak" players (short but brilliant careers).
          </p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-800">
            JAWS = (Career WAR + Peak 7-Season WAR) / 2
          </div>
          <p className="mt-3 leading-relaxed">
            "Peak" is defined as the sum of a player's 7 best individual-season
            WAR values (not necessarily consecutive). WAR (Wins Above
            Replacement) measures a player's total contribution compared to a
            replacement-level player.
          </p>
        </section>

        {/* Position Averages */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            HOF Averages by Position
          </h2>
          <p className="mb-4 leading-relaxed">
            Each position has a different standard based on the average JAWS of
            inducted Hall of Famers at that position.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-2.5 text-left font-medium text-gray-500 dark:text-gray-400">
                    Position
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500 dark:text-gray-400">
                    Career WAR
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500 dark:text-gray-400">
                    Peak WAR
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-500 dark:text-gray-400">
                    JAWS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {ALL_POSITIONS.map((pos) => {
                  const avg = HOF_AVERAGES[pos]
                  return (
                    <tr key={pos} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100">
                        {pos} — {POSITION_LABELS[pos]}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                        {avg.careerWAR.toFixed(1)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-gray-700 dark:text-gray-300">
                        {avg.peakWAR.toFixed(1)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-semibold text-gray-900 dark:text-gray-100">
                        {avg.jaws.toFixed(1)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scoring Model */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Composite HOF Score
          </h2>
          <p className="mb-3 leading-relaxed">
            Beyond raw JAWS, the predictor uses a composite scoring model (0-100)
            with four components:
          </p>
          <div className="space-y-3">
            {[
              {
                label: 'JAWS Component',
                max: 40,
                desc: 'Based on the ratio of the player\'s JAWS to the HOF average for their position.',
              },
              {
                label: 'Awards',
                max: 25,
                desc: 'MVP (5 pts each), Cy Young (5 pts each), All-Star (0.5 pts each), Gold Glove and Silver Slugger (0.5 pts each).',
              },
              {
                label: 'Milestones',
                max: 20,
                desc: 'Career milestones like 3,000 hits, 500 home runs, 300 wins, 3,000 strikeouts, with partial credit when close.',
              },
              {
                label: 'Trajectory',
                max: 15,
                desc: 'Number of elite seasons (5+ WAR), solid seasons (3+ WAR), and age bonus for active players under 30.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Max: {item.max} pts
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            HOF Tiers
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { tier: 'Hall of Famer', range: 'Inducted into the Baseball Hall of Fame', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' },
              { tier: 'First Ballot Lock', range: '90-100 points', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
              { tier: 'Strong Candidate', range: '75-89 points', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
              { tier: 'Solid Candidate', range: '60-74 points', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
              { tier: 'Borderline', range: '45-59 points', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
              { tier: 'Unlikely', range: '25-44 points', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
              { tier: 'Not HOF Caliber', range: '0-24 points', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
            ].map((item) => (
              <div
                key={item.tier}
                className={`rounded-lg px-4 py-3 ${item.color}`}
              >
                <div className="font-medium">{item.tier}</div>
                <div className="text-sm opacity-80">{item.range}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Data Sources
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>
              <strong>Player bio, stats, and awards:</strong> MLB Stats API
              (statsapi.mlb.com)
            </li>
            <li>
              <strong>WAR data:</strong> Baseball-Reference (bWAR)
            </li>
            <li>
              <strong>JAWS methodology:</strong> Jay Jaffe / Baseball-Reference
            </li>
          </ul>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Limitations
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              WAR data is from a static dataset and may not reflect mid-season
              updates
            </li>
            <li>
              The model does not account for PED suspicion, character clause, or
              subjective voter narrative
            </li>
            <li>
              Postseason performance is not factored into the score
            </li>
            <li>
              DH-primary players are classified at the closest field position
            </li>
          </ul>
        </section>
      </div>
    </PageContainer>
  )
}
