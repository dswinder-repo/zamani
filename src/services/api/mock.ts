/**
 * Mock provider — deterministic fake data for dev/demo.
 * Returns plausible African market data so the UI looks real.
 */
import type { MarketProvider, Quote, OHLCV, IndexSnapshot, ForexRate, NewsItem, Commodity, Mover } from './types'

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

const COMMODITIES: Commodity[] = [
  { id: 'gold',     name: 'Gold',        price: 2_341.80, change: 12.40,  changePct: 0.53,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'silver',   name: 'Silver',      price: 29.42,    change: 0.18,   changePct: 0.61,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'platinum', name: 'Platinum',    price: 987.50,   change: -4.20,  changePct: -0.42, unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'palladium',name: 'Palladium',   price: 1_023.00, change: 8.50,   changePct: 0.84,  unit: 'oz',  currency: 'USD', timestamp: Date.now() },
  { id: 'brent',    name: 'Brent Crude', price: 78.24,    change: -1.16,  changePct: -1.46, unit: 'bbl', currency: 'USD', timestamp: Date.now() },
  { id: 'wti',      name: 'WTI Crude',   price: 74.38,    change: -1.02,  changePct: -1.35, unit: 'bbl', currency: 'USD', timestamp: Date.now() },
  { id: 'cocoa',    name: 'Cocoa',       price: 8_452,    change: 210,    changePct: 2.55,  unit: 'MT',  currency: 'USD', timestamp: Date.now() },
  { id: 'coffee',   name: 'Coffee',      price: 4.82,     change: 0.14,   changePct: 2.99,  unit: 'lb',  currency: 'USD', timestamp: Date.now() },
  { id: 'copper',   name: 'Copper',      price: 4.52,     change: 0.03,   changePct: 0.67,  unit: 'lb',  currency: 'USD', timestamp: Date.now() },
  { id: 'palmoil',  name: 'Palm Oil',    price: 3_820,    change: -45,    changePct: -1.16, unit: 'MT',  currency: 'USD', timestamp: Date.now() },
]

const GAINERS: Mover[] = [
  { symbol: 'SCOM',   name: 'Safaricom',       exchange: 'NSE',  price: 42.50,  changePct: 4.17 },
  { symbol: 'MTN',    name: 'MTN Group',        exchange: 'JSE',  price: 142.80, changePct: 3.12 },
  { symbol: 'EQTY',   name: 'Equity Group',     exchange: 'NSE',  price: 48.75,  changePct: 2.82 },
  { symbol: 'CIB',    name: 'CIB Egypt',        exchange: 'EGX',  price: 86.40,  changePct: 2.15 },
  { symbol: 'ZENITH', name: 'Zenith Bank',      exchange: 'NGX',  price: 38.60,  changePct: 1.84 },
]

const LOSERS: Mover[] = [
  { symbol: 'DAN',    name: 'Dangote Cement',   exchange: 'NGX',  price: 548.00, changePct: -2.84 },
  { symbol: 'NPN',    name: 'Naspers',          exchange: 'JSE',  price: 3_412,  changePct: -1.92 },
  { symbol: 'SBIC',   name: 'Stanbic Holdings', exchange: 'NSE',  price: 108.00, changePct: -0.92 },
  { symbol: 'AGL',    name: 'Anglo American',   exchange: 'JSE',  price: 492.30, changePct: -0.74 },
  { symbol: 'ACCESS', name: 'Access Holdings',  exchange: 'NGX',  price: 20.15,  changePct: -0.49 },
]

async function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)) }

interface StockDef { symbol: string; name: string; basePrice: number; currency: string }

const EXCHANGE_STOCKS: Record<string, StockDef[]> = {
  JSE: [
    { symbol: 'NPN',   name: 'Naspers',              basePrice: 3_400,  currency: 'ZAR' },
    { symbol: 'MTN',   name: 'MTN Group',             basePrice: 145,    currency: 'ZAR' },
    { symbol: 'AGL',   name: 'Anglo American',        basePrice: 495,    currency: 'ZAR' },
    { symbol: 'SOL',   name: 'Sasol',                 basePrice: 110,    currency: 'ZAR' },
    { symbol: 'SBK',   name: 'Standard Bank',         basePrice: 195,    currency: 'ZAR' },
    { symbol: 'FSR',   name: 'FirstRand',             basePrice: 75,     currency: 'ZAR' },
    { symbol: 'VOD',   name: 'Vodacom Group',         basePrice: 105,    currency: 'ZAR' },
    { symbol: 'BID',   name: 'Bid Corporation',       basePrice: 310,    currency: 'ZAR' },
    { symbol: 'CPI',   name: 'Capitec Bank',          basePrice: 2_250,  currency: 'ZAR' },
    { symbol: 'ABG',   name: 'Absa Group',            basePrice: 190,    currency: 'ZAR' },
    { symbol: 'INL',   name: 'Investec',              basePrice: 105,    currency: 'ZAR' },
    { symbol: 'REM',   name: 'Remgro',                basePrice: 145,    currency: 'ZAR' },
    { symbol: 'DSY',   name: 'Discovery',             basePrice: 175,    currency: 'ZAR' },
    { symbol: 'SHP',   name: 'Shoprite Holdings',     basePrice: 280,    currency: 'ZAR' },
    { symbol: 'MNP',   name: 'Mondi',                 basePrice: 330,    currency: 'ZAR' },
  ],
  NGX: [
    { symbol: 'DANGCEM', name: 'Dangote Cement',      basePrice: 548,    currency: 'NGN' },
    { symbol: 'GTCO',    name: 'Guaranty Trust',      basePrice: 54,     currency: 'NGN' },
    { symbol: 'ZENITH',  name: 'Zenith Bank',         basePrice: 39,     currency: 'NGN' },
    { symbol: 'ACCESS',  name: 'Access Holdings',     basePrice: 20,     currency: 'NGN' },
    { symbol: 'UBA',     name: 'United Bank for Africa', basePrice: 28,  currency: 'NGN' },
    { symbol: 'STERLNB', name: 'Sterling Bank',       basePrice: 5,      currency: 'NGN' },
    { symbol: 'FBNH',    name: 'FBN Holdings',        basePrice: 27,     currency: 'NGN' },
    { symbol: 'MTNN',    name: 'MTN Nigeria',         basePrice: 270,    currency: 'NGN' },
    { symbol: 'AIRTELAFRI', name: 'Airtel Africa',    basePrice: 2_100,  currency: 'NGN' },
    { symbol: 'NESTLE',  name: 'Nestlé Nigeria',      basePrice: 1_400,  currency: 'NGN' },
  ],
  NSE: [
    { symbol: 'SCOM',    name: 'Safaricom',           basePrice: 43,     currency: 'KES' },
    { symbol: 'EQTY',    name: 'Equity Group',        basePrice: 49,     currency: 'KES' },
    { symbol: 'KCB',     name: 'KCB Group',           basePrice: 36,     currency: 'KES' },
    { symbol: 'COOP',    name: 'Co-op Bank Kenya',    basePrice: 15,     currency: 'KES' },
    { symbol: 'DTK',     name: 'Diamond Trust Bank',  basePrice: 56,     currency: 'KES' },
    { symbol: 'ABSA',    name: 'ABSA Bank Kenya',     basePrice: 13,     currency: 'KES' },
    { symbol: 'BAMB',    name: 'Bamburi Cement',      basePrice: 55,     currency: 'KES' },
    { symbol: 'SBIC',    name: 'Stanbic Holdings',    basePrice: 108,    currency: 'KES' },
  ],
  GSE: [
    { symbol: 'MTN',     name: 'MTN Ghana',           basePrice: 2.2,    currency: 'GHS' },
    { symbol: 'GCB',     name: 'GCB Bank',            basePrice: 5.8,    currency: 'GHS' },
    { symbol: 'GGBL',    name: 'Guinness Ghana',      basePrice: 2.4,    currency: 'GHS' },
    { symbol: 'TOTAL',   name: 'TotalEnergies Ghana', basePrice: 4.1,    currency: 'GHS' },
    { symbol: 'CAL',     name: 'CAL Bank',            basePrice: 0.88,   currency: 'GHS' },
    { symbol: 'EGL',     name: 'Enterprise Group',    basePrice: 1.9,    currency: 'GHS' },
  ],
  BRVM: [
    { symbol: 'ONTBF',   name: 'Onatel Burkina Faso', basePrice: 4_600,  currency: 'XOF' },
    { symbol: 'SNTS',    name: 'Sonatel Senegal',     basePrice: 17_000, currency: 'XOF' },
    { symbol: 'BOABF',   name: 'Banque de l\'Afrique Occidentale', basePrice: 5_200, currency: 'XOF' },
    { symbol: 'ETIT',    name: 'Ecobank Transnational', basePrice: 18,   currency: 'XOF' },
  ],
  ZSE: [
    { symbol: 'DELTA',   name: 'Delta Corporation',   basePrice: 2_850,  currency: 'USD' },
    { symbol: 'INNSCOR', name: 'Innscor Africa',      basePrice: 5_100,  currency: 'USD' },
    { symbol: 'ECONET',  name: 'Econet Wireless',     basePrice: 4_200,  currency: 'USD' },
    { symbol: 'CBZ',     name: 'CBZ Holdings',        basePrice: 920,    currency: 'USD' },
  ],
  BSE: [
    { symbol: 'FNBB',    name: 'First National Bank BW', basePrice: 3.5, currency: 'BWP' },
    { symbol: 'BIHL',    name: 'Botswana Insurance', basePrice: 2.8,     currency: 'BWP' },
    { symbol: 'LETSHEGO', name: 'Letshego Holdings', basePrice: 1.4,     currency: 'BWP' },
    { symbol: 'SEFALANA', name: 'Sefalana Holdings', basePrice: 11,      currency: 'BWP' },
  ],
  LUSE: [
    { symbol: 'ZCCM',    name: 'ZCCM Investments',   basePrice: 42,     currency: 'ZMW' },
    { symbol: 'ZANACO',  name: 'Zambia National Bank', basePrice: 2.8,  currency: 'ZMW' },
    { symbol: 'BATA',    name: 'Bata Shoe Company',   basePrice: 9.5,   currency: 'ZMW' },
    { symbol: 'REIZ',    name: 'Real Estate Investments Zambia', basePrice: 1.1, currency: 'ZMW' },
  ],
}

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

  async getCommodities() {
    await delay()
    return COMMODITIES
  },

  async getTopMovers() {
    await delay()
    return { gainers: GAINERS, losers: LOSERS }
  },

  async getExchangeStocks(exchange) {
    await delay(300)
    const ex = exchange.toUpperCase()
    const pool = EXCHANGE_STOCKS[ex] ?? []
    return pool.map((s): Quote => {
      const pct  = mockChange(s.symbol)
      const price = mockPrice(s.symbol, s.basePrice)
      return {
        symbol:    s.symbol,
        name:      s.name,
        price,
        change:    +(price * pct / 100).toFixed(3),
        changePct: pct,
        volume:    Math.floor(rng(seed(s.symbol + 'vol'))() * 10_000_000),
        currency:  s.currency,
        exchange:  ex,
        timestamp: Date.now(),
      }
    })
  },
}
