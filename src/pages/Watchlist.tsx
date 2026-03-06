import { Star, X, Search, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { provider } from '../services/api'
import type { Quote } from '../services/api'
import Sparkline from '../components/charts/Sparkline'
import { useWatchlist } from '../stores/watchlist'

export default function Watchlist() {
  const { lists, activeId, symbols, add, remove, createList, deleteList, setActive } = useWatchlist()
  const [addInput, setAddInput] = useState('')
  const [newListInput, setNewListInput] = useState('')
  const [showNewList, setShowNewList] = useState(false)

  const activeList = lists.find(l => l.id === activeId)

  const results = useQueries({
    queries: symbols.map(sym => ({
      queryKey:      ['quote', sym],
      queryFn:       () => provider.getQuote(sym),
      staleTime:     30_000,
      refetchInterval: 30_000,
    })),
  })

  function handleAdd() {
    const sym = addInput.trim().toUpperCase()
    if (sym && !symbols.includes(sym)) {
      add(sym)
      setAddInput('')
    }
  }

  function handleNewList() {
    const name = newListInput.trim()
    if (name) { createList(name); setNewListInput(''); setShowNewList(false) }
  }

  return (
    <div className="wl-page">
      <div className="wl-page-header">
        <div>
          <h1 className="wl-h1">Watchlist</h1>
          <p className="wl-sub">Your tracked securities — live quotes, refreshed every 30s</p>
        </div>
        <button className="wl-new-list-btn" onClick={() => setShowNewList(v => !v)}>
          <Plus size={11} /> New List
        </button>
      </div>

      {/* List tabs */}
      <div className="wl-list-tabs">
        {lists.map(l => (
          <div key={l.id} className={`wl-list-tab ${l.id === activeId ? 'active' : ''}`}>
            <button className="wl-list-tab-btn" onClick={() => setActive(l.id)}>
              {l.name} <span className="wl-list-count">{l.symbols.length}</span>
            </button>
            {lists.length > 1 && (
              <button
                className="wl-list-del"
                onClick={() => deleteList(l.id)}
                aria-label={`Delete ${l.name}`}
                title={`Delete ${l.name}`}
              >
                <Trash2 size={9} />
              </button>
            )}
          </div>
        ))}
        {showNewList && (
          <div className="wl-new-list-form">
            <input
              className="wl-add-input"
              placeholder="List name"
              value={newListInput}
              onChange={e => setNewListInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNewList()}
              autoFocus
              style={{ width: 120 }}
            />
            <button className="wl-add-btn" onClick={handleNewList}>Create</button>
            <button className="wl-add-btn" onClick={() => setShowNewList(false)} style={{ borderColor: 'var(--color-border)' }}>✕</button>
          </div>
        )}
      </div>

      {activeList && <div className="wl-active-name">{activeList.name}</div>}

      {/* Add symbol input */}
      <div className="wl-add-row">
        <Search size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        <input
          className="wl-add-input"
          placeholder="Add symbol (e.g. NPN, SCOM)"
          value={addInput}
          onChange={e => setAddInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="wl-add-btn" onClick={handleAdd} disabled={!addInput.trim()}>
          <Plus size={12} /> Add
        </button>
      </div>

      {/* Empty state */}
      {symbols.length === 0 ? (
        <div className="wl-empty panel">
          <Star size={24} style={{ opacity: 0.2, marginBottom: '0.5rem' }} />
          <p>No securities in your watchlist yet.</p>
          <p style={{ fontSize: 11 }}>Type a symbol above or use ⌘K to search and add.</p>
        </div>
      ) : (
        <>
          <div className="wl-count">{symbols.length} securities tracked</div>
          <div className="wl-grid">
            {results.map((res, i) => {
              const sym   = symbols[i]
              const quote = res.data as Quote | undefined
              const up    = (quote?.changePct ?? 0) >= 0

              return (
                <div key={sym} className="wl-card panel">
                  <div className="wl-card-header">
                    <div>
                      <div className="wl-card-symbol">{sym}</div>
                      <div className="wl-card-name">{quote?.name ?? sym}</div>
                    </div>
                    <button
                      className="wl-remove"
                      onClick={() => remove(sym)}
                      aria-label={`Remove ${sym}`}
                    >
                      <X size={11} />
                    </button>
                  </div>

                  <div className="wl-card-body">
                    <div className="wl-card-price-col">
                      {res.isLoading ? (
                        <span className="wl-loading">…</span>
                      ) : quote ? (
                        <>
                          <div className="wl-card-price num">
                            {quote.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="wl-card-cur">{quote.currency}</span>
                          </div>
                          <div className={`wl-card-chg num ${up ? 'text-up' : 'text-down'}`}>
                            {up ? '+' : ''}{quote.changePct.toFixed(2)}%
                          </div>
                        </>
                      ) : (
                        <span className="wl-loading">No data</span>
                      )}
                    </div>

                    {quote && (
                      <div className="wl-card-spark">
                        <Sparkline
                          data={Array.from({ length: 20 }, (_, i) =>
                            quote.price * (1 + (Math.sin(i * 0.8 + quote.price) * 0.02))
                          )}
                          up={up}
                          width={70} height={32}
                        />
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/exchange/${quote?.exchange?.toLowerCase() ?? 'jse'}/stock/${encodeURIComponent(sym)}`}
                    className="wl-card-link"
                  >
                    View detail →
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      )}

      <style>{`
        .wl-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .wl-page-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .wl-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .wl-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .wl-new-list-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
        }
        .wl-new-list-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); }

        .wl-list-tabs { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
        .wl-list-tab {
          display: flex; align-items: center;
          border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden;
        }
        .wl-list-tab.active { border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }
        .wl-list-tab-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 3px 8px; background: none; border: none;
          font-size: 11px; font-weight: 600; cursor: pointer;
          color: var(--color-text-muted); transition: color 0.1s;
        }
        .wl-list-tab.active .wl-list-tab-btn { color: var(--color-gold); }
        .wl-list-count {
          font-size: 9px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .wl-list-del {
          padding: 3px 5px; background: none; border: none;
          border-left: 1px solid var(--color-border);
          color: var(--color-text-muted); cursor: pointer; opacity: 0.5;
          transition: all 0.1s; display: flex; align-items: center;
        }
        .wl-list-del:hover { opacity: 1; color: var(--color-down); }

        .wl-new-list-form {
          display: flex; align-items: center; gap: 4px;
        }
        .wl-active-name {
          font-size: 11px; font-weight: 700; color: var(--color-gold);
          text-transform: uppercase; letter-spacing: 0.05em;
        }

        .wl-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        /* Add row */
        .wl-add-row {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.375rem 0.75rem;
          max-width: 320px;
        }
        .wl-add-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-primary); text-transform: uppercase;
        }
        .wl-add-input::placeholder { text-transform: none; color: var(--color-text-muted); font-family: var(--font-sans); }
        .wl-add-btn {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); border-radius: 3px;
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          cursor: pointer; transition: all 0.1s;
        }
        .wl-add-btn:hover:not(:disabled) { background: var(--color-gold-dim); color: var(--color-bg-primary); }
        .wl-add-btn:disabled { opacity: 0.4; cursor: default; }

        /* Empty */
        .wl-empty {
          padding: 3rem 2rem; text-align: center;
          color: var(--color-text-muted); font-size: 13px;
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
        }
        .wl-empty p { margin: 0; }

        /* Grid of cards */
        .wl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .wl-card { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }

        .wl-card-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .wl-card-symbol {
          font-family: var(--font-mono); font-size: 13px; font-weight: 700;
          color: var(--color-gold); letter-spacing: 0.02em;
        }
        .wl-card-name { font-size: 10px; color: var(--color-text-muted); margin-top: 1px; }

        .wl-remove {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px;
          border-radius: 3px; transition: all 0.1s;
        }
        .wl-remove:hover { color: var(--color-down); background: var(--color-down-subtle); }

        .wl-card-body { display: flex; align-items: center; justify-content: space-between; }
        .wl-card-price-col { display: flex; flex-direction: column; gap: 2px; }

        .wl-card-price {
          font-size: 16px; font-weight: 800; letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }
        .wl-card-cur { font-size: 9px; color: var(--color-text-muted); margin-left: 3px; }
        .wl-card-chg { font-size: 11px; font-weight: 600; }

        .wl-loading { font-size: 11px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .wl-card-link {
          font-size: 10px; color: var(--color-text-muted);
          text-decoration: none; font-weight: 600;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.375rem; margin-top: 0.125rem;
          transition: color 0.1s;
        }
        .wl-card-link:hover { color: var(--color-gold); }
      `}</style>
    </div>
  )
}
