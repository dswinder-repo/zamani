/**
 * Twelve Data adapter
 * Docs: https://twelvedata.com/docs
 *
 * Covers: global equities, forex, ETFs, crypto
 * Free tier: 800 req/day, 8 req/min
 * African exchange symbols: e.g. "NPN:JSE", "SCOM:NSE", "MTN:JSE"
 */
import type { MarketProvider, Quote, OHLCV, IndexSnapshot, ForexRate, NewsItem } from './types'

const BASE = 'https://api.twelvedata.com'
const KEY  = import.meta.env.VITE_TWELVE_DATA_KEY as string

// Twelve Data exchange codes (their naming)
const EXCHANGE_MAP: Record<string, string> = {
  jse:  'JSE',
  ngx:  'NGX',
  nse:  'NSE',
  gse:  'GSE',
  brvm: 'BRVM',
  zse:  'ZSE',
  bse:  'BSE',
  luse: 'LUSE',
}

// Representative index symbols per exchange
const INDEX_SYMBOLS: Record<string, { symbol: string; name: string; currency: string }[]> = {
  JSE:  [{ symbol: 'J203:JSE', name: 'JSE All Share',  currency: 'ZAR' },
         { symbol: 'J200:JSE', name: 'JSE Top 40',     currency: 'ZAR' }],
  NGX:  [{ symbol: 'NGX:NGX', name: 'NGX All Share',   currency: 'NGN' }],
  NSE:  [{ symbol: 'NSE20:NSE', name: 'NSE 20 Share',  currency: 'KES' }],
  GSE:  [{ symbol: 'GSECI:GSE', name: 'GSE Composite', currency: 'GHS' }],
  BRVM: [{ symbol: 'BRVMCI:BRVM', name: 'BRVM Composite', currency: 'XOF' }],
}

const FOREX_PAIRS = [
  { base: 'USD', quote: 'ZAR' }, { base: 'USD', quote: 'NGN' },
  { base: 'USD', quote: 'KES' }, { base: 'USD', quote: 'GHS' },
  { base: 'USD', quote: 'EGP' }, { base: 'USD', quote: 'ETB' },
  { base: 'USD', quote: 'XOF' }, { base: 'ZAR', quote: 'USD' },
]

async function get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('apikey', KEY)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Twelve Data ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseChange(d: any): { change: number; changePct: number } {
  const close  = parseFloat(d.close  ?? d.price ?? 0)
  const prev   = parseFloat(d.previous_close ?? close)
  const change = +(close - prev).toFixed(4)
  const pct    = prev ? +((change / prev) * 100).toFixed(2) : 0
  return { change, changePct: pct }
}

export const twelveDataProvider: MarketProvider = {
  name: 'twelve',

  async getQuote(symbol) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = await get<any>('/quote', { symbol })
    const { change, changePct } = parseChange(d)
    return {
      symbol:    d.symbol,
      name:      d.name ?? symbol,
      price:     parseFloat(d.close ?? d.price),
      change,    changePct,
      currency:  d.currency ?? 'USD',
      exchange:  d.exchange ?? '',
      timestamp: Date.now(),
    } satisfies Quote
  },

  async getHistory(symbol, days) {
    const outputsize = String(days + 1)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = await get<any>('/time_series', { symbol, interval: '1day', outputsize })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (d.values ?? []).map((v: any): OHLCV => ({
      time:   new Date(v.datetime).getTime(),
      open:   parseFloat(v.open),
      high:   parseFloat(v.high),
      low:    parseFloat(v.low),
      close:  parseFloat(v.close),
      volume: parseInt(v.volume ?? '0', 10),
    })).reverse()
  },

  async getIndices(exchange = 'jse') {
    const ex  = EXCHANGE_MAP[exchange.toLowerCase()] ?? exchange.toUpperCase()
    const defs = INDEX_SYMBOLS[ex] ?? []
    if (!defs.length) return []

    const symbols = defs.map(d => d.symbol).join(',')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await get<any>('/quote', { symbol: symbols })
    // Twelve Data returns object for single, array for multiple
    const quotes: unknown[] = Array.isArray(data) ? data : [data]

    return quotes.map((q: unknown, i): IndexSnapshot => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = q as any
      const def = defs[i]
      const close = parseFloat(r.close ?? 0)
      const prev  = parseFloat(r.previous_close ?? close)
      return {
        id:        def.symbol.toLowerCase().replace(':', '-'),
        name:      def.name,
        exchange:  ex,
        value:     close,
        change:    +(close - prev).toFixed(2),
        changePct: prev ? +((close - prev) / prev * 100).toFixed(2) : 0,
        currency:  def.currency,
        sparkline: [],   // requires separate history call — omit for now
        timestamp: Date.now(),
      }
    })
  },

  async getForex(pairs = []) {
    const resolved = pairs.length
      ? pairs.map(p => p.replace('/', ''))
      : FOREX_PAIRS.map(p => `${p.base}${p.quote}`)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await get<any>('/exchange_rate', { symbol: resolved.join(',') })
    const arr: unknown[] = Array.isArray(data) ? data : [data]

    return arr.map((d: unknown, i): ForexRate => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = d as any
      const pair = FOREX_PAIRS[i] ?? { base: 'USD', quote: 'USD' }
      const rate  = parseFloat(r.rate ?? 1)
      const prev  = parseFloat(r.previous_close ?? rate)
      return {
        base:      r.base_currency  ?? pair.base,
        quote:     r.quote_currency ?? pair.quote,
        rate,
        change:    +(rate - prev).toFixed(5),
        changePct: prev ? +((rate - prev) / prev * 100).toFixed(2) : 0,
        timestamp: Date.now(),
      }
    })
  },

  async getNews(query = 'africa markets') {
    // Twelve Data doesn't provide news — return empty, fall back to mock or another source
    console.warn('Twelve Data does not provide news. Wire in a news API (e.g. NewsAPI) for live headlines.')
    return [] as NewsItem[]
  },
}
