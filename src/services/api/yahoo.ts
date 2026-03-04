/**
 * Yahoo Finance adapter — live JSE stocks and commodity futures.
 *
 * Uses:
 *   v7/finance/quote  — batch stock quotes (up to 20 symbols per request)
 *   v8/finance/chart  — single symbol quote + OHLCV history
 *
 * Supported exchanges: JSE (.JO suffix), USE (delegated to use.ts adapter)
 * Supported instruments: JSE equities, commodity futures (GC=F, SI=F, etc.)
 *
 * CORS: query1.finance.yahoo.com is generally browser-accessible.
 * If blocked on your deployment (e.g. GitHub Pages), set VITE_YAHOO_PROXY_URL
 * to a Cloudflare Worker proxy URL — the adapter uses it as the base URL.
 * Free Cloudflare Workers: 100K req/day.
 */
import type {
  MarketProvider, Quote, OHLCV, IndexSnapshot, Commodity, Mover, NewsItem,
} from './types'

/** Exchange IDs that have live data connected (JSE via Yahoo, USE via use.ts) */
export const YAHOO_SUPPORTED_EXCHANGES: string[] = ['jse', 'use']

const BASE = (
  (import.meta.env.VITE_YAHOO_PROXY_URL as string | undefined) ??
  'https://query1.finance.yahoo.com'
).replace(/\/$/, '')

// ── JSE symbol catalog (mirrors mock.ts for consistent naming) ────────────────

const JSE_CATALOG: { symbol: string; name: string }[] = [
  { symbol: 'SBK',  name: 'Standard Bank Group' },
  { symbol: 'FSR',  name: 'FirstRand' },
  { symbol: 'CPI',  name: 'Capitec Bank' },
  { symbol: 'ABG',  name: 'Absa Group' },
  { symbol: 'NED',  name: 'Nedbank Group' },
  { symbol: 'INL',  name: 'Investec' },
  { symbol: 'SLM',  name: 'Sanlam' },
  { symbol: 'MMH',  name: 'Momentum Metropolitan' },
  { symbol: 'DSY',  name: 'Discovery' },
  { symbol: 'OMU',  name: 'Old Mutual' },
  { symbol: 'JSE',  name: 'JSE Ltd' },
  { symbol: 'AGL',  name: 'Anglo American' },
  { symbol: 'BHP',  name: 'BHP Group' },
  { symbol: 'AMS',  name: 'Anglo American Platinum' },
  { symbol: 'IMP',  name: 'Impala Platinum' },
  { symbol: 'SSW',  name: 'Sibanye-Stillwater' },
  { symbol: 'GFI',  name: 'Gold Fields' },
  { symbol: 'HAR',  name: 'Harmony Gold' },
  { symbol: 'SOL',  name: 'Sasol' },
  { symbol: 'NPN',  name: 'Naspers' },
  { symbol: 'PRX',  name: 'Prosus' },
  { symbol: 'MTN',  name: 'MTN Group' },
  { symbol: 'VOD',  name: 'Vodacom Group' },
  { symbol: 'TKG',  name: 'Telkom SA' },
  { symbol: 'SHP',  name: 'Shoprite Holdings' },
  { symbol: 'WHL',  name: 'Woolworths Holdings' },
  { symbol: 'PIK',  name: "Pick n Pay" },
  { symbol: 'MRP',  name: 'Mr Price Group' },
  { symbol: 'TFG',  name: 'The Foschini Group' },
  { symbol: 'CLS',  name: 'Clicks Group' },
  { symbol: 'PPH',  name: 'Pepkor Holdings' },
  { symbol: 'BID',  name: 'Bid Corporation' },
  { symbol: 'REM',  name: 'Remgro' },
  { symbol: 'MNP',  name: 'Mondi' },
  { symbol: 'AVI',  name: 'AVI Limited' },
  { symbol: 'BAW',  name: 'Barloworld' },
  { symbol: 'SNT',  name: 'Santam' },
  { symbol: 'LHC',  name: 'Life Healthcare' },
  { symbol: 'GRT',  name: 'Growthpoint Properties' },
  { symbol: 'RDF',  name: 'Redefine Properties' },
]

const JSE_SYMBOL_SET = new Set(JSE_CATALOG.map(s => s.symbol))
const JSE_NAME_MAP   = new Map(JSE_CATALOG.map(s => [s.symbol, s.name]))

/** Add .JO suffix for JSE symbols. Commodity futures (GC=F) and other
 *  suffixed symbols (NPN.JO) pass through unchanged. */
function toYahooSymbol(symbol: string): string {
  if (symbol.includes('.') || symbol.includes('=')) return symbol
  const upper = symbol.toUpperCase()
  if (JSE_SYMBOL_SET.has(upper)) return `${upper}.JO`
  return symbol
}

// ── Commodity futures definitions ─────────────────────────────────────────────

const COMMODITY_DEFS: { id: string; symbol: string; name: string; unit: string }[] = [
  { id: 'gold',     symbol: 'GC=F', name: 'Gold',        unit: 'oz'  },
  { id: 'silver',   symbol: 'SI=F', name: 'Silver',      unit: 'oz'  },
  { id: 'platinum', symbol: 'PL=F', name: 'Platinum',    unit: 'oz'  },
  { id: 'brent',    symbol: 'BZ=F', name: 'Brent Crude', unit: 'bbl' },
  { id: 'wti',      symbol: 'CL=F', name: 'WTI Crude',   unit: 'bbl' },
  { id: 'cocoa',    symbol: 'CC=F', name: 'Cocoa',       unit: 'MT'  },
  { id: 'coffee',   symbol: 'KC=F', name: 'Coffee',      unit: 'lb'  },
  { id: 'copper',   symbol: 'HG=F', name: 'Copper',      unit: 'lb'  },
]

// ── Internal Yahoo Finance types ──────────────────────────────────────────────

interface YFQuoteResult {
  symbol:                     string
  regularMarketPrice?:        number
  regularMarketChange?:       number
  regularMarketChangePercent?: number
  regularMarketVolume?:       number
  longName?:                  string
  shortName?:                 string
  currency?:                  string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const CHUNK_SIZE = 20

async function batchQuote(symbols: string[]): Promise<YFQuoteResult[]> {
  const results: YFQuoteResult[] = []
  for (let i = 0; i < symbols.length; i += CHUNK_SIZE) {
    const chunk = symbols.slice(i, i + CHUNK_SIZE)
    try {
      const url = `${BASE}/v7/finance/quote?symbols=${chunk.join(',')}`
      const res = await fetch(url)
      if (!res.ok) continue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await res.json() as any
      const items: YFQuoteResult[] = data?.quoteResponse?.result ?? []
      results.push(...items)
    } catch {
      // skip failed chunk — caller will see fewer results
    }
  }
  return results
}

function rangeForDays(days: number): string {
  if (days <= 5)   return '5d'
  if (days <= 30)  return '1mo'
  if (days <= 90)  return '3mo'
  if (days <= 180) return '6mo'
  if (days <= 365) return '1y'
  return '2y'
}

// ── Standalone JSE stock fetch (used by both getExchangeStocks and getTopMovers) ──

async function fetchJSEStocks(): Promise<Quote[]> {
  const symbols = JSE_CATALOG.map(s => `${s.symbol}.JO`)
  const quotes  = await batchQuote(symbols)
  if (!quotes.length) return []
  return quotes
    .filter(q => (q.regularMarketPrice ?? 0) > 0)
    .map((q): Quote => {
      const sym = q.symbol.replace('.JO', '')
      return {
        symbol:    sym,
        name:      q.longName ?? q.shortName ?? JSE_NAME_MAP.get(sym) ?? sym,
        price:     q.regularMarketPrice ?? 0,
        change:    +(q.regularMarketChange    ?? 0).toFixed(3),
        changePct: +(q.regularMarketChangePercent ?? 0).toFixed(2),
        volume:    q.regularMarketVolume,
        currency:  q.currency ?? 'ZAR',
        exchange:  'JSE',
        timestamp: Date.now(),
      }
    })
}

// ── Provider implementation ───────────────────────────────────────────────────

export const yahooProvider: MarketProvider = {
  name: 'yahoo',

  async getQuote(symbol: string): Promise<Quote> {
    const ySym = toYahooSymbol(symbol)
    const url  = `${BASE}/v8/finance/chart/${encodeURIComponent(ySym)}?interval=1d&range=1d`
    const res  = await fetch(url)
    if (!res.ok) throw new Error(`Yahoo Finance chart: ${res.status}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data   = await res.json() as any
    const result = data?.chart?.result?.[0]
    if (!result) throw new Error(`Yahoo Finance: no data for ${ySym}`)
    const meta      = result.meta
    const price     = meta.regularMarketPrice ?? 0
    const prevClose = meta.previousClose ?? meta.chartPreviousClose ?? price
    const change    = +(price - prevClose).toFixed(3)
    const changePct = prevClose ? +((change / prevClose) * 100).toFixed(2) : 0
    const baseSym   = symbol.replace('.JO', '')
    return {
      symbol:    baseSym,
      name:      JSE_NAME_MAP.get(baseSym) ?? meta.longName ?? meta.shortName ?? baseSym,
      price,
      change,
      changePct,
      currency:  meta.currency ?? 'ZAR',
      exchange:  meta.exchangeName ?? 'JSE',
      timestamp: Date.now(),
    }
  },

  async getHistory(symbol: string, days: number): Promise<OHLCV[]> {
    const ySym  = toYahooSymbol(symbol)
    const range = rangeForDays(days)
    const url   = `${BASE}/v8/finance/chart/${encodeURIComponent(ySym)}?interval=1d&range=${range}`
    const res   = await fetch(url)
    if (!res.ok) throw new Error(`Yahoo Finance chart: ${res.status}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data   = await res.json() as any
    const result = data?.chart?.result?.[0]
    if (!result) return []
    const timestamps: number[] = result.timestamp ?? []
    const q = result.indicators?.quote?.[0] ?? {}
    const opens:   (number | null)[] = q.open   ?? []
    const highs:   (number | null)[] = q.high   ?? []
    const lows:    (number | null)[] = q.low    ?? []
    const closes:  (number | null)[] = q.close  ?? []
    const volumes: (number | null)[] = q.volume ?? []
    return timestamps
      .map((t, i): OHLCV | null => {
        const close = closes[i]
        if (close == null || close === 0) return null
        return {
          time:   t * 1000,
          open:   opens[i]   ?? close,
          high:   highs[i]   ?? close,
          low:    lows[i]    ?? close,
          close,
          volume: volumes[i] ?? 0,
        }
      })
      .filter((b): b is OHLCV => b !== null)
  },

  async getCommodities(): Promise<Commodity[]> {
    const symbols = COMMODITY_DEFS.map(c => c.symbol)
    const quotes  = await batchQuote(symbols)
    const bySymbol = new Map(quotes.map(q => [q.symbol, q]))
    return COMMODITY_DEFS
      .map((def): Commodity => {
        const q         = bySymbol.get(def.symbol)
        const price     = q?.regularMarketPrice ?? 0
        const change    = +(q?.regularMarketChange    ?? 0).toFixed(3)
        const changePct = +(q?.regularMarketChangePercent ?? 0).toFixed(2)
        return { id: def.id, name: def.name, price, change, changePct, unit: def.unit, currency: 'USD', timestamp: Date.now() }
      })
      .filter(c => c.price > 0)  // drop symbols with no data
  },

  async getExchangeStocks(exchange: string): Promise<Quote[]> {
    if (exchange !== 'jse') return []
    return fetchJSEStocks()
  },

  async getTopMovers(exchange: string): Promise<{ gainers: Mover[]; losers: Mover[] }> {
    if (exchange !== 'jse') return { gainers: [], losers: [] }
    const stocks = await fetchJSEStocks()
    const sorted = [...stocks].sort((a, b) => b.changePct - a.changePct)
    return {
      gainers: sorted.filter(s => s.changePct > 0).slice(0, 5).map((s): Mover => ({
        symbol: s.symbol, name: s.name, exchange: 'JSE', price: s.price, changePct: s.changePct,
      })),
      losers: sorted.filter(s => s.changePct < 0).slice(-5).reverse().map((s): Mover => ({
        symbol: s.symbol, name: s.name, exchange: 'JSE', price: s.price, changePct: s.changePct,
      })),
    }
  },

  async getIndices(exchange: string): Promise<IndexSnapshot[]> {
    // 'all' (Dashboard) and 'jse' both return JSE indices
    if (exchange !== 'jse' && exchange !== 'all') return []
    const quotes = await batchQuote(['^J200', '^JALSH'])
    return quotes
      .filter(q => (q.regularMarketPrice ?? 0) > 0)
      .map((q): IndexSnapshot => {
        const isTop40 = q.symbol === '^J200'
        return {
          id:        isTop40 ? 'jse-top40' : 'jse-alsi',
          name:      isTop40 ? 'JSE Top 40' : 'JSE All Share',
          exchange:  'JSE',
          value:     q.regularMarketPrice ?? 0,
          change:    +(q.regularMarketChange    ?? 0).toFixed(2),
          changePct: +(q.regularMarketChangePercent ?? 0).toFixed(2),
          currency:  'ZAR',
          sparkline: [],
          timestamp: Date.now(),
        }
      })
  },

  async getNews(): Promise<NewsItem[]> {
    return []
  },
}
