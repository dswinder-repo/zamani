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
  // Fundamentals (optional — only populated by individual getQuote calls)
  pe?:        number      // trailing P/E ratio
  divYield?:  number      // annual dividend yield (%)
  high52?:    number      // 52-week high
  low52?:     number      // 52-week low
  eps?:       number      // trailing EPS
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

export interface Commodity {
  id:        string       // e.g. "gold"
  name:      string       // e.g. "Gold"
  price:     number
  change:    number
  changePct: number
  unit:      string       // e.g. "oz", "bbl", "MT"
  currency:  string       // always USD for commodities
  timestamp: number
}

export interface Mover {
  symbol:    string
  name:      string
  exchange:  string
  price:     number
  changePct: number
  volume?:   number
}

/** Abstract provider interface — all adapters implement this */
export interface MarketProvider {
  name: string
  getQuote(symbol: string): Promise<Quote>
  getHistory(symbol: string, days: number): Promise<OHLCV[]>
  getIndices?(exchange: string): Promise<IndexSnapshot[]>
  getForex?(pairs: string[]): Promise<ForexRate[]>
  getNews?(query: string): Promise<NewsItem[]>
  getCommodities?(): Promise<Commodity[]>
  getTopMovers?(exchange: string): Promise<{ gainers: Mover[]; losers: Mover[] }>
  getExchangeStocks?(exchange: string): Promise<Quote[]>
}
