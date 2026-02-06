import { PageContainer } from '@/components/layout/PageContainer.tsx'

export function PrivacyPage() {
  return (
    <PageContainer className="max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          This website is designed for entertainment purposes only. We are
          committed to protecting your privacy and being transparent about the
          limited data we collect.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            1. Information We Collect
          </h2>
          <p>
            HOF Predictor is a client-side application. We do not require
            account creation, login, or any personal information to use the
            Website. We do not collect, store, or process personal data such as
            names, email addresses, or payment information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            2. Cookies and Local Storage
          </h2>
          <p>
            The Website may use browser local storage to save your theme
            preference (light or dark mode). This data remains on your device
            and is not transmitted to any server. We do not use tracking cookies
            or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            3. Third-Party Services
          </h2>
          <p>
            The Website is hosted on Vercel and makes requests to the following
            third-party APIs to retrieve publicly available baseball data:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>MLB Stats API (statsapi.mlb.com) for player statistics and biographical data</li>
            <li>FanGraphs API for WAR (Wins Above Replacement) data</li>
            <li>MLB static content servers for player headshot images</li>
          </ul>
          <p className="mt-2">
            These third-party services may have their own privacy policies. We
            encourage you to review their policies for information on how they
            handle data.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            4. Analytics
          </h2>
          <p>
            The Website may use basic hosting analytics provided by Vercel to
            understand aggregate traffic patterns (e.g., page views and
            geographic regions). These analytics do not identify individual
            users and do not track personal information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            5. Data Retention
          </h2>
          <p>
            Since we do not collect personal data, there is no personal data to
            retain. Theme preferences stored in your browser's local storage can
            be cleared at any time through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            6. Children's Privacy
          </h2>
          <p>
            The Website does not knowingly collect any personal information from
            children under the age of 13. Since no personal data is collected
            from any user, the Website is safe for all ages.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            8. Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, please open an
            issue on our GitHub repository.
          </p>
        </section>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Last updated: February 2026
        </p>
      </div>
    </PageContainer>
  )
}
