import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Transaction {
  id:        string
  symbol:    string
  name:      string
  exchange:  string
  type:      'buy' | 'sell'
  shares:    number
  price:     number       // price per share at time of transaction
  currency:  string
  date:      string       // ISO date string
  note?:     string
}

export interface Holding {
  symbol:       string
  name:         string
  exchange:     string
  currency:     string
  shares:       number    // net shares (buys - sells)
  avgCost:      number    // weighted avg cost basis
  totalCost:    number    // total $ invested
}

interface PortfolioStore {
  transactions: Transaction[]
  addTransaction(t: Omit<Transaction, 'id'>): void
  removeTransaction(id: string): void
  getHoldings(): Holding[]
}

function computeHoldings(transactions: Transaction[]): Holding[] {
  const map = new Map<string, { shares: number; totalCost: number; name: string; exchange: string; currency: string }>()

  for (const t of transactions) {
    const existing = map.get(t.symbol) ?? { shares: 0, totalCost: 0, name: t.name, exchange: t.exchange, currency: t.currency }
    if (t.type === 'buy') {
      existing.totalCost += t.shares * t.price
      existing.shares    += t.shares
    } else {
      // On sell: reduce shares, reduce cost proportionally
      const avgCost = existing.shares > 0 ? existing.totalCost / existing.shares : 0
      existing.totalCost -= avgCost * t.shares
      existing.shares    -= t.shares
    }
    map.set(t.symbol, existing)
  }

  return [...map.entries()]
    .filter(([, v]) => v.shares > 0.0001)
    .map(([symbol, v]) => ({
      symbol,
      name:      v.name,
      exchange:  v.exchange,
      currency:  v.currency,
      shares:    +v.shares.toFixed(6),
      avgCost:   v.shares > 0 ? +(v.totalCost / v.shares).toFixed(4) : 0,
      totalCost: +v.totalCost.toFixed(2),
    }))
}

export const usePortfolio = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction(t) {
        const tx: Transaction = { ...t, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }
        set(s => ({ transactions: [...s.transactions, tx] }))
      },

      removeTransaction(id) {
        set(s => ({ transactions: s.transactions.filter(t => t.id !== id) }))
      },

      getHoldings() {
        return computeHoldings(get().transactions)
      },
    }),
    { name: 'zamani-portfolio' },
  ),
)
