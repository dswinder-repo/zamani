import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutDashboard, Newspaper, DollarSign, Star, X } from 'lucide-react'

const STATIC_ITEMS = [
  { label: 'Dashboard',     to: '/',          icon: LayoutDashboard, hint: 'Overview' },
  { label: 'News',          to: '/news',       icon: Newspaper,       hint: 'African markets news' },
  { label: 'Forex',         to: '/forex',      icon: DollarSign,      hint: 'Exchange rates' },
  { label: 'Watchlist',     to: '/watchlist',  icon: Star,            hint: 'Your tracked securities' },
  { label: 'JSE',           to: '/exchange/jse',  icon: LayoutDashboard, hint: 'Johannesburg Stock Exchange' },
  { label: 'NGX',           to: '/exchange/ngx',  icon: LayoutDashboard, hint: 'Nigerian Exchange Group' },
  { label: 'NSE',           to: '/exchange/nse',  icon: LayoutDashboard, hint: 'Nairobi Securities Exchange' },
  { label: 'GSE',           to: '/exchange/gse',  icon: LayoutDashboard, hint: 'Ghana Stock Exchange' },
  { label: 'BRVM',          to: '/exchange/brvm', icon: LayoutDashboard, hint: 'Bourse Régionale UEMOA' },
]

interface CommandPaletteProps {
  onClose: () => void
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = STATIC_ITEMS.filter(
    item =>
      query === '' ||
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.hint.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setSelected(0) }, [query])

  function go(to: string) {
    navigate(to)
    onClose()
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter'  && filtered[selected]) go(filtered[selected].to)
  }

  return (
    <div className="cp-overlay" onClick={onClose}>
      <div className="cp-dialog" onClick={e => e.stopPropagation()} onKeyDown={onKey}>
        {/* Search input */}
        <div className="cp-input-row">
          <Search size={14} />
          <input
            ref={inputRef}
            className="cp-input"
            placeholder="Search markets, exchanges, pages…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="cp-close" onClick={onClose} aria-label="Close">
            <X size={13} />
          </button>
        </div>

        {/* Results */}
        <div className="cp-results">
          {filtered.length === 0 && (
            <div className="cp-empty">No results for "{query}"</div>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon
            return (
              <button
                key={item.to}
                className={`cp-item ${i === selected ? 'cp-item--active' : ''}`}
                onClick={() => go(item.to)}
                onMouseEnter={() => setSelected(i)}
              >
                <Icon size={13} />
                <span className="cp-item-label">{item.label}</span>
                <span className="cp-item-hint">{item.hint}</span>
              </button>
            )
          })}
        </div>

        <div className="cp-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>

      <style>{`
        .cp-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.6);
          display: flex; align-items: flex-start; justify-content: center;
          padding-top: 15vh;
        }
        .cp-dialog {
          width: 560px; max-width: 90vw;
          background: var(--color-bg-elevated);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(0,0,0,0.6);
        }
        .cp-input-row {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
        }
        .cp-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--color-text-primary); font-size: 14px;
          font-family: var(--font-sans);
        }
        .cp-input::placeholder { color: var(--color-text-muted); }
        .cp-close {
          background: transparent; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px;
        }
        .cp-close:hover { color: var(--color-text-primary); }
        .cp-results {
          max-height: 360px; overflow-y: auto; padding: 0.375rem 0;
        }
        .cp-empty {
          padding: 1.5rem; text-align: center;
          color: var(--color-text-muted); font-size: 12px;
        }
        .cp-item {
          display: flex; align-items: center; gap: 0.625rem;
          width: 100%; padding: 0.5rem 1rem;
          background: transparent; border: none; cursor: pointer;
          color: var(--color-text-secondary); font-size: 13px; text-align: left;
          transition: background 0.1s;
        }
        .cp-item--active { background: var(--color-bg-hover); color: var(--color-text-primary); }
        .cp-item-label   { flex: 1; }
        .cp-item-hint    { font-size: 11px; color: var(--color-text-muted); }
        .cp-footer {
          display: flex; gap: 1rem; align-items: center;
          padding: 0.5rem 1rem;
          border-top: 1px solid var(--color-border-subtle);
          font-size: 11px; color: var(--color-text-muted);
        }
        .cp-footer kbd {
          font-family: var(--font-mono); font-size: 10px;
          background: var(--color-bg-secondary);
          padding: 1px 4px; border-radius: 3px;
          margin-right: 3px;
        }
      `}</style>
    </div>
  )
}
