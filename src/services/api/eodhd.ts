/**
 * EODHD (End of Day Historical Data) adapter
 * Docs: https://eodhd.com/financial-apis/
 *
 * Best provider for African market coverage: JSE, NGX, NSE, GSE, BRVM, etc.
 * Free tier: 20 API calls/day. Paid plans from $19.99/mo.
 *
 * Symbol format: "NPN.JSE", "SCOM.NSE", "MTN.JSE"
 */
import type { MarketProvider, Quote, OHLCV, IndexSnapshot, ForexRate, NewsItem, Mover } from './types'

const BASE = 'https://eodhd.com/api'
const KEY  = import.meta.env.VITE_EODHD_KEY as string

// EODHD exchange codes
const EXCHANGE_MAP: Record<string, string> = {
  jse:  'JSE',
  ngx:  'NGX',
  nse:  'NSE',    // Nairobi — EODHD uses "NSE" (also used for NSE India — check docs)
  gse:  'GSE',
  brvm: 'BRVM',
  zse:  'ZSE',
  bse:  'BSE',
  luse: 'LUSE',
}

// Index tickers per exchange (EODHD format)
const INDEX_SYMBOLS: Record<string, { symbol: string; name: string; currency: string }[]> = {
  JSE:  [{ symbol: 'J203.INDX',  name: 'JSE All Share',     currency: 'ZAR' },
         { symbol: 'J200.INDX',  name: 'JSE Top 40',        currency: 'ZAR' }],
  NGX:  [{ symbol: 'NGXASI.INDX', name: 'NGX All Share',    currency: 'NGN' }],
  NSE:  [{ symbol: 'NSE20.INDX', name: 'NSE 20 Share',      currency: 'KES' }],
  GSE:  [{ symbol: 'GSECI.INDX', name: 'GSE Composite',     currency: 'GHS' }],
  BRVM: [{ symbol: 'BRVMCI.INDX', name: 'BRVM Composite',  currency: 'XOF' }],
}

async function get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_token', KEY)
  url.searchParams.set('fmt', 'json')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`EODHD ${path}: ${res.status}`)
  return res.json() as Promise<T>
}

export const eodhdProvider: MarketProvider = {
  name: 'eodhd',

  async getQuote(symbol) {
    // Symbol must be in "TICKER.EXCHANGE" format e.g. "NPN.JSE"
    const parts   = symbol.includes('.') ? symbol : `${symbol}.JSE`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d       = await get<any>(`/real-time/${parts}`)
    const close   = parseFloat(d.close ?? d.previousClose ?? 0)
    const prev    = parseFloat(d.previousClose ?? close)
    return {
      symbol:    parts,
      name:      d.name ?? symbol,
      price:     close,
      change:    +(close - prev).toFixed(4),
      changePct: prev ? +((close - prev) / prev * 100).toFixed(2) : 0,
      currency:  d.currency ?? 'USD',
      exchange:  parts.split('.')[1] ?? '',
      timestamp: Date.now(),
    } satisfies Quote
  },

  async getHistory(symbol, days) {
    const parts = symbol.includes('.') ? symbol : `${symbol}.JSE`
    const to    = new Date().toISOString().slice(0, 10)
    const from  = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data  = await get<any[]>(`/eod/${parts}`, { from, to, period: 'd' })
    return (data ?? []).map((d): OHLCV => ({
      time:   new Date(d.date).getTime(),
      open:   d.open,
      high:   d.high,
      low:    d.low,
      close:  d.close,
      volume: d.volume ?? 0,
    }))
  },

  async getIndices(exchange = 'jse') {
    const ex   = EXCHANGE_MAP[exchange.toLowerCase()] ?? exchange.toUpperCase()
    const defs = INDEX_SYMBOLS[ex] ?? []
    if (!defs.length) return []

    const snapshots: IndexSnapshot[] = []
    for (const def of defs) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = await get<any>(`/real-time/${def.symbol}`)
        const close = parseFloat(d.close ?? d.previousClose ?? 0)
        const prev  = parseFloat(d.previousClose ?? close)
        snapshots.push({
          id:        def.symbol.toLowerCase().replace('.', '-'),
          name:      def.name,
          exchange:  ex,
          value:     close,
          change:    +(close - prev).toFixed(2),
          changePct: prev ? +((close - prev) / prev * 100).toFixed(2) : 0,
          currency:  def.currency,
          sparkline: [],
          timestamp: Date.now(),
        })
      } catch {
        // skip failed indices
      }
    }
    return snapshots
  },

  async getForex() {
    const pairs = ['USDZAR', 'USDNGN', 'USDKES', 'USDGHS', 'USDEGP', 'USDETB']
    const rates: ForexRate[] = []

    for (const pair of pairs) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d    = await get<any>(`/real-time/${pair}.FOREX`)
        const rate = parseFloat(d.close ?? 1)
        const prev = parseFloat(d.previousClose ?? rate)
        rates.push({
          base:      pair.slice(0, 3),
          quote:     pair.slice(3),
          rate,
          change:    +(rate - prev).toFixed(5),
          changePct: prev ? +((rate - prev) / prev * 100).toFixed(2) : 0,
          timestamp: Date.now(),
        })
      } catch {
        // skip failed pair
      }
    }
    return rates
  },

  async getNews(query = 'africa') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await get<any[]>('/news', { t: query, limit: '20', offset: '0' })
    return (data ?? []).map((d, i): NewsItem => ({
      id:          String(d.id ?? i),
      headline:    d.title,
      source:      d.link?.replace(/https?:\/\/(www\.)?/, '').split('/')[0] ?? 'EODHD',
      url:         d.link ?? '#',
      publishedAt: new Date(d.date ?? 0).getTime(),
      symbols:     (d.symbols ?? []).map((s: { code: string }) => s.code),
      summary:     d.content?.slice(0, 200),
    }))
  },

  async getCommodities() {
    // EODHD serves commodities as FOREX-like pairs via the COMM exchange
    // Gold: GC.COMM, Oil: CL.COMM, etc.
    const specs = [
      { id: 'gold',     sym: 'GC.COMM',  name: 'Gold',        unit: 'oz',  currency: 'USD' },
      { id: 'silver',   sym: 'SI.COMM',  name: 'Silver',      unit: 'oz',  currency: 'USD' },
      { id: 'platinum', sym: 'PL.COMM',  name: 'Platinum',    unit: 'oz',  currency: 'USD' },
      { id: 'brent',    sym: 'BZ.COMM',  name: 'Brent Crude', unit: 'bbl', currency: 'USD' },
      { id: 'wti',      sym: 'CL.COMM',  name: 'WTI Crude',   unit: 'bbl', currency: 'USD' },
      { id: 'cocoa',    sym: 'CC.COMM',  name: 'Cocoa',       unit: 'MT',  currency: 'USD' },
      { id: 'coffee',   sym: 'KC.COMM',  name: 'Coffee',      unit: 'lb',  currency: 'USD' },
      { id: 'copper',   sym: 'HG.COMM',  name: 'Copper',      unit: 'lb',  currency: 'USD' },
    ]

    const results = await Promise.allSettled(
      specs.map(async s => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d     = await get<any>(`/real-time/${s.sym}`)
        const close = parseFloat(d.close ?? 0)
        const prev  = parseFloat(d.previousClose ?? close)
        return {
          id:        s.id,
          name:      s.name,
          price:     close,
          change:    +(close - prev).toFixed(4),
          changePct: prev ? +((close - prev) / prev * 100).toFixed(2) : 0,
          unit:      s.unit,
          currency:  s.currency,
          timestamp: Date.now(),
        }
      })
    )
    return results
      .filter((r): r is PromiseFulfilledResult<ReturnType<typeof Object.assign>> => r.status === 'fulfilled')
      .map(r => r.value)
  },

  async getTopMovers(exchange = 'jse') {
    const ex = EXCHANGE_MAP[exchange.toLowerCase()] ?? exchange.toUpperCase()
    // EODHD screener endpoint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await get<any>('/screener', {
      filters: JSON.stringify([['exchange', '=', ex]]),
      sort:    'change_p_d',
      limit:   '20',
      offset:  '0',
    })

    const items = (data?.data ?? []).map((d: {
      code: string; name: string; exchange: string;
      close: number; change_p: number; volume: number;
    }): Mover => ({
      symbol:    d.code,
      name:      d.name ?? d.code,
      exchange:  d.exchange ?? ex,
      price:     d.close ?? 0,
      changePct: d.change_p ?? 0,
      volume:    d.volume,
    }))

    const gainers = items.filter((m: Mover) => m.changePct > 0).slice(0, 5)
    const losers  = items.filter((m: Mover) => m.changePct < 0).reverse().slice(0, 5)
    return { gainers, losers }
  },
}
