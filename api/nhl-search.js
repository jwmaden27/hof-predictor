/**
 * Vercel serverless function: /api/nhl-search?q=gretzky
 *
 * Proxies requests to the NHL search API.
 * Needed because search.d3.nhle.com doesn't return CORS headers.
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  const { q, limit } = req.query
  if (!q) {
    return res.status(400).json({ error: 'q query parameter is required' })
  }

  try {
    const searchLimit = limit || '20'
    const response = await fetch(
      `https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=${encodeURIComponent(searchLimit)}&q=${encodeURIComponent(q)}`
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: `NHL Search API returned ${response.status}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (e) {
    console.error('NHL search proxy error:', e)
    return res.status(500).json({ error: 'Failed to search players' })
  }
}
