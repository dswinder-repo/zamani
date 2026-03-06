import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WatchList {
  id:      string
  name:    string
  symbols: string[]
}

interface WatchlistStore {
  lists:    WatchList[]
  activeId: string

  // Derived: current list symbols (for backward compat)
  readonly symbols: string[]

  // Per-list operations
  add(symbol: string): void
  remove(symbol: string): void
  has(symbol: string): boolean

  // List management
  createList(name: string): void
  deleteList(id: string): void
  renameList(id: string, name: string): void
  setActive(id: string): void
}

const DEFAULT_LIST_ID = 'default'

const DEFAULT_LIST: WatchList = {
  id:      DEFAULT_LIST_ID,
  name:    'Main',
  symbols: ['J203.JSE', 'ALSIETS.JSE', 'MTN.NGX'],
}

export const useWatchlist = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      lists:    [DEFAULT_LIST],
      activeId: DEFAULT_LIST_ID,

      get symbols() {
        const state = get()
        return state.lists.find(l => l.id === state.activeId)?.symbols ?? []
      },

      add(symbol: string) {
        if (get().has(symbol)) return
        set(s => ({
          lists: s.lists.map(l =>
            l.id === s.activeId ? { ...l, symbols: [...l.symbols, symbol] } : l
          ),
        }))
      },

      remove(symbol: string) {
        set(s => ({
          lists: s.lists.map(l =>
            l.id === s.activeId ? { ...l, symbols: l.symbols.filter(x => x !== symbol) } : l
          ),
        }))
      },

      has(symbol: string) {
        return get().symbols.includes(symbol)
      },

      createList(name: string) {
        const id = `list-${Date.now()}`
        set(s => ({ lists: [...s.lists, { id, name, symbols: [] }], activeId: id }))
      },

      deleteList(id: string) {
        set(s => {
          const lists = s.lists.filter(l => l.id !== id)
          if (!lists.length) lists.push({ ...DEFAULT_LIST, symbols: [] })
          const activeId = s.activeId === id ? lists[0].id : s.activeId
          return { lists, activeId }
        })
      },

      renameList(id: string, name: string) {
        set(s => ({ lists: s.lists.map(l => l.id === id ? { ...l, name } : l) }))
      },

      setActive(id: string) {
        set({ activeId: id })
      },
    }),
    { name: 'zamani-watchlist' },
  ),
)
