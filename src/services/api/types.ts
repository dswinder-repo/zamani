/** Unified types for all market data providers */

export interface Quote {
  symbol:     string
  name:       string
  price:      number
  change:     number      // absolute
  changePct:  number      // percent
  volume?:    number
  mktCap?:    number
  currency:   string
  exchange:   string
  timestamp:  number      // unix ms
}

export interface OHLCV {
  time:   number          // unix ms
  open:   number
  high:   number
  low:    number
  close:  number
  volume: number
}

export interface IndexSnapshot {
  id:        string       // e.g. "jse-alsi"
  name:      string       // e.g. "JSE All Share"
  exchange:  string       // e.g. "JSE"
  value:     number
  change:    number
  changePct: number
  currency:  string
  sparkline: number[]     // ~30 recent close values
  timestamp: number
}

export interface ForexRate {
  base:   string
  quote:  string
  rate:   number
  change: number
  changePct: number
  timestamp: number
}

export interface NewsItem {
  id:        string
  headline:  string
  source:    string
  url:       string
  publishedAt: number
  exchange?: string       // if exchange-specific
  symbols?:  string[]
  summary?:  string
}

/** Abstract provider interface — all adapters implement this */
export interface MarketProvider {
  name: string
  getQuote(symbol: string): Promise<Quote>
  getHistory(symbol: string, days: number): Promise<OHLCV[]>
  getIndices?(exchange: string): Promise<IndexSnapshot[]>
  getForex?(pairs: string[]): Promise<ForexRate[]>
  getNews?(query: string): Promise<NewsItem[]>
}
