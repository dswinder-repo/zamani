import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend,
} from 'recharts'
import { X, Plus, GitCompare } from 'lucide-react'
import { provider } from '../services/api'
import type { OHLCV } from '../services/api'

const EXCHANGES = ['jse', 'ngx', 'nse', 'gse', 'brvm', 'zse', 'bse', 'luse']

const LINE_COLORS = ['#c9a84c', '#4ade80', '#60a5fa']

const TIMEFRAMES = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
]

interface StockSel {
  symbol:   string
  exchange: string
  label:    string
}

function normalize(data: OHLCV[]): { time: number; value: number }[] {
  if (!data.length) return []
  const base = data[0].close
  return data.map(d => ({ time: d.time, value: +(d.close / base * 100).toFixed(2) }))
}

export default function Compare() {
  const [selections, setSelections] = useState<StockSel[]>([])
  const [inputSymbol, setInputSymbol] = useState('')
  const [inputExchange, setInputExchange] = useState('jse')
  const [tf, setTf] = useState(TIMEFRAMES[0])

  function addStock() {
    if (!inputSymbol || selections.length >= 3) return
    const sym   = inputSymbol.trim().toUpperCase()
    const label = `${sym} (${inputExchange.toUpperCase()})`
    if (selections.find(s => s.label === label)) return
    setSelections(prev => [...prev, { symbol: sym, exchange: inputExchange, label }])
    setInputSymbol('')
  }

  function removeStock(label: string) {
    setSelections(prev => prev.filter(s => s.label !== label))
  }

  const historyQueries = useQueries({
    queries: selections.map(sel => ({
      queryKey:  ['compare', sel.symbol, sel.exchange, tf.days],
      queryFn:   () => provider.getHistory(`${sel.symbol}.${sel.exchange.toUpperCase()}`, tf.days),
      staleTime: 5 * 60_000,
    })),
  })

  // Merge normalized series into a single date-keyed array
  const series = historyQueries.map((r, i) => ({
    label:      selections[i]?.label ?? '',
    normalized: normalize((r.data as OHLCV[]) ?? []),
  }))

  const dateMap: Record<string, Record<string, number>> = {}
  for (const { label, normalized } of series) {
    for (const pt of normalized) {
      const key = new Date(pt.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (!dateMap[key]) dateMap[key] = {}
      dateMap[key][label] = pt.value
    }
  }
  const chartRows = Object.entries(dateMap).map(([date, vals]) => ({ date, ...vals }))

  const isLoading = historyQueries.some(q => q.isLoading)

  return (
    <div className="compare-page">
      <div>
        <h1 className="cmp-h1">Compare</h1>
        <p className="cmp-sub">Normalize up to 3 stocks to 100 and compare performance across exchanges</p>
      </div>

      {/* Stock selector */}
      <div className="panel cmp-selector">
        <div className="cmp-input-row">
          <select
            className="cmp-select"
            value={inputExchange}
            onChange={e => setInputExchange(e.target.value)}
          >
            {EXCHANGES.map(ex => (
              <option key={ex} value={ex}>{ex.toUpperCase()}</option>
            ))}
          </select>
          <input
            className="cmp-input"
            placeholder="Ticker (e.g. NPN)"
            value={inputSymbol}
            onChange={e => setInputSymbol(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addStock()}
          />
          <button
            className="cmp-add-btn"
            onClick={addStock}
            disabled={!inputSymbol || selections.length >= 3}
          >
            <Plus size={13} /> Add
          </button>
        </div>

        <div className="cmp-chips">
          {selections.map((sel, i) => (
            <span key={sel.label} className="cmp-chip" style={{ borderColor: LINE_COLORS[i], color: LINE_COLORS[i] }}>
              {sel.label}
              <button className="cmp-chip-remove" onClick={() => removeStock(sel.label)}>
                <X size={10} />
              </button>
            </span>
          ))}
          {selections.length === 0 && (
            <span className="cmp-hint">Add up to 3 stocks to compare their normalized performance</span>
          )}
        </div>
      </div>

      {/* Timeframe selector */}
      {selections.length > 0 && (
        <div className="cmp-tf-row">
          {TIMEFRAMES.map(t => (
            <button
              key={t.label}
              className={`cmp-tf-btn ${tf.label === t.label ? 'active' : ''}`}
              onClick={() => setTf(t)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      {selections.length > 0 ? (
        <div className="panel cmp-chart-card">
          {isLoading ? (
            <div className="cmp-loading">Loading history…</div>
          ) : chartRows.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={chartRows} margin={{ top: 12, right: 20, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--color-border-subtle)' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    tickFormatter={v => `${v}`}
                  />
                  <Tooltip
                    formatter={(v: number | undefined, name: string | undefined) => [`${(v ?? 0).toFixed(2)}`, name ?? '']}
                    contentStyle={{
                      background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
                      borderRadius: 4, fontSize: 11,
                    }}
                    labelStyle={{ color: 'var(--color-text-muted)', marginBottom: 4 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  {selections.map((sel, i) => (
                    <Line
                      key={sel.label}
                      type="monotone"
                      dataKey={sel.label}
                      stroke={LINE_COLORS[i]}
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
              <p className="cmp-note">
                All series normalized to 100 at start of period. Values above 100 indicate gains relative to start date.
              </p>
            </>
          ) : (
            <div className="cmp-loading">No history data for selected timeframe</div>
          )}
        </div>
      ) : (
        <div className="panel cmp-empty">
          <GitCompare size={28} style={{ opacity: 0.2, marginBottom: '0.75rem' }} />
          <p>Select stocks above to compare their performance</p>
        </div>
      )}

      <style>{`
        .compare-page { display: flex; flex-direction: column; gap: 1rem; max-width: 900px; }
        .cmp-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .cmp-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .cmp-selector { padding: 0.875rem 1rem; display: flex; flex-direction: column; gap: 0.625rem; }
        .cmp-input-row { display: flex; gap: 0.5rem; align-items: center; }

        .cmp-select {
          background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 5px 8px; color: var(--color-text-primary);
          font-size: 11px; font-family: var(--font-mono); font-weight: 700;
          cursor: pointer; outline: none;
        }
        .cmp-input {
          flex: 1; background: var(--color-bg-tertiary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 5px 10px; color: var(--color-text-primary);
          font-size: 12px; font-family: var(--font-mono); outline: none;
        }
        .cmp-input:focus { border-color: var(--color-gold-dim); }
        .cmp-add-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 5px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .cmp-add-btn:disabled { opacity: 0.4; cursor: default; }
        .cmp-add-btn:not(:disabled):hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .cmp-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; min-height: 26px; }
        .cmp-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 8px; border-radius: 12px; border: 1px solid;
          font-size: 11px; font-weight: 700; font-family: var(--font-mono);
          background: rgba(255,255,255,0.03);
        }
        .cmp-chip-remove {
          background: none; border: none; cursor: pointer; color: inherit;
          display: flex; align-items: center; padding: 0; opacity: 0.6;
          transition: opacity 0.1s;
        }
        .cmp-chip-remove:hover { opacity: 1; }
        .cmp-hint { font-size: 11px; color: var(--color-text-muted); }

        .cmp-tf-row { display: flex; gap: 4px; }
        .cmp-tf-btn {
          padding: 3px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer;
          font-family: var(--font-mono); transition: all 0.1s;
        }
        .cmp-tf-btn.active {
          color: var(--color-gold); border-color: var(--color-gold-dim);
          background: var(--color-gold-subtle);
        }

        .cmp-chart-card { padding: 1rem 0.5rem 0.75rem; }
        .cmp-loading {
          height: 340px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }
        .cmp-note {
          margin: 0.625rem 0 0; padding: 0 0.5rem;
          font-size: 10px; color: var(--color-text-muted); line-height: 1.4;
        }

        .cmp-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .cmp-empty p { margin: 0; }
      `}</style>
    </div>
  )
}
