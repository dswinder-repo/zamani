import { useState, type ReactNode } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import TickerStrip from './TickerStrip'
import CommandPalette from '../search/CommandPalette'
import { useCommandPalette } from '../../hooks/useCommandPalette'
import { useAlertWatcher } from '../../hooks/useAlertWatcher'

interface ShellProps {
  children: ReactNode
}

export default function Shell({ children }: ShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { isOpen, open, close } = useCommandPalette()

  useAlertWatcher()

  return (
    <div className="shell">
      <Topbar onSearch={open} onMenuToggle={() => setMobileSidebarOpen(v => !v)} />
      <TickerStrip />
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

      <style>{`
        .shell {
          display: flex; flex-direction: column;
          height: 100dvh; overflow: hidden;
          background: var(--color-bg-primary);
        }
        .shell-body { display: flex; flex: 1; overflow: hidden; }
        .shell-main { flex: 1; overflow-y: auto; padding: 1rem; }

        @media (max-width: 768px) {
          .shell-main { padding: 0.75rem; }
        }
      `}</style>
    </div>
  )
}
