import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Newspaper,
  DollarSign,
  Star,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const EXCHANGES = [
  { id: 'jse',  label: 'JSE',  country: 'ZA', tier: 1 },
  { id: 'ngx',  label: 'NGX',  country: 'NG', tier: 1 },
  { id: 'nse',  label: 'NSE',  country: 'KE', tier: 1 },
  { id: 'gse',  label: 'GSE',  country: 'GH', tier: 2 },
  { id: 'brvm', label: 'BRVM', country: 'CI', tier: 2 },
  { id: 'zse',  label: 'ZSE',  country: 'ZW', tier: 2 },
  { id: 'bse',  label: 'BSE',  country: 'BW', tier: 2 },
  { id: 'luse', label: 'LUSE', country: 'ZM', tier: 3 },
]

const NAV = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/news',      icon: Newspaper,       label: 'News' },
  { to: '/forex',     icon: DollarSign,      label: 'Forex' },
  { to: '/watchlist', icon: Star,            label: 'Watchlist' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <nav className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Main nav */}
      <div className="sidebar-section">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon size={14} />
            {!collapsed && <span>{label}</span>}
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
            >
              <span className={`ex-dot ex-dot--${ex.id}`} />
              <span className="ex-label">{ex.label}</span>
              <span className="ex-flag">{countryFlag(ex.country)}</span>
            </NavLink>
          ))}
        </div>
      )}

      {/* Collapse toggle */}
      <button className="sidebar-toggle" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      <style>{`
        .sidebar {
          width: 160px;
          flex-shrink: 0;
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border-subtle);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          transition: width 0.2s ease;
        }
        .sidebar--collapsed { width: 44px; }

        .sidebar-section {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        .sidebar-heading {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          font-size: 12px;
          color: var(--color-text-secondary);
          text-decoration: none;
          border-radius: 0;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .nav-item:hover        { color: var(--color-text-primary); background: var(--color-bg-hover); }
        .nav-item--active      { color: var(--color-gold); background: var(--color-gold-subtle); }
        .nav-item--exchange    { font-size: 11px; padding: 0.25rem 0.75rem; }

        .ex-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
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

        .ex-label { flex: 1; }
        .ex-flag  { font-size: 13px; }

        .sidebar-toggle {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          color: var(--color-text-muted);
          background: transparent;
          border: none;
          border-top: 1px solid var(--color-border-subtle);
          cursor: pointer;
          width: 100%;
          transition: color 0.15s, background 0.15s;
        }
        .sidebar-toggle:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }
      `}</style>
    </nav>
  )
}

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join('')
}
