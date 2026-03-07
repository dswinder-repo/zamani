import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PanelId =
  | 'movers'
  | 'watchlist'
  | 'forex'
  | 'commodities'
  | 'yield-curve'
  | 'live-tv'
  | 'news'
  | 'on-this-day'

export const DEFAULT_COLUMNS: [PanelId[], PanelId[], PanelId[]] = [
  ['movers', 'watchlist'],
  ['forex', 'commodities', 'yield-curve'],
  ['live-tv', 'news', 'on-this-day'],
]

interface DashLayoutStore {
  columns: [PanelId[], PanelId[], PanelId[]]
  setColumns(cols: [PanelId[], PanelId[], PanelId[]]): void
  resetLayout(): void
}

export const useDashLayout = create<DashLayoutStore>()(
  persist(
    (set) => ({
      columns: DEFAULT_COLUMNS,
      setColumns(cols) { set({ columns: cols }) },
      resetLayout()    { set({ columns: DEFAULT_COLUMNS }) },
    }),
    { name: 'zamani-dash-layout' },
  ),
)
