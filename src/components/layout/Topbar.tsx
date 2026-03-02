import { Search, Bell, Settings } from 'lucide-react'
import NdebeleStrip from '../patterns/NdebeleStrip'
import Clock from './Clock'
import MarketStatus from './MarketStatus'

interface TopbarProps {
  onSearch: () => void
}

export default function Topbar({ onSearch }: TopbarProps) {
  return (
    <header className="topbar">
      {/* Gold Ndebele strip at very top */}
      <NdebeleStrip height={3} />

      <div className="topbar-inner">
        {/* Wordmark */}
        <div className="topbar-brand">
          <span className="brand-z">Z</span>
          <span className="brand-rest">amani</span>
        </div>

        {/* Search trigger */}
        <button className="topbar-search" onClick={onSearch} aria-label="Open search (⌘K)">
          <Search size={13} />
          <span>Search markets…</span>
          <kbd>⌘K</kbd>
        </button>

        {/* Right cluster */}
        <div className="topbar-right">
          <MarketStatus />
          <div className="topbar-divider" />
          <Clock />
          <button className="icon-btn" aria-label="Notifications">
            <Bell size={14} />
          </button>
          <button className="icon-btn" aria-label="Settings">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .topbar {
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-subtle);
          flex-shrink: 0;
        }
        .topbar-inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 1rem;
          height: 40px;
        }
        .topbar-brand {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.02em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .brand-z    { color: var(--color-gold); }
        .brand-rest { color: var(--color-text-primary); }

        .topbar-search {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          max-width: 320px;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 0.25rem 0.625rem;
          color: var(--color-text-muted);
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .topbar-search:hover { border-color: var(--color-gold-dim); color: var(--color-text-secondary); }
        .topbar-search span  { flex: 1; text-align: left; }
        .topbar-search kbd {
          font-family: var(--font-mono);
          font-size: 10px;
          background: var(--color-bg-elevated);
          padding: 1px 4px;
          border-radius: 3px;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
        }
        .topbar-divider {
          width: 1px; height: 16px;
          background: var(--color-border);
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          color: var(--color-text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .icon-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }
      `}</style>
    </header>
  )
}
