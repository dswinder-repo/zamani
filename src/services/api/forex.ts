/**
 * Dedicated forex service — always live, never falls back to mock.
 *
 * Primary:  Twelve Data /quote (requires VITE_TWELVE_DATA_KEY)
 *           → gives accurate rate + previous_close change %
 *
 * Fallback: open.er-api.com (free, no key, daily ECB/IMF data)
 *           → spot rate only, change shown as 0%
 */
import type { ForexRate } from './types'

const TWELVE_KEY = import.meta.env.VITE_TWELVE_DATA_KEY as string | undefined

/** All pairs Zamani tracks, including UGX for Uganda */
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

// ── Twelve Data source ────────────────────────────────────────────────────────

async function fromTwelve(): Promise<ForexRate[]> {
  const symbols = PAIRS.map(p => `${p.base}/${p.quote}`).join(',')
  const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbols)}&apikey=${TWELVE_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Twelve Data forex: ${res.status}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await res.json() as any
  // Single pair → object; multiple → array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arr: any[] = Array.isArray(data) ? data : [data]

  return arr
    .filter(d => d && d.symbol && !d.status) // skip error objects
    .map((d): ForexRate => {
      const [base, quote] = (d.symbol as string).split('/')
      const rate      = parseFloat(d.close ?? d.price ?? 0)
      const changePct = parseFloat(d.percent_change ?? 0)
      const change    = parseFloat(d.change ?? 0)
      return {
        base,
        quote,
        rate:      +rate.toFixed(base === 'ZAR' ? 6 : 4),
        change:    +change.toFixed(5),
        changePct: +changePct.toFixed(2),
        timestamp: Date.now(),
      }
    })
}

// ── open.er-api.com fallback ──────────────────────────────────────────────────

async function fromOpenER(): Promise<ForexRate[]> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD')
  if (!res.ok) throw new Error(`open.er-api.com: ${res.status}`)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await res.json() as any
  const rates: Record<string, number> = data.rates ?? {}

  return PAIRS.map(({ base, quote }): ForexRate => {
    const rate = base === 'USD'
      ? (rates[quote] ?? 0)
      : (rates[base] ? +(1 / rates[base]).toFixed(6) : 0)
    return { base, quote, rate: +rate.toFixed(4), change: 0, changePct: 0, timestamp: Date.now() }
  })
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getLiveForex(): Promise<ForexRate[]> {
  if (TWELVE_KEY) {
    try {
      return await fromTwelve()
    } catch (err) {
      console.warn('[Zamani] Twelve Data forex failed, falling back to open.er-api.com:', err)
    }
  }
  return fromOpenER()
}
