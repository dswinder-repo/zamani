import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ScreenerPreset {
  id: string
  name: string
  exchange: string
  sectors: string[]   // empty = "All"
  createdAt: number
}

interface ScreenerStore {
  presets: ScreenerPreset[]
  savePreset: (preset: Omit<ScreenerPreset, 'id' | 'createdAt'>) => void
  deletePreset: (id: string) => void
}

export const useScreener = create<ScreenerStore>()(
  persist(
    (set) => ({
      presets: [],

      savePreset(data) {
        const preset: ScreenerPreset = {
          ...data,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          createdAt: Date.now(),
        }
        set(s => ({ presets: [...s.presets, preset] }))
      },

      deletePreset(id) {
        set(s => ({ presets: s.presets.filter(p => p.id !== id) }))
      },
    }),
    { name: 'zamani-screener-presets' }
  )
)
