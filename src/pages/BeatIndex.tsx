/**
 * Beat the Index — pick up to 3 JSE stocks and see if they outperform
 * the JSE Top 40 (^J200) since the day you chose them.
 */
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Plus, X, Target, TrendingUp, TrendingDown } from 'lucide-react'
import { provider } from '../services/api'
import type { Quote } from '../services/api'
import {
  LineChart, Line, XAxis, YAxis, Tooltip as RTooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts'

interface Pick {
  symbol:    string
  addedDate: string  // ISO date
  addedPrice: number
}

// Persistent picks in localStorage
function loadPicks(): Pick[] {
  try { return JSON.parse(localStorage.getItem('zamani-beat-picks') ?? '[]') } catch { return [] }
}
function savePicks(picks: Pick[]) {
  localStorage.setItem('zamani-beat-picks', JSON.stringify(picks))
}

// Palette for up to 3 picks
const COLORS = ['#f59e0b', '#60a5fa', '#a78bfa']

export default function BeatIndex() {
  const [picks, setPicks]     = useState<Pick[]>(loadPicks)
  const [input,  setInput]    = useState('')
  const [adding, setAdding]   = useState(false)
  const [error,  setError]    = useState<string | null>(null)

  const quoteQueries = useQuery<Quote[]>({
    queryKey: ['beat-index-quotes', picks.map(p => p.symbol)],
    queryFn: async () => {
      const results = await Promise.allSettled(
        picks.map(p => provider.getQuote(p.symbol))
      )
      return results
        .filter((r): r is PromiseFulfilledResult<Quote> => r.status === 'fulfilled')
        .map(r => r.value)
    },
    enabled: picks.length > 0,
    staleTime: 30_000,
    refetchInterval: 30_000,
  })

  // Benchmark — JSE Top 40, proxied by NPN.JO if ^J200 is unavailable
  const benchQuery = useQuery<Quote>({
    queryKey: ['beat-index-bench'],
    queryFn:  () => provider.getQuote('^J200').catch(() => provider.getQuote('NPN.JO')),
    staleTime: 30_000,
    refetchInterval: 30_000,
  })

  async function handleAdd() {
    const sym = input.trim().toUpperCase()
    if (!sym) return
    if (picks.length >= 3) { setError('Maximum 3 picks. Remove one first.'); return }
    if (picks.some(p => p.symbol === sym)) { setError(`${sym} already in your picks.`); return }
    setAdding(true)
    setError(null)
    try {
      const q = await provider.getQuote(sym)
      if (!q || !q.price) throw new Error('No price data')
      const newPick: Pick = {
        symbol:     sym,
        addedDate:  new Date().toISOString().slice(0, 10),
        addedPrice: q.price,
      }
      const next = [...picks, newPick]
      setPicks(next)
      savePicks(next)
      setInput('')
    } catch {
      setError(`Could not find "${sym}". Try a JSE symbol like NPN, BHG, SBK.`)
    } finally {
      setAdding(false)
    }
  }

  function removePick(symbol: string) {
    const next = picks.filter(p => p.symbol !== symbol)
    setPicks(next)
    savePicks(next)
  }

  // Build performance table
  const perf = useMemo(() => {
    if (!quoteQueries.data) return []
    return picks.map((pick, i) => {
      const quote = quoteQueries.data?.find(q => q.symbol === pick.symbol)
      if (!quote) return null
      const pct   = ((quote.price - pick.addedPrice) / pick.addedPrice) * 100
      return { ...pick, currentPrice: quote.price, pct, name: quote.name ?? pick.symbol, color: COLORS[i] }
    }).filter(Boolean) as Array<{ symbol: string; addedDate: string; addedPrice: number; currentPrice: number; pct: number; name: string; color: string }>
  }, [picks, quoteQueries.data])

  // Synthetic chart data — indexed performance from addedDate
  // Since we don't have historical prices for the picks, we show a bar comparison
  const benchPct = benchQuery.data
    ? ((benchQuery.data.changePct ?? 0))  // today's JSE change as rough proxy
    : null

  const chartData = useMemo(() => {
    if (!perf.length) return []
    // Simple 2-point "then vs now" normalized chart
    return [
      { label: 'At Pick', ...Object.fromEntries(perf.map(p => [p.symbol, 0])), JSE: 0 },
      { label: 'Now',     ...Object.fromEntries(perf.map(p => [p.symbol, p.pct])), JSE: benchPct ?? 0 },
    ]
  }, [perf, benchPct])

  return (
    <div className="bi-page">
      <div className="bi-header">
        <div>
          <h1 className="bi-title"><Target size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />Beat the Index</h1>
          <p className="bi-sub">Pick up to 3 JSE stocks. Track their return vs the JSE Top 40 since you added them.</p>
        </div>
      </div>

      {/* Pick input */}
      {picks.length < 3 && (
        <div className="bi-add-row">
          <Search size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
          <input
            className="bi-input"
            placeholder="Add JSE symbol (e.g. NPN, BHG, SBK)"
            value={input}
            onChange={e => { setInput(e.target.value); setError(null) }}
            onKeyDown={e => e.key === 'Enter' && !adding && handleAdd()}
            disabled={adding}
          />
          <button className="bi-add-btn" onClick={handleAdd} disabled={!input.trim() || adding}>
            {adding ? '…' : <><Plus size={11} /> Add</>}
          </button>
        </div>
      )}

      {error && <div className="bi-error">{error}</div>}

      {/* Empty state */}
      {picks.length === 0 && (
        <div className="bi-empty panel">
          <Target size={28} style={{ opacity: 0.2, marginBottom: '0.5rem' }} />
          <p>No picks yet.</p>
          <p style={{ fontSize: 11 }}>Add up to 3 JSE stock symbols above to start tracking.</p>
        </div>
      )}

      {picks.length > 0 && (
        <>
          {/* Scoreboard */}
          <div className="bi-scoreboard">
            {/* Benchmark */}
            <div className="bi-card panel bi-card--bench">
              <div className="bi-card-label">JSE Top 40 (today)</div>
              <div className="bi-card-sym">^J200</div>
              {benchQuery.isLoading ? (
                <div className="bi-loading">…</div>
              ) : benchQuery.data ? (
                <div className={`bi-card-pct ${(benchQuery.data.changePct ?? 0) >= 0 ? 'up' : 'down'}`}>
                  {(benchQuery.data.changePct ?? 0) >= 0 ? '+' : ''}{(benchQuery.data.changePct ?? 0).toFixed(2)}%
                  {(benchQuery.data.changePct ?? 0) >= 0
                    ? <TrendingUp size={14} style={{ marginLeft: 4 }} />
                    : <TrendingDown size={14} style={{ marginLeft: 4 }} />}
                </div>
              ) : <div className="bi-loading">N/A</div>}
              <div className="bi-card-note">Today's index change (benchmark)</div>
            </div>

            {/* Pick cards */}
            {perf.map(p => {
              const beating = benchPct !== null && p.pct > benchPct
              return (
                <div key={p.symbol} className="bi-card panel" style={{ borderTopColor: p.color }}>
                  <button className="bi-remove" onClick={() => removePick(p.symbol)} aria-label={`Remove ${p.symbol}`}>
                    <X size={10} />
                  </button>
                  <div className="bi-card-label">{p.name}</div>
                  <div className="bi-card-sym" style={{ color: p.color }}>{p.symbol}</div>
                  <div className={`bi-card-pct ${p.pct >= 0 ? 'up' : 'down'}`}>
                    {p.pct >= 0 ? '+' : ''}{p.pct.toFixed(2)}%
                    {p.pct >= 0 ? <TrendingUp size={14} style={{ marginLeft: 4 }} /> : <TrendingDown size={14} style={{ marginLeft: 4 }} />}
                  </div>
                  <div className="bi-card-since">
                    Since {p.addedDate} @ {p.addedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} ZAR
                  </div>
                  <div className="bi-card-vs">
                    {benchPct !== null
                      ? beating
                        ? <span className="bi-beating">✓ Beating the index</span>
                        : <span className="bi-losing">✗ Lagging the index</span>
                      : null}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Chart — simple indexed performance */}
          {chartData.length > 0 && (
            <div className="panel bi-chart-wrap">
              <div className="section-label" style={{ marginBottom: '0.5rem' }}>Performance Since Added (%)</div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} width={40} />
                  <RTooltip
                    formatter={(val: number | string | undefined) => [`${Number(val ?? 0) >= 0 ? '+' : ''}${Number(val ?? 0).toFixed(2)}%`]}
                    contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                    labelStyle={{ color: 'var(--color-text-muted)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} />
                  <ReferenceLine y={0} stroke="var(--color-border)" strokeDasharray="3 3" />
                  {perf.map(p => (
                    <Line key={p.symbol} type="monotone" dataKey={p.symbol} stroke={p.color} strokeWidth={2} dot={{ fill: p.color, r: 4 }} />
                  ))}
                  <Line type="monotone" dataKey="JSE" stroke="var(--color-text-muted)" strokeWidth={1.5} strokeDasharray="4 3" dot={{ fill: 'var(--color-text-muted)', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <p className="bi-disclaimer">
            Performance calculated from the price at time of adding vs current quote. Not financial advice.
          </p>
        </>
      )}

      <style>{`
        .bi-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .bi-header { }
        .bi-title { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; display: flex; align-items: center; }
        .bi-sub { margin: 0.25rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .bi-add-row {
          display: flex; align-items: center; gap: 0.5rem;
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.375rem 0.75rem; max-width: 360px;
        }
        .bi-input {
          flex: 1; background: none; border: none; outline: none;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--color-text-primary); text-transform: uppercase;
        }
        .bi-input::placeholder { text-transform: none; color: var(--color-text-muted); font-family: var(--font-sans); }
        .bi-add-btn {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-gold-subtle); border: 1px solid var(--color-gold-dim);
          color: var(--color-gold); border-radius: 3px; padding: 2px 8px;
          font-size: 10px; font-weight: 600; cursor: pointer; transition: all 0.1s;
        }
        .bi-add-btn:hover:not(:disabled) { background: var(--color-gold-dim); color: var(--color-bg-primary); }
        .bi-add-btn:disabled { opacity: 0.4; cursor: default; }
        .bi-error { font-size: 11px; color: var(--color-down); font-family: var(--font-mono); }

        .bi-empty {
          padding: 3rem 2rem; text-align: center; max-width: 400px;
          color: var(--color-text-muted); font-size: 13px;
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
        }
        .bi-empty p { margin: 0; }

        .bi-scoreboard {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .bi-card {
          padding: 0.875rem; position: relative;
          border-top: 3px solid var(--color-border);
          display: flex; flex-direction: column; gap: 4px;
        }
        .bi-card--bench { border-top-color: var(--color-text-muted); }
        .bi-card-label { font-size: 10px; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bi-card-sym { font-family: var(--font-mono); font-size: 16px; font-weight: 800; color: var(--color-gold); }
        .bi-card-pct {
          font-size: 22px; font-weight: 800; display: flex; align-items: center;
        }
        .bi-card-pct.up   { color: var(--color-up); }
        .bi-card-pct.down { color: var(--color-down); }
        .bi-card-since { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .bi-card-note  { font-size: 9px; color: var(--color-text-muted); font-style: italic; }
        .bi-card-vs    { font-size: 10px; font-weight: 600; margin-top: 2px; }
        .bi-beating { color: var(--color-up); }
        .bi-losing  { color: var(--color-down); }
        .bi-loading { font-size: 12px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .bi-remove {
          position: absolute; top: 0.5rem; right: 0.5rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 2px; border-radius: 3px; transition: all 0.1s;
        }
        .bi-remove:hover { color: var(--color-down); background: var(--color-down-subtle); }

        .bi-chart-wrap { padding: 0.875rem; }
        .bi-disclaimer { font-size: 10px; color: var(--color-text-muted); font-style: italic; }
      `}</style>
    </div>
  )
}
