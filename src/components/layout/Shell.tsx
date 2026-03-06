import { useState, useEffect, type ReactNode } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import TickerStrip from './TickerStrip'
import CommandPalette from '../search/CommandPalette'
import ShortcutsModal from '../shortcuts/ShortcutsModal'
import { BeastModeOverlay, OracleModal, SimbaToast, HakunaMatataBanner, CircleOfLifeModal, DangoteModal } from '../easter/EasterEggs'
import { TradeGame } from '../easter/TradeGame'
import { useCommandPalette } from '../../hooks/useCommandPalette'
import { useShortcutsModal } from '../../stores/shortcutsModal'
import { useAlertWatcher } from '../../hooks/useAlertWatcher'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { applyStoredTheme } from '../../stores/theme'
import { IS_DEMO_MODE } from '../../services/api'

interface ShellProps {
  children: ReactNode
}

export default function Shell({ children }: ShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { isOpen, open, close } = useCommandPalette()
  const shortcutsOpen = useShortcutsModal(s => s.isOpen)

  useAlertWatcher()
  useKeyboardShortcuts()

  useEffect(() => { applyStoredTheme() }, [])

  return (
    <div className="shell">
      <Topbar onSearch={open} onMenuToggle={() => setMobileSidebarOpen(v => !v)} />
      <TickerStrip />
      {IS_DEMO_MODE && (
        <div className="demo-banner">
          ⚠ Demo mode — prices are simulated and not real
        </div>
      )}
      <div className="shell-body">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(c => !c)}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
        <main className="shell-main" onClick={() => mobileSidebarOpen && setMobileSidebarOpen(false)}>
          {children}
        </main>
      </div>
      {isOpen && <CommandPalette onClose={close} />}
      {shortcutsOpen && <ShortcutsModal />}
      <BeastModeOverlay />
      <OracleModal />
      <SimbaToast />
      <HakunaMatataBanner />
      <CircleOfLifeModal />
      <DangoteModal />
      <TradeGame />

      <style>{`
        .shell {
          display: flex; flex-direction: column;
          height: 100dvh; overflow: hidden;
          background: var(--color-bg-primary);
        }
        .shell-body { display: flex; flex: 1; overflow: hidden; }
        .shell-main { flex: 1; overflow-y: auto; padding: 1rem; }

        .demo-banner {
          background: #b45309; color: #fff;
          font-size: 11px; font-weight: 700; text-align: center;
          padding: 4px 1rem; letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .shell-main { padding: 0.75rem; }
        }
      `}</style>
    </div>
  )
}
