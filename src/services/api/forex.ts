/**
 * Dedicated forex service — always live, never falls back to mock.
 *
 * Source: open.er-api.com (free, no key, daily ECB/IMF data)
 * Day-over-day change: computed by comparing today's rates with yesterday's
 * rates stored in localStorage (keyed by date). On first load, change shows 0%.
 *
 * Twelve Data is NOT used here — it burns credits on polling.
 * Twelve Data is reserved for on-demand StockDetail quotes only.
 */
import type { ForexRate } from './types'

const PAIRS: { base: string; quote: string }[] = [
  { base: 'USD', quote: 'ZAR' },
  { base: 'USD', quote: 'NGN' },
  { base: 'USD', quote: 'KES' },
  { base: 'USD', quote: 'GHS' },
  { base: 'USD', quote: 'EGP' },
  { base: 'USD', quote: 'ETB' },
  { base: 'USD', quote: 'XOF' },
  { base: 'USD', quote: 'UGX' },
  { base: 'ZAR', quote: 'USD' },
]

const LS_KEY = 'zamani_forex_rates'

interface CachedRates { date: string; rates: Record<string, number> }

function loadCache(): CachedRates | null {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? 'null') } catch { return null }
}

function saveCache(data: CachedRates) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch { /* storage quota */ }
}

export async function getLiveForex(): Promise<ForexRate[]> {
  const today = new Date().toISOString().slice(0, 10)

  const res = await fetch('https://open.er-api.com/v6/latest/USD')
  if (!res.ok) throw new Error(`open.er-api.com: ${res.status}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await res.json() as any
  const usdRates: Record<string, number> = data.rates ?? {}

  // Build current rate map (key = "BASE/QUOTE")
  const current: Record<string, number> = {}
  for (const { base, quote } of PAIRS) {
    const key = `${base}/${quote}`
    if (base === 'USD') {
      current[key] = usdRates[quote] ?? 0
    } else {
      // ZAR/USD = inverse of USD/ZAR
      current[key] = usdRates[base] ? +(1 / usdRates[base]).toFixed(6) : 0
    }
  }

  // Load previous day's cache — only useful if it's from a different date
  const cached = loadCache()
  const prevRates = (cached && cached.date !== today) ? cached.rates : null

  // Save today's rates (becomes "yesterday" on the next calendar day)
  saveCache({ date: today, rates: current })

  return PAIRS.map(({ base, quote }): ForexRate => {
    const key      = `${base}/${quote}`
    const rate     = current[key] ?? 0
    const prevRate = prevRates?.[key] ?? 0
    const change    = prevRate ? +(rate - prevRate).toFixed(5) : 0
    const changePct = prevRate ? +((change / prevRate) * 100).toFixed(2) : 0
    return {
      base, quote,
      rate:      +rate.toFixed(base === 'ZAR' ? 6 : 4),
      change,
      changePct,
      timestamp: Date.now(),
    }
  })
}
