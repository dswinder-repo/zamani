import type React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, DollarSign, Star,
  BarChart2, ChevronLeft, ChevronRight,
  Briefcase, Bell, Calendar, GitCompare, X,
  Monitor, Filter, TrendingUp, Target,
} from 'lucide-react'
import { useAlerts } from '../../stores/alerts'

function JollofIcon({ size = 14 }: { size?: number }) {
  return <span style={{ fontSize: size, lineHeight: 1 }}>🍚</span>
}

const EXCHANGES = [
  { id: 'jse',  label: 'JSE',  country: 'ZA', tier: 1 },
  { id: 'ngx',  label: 'NGX',  country: 'NG', tier: 1 },
  { id: 'nse',  label: 'NSE',  country: 'KE', tier: 1 },
  { id: 'gse',  label: 'GSE',  country: 'GH', tier: 2 },
  { id: 'brvm', label: 'BRVM', country: 'CI', tier: 2 },
  { id: 'zse',  label: 'ZSE',  country: 'ZW', tier: 2 },
  { id: 'bse',  label: 'BSE',  country: 'BW', tier: 2 },
  { id: 'luse', label: 'LUSE', country: 'ZM', tier: 3 },
  { id: 'use',  label: 'USE',  country: 'UG', tier: 3 },
]

const NAV: { to: string; icon: React.ComponentType<{ size?: number }>; label: string; badge?: boolean }[] = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/news',      icon: Newspaper,       label: 'News' },
  { to: '/forex',     icon: DollarSign,      label: 'Forex' },
  { to: '/watchlist', icon: Star,            label: 'Watchlist' },
  { to: '/portfolio', icon: Briefcase,       label: 'Portfolio' },
  { to: '/alerts',    icon: Bell,            label: 'Alerts',   badge: true },
  { to: '/calendar',  icon: Calendar,        label: 'Calendar' },
  { to: '/compare',              icon: GitCompare,  label: 'Compare' },
  { to: '/screener',             icon: Filter,      label: 'Screener' },
  { to: '/economic-indicators',  icon: TrendingUp,  label: 'Macro' },
  { to: '/monitor',              icon: Monitor,     label: 'Monitor' },
  { to: '/beat-index',           icon: Target,      label: 'Beat the Index' },
  { to: '/jollof-war',          icon: JollofIcon,  label: 'Jollof War' },
]

interface SidebarProps {
  collapsed:      boolean
  onToggle:       () => void
  mobileOpen?:    boolean
  onMobileClose?: () => void
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { unreadCount } = useAlerts()

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="sidebar-backdrop" onClick={onMobileClose} aria-hidden />
      )}

      <nav className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>

        {/* Mobile close button */}
        <div className="sidebar-mobile-header">
          <span className="sidebar-mobile-brand">
            <span style={{ color: 'var(--color-gold)', fontWeight: 800 }}>Z</span>amani
          </span>
          <button className="sidebar-mobile-close" onClick={onMobileClose} aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        {/* Main nav */}
        <div className="sidebar-section">
          {NAV.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
              title={collapsed ? label : undefined}
              onClick={onMobileClose}
            >
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Icon size={14} />
                {badge && unreadCount > 0 && (
                  <span className="nav-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
                )}
              </span>
              {!collapsed && <span>{label}</span>}
              {!collapsed && badge && unreadCount > 0 && (
                <span className="nav-badge-inline">{unreadCount}</span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Exchanges */}
        {!collapsed && (
          <div className="sidebar-section">
            <div className="sidebar-heading">
              <BarChart2 size={10} />
              <span>Exchanges</span>
            </div>
            {EXCHANGES.map(ex => (
              <NavLink
                key={ex.id}
                to={`/exchange/${ex.id}`}
                className={({ isActive }) => `nav-item nav-item--exchange ${isActive ? 'nav-item--active' : ''}`}
                onClick={onMobileClose}
              >
                <span className={`ex-dot ex-dot--${ex.id}`} />
                <span className="ex-label">{ex.label}</span>
                <span className="ex-flag">{countryFlag(ex.country)}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Collapse toggle — desktop only */}
        <button className="sidebar-toggle" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        <style>{`
          /* ── Sidebar base ── */
          .sidebar {
            width: 160px; flex-shrink: 0;
            background: var(--color-bg-secondary);
            border-right: 1px solid var(--color-border-subtle);
            display: flex; flex-direction: column;
            overflow-y: auto; overflow-x: hidden;
            transition: width 0.2s ease;
            z-index: 200;
          }
          .sidebar--collapsed { width: 44px; }

          /* Mobile header inside sidebar */
          .sidebar-mobile-header {
            display: none;
            align-items: center; justify-content: space-between;
            padding: 0.75rem 0.875rem;
            border-bottom: 1px solid var(--color-border-subtle);
            font-size: 15px; font-weight: 800; letter-spacing: -0.02em;
          }
          .sidebar-mobile-brand { font-size: 15px; font-weight: 800; }
          .sidebar-mobile-close {
            background: none; border: none; cursor: pointer; color: var(--color-text-muted);
            display: flex; align-items: center; padding: 4px;
            border-radius: 4px; transition: color 0.1s, background 0.1s;
          }
          .sidebar-mobile-close:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

          /* Backdrop */
          .sidebar-backdrop {
            display: none;
            position: fixed; inset: 0; z-index: 199;
            background: rgba(0, 0, 0, 0.55);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          }

          .sidebar-section {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--color-border-subtle);
          }

          .sidebar-heading {
            display: flex; align-items: center; gap: 0.375rem;
            padding: 0.375rem 0.75rem;
            font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
            color: var(--color-text-muted);
          }

          .nav-item {
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.375rem 0.75rem; font-size: 12px;
            color: var(--color-text-secondary); text-decoration: none;
            transition: color 0.15s, background 0.15s; white-space: nowrap;
          }
          .nav-item:hover        { color: var(--color-text-primary); background: var(--color-bg-hover); }
          .nav-item--active      { color: var(--color-gold); background: var(--color-gold-subtle); }
          .nav-item--exchange    { font-size: 11px; padding: 0.25rem 0.75rem; }

          .ex-dot {
            width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
            background: var(--color-text-muted);
          }
          .ex-dot--jse  { background: var(--color-jse); }
          .ex-dot--ngx  { background: var(--color-ngx); }
          .ex-dot--nse  { background: var(--color-nse); }
          .ex-dot--gse  { background: var(--color-gse); }
          .ex-dot--brvm { background: var(--color-brvm); }
          .ex-dot--zse  { background: var(--color-zse); }
          .ex-dot--bse  { background: var(--color-bse); }
          .ex-dot--luse { background: var(--color-luse); }
          .ex-dot--use  { background: var(--color-use); }

          .ex-label { flex: 1; }
          .ex-flag  { font-size: 13px; }

          .nav-badge {
            position: absolute; top: -4px; right: -6px;
            min-width: 12px; height: 12px; border-radius: 6px;
            background: var(--color-down); color: white;
            font-size: 7px; font-weight: 700; font-family: var(--font-mono);
            display: flex; align-items: center; justify-content: center; padding: 0 2px;
          }
          .nav-badge-inline {
            margin-left: auto; min-width: 16px; height: 16px; border-radius: 8px;
            background: var(--color-down); color: white;
            font-size: 8px; font-weight: 700; font-family: var(--font-mono);
            display: flex; align-items: center; justify-content: center; padding: 0 3px;
          }

          .sidebar-toggle {
            margin-top: auto; display: flex; align-items: center; justify-content: center;
            padding: 0.5rem; color: var(--color-text-muted); background: transparent;
            border: none; border-top: 1px solid var(--color-border-subtle);
            cursor: pointer; width: 100%; transition: color 0.15s, background 0.15s;
          }
          .sidebar-toggle:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

          /* ─── Mobile breakpoint ─────────────────────────────────────── */
          @media (max-width: 900px) {
            /* Take sidebar out of flex flow; make it an overlay */
            .sidebar {
              position: fixed;
              top: 0; left: 0; bottom: 0;
              width: 240px !important;   /* override collapsed width */
              height: 100dvh;
              transform: translateX(-100%);
              transition: transform 0.25s ease;
              box-shadow: none;
              border-right: 1px solid var(--color-border);
            }
            .sidebar--mobile-open {
              transform: translateX(0);
              box-shadow: 8px 0 32px rgba(0,0,0,0.5);
            }
            /* Show mobile header row */
            .sidebar-mobile-header { display: flex; }
            /* Hide the desktop collapse toggle on mobile */
            .sidebar-toggle { display: none; }
            /* Show backdrop */
            .sidebar-backdrop { display: block; }
          }
        `}</style>
      </nav>
    </>
  )
}

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join('')
}
