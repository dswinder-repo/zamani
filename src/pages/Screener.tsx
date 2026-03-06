import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Filter, TrendingUp, TrendingDown } from 'lucide-react'
import { provider } from '../services/api'
import type { Quote } from '../services/api'
import { YAHOO_SUPPORTED_EXCHANGES } from '../services/api'

const EXCHANGES = YAHOO_SUPPORTED_EXCHANGES

type SortKey = 'symbol' | 'price' | 'changePct' | 'volume' | 'mktCap'

export default function Screener() {
  const [minChangePct, setMinChangePct] = useState('')
  const [maxChangePct, setMaxChangePct] = useState('')
  const [minVolume,    setMinVolume]    = useState('')
  const [sortKey,      setSortKey]      = useState<SortKey>('changePct')
  const [sortAsc,      setSortAsc]      = useState(false)
  const [selectedEx,   setSelectedEx]   = useState<string>('all')

  const exchangeQueries = useQueries({
    queries: EXCHANGES.map(ex => ({
      queryKey:  ['exchange-stocks', ex],
      queryFn:   () => provider.getExchangeStocks?.(ex) ?? Promise.resolve([]),
      staleTime: 5 * 60_000,
    })),
  })

  const allStocks: (Quote & { exchangeId: string })[] = []
  for (let i = 0; i < EXCHANGES.length; i++) {
    const data = exchangeQueries[i].data as Quote[] | undefined
    if (data) {
      for (const q of data) {
        allStocks.push({ ...q, exchangeId: EXCHANGES[i] })
      }
    }
  }

  const isLoading = exchangeQueries.some(q => q.isLoading)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(v => !v)
    else { setSortKey(key); setSortAsc(false) }
  }

  const filtered = allStocks
    .filter(s => selectedEx === 'all' || s.exchangeId === selectedEx)
    .filter(s => minChangePct === '' || s.changePct >= Number(minChangePct))
    .filter(s => maxChangePct === '' || s.changePct <= Number(maxChangePct))
    .filter(s => minVolume    === '' || (s.volume ?? 0) >= Number(minVolume) * 1_000)
    .sort((a, b) => {
      const av = a[sortKey] ?? 0
      const bv = b[sortKey] ?? 0
      const cmp = typeof av === 'string' ? (av as string).localeCompare(bv as string) : (av as number) - (bv as number)
      return sortAsc ? cmp : -cmp
    })

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <span
      className={`scr-th-btn ${sortKey === k ? 'active' : ''}`}
      onClick={() => toggleSort(k)}
    >
      {label}{sortKey === k ? (sortAsc ? ' ↑' : ' ↓') : ''}
    </span>
  )

  return (
    <div className="scr-page">
      <div className="scr-head">
        <div>
          <h1 className="scr-h1"><Filter size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />Screener</h1>
          <p className="scr-sub">Filter and rank stocks across African exchanges with live data</p>
        </div>
      </div>

      {/* Filters */}
      <div className="panel scr-filters">
        <div className="scr-filter-row">
          <label className="scr-filter-group">
            <span className="scr-filter-label">Exchange</span>
            <select className="scr-input" value={selectedEx} onChange={e => setSelectedEx(e.target.value)}>
              <option value="all">All ({EXCHANGES.join(', ').toUpperCase()})</option>
              {EXCHANGES.map(ex => <option key={ex} value={ex}>{ex.toUpperCase()}</option>)}
            </select>
          </label>
          <label className="scr-filter-group">
            <span className="scr-filter-label">Min Change %</span>
            <input type="number" step="0.1" className="scr-input" placeholder="-100"
              value={minChangePct} onChange={e => setMinChangePct(e.target.value)} />
          </label>
          <label className="scr-filter-group">
            <span className="scr-filter-label">Max Change %</span>
            <input type="number" step="0.1" className="scr-input" placeholder="100"
              value={maxChangePct} onChange={e => setMaxChangePct(e.target.value)} />
          </label>
          <label className="scr-filter-group">
            <span className="scr-filter-label">Min Vol (K)</span>
            <input type="number" className="scr-input" placeholder="0"
              value={minVolume} onChange={e => setMinVolume(e.target.value)} />
          </label>
          <button className="scr-reset" onClick={() => {
            setMinChangePct(''); setMaxChangePct(''); setMinVolume(''); setSelectedEx('all')
          }}>
            Reset
          </button>
        </div>
        <div className="scr-result-count">
          {isLoading ? 'Loading…' : `${filtered.length} stocks`}
        </div>
      </div>

      {/* Results table */}
      {isLoading ? (
        <div className="panel scr-loading">Loading exchange data…</div>
      ) : filtered.length === 0 ? (
        <div className="panel scr-empty">No stocks match your filters</div>
      ) : (
        <div className="panel scr-table-wrap">
          <table className="scr-table">
            <thead>
              <tr>
                <th><SortBtn k="symbol" label="Symbol" /></th>
                <th>Name</th>
                <th>Exchange</th>
                <th className="scr-r"><SortBtn k="price" label="Price" /></th>
                <th className="scr-r"><SortBtn k="changePct" label="Change %" /></th>
                <th className="scr-r"><SortBtn k="volume" label="Volume" /></th>
                <th className="scr-r"><SortBtn k="mktCap" label="Mkt Cap" /></th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 200).map(s => {
                const up = s.changePct >= 0
                return (
                  <tr key={`${s.exchangeId}-${s.symbol}`} className="scr-row">
                    <td>
                      <Link to={`/exchange/${s.exchangeId}/stock/${encodeURIComponent(s.symbol)}`} className="scr-sym">
                        {s.symbol.replace(/\.(JSE|USE|JO|UG)$/i, '')}
                      </Link>
                    </td>
                    <td className="scr-name">{s.name}</td>
                    <td className="scr-ex">{s.exchangeId.toUpperCase()}</td>
                    <td className="scr-r num">{s.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className={`scr-r num scr-chg ${up ? 'text-up' : 'text-down'}`}>
                      {up ? <TrendingUp size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} /> : <TrendingDown size={10} style={{ verticalAlign: 'middle', marginRight: 2 }} />}
                      {up ? '+' : ''}{s.changePct.toFixed(2)}%
                    </td>
                    <td className="scr-r num">{s.volume ? (s.volume / 1_000).toFixed(0) + 'K' : '—'}</td>
                    <td className="scr-r num">{s.mktCap ? fmtCap(s.mktCap) : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length > 200 && (
            <div className="scr-truncate">Showing top 200 of {filtered.length} results</div>
          )}
        </div>
      )}

      <style>{`
        .scr-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1100px; }
        .scr-head { }
        .scr-h1 { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .scr-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .scr-filters { padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .scr-filter-row { display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap; }
        .scr-filter-group { display: flex; flex-direction: column; gap: 3px; font-size: 10px; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .scr-input {
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 3px; padding: 5px 8px; color: var(--color-text-primary);
          font-size: 11px; font-family: var(--font-mono); outline: none; width: 120px;
        }
        .scr-input:focus { border-color: var(--color-gold-dim); }
        .scr-reset {
          padding: 5px 12px; border-radius: 3px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; align-self: flex-end;
          transition: all 0.1s;
        }
        .scr-reset:hover { color: var(--color-text-primary); border-color: var(--color-border); }
        .scr-result-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .scr-loading, .scr-empty {
          padding: 2.5rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        .scr-table-wrap { overflow-x: auto; }
        .scr-table {
          width: 100%; border-collapse: collapse; font-size: 12px;
        }
        .scr-table thead tr {
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .scr-table th {
          padding: 0.375rem 0.75rem;
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600; white-space: nowrap;
          user-select: none;
        }
        .scr-th-btn {
          cursor: pointer; transition: color 0.1s;
        }
        .scr-th-btn:hover, .scr-th-btn.active { color: var(--color-gold); }
        .scr-r { text-align: right; }
        .scr-row {
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background 0.1s;
        }
        .scr-row:hover { background: var(--color-bg-hover); }
        .scr-row td { padding: 0.4rem 0.75rem; }
        .scr-sym {
          font-family: var(--font-mono); font-weight: 700; font-size: 12px;
          color: var(--color-gold); text-decoration: none;
        }
        .scr-sym:hover { text-decoration: underline; }
        .scr-name { font-size: 11px; color: var(--color-text-secondary); max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .scr-ex { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); font-weight: 700; }
        .scr-chg { white-space: nowrap; }
        .scr-truncate {
          padding: 0.5rem 0.75rem; font-size: 10px;
          color: var(--color-text-muted); text-align: center;
          border-top: 1px solid var(--color-border-subtle);
        }
      `}</style>
    </div>
  )
}

function fmtCap(v: number): string {
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}T`
  if (v >= 1e9)  return `${(v / 1e9).toFixed(1)}B`
  if (v >= 1e6)  return `${(v / 1e6).toFixed(1)}M`
  return v.toLocaleString('en-US')
}
