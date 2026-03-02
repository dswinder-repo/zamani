/**
 * StocksTable — searchable list of equities for a given exchange.
 * Links each row to the stock detail page.
 */
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import type { Quote } from '../../services/api/types'
import { useFlash } from '../../hooks/useFlash'

interface StocksTableProps {
  exchangeId:   string
  quotes:       Quote[]
  isLoading?:   boolean
  activeSector?: string | null
}

function ChangeCell({ pct }: { pct: number }) {
  const up = pct >= 0
  return (
    <span
      className={`num stock-chg ${up ? 'text-up' : 'text-down'}`}
      style={{
        display: 'inline-block', minWidth: 52, textAlign: 'right',
        padding: '1px 5px', borderRadius: 3,
        background: up ? 'var(--color-up-subtle)' : 'var(--color-down-subtle)',
      }}
    >
      {up ? '+' : ''}{pct.toFixed(2)}%
    </span>
  )
}

function StockRow({ q, exchangeId }: { q: Quote; exchangeId: string }) {
  const flash = useFlash(q.price)
  return (
    <Link
      to={`/exchange/${exchangeId}/stock/${encodeURIComponent(q.symbol)}`}
      className={`st-row ${flash}`}
    >
      <span className="st-symbol num">{q.symbol.replace(`.${exchangeId.toUpperCase()}`, '')}</span>
      <span className="st-name">{q.name}</span>
      <span className="st-price num st-align-r">
        {q.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        <span style={{ fontSize: 9, color: 'var(--color-text-muted)', marginLeft: 3 }}>{q.currency}</span>
      </span>
      <span className="st-align-r"><ChangeCell pct={q.changePct} /></span>
      <span className="st-vol num st-align-r">
        {q.volume ? (q.volume / 1_000).toFixed(0) + 'K' : '—'}
      </span>
    </Link>
  )
}

export default function StocksTable({ exchangeId, quotes, isLoading, activeSector }: StocksTableProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() =>
    quotes.filter(q => {
      const matchQuery = !query ||
        q.symbol.toLowerCase().includes(query.toLowerCase()) ||
        q.name.toLowerCase().includes(query.toLowerCase())
      return matchQuery
    }),
  [quotes, query])

  // activeSector filtering happens upstream (Exchange.tsx passes already-filtered quotes)
  // but we show the sector label in the count
  const displayCount = filtered.length

  return (
    <div className="stocks-table-wrap panel">
      {/* Search bar */}
      <div className="st-search-row">
        <Search size={12} />
        <input
          className="st-search"
          placeholder="Search symbols or names…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="st-count">
          {displayCount} {activeSector ? `(${activeSector})` : 'securities'}
        </span>
      </div>

      {/* Header */}
      <div className="st-header">
        <span>Symbol</span>
        <span>Name</span>
        <span className="st-align-r">Price</span>
        <span className="st-align-r">Change</span>
        <span className="st-align-r">Volume</span>
      </div>

      {/* Rows */}
      {isLoading ? (
        <div className="st-empty">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="st-empty">
          {query ? `No results for "${query}"` : 'No securities in this sector'}
        </div>
      ) : (
        filtered.map(q => (
          <StockRow key={q.symbol} q={q} exchangeId={exchangeId} />
        ))
      )}

      <style>{`
        .stocks-table-wrap { overflow: hidden; }

        .st-search-row {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
        }
        .st-search {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-sans); font-size: 12px;
          color: var(--color-text-primary);
        }
        .st-search::placeholder { color: var(--color-text-muted); }
        .st-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); white-space: nowrap; }

        .st-header {
          display: grid; grid-template-columns: 80px 1fr 90px 80px 70px;
          gap: 0.5rem; padding: 0.25rem 0.75rem;
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-tertiary);
        }
        .st-row {
          display: grid; grid-template-columns: 80px 1fr 90px 80px 70px;
          gap: 0.5rem; padding: 0.375rem 0.75rem;
          align-items: center;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none;
          transition: background 0.1s;
          cursor: pointer;
        }
        .st-row:last-child { border-bottom: none; }
        .st-row:hover { background: var(--color-bg-hover); }

        .st-symbol { font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .st-name   { font-size: 11px; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .st-price  { font-size: 12px; color: var(--color-text-primary); }
        .st-vol    { font-size: 11px; color: var(--color-text-muted); }
        .st-align-r { text-align: right; }

        .st-empty {
          padding: 2rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }
      `}</style>
    </div>
  )
}
