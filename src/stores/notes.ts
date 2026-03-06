import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NotesStore {
  notes: Record<string, string>
  setNote(symbol: string, text: string): void
  getNote(symbol: string): string
}

export const useNotes = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: {},
      setNote(symbol, text) {
        set(s => ({ notes: { ...s.notes, [symbol]: text } }))
      },
      getNote(symbol) {
        return get().notes[symbol] ?? ''
      },
    }),
    { name: 'zamani-notes' },
  ),
)
