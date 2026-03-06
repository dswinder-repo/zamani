import { useQueries } from '@tanstack/react-query'
import { Star, X, Plus } from 'lucide-react'
import { useState } from 'react'
import { useWatchlist } from '../../stores/watchlist'
import { provider } from '../../services/api'
import type { Quote, OHLCV } from '../../services/api/types'
import Sparkline from '../charts/Sparkline'

export default function WatchlistPanel() {
  const { lists, activeId, symbols, add, remove, createList, setActive } = useWatchlist()
  const [adding, setAdding] = useState(false)
  const [input, setInput]   = useState('')
  const [newListInput, setNewListInput] = useState('')
  const [addingList, setAddingList]     = useState(false)

  const quoteResults = useQueries({
    queries: symbols.map(sym => ({
      queryKey: ['quote', sym],
      queryFn:  () => provider.getQuote(sym),
      staleTime: 60_000,
      refetchInterval: 60_000,
    })),
  })

  const histResults = useQueries({
    queries: symbols.map(sym => ({
      queryKey: ['history', sym, 30],
      queryFn:  () => provider.getHistory(sym, 30),
      staleTime: 5 * 60_000,
    })),
  })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const sym = input.trim().toUpperCase()
    if (sym) { add(sym); setInput(''); setAdding(false) }
  }

  function handleNewList(e: React.FormEvent) {
    e.preventDefault()
    const name = newListInput.trim()
    if (name) { createList(name); setNewListInput(''); setAddingList(false) }
  }

  return (
    <div className="wl-panel">
      {/* List tabs */}
      {lists.length > 1 && (
        <div className="wl-tabs">
          {lists.map(l => (
            <button
              key={l.id}
              className={`wl-tab ${l.id === activeId ? 'active' : ''}`}
              onClick={() => setActive(l.id)}
              title={l.name}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}

      <div className="wl-list">
        {symbols.length === 0 && (
          <div className="wl-empty">No symbols — add one below</div>
        )}
        {symbols.map((sym, i) => {
          const q    = quoteResults[i]?.data as Quote | undefined
          const hist = histResults[i]?.data  as OHLCV[] | undefined
          const isUp = (q?.changePct ?? 0) >= 0
          const sparkData = hist?.map(d => d.close) ?? []

          return (
            <div key={sym} className="wl-row">
              <Star size={10} className="wl-star" />
              <div className="wl-sym-col">
                <span className="wl-sym">{sym}</span>
                {q?.exchange && <span className="wl-exch">{q.exchange}</span>}
              </div>
              {sparkData.length >= 5 && (
                <div className="wl-spark">
                  <Sparkline data={sparkData} up={isUp} height={24} width={56} />
                </div>
              )}
              <div className="wl-price-col">
                {q ? (
                  <>
                    <span className="wl-price">{q.price.toFixed(2)}</span>
                    <span className={`wl-chg ${isUp ? 'up' : 'down'}`}>
                      {isUp ? '+' : ''}{q.changePct.toFixed(2)}%
                    </span>
                  </>
                ) : (
                  <span className="wl-loading">—</span>
                )}
              </div>
              <button
                className="wl-remove"
                onClick={() => remove(sym)}
                title={`Remove ${sym}`}
                aria-label={`Remove ${sym}`}
              >
                <X size={10} />
              </button>
            </div>
          )
        })}
      </div>

      {adding ? (
        <form className="wl-add-form" onSubmit={handleAdd}>
          <input
            className="wl-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. SCOM.NR"
            autoFocus
          />
          <button type="submit" className="wl-add-btn">Add</button>
          <button type="button" className="wl-cancel-btn" onClick={() => setAdding(false)}>✕</button>
        </form>
      ) : (
        <div className="wl-footer">
          <button className="wl-add-trigger" onClick={() => setAdding(true)}>
            <Plus size={10} /> Add symbol
          </button>
          {!addingList ? (
            <button className="wl-list-trigger" onClick={() => setAddingList(true)} title="New watchlist">
              <Plus size={9} /> List
            </button>
          ) : (
            <form className="wl-newlist-form" onSubmit={handleNewList}>
              <input
                className="wl-input"
                value={newListInput}
                onChange={e => setNewListInput(e.target.value)}
                placeholder="List name"
                autoFocus
                style={{ width: 80 }}
              />
              <button type="submit" className="wl-add-btn">OK</button>
              <button type="button" className="wl-cancel-btn" onClick={() => setAddingList(false)}>✕</button>
            </form>
          )}
        </div>
      )}

      <style>{`
        .wl-panel { display: flex; flex-direction: column; gap: 0.5rem; }

        .wl-tabs { display: flex; gap: 2px; flex-wrap: wrap; }
        .wl-tab {
          padding: 2px 7px; font-size: 9px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted); cursor: pointer;
          transition: all 0.1s; white-space: nowrap;
        }
        .wl-tab:hover  { color: var(--color-text-secondary); }
        .wl-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .wl-list  { display: flex; flex-direction: column; }

        .wl-empty {
          font-size: 11px;
          color: var(--color-text-muted);
          padding: 0.5rem 0;
          font-style: italic;
        }

        .wl-row {
          display: grid;
          grid-template-columns: 10px 1fr 56px auto 14px;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wl-row:last-child { border-bottom: none; }
        .wl-row:hover .wl-remove { opacity: 1; }

        .wl-star { color: var(--color-gold); flex-shrink: 0; }

        .wl-sym-col { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .wl-sym {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .wl-exch {
          font-size: 9px;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }

        .wl-spark { display: flex; align-items: center; opacity: 0.85; }

        .wl-price-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1px;
        }
        .wl-price {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-secondary);
        }
        .wl-chg {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .wl-chg.up   { color: var(--color-up); }
        .wl-chg.down { color: var(--color-down); }
        .wl-loading  { font-size: 11px; color: var(--color-text-muted); }

        .wl-remove {
          opacity: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-muted);
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s, opacity 0.15s;
        }
        .wl-remove:hover { color: var(--color-down); }

        .wl-footer { display: flex; gap: 0.35rem; align-items: center; }

        .wl-add-trigger {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted);
          font-size: 11px;
          padding: 0.35rem 0.6rem;
          border-radius: 3px;
          cursor: pointer;
          flex: 1;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s;
        }
        .wl-add-trigger:hover {
          color: var(--color-gold);
          border-color: var(--color-gold);
        }
        .wl-list-trigger {
          display: flex; align-items: center; gap: 2px;
          background: none; border: 1px dashed var(--color-border-subtle);
          color: var(--color-text-muted); font-size: 9px;
          padding: 0.35rem 0.4rem; border-radius: 3px; cursor: pointer;
          transition: color 0.15s, border-color 0.15s; flex-shrink: 0;
          white-space: nowrap;
        }
        .wl-list-trigger:hover { color: var(--color-gold); border-color: var(--color-gold); }

        .wl-add-form, .wl-newlist-form {
          display: flex;
          gap: 0.35rem;
          align-items: center;
        }
        .wl-input {
          flex: 1;
          background: var(--color-bg-tertiary);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          outline: none;
        }
        .wl-input:focus { border-color: var(--color-gold); }
        .wl-add-btn, .wl-cancel-btn {
          background: none;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 11px;
          padding: 0.3rem 0.5rem;
          border-radius: 3px;
          cursor: pointer;
          white-space: nowrap;
        }
        .wl-add-btn:hover    { border-color: var(--color-gold); color: var(--color-gold); }
        .wl-cancel-btn:hover { border-color: var(--color-down); color: var(--color-down); }
      `}</style>
    </div>
  )
}
