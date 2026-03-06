/**
 * Monitor Mode — full-screen stock grid for at-a-glance market watching.
 * Shows all watchlist symbols with large price and change display.
 * Auto-refreshes every 30 seconds.
 */
import { useEffect } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { X, Maximize2 } from 'lucide-react'
import { provider } from '../services/api'
import type { Quote } from '../services/api'
import { useWatchlist } from '../stores/watchlist'

export default function Monitor() {
  const { symbols } = useWatchlist()

  const results = useQueries({
    queries: symbols.map(sym => ({
      queryKey:        ['quote', sym],
      queryFn:         () => provider.getQuote(sym),
      staleTime:       30_000,
      refetchInterval: 30_000,
    })),
  })

  // Request fullscreen on mount
  useEffect(() => {
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { /* ignore */ })
    }
    return () => {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => { /* ignore */ })
      }
    }
  }, [])

  if (!symbols.length) {
    return (
      <div className="mon-empty">
        <div>No symbols in your watchlist.</div>
        <Link to="/watchlist" className="mon-link">Add symbols →</Link>
      </div>
    )
  }

  return (
    <div className="mon-root">
      <div className="mon-topbar">
        <span className="mon-title">Monitor</span>
        <span className="mon-count">{symbols.length} symbols</span>
        <Link to="/" className="mon-close" title="Exit monitor mode">
          <X size={14} />
        </Link>
        <button
          className="mon-fs-btn"
          title="Toggle fullscreen"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => { /* ignore */ })
            } else {
              document.exitFullscreen().catch(() => { /* ignore */ })
            }
          }}
        >
          <Maximize2 size={12} />
        </button>
      </div>

      <div className="mon-grid">
        {symbols.map((sym, i) => {
          const q   = results[i]?.data as Quote | undefined
          const up  = (q?.changePct ?? 0) >= 0
          const loading = results[i]?.isLoading

          return (
            <Link
              key={sym}
              to={`/exchange/${q?.exchange?.toLowerCase() ?? 'jse'}/stock/${encodeURIComponent(sym)}`}
              className={`mon-card ${loading ? 'loading' : ''} ${q ? (up ? 'up' : 'down') : ''}`}
            >
              <div className="mon-sym">{sym.split('.')[0]}</div>
              {q?.name && <div className="mon-name">{q.name}</div>}
              <div className="mon-price num">
                {loading ? '…' : q ? q.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2, maximumFractionDigits: 2,
                }) : '—'}
              </div>
              <div className={`mon-chg num ${up ? 'up' : 'down'}`}>
                {q ? `${up ? '+' : ''}${q.changePct.toFixed(2)}%` : ''}
              </div>
              {q?.currency && <div className="mon-cur">{q.currency}</div>}
            </Link>
          )
        })}
      </div>

      <style>{`
        .mon-root {
          position: fixed; inset: 0; z-index: 9000;
          background: var(--color-bg-primary);
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        .mon-topbar {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: var(--color-bg-secondary);
          border-bottom: 1px solid var(--color-border-subtle);
          flex-shrink: 0;
        }
        .mon-title {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--color-gold);
        }
        .mon-count {
          font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .mon-close, .mon-fs-btn {
          margin-left: auto; display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 4px;
          color: var(--color-text-muted); background: none; border: none;
          text-decoration: none; cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }
        .mon-fs-btn { margin-left: 0; }
        .mon-close:hover { color: var(--color-down); background: var(--color-down-subtle); }
        .mon-fs-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }

        .mon-grid {
          flex: 1; overflow-y: auto; padding: 1rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 0.75rem;
          align-content: start;
        }

        .mon-card {
          display: flex; flex-direction: column; justify-content: center;
          padding: 1rem 1.25rem; border-radius: 6px;
          text-decoration: none;
          border: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
          transition: transform 0.15s, border-color 0.15s;
          min-height: 110px;
        }
        .mon-card:hover { transform: translateY(-2px); border-color: var(--color-gold-dim); }
        .mon-card.loading { opacity: 0.6; }
        .mon-card.up   { border-top: 2px solid var(--color-up); }
        .mon-card.down { border-top: 2px solid var(--color-down); }

        .mon-sym {
          font-family: var(--font-mono); font-size: 14px; font-weight: 800;
          color: var(--color-gold); letter-spacing: 0.02em; margin-bottom: 2px;
        }
        .mon-name {
          font-size: 9px; color: var(--color-text-muted);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          margin-bottom: 0.5rem;
        }
        .mon-price {
          font-size: 22px; font-weight: 800; letter-spacing: -0.03em;
          color: var(--color-text-primary); line-height: 1;
        }
        .mon-chg {
          font-size: 13px; font-weight: 600; margin-top: 3px;
        }
        .mon-chg.up   { color: var(--color-up); }
        .mon-chg.down { color: var(--color-down); }
        .mon-cur {
          font-size: 9px; color: var(--color-text-muted);
          font-family: var(--font-mono); margin-top: 4px;
        }

        .mon-empty {
          position: fixed; inset: 0; z-index: 9000;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1rem; background: var(--color-bg-primary);
          font-size: 14px; color: var(--color-text-muted);
        }
        .mon-link {
          color: var(--color-gold); text-decoration: none; font-weight: 600;
        }
        .mon-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}
