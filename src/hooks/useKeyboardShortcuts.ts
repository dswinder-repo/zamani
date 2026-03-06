import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShortcutsModal } from '../stores/shortcutsModal'
import { useEasterEggs } from '../stores/easterEggs'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

/**
 * Global keyboard shortcuts for Zamani.
 *
 * G-chord navigation (press G then a letter within 1 second):
 *   G D  → Dashboard
 *   G J  → JSE exchange
 *   G U  → USE exchange
 *   G N  → NGX exchange
 *   G K  → NSE (Nairobi)
 *   G G  → GSE (Ghana)
 *   G F  → Forex
 *   G W  → Watchlist
 *   G P  → Portfolio
 *   G A  → Alerts
 *   G C  → Calendar
 *   G M  → Monitor mode
 */
export function useKeyboardShortcuts() {
  const navigate       = useNavigate()
  const openShortcuts  = useShortcutsModal(s => s.open)
  const { activateBeastMode, openOracle, triggerSimba, triggerHakuna, triggerCircle, openDangote, openTrade } = useEasterEggs()
  const konamiBuf = useRef<string[]>([])

  useEffect(() => {
    let pendingG = false
    let timer: ReturnType<typeof setTimeout> | null = null

    function clearG() {
      pendingG = false
      if (timer) { clearTimeout(timer); timer = null }
    }

    function handler(e: KeyboardEvent) {
      // Konami code — check first, before any guards, so it works globally
      konamiBuf.current = [...konamiBuf.current, e.key].slice(-KONAMI.length)
      if (konamiBuf.current.join(',') === KONAMI.join(',')) {
        konamiBuf.current = []
        activateBeastMode()
        return
      }

      // Don't fire navigation shortcuts when user is typing in an input
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if ((e.target as HTMLElement).isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()

      if (pendingG) {
        clearG()
        switch (key) {
          case 'd': navigate('/'); break
          case 'j': navigate('/exchange/jse'); break
          case 'u': navigate('/exchange/use'); break
          case 'n': navigate('/exchange/ngx'); break
          case 'k': navigate('/exchange/nse'); break
          case 'g': navigate('/exchange/gse'); break
          case 'f': navigate('/forex'); break
          case 'w': navigate('/watchlist'); break
          case 'p': navigate('/portfolio'); break
          case 'a': navigate('/alerts'); break
          case 'c': navigate('/calendar'); break
          case 'm': navigate('/monitor'); break
          case 's': navigate('/screener'); break
          case 'i': navigate('/economic-indicators'); break
          case 'o': openOracle(); break
          case 'l': triggerSimba('🦁 ZAMANI'); break
          case 'z': openDangote(); break
          case 'h': triggerHakuna(0); break
          case 'r': triggerCircle(0); break
          case 'b': navigate('/jollof-war'); break
          case 't': openTrade(); break
          case 'x': navigate('/beat-index'); break
        }
        return
      }

      if (key === 'g') {
        pendingG = true
        timer = setTimeout(clearG, 1000)
        return
      }

      if (key === '?') {
        openShortcuts()
      }
    }

    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
      clearG()
    }
  }, [navigate, openShortcuts, activateBeastMode, openOracle, triggerSimba, triggerHakuna, triggerCircle, openDangote, openTrade])
}
