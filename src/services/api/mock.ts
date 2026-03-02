/**
 * Mock provider — deterministic fake data for dev/demo.
 * Returns plausible African market data so the UI looks real.
 */
import type { MarketProvider, OHLCV, IndexSnapshot, ForexRate, NewsItem } from './types'

function seed(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = Math.imul(31, h) + s.charCodeAt(i) | 0
  return Math.abs(h)
}

function rng(s: number) {
  let x = s
  return () => { x = (x * 1664525 + 1013904223) & 0xffffffff; return (x >>> 0) / 0xffffffff }
}

function mockPrice(symbol: string, base: number) {
  const r = rng(seed(symbol))()
  return +(base * (0.8 + r * 0.4)).toFixed(2)
}

function mockChange(symbol: string) {
  const r = rng(seed(symbol + 'chg'))()
  const pct = (r - 0.48) * 6   // -3% to +3%
  return +pct.toFixed(2)
}

const INDICES: IndexSnapshot[] = [
  { id: 'jse-alsi',  name: 'JSE All Share',       exchange: 'JSE',  value: 81_432, change: 312,  changePct: 0.39,  currency: 'ZAR', sparkline: spark('jse-alsi',  81_000), timestamp: Date.now() },
  { id: 'jse-top40', name: 'JSE Top 40',           exchange: 'JSE',  value: 74_210, change: -89,  changePct: -0.12, currency: 'ZAR', sparkline: spark('jse-top40', 74_000), timestamp: Date.now() },
  { id: 'ngx-asi',   name: 'NGX All Share',        exchange: 'NGX',  value: 98_762, change: 1023, changePct: 1.05,  currency: 'NGN', sparkline: spark('ngx-asi',   98_000), timestamp: Date.now() },
  { id: 'nse-20',    name: 'NSE 20 Share',         exchange: 'NSE',  value: 2_048,  change: -14,  changePct: -0.68, currency: 'KES', sparkline: spark('nse-20',    2_000),  timestamp: Date.now() },
  { id: 'gse-ci',    name: 'GSE Composite',        exchange: 'GSE',  value: 4_321,  change: 22,   changePct: 0.51,  currency: 'GHS', sparkline: spark('gse-ci',    4_300),  timestamp: Date.now() },
  { id: 'brvm-ci',   name: 'BRVM Composite',       exchange: 'BRVM', value: 234,    change: 1.2,  changePct: 0.52,  currency: 'XOF', sparkline: spark('brvm-ci',   233),    timestamp: Date.now() },
]

function spark(id: string, base: number): number[] {
  const r = rng(seed(id))
  return Array.from({ length: 30 }, () => +(base * (0.98 + r() * 0.04)).toFixed(0))
}

const FOREX: ForexRate[] = [
  { base: 'USD', quote: 'ZAR', rate: 18.42, change: 0.12,  changePct: 0.65,  timestamp: Date.now() },
  { base: 'USD', quote: 'NGN', rate: 1610,  change: -5,    changePct: -0.31, timestamp: Date.now() },
  { base: 'USD', quote: 'KES', rate: 129.5, change: 0.8,   changePct: 0.62,  timestamp: Date.now() },
  { base: 'USD', quote: 'GHS', rate: 13.1,  change: 0.05,  changePct: 0.38,  timestamp: Date.now() },
  { base: 'USD', quote: 'EGP', rate: 48.9,  change: -0.1,  changePct: -0.20, timestamp: Date.now() },
  { base: 'USD', quote: 'ETB', rate: 56.3,  change: 0.2,   changePct: 0.36,  timestamp: Date.now() },
  { base: 'USD', quote: 'XOF', rate: 615,   change: 2,     changePct: 0.33,  timestamp: Date.now() },
  { base: 'ZAR', quote: 'USD', rate: 0.054, change: 0,     changePct: -0.65, timestamp: Date.now() },
]

const NEWS: NewsItem[] = [
  { id: '1', headline: 'JSE All Share extends gains as rand strengthens against dollar', source: 'Business Day', url: '#', publishedAt: Date.now() - 1_800_000, exchange: 'JSE' },
  { id: '2', headline: 'NGX records N1.2trn turnover in February amid bullish sentiment', source: 'BusinessDay NG', url: '#', publishedAt: Date.now() - 3_600_000, exchange: 'NGX' },
  { id: '3', headline: 'NSE 20 Share Index dips 0.7% on profit-taking in banking stocks', source: 'The EastAfrican', url: '#', publishedAt: Date.now() - 5_400_000, exchange: 'NSE' },
  { id: '4', headline: 'Ghana cedi stabilises as Bank of Ghana holds rate at 28%', source: 'GhanaWeb', url: '#', publishedAt: Date.now() - 7_200_000 },
  { id: '5', headline: 'African Development Bank approves $500m infrastructure facility for East Africa', source: 'AfDB', url: '#', publishedAt: Date.now() - 10_800_000 },
  { id: '6', headline: 'BRVM composite reaches 18-month high amid regional growth optimism', source: 'Ecofin', url: '#', publishedAt: Date.now() - 14_400_000, exchange: 'BRVM' },
]

async function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)) }

export const mockProvider: MarketProvider = {
  name: 'mock',

  async getQuote(symbol) {
    await delay()
    const base = mockPrice(symbol, 100)
    const pct = mockChange(symbol)
    return {
      symbol, name: symbol, price: base,
      change: +(base * pct / 100).toFixed(3),
      changePct: pct,
      currency: 'USD', exchange: 'MOCK',
      timestamp: Date.now(),
    }
  },

  async getHistory(symbol, days) {
    await delay(400)
    const r = rng(seed(symbol + 'hist'))
    const base = mockPrice(symbol, 100)
    const bars: OHLCV[] = []
    const now = Date.now()
    let close = base
    for (let i = days; i >= 0; i--) {
      const chg = (r() - 0.49) * 0.04
      const open = close
      close = +(open * (1 + chg)).toFixed(3)
      bars.push({
        time: now - i * 86_400_000,
        open, high: Math.max(open, close) * (1 + r() * 0.01),
        low: Math.min(open, close) * (1 - r() * 0.01), close,
        volume: Math.floor(r() * 5_000_000),
      })
    }
    return bars
  },

  async getIndices() {
    await delay()
    return INDICES
  },

  async getForex() {
    await delay()
    return FOREX
  },

  async getNews() {
    await delay(300)
    return NEWS
  },
}
