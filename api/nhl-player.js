/**
 * Vercel serverless function: /api/nhl-player?id=8465009
 *
 * Proxies requests to the NHL API player landing endpoint.
 * Needed because api-web.nhle.com doesn't return CORS headers.
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  const { id } = req.query
  if (!id) {
    return res.status(400).json({ error: 'id query parameter is required' })
  }

  const playerId = parseInt(id, 10)
  if (isNaN(playerId)) {
    return res.status(400).json({ error: 'id must be a number' })
  }

  try {
    const response = await fetch(
      `https://api-web.nhle.com/v1/player/${playerId}/landing`
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: `NHL API returned ${response.status}`,
      })
    }

    const data = await response.json()
    return res.status(200).json(data)
  } catch (e) {
    console.error('NHL player proxy error:', e)
    return res.status(500).json({ error: 'Failed to fetch player data' })
  }
}
