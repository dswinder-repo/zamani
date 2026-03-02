import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, ExternalLink } from 'lucide-react'
import NdebeleStrip from '../patterns/NdebeleStrip'
import Clock from './Clock'
import MarketStatus from './MarketStatus'
import { useAlerts } from '../../stores/alerts'

interface TopbarProps {
  onSearch: () => void
}

export default function Topbar({ onSearch }: TopbarProps) {
  const { alerts, unreadCount, markRead } = useAlerts()
  const navigate = useNavigate()

  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!showNotif) return
    function handle(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [showNotif])

  function toggleNotif() {
    if (!showNotif && unreadCount > 0) markRead()
    setShowNotif(v => !v)
  }

  // Show last 5 triggered alerts, most recent first
  const recentAlerts = [...alerts]
    .filter(a => a.triggeredAt)
    .sort((a, b) => (b.triggeredAt ?? 0) - (a.triggeredAt ?? 0))
    .slice(0, 5)

  return (
    <header className="topbar">
      <NdebeleStrip height={3} />

      <div className="topbar-inner">
        <div className="topbar-brand">
          <span className="brand-z">Z</span>
          <span className="brand-rest">amani</span>
        </div>

        <button className="topbar-search" onClick={onSearch} aria-label="Open search (⌘K)">
          <Search size={13} />
          <span>Search markets…</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="topbar-right">
          <MarketStatus />
          <div className="topbar-divider" />
          <Clock />

          {/* Bell + notification dropdown */}
          <div className="notif-wrap" ref={notifRef}>
            <button
              className="icon-btn icon-btn-bell"
              onClick={toggleNotif}
              aria-label="Notifications"
            >
              <Bell size={14} />
              {unreadCount > 0 && (
                <span className="bell-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </button>

            {showNotif && (
              <div className="notif-dropdown panel">
                <div className="notif-header">
                  <span className="notif-title">Recent Alerts</span>
                  <button
                    className="notif-view-all"
                    onClick={() => { setShowNotif(false); navigate('/alerts') }}
                  >
                    View all <ExternalLink size={9} />
                  </button>
                </div>

                {recentAlerts.length === 0 ? (
                  <div className="notif-empty">No triggered alerts yet</div>
                ) : (
                  recentAlerts.map(a => {
                    const ago = a.triggeredAt
                      ? Math.round((Date.now() - a.triggeredAt) / 60_000)
                      : 0
                    const agoLabel = ago < 60
                      ? `${ago}m ago`
                      : `${Math.floor(ago / 60)}h ago`
                    return (
                      <div key={a.id} className="notif-item">
                        <div className="notif-item-header">
                          <span className="notif-symbol num">{a.symbol}</span>
                          <span className="notif-time">{agoLabel}</span>
                        </div>
                        <div className="notif-desc">
                          {a.condition === 'above' && `Price above ${a.threshold}`}
                          {a.condition === 'below' && `Price below ${a.threshold}`}
                          {a.condition === 'change_up' && `Up ≥ ${a.threshold}%`}
                          {a.condition === 'change_down' && `Down ≥ ${a.threshold}%`}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

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
          display: flex; align-items: center; gap: 1rem;
          padding: 0 1rem; height: 40px;
        }
        .topbar-brand { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; white-space: nowrap; flex-shrink: 0; }
        .brand-z    { color: var(--color-gold); }
        .brand-rest { color: var(--color-text-primary); }

        .topbar-search {
          display: flex; align-items: center; gap: 0.5rem;
          flex: 1; max-width: 320px;
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.25rem 0.625rem;
          color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          transition: border-color 0.15s;
        }
        .topbar-search:hover { border-color: var(--color-gold-dim); color: var(--color-text-secondary); }
        .topbar-search span  { flex: 1; text-align: left; }
        .topbar-search kbd {
          font-family: var(--font-mono); font-size: 10px;
          background: var(--color-bg-elevated); padding: 1px 4px; border-radius: 3px;
        }

        .topbar-right { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; }
        .topbar-divider { width: 1px; height: 16px; background: var(--color-border); }

        .icon-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 4px;
          color: var(--color-text-muted); background: transparent; border: none;
          cursor: pointer; transition: color 0.15s, background 0.15s;
        }
        .icon-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

        .bell-badge {
          position: absolute; top: 2px; right: 2px;
          min-width: 14px; height: 14px; border-radius: 7px;
          background: var(--color-down); color: white;
          font-size: 8px; font-weight: 700; font-family: var(--font-mono);
          display: flex; align-items: center; justify-content: center;
          padding: 0 2px; pointer-events: none;
        }

        /* Notification dropdown */
        .notif-wrap { position: relative; }
        .notif-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0; z-index: 100;
          width: 260px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          overflow: hidden;
        }
        .notif-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
        }
        .notif-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); }
        .notif-view-all {
          display: flex; align-items: center; gap: 3px;
          font-size: 10px; color: var(--color-gold); background: none; border: none;
          cursor: pointer; font-weight: 600; padding: 0;
        }
        .notif-view-all:hover { text-decoration: underline; }

        .notif-empty {
          padding: 1rem 0.75rem; font-size: 11px; color: var(--color-text-muted); text-align: center;
        }
        .notif-item {
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: var(--color-bg-hover); }
        .notif-item-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
        .notif-symbol { font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .notif-time   { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .notif-desc   { font-size: 11px; color: var(--color-text-secondary); }
      `}</style>
    </header>
  )
}
