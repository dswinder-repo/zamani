import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Settings, ExternalLink, Menu, Sun, Moon } from 'lucide-react'
import NdebeleStrip from '../patterns/NdebeleStrip'
import Clock from './Clock'
import MarketStatus from './MarketStatus'
import { useAlerts } from '../../stores/alerts'
import { useTheme } from '../../stores/theme'

interface TopbarProps {
  onSearch:      () => void
  onMenuToggle?: () => void
}

export default function Topbar({ onSearch, onMenuToggle }: TopbarProps) {
  const { alerts, unreadCount, markRead } = useAlerts()
  const { theme, toggle: toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

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

  const recentAlerts = [...alerts]
    .filter(a => a.triggeredAt)
    .sort((a, b) => (b.triggeredAt ?? 0) - (a.triggeredAt ?? 0))
    .slice(0, 5)

  return (
    <header className="topbar">
      <NdebeleStrip height={3} />

      <div className="topbar-inner">

        {/* Mobile hamburger — left of brand */}
        <button className="topbar-menu-btn" onClick={onMenuToggle} aria-label="Open navigation">
          <Menu size={16} />
        </button>

        <div className="topbar-brand">
          <span className="brand-z">Z</span>
          <span className="brand-rest">amani</span>
        </div>

        <button className="topbar-search" onClick={onSearch} aria-label="Open search (⌘K)">
          <Search size={13} />
          <span className="topbar-search-label">Search markets…</span>
          <kbd className="topbar-search-kbd">⌘K</kbd>
        </button>

        <div className="topbar-right">
          {/* Market status — hide text on small screens */}
          <div className="topbar-status">
            <MarketStatus />
          </div>

          {/* Clocks — hidden on mobile */}
          <div className="topbar-divider topbar-desktop-only" />
          <div className="topbar-desktop-only">
            <Clock />
          </div>

          {/* Bell + notification dropdown */}
          <div className="notif-wrap" ref={notifRef}>
            <button
              className="icon-btn"
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
                    const agoLabel = ago < 60 ? `${ago}m ago` : `${Math.floor(ago / 60)}h ago`
                    return (
                      <div key={a.id} className="notif-item">
                        <div className="notif-item-header">
                          <span className="notif-symbol num">{a.symbol}</span>
                          <span className="notif-time">{agoLabel}</span>
                        </div>
                        <div className="notif-desc">
                          {a.condition === 'above'       && `Price above ${a.threshold}`}
                          {a.condition === 'below'       && `Price below ${a.threshold}`}
                          {a.condition === 'change_up'   && `Up ≥ ${a.threshold}%`}
                          {a.condition === 'change_down' && `Down ≥ ${a.threshold}%`}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className="icon-btn topbar-desktop-only"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Settings — hidden on smallest screens */}
          <button className="icon-btn topbar-desktop-only" aria-label="Settings">
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
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0 0.75rem; height: 44px;
        }

        /* ── Brand ── */
        .topbar-brand { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; white-space: nowrap; flex-shrink: 0; }
        .brand-z    { color: var(--color-gold); }
        .brand-rest { color: var(--color-text-primary); }

        /* ── Search bar ── */
        .topbar-search {
          display: flex; align-items: center; gap: 0.5rem;
          flex: 1; max-width: 360px;
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.25rem 0.625rem;
          color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          transition: border-color 0.15s; white-space: nowrap;
        }
        .topbar-search:hover { border-color: var(--color-gold-dim); color: var(--color-text-secondary); }
        .topbar-search-label { flex: 1; text-align: left; }
        .topbar-search-kbd {
          font-family: var(--font-mono); font-size: 10px;
          background: var(--color-bg-elevated); padding: 1px 4px; border-radius: 3px;
        }

        /* ── Right cluster ── */
        .topbar-right { display: flex; align-items: center; gap: 0.375rem; margin-left: auto; flex-shrink: 0; }
        .topbar-divider { width: 1px; height: 16px; background: var(--color-border); flex-shrink: 0; }

        /* ── Icon buttons ── */
        .icon-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 4px;
          color: var(--color-text-muted); background: transparent; border: none;
          cursor: pointer; transition: color 0.15s, background 0.15s; flex-shrink: 0;
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

        /* ── Hamburger — desktop hidden, mobile shown ── */
        .topbar-menu-btn {
          display: none;
          align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 4px; flex-shrink: 0;
          color: var(--color-text-secondary); background: transparent; border: none;
          cursor: pointer; transition: color 0.15s, background 0.15s;
        }
        .topbar-menu-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

        /* ── Notification dropdown ── */
        .notif-wrap { position: relative; }
        .notif-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0; z-index: 400;
          width: 260px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); overflow: hidden;
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
        .notif-empty { padding: 1rem 0.75rem; font-size: 11px; color: var(--color-text-muted); text-align: center; }
        .notif-item {
          padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--color-border-subtle);
        }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: var(--color-bg-hover); }
        .notif-item-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px; }
        .notif-symbol { font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .notif-time   { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .notif-desc   { font-size: 11px; color: var(--color-text-secondary); }

        /* ─── Mobile breakpoints ─────────────────────────────────────── */

        @media (max-width: 900px) {
          /* Show hamburger */
          .topbar-menu-btn { display: flex; }
          /* Hide clocks and settings (they'll be in sidebar on mobile) */
          .topbar-desktop-only { display: none !important; }
        }

        @media (max-width: 560px) {
          /* Collapse search to icon + short placeholder */
          .topbar-search { max-width: 180px; }
          .topbar-search-kbd { display: none; }
        }

        @media (max-width: 400px) {
          /* Search becomes icon-only */
          .topbar-search-label { display: none; }
          .topbar-search { max-width: 40px; padding: 0.25rem; flex: none; justify-content: center; }
          .topbar-inner { gap: 0.5rem; padding: 0 0.5rem; }
        }
      `}</style>
    </header>
  )
}
