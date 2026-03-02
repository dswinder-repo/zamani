import { useState, type ReactNode } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import CommandPalette from '../search/CommandPalette'
import { useCommandPalette } from '../../hooks/useCommandPalette'

interface ShellProps {
  children: ReactNode
}

export default function Shell({ children }: ShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { isOpen, open, close } = useCommandPalette()

  return (
    <div className="shell">
      <Topbar onSearch={open} />
      <div className="shell-body">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />
        <main className="shell-main">{children}</main>
      </div>
      {isOpen && <CommandPalette onClose={close} />}

      <style>{`
        .shell {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
          background: var(--color-bg-primary);
        }
        .shell-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .shell-main {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }
      `}</style>
    </div>
  )
}
