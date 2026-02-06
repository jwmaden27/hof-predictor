import { PageContainer } from '@/components/layout/PageContainer.tsx'

export function TermsPage() {
  return (
    <PageContainer className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Terms and Conditions
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          This website is designed for entertainment purposes only. The
          predictions, scores, and analysis presented here are based on
          statistical models and should not be treated as definitive assessments
          of any player's Hall of Fame candidacy.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using HOF Predictor ("the Website"), you accept and
            agree to be bound by these Terms and Conditions. If you do not agree
            to these terms, please do not use the Website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            2. Entertainment Purpose
          </h2>
          <p>
            All content on this Website, including but not limited to Hall of
            Fame predictions, probability scores, JAWS analysis, career
            projections, ballot predictions, and milestone tracking, is provided
            solely for entertainment and informational purposes. Nothing on this
            Website constitutes professional advice, official MLB analysis, or
            guaranteed outcomes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            3. No Warranty
          </h2>
          <p>
            The Website and its content are provided on an "as is" and "as
            available" basis without warranties of any kind, either express or
            implied. We do not warrant that the predictions, statistics, or
            analysis will be accurate, complete, or current. Statistical models
            are inherently imperfect and do not account for all factors that
            influence Hall of Fame voting.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            4. Data Sources
          </h2>
          <p>
            Player statistics, biographical data, and WAR (Wins Above
            Replacement) data are sourced from publicly available APIs and
            datasets including the MLB Stats API and FanGraphs. We do not
            guarantee the accuracy or timeliness of third-party data. The JAWS
            methodology was created by Jay Jaffe.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            5. Intellectual Property
          </h2>
          <p>
            All trademarks, logos, and team names referenced on this Website
            belong to their respective owners, including Major League Baseball
            and its member clubs. This Website is not affiliated with, endorsed
            by, or sponsored by MLB, the Baseball Hall of Fame, Baseball
            Reference, or FanGraphs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            6. Limitation of Liability
          </h2>
          <p>
            In no event shall HOF Predictor or its creators be liable for any
            direct, indirect, incidental, special, or consequential damages
            arising out of or in connection with your use of the Website. This
            includes, without limitation, any reliance on the predictions or
            analysis provided.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            7. Use Restrictions
          </h2>
          <p>
            You agree not to use the Website for any unlawful purpose or in any
            way that could damage, disable, or impair the Website. You may not
            use automated tools to scrape or extract data from the Website
            beyond reasonable personal use.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Continued use of the Website after any changes constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Last updated: February 2026
        </p>
      </div>
    </PageContainer>
  )
}
