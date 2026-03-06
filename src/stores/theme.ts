import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'dark' | 'light'
  toggle(): void
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggle() {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('theme-light', next === 'light')
      },
    }),
    { name: 'zamani-theme' },
  ),
)

/** Call once on app load to restore saved theme preference */
export function applyStoredTheme() {
  try {
    const raw = localStorage.getItem('zamani-theme')
    if (raw) {
      const { state } = JSON.parse(raw) as { state: { theme: string } }
      if (state?.theme === 'light') {
        document.documentElement.classList.add('theme-light')
      }
    }
  } catch { /* ignore */ }
}
