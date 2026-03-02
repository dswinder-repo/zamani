import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WatchlistStore {
  symbols: string[]
  add(symbol: string): void
  remove(symbol: string): void
  has(symbol: string): boolean
}

export const useWatchlist = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      symbols: ['J203.JSE', 'ALSIETS.JSE', 'MTN.NGX'],

      add(symbol) {
        if (!get().has(symbol)) {
          set(s => ({ symbols: [...s.symbols, symbol] }))
        }
      },

      remove(symbol) {
        set(s => ({ symbols: s.symbols.filter(x => x !== symbol) }))
      },

      has(symbol) {
        return get().symbols.includes(symbol)
      },
    }),
    { name: 'zamani-watchlist' },
  ),
)
