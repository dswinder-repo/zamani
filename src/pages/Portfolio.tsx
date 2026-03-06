import { useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { PlusCircle, Trash2, Briefcase, Download } from 'lucide-react'
import { downloadCSV } from '../utils/csvExport'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
         PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'
import { usePortfolio, type Transaction } from '../stores/portfolio'
import { provider } from '../services/api'
import type { Quote, OHLCV } from '../services/api'

// ── Add Transaction Modal ─────────────────────────────────────────────────────

const EXCHANGES = ['JSE', 'NGX', 'NSE', 'GSE', 'BRVM', 'ZSE', 'BSE', 'LUSE']

function AddTxModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (t: Omit<Transaction, 'id'>) => void
}) {
  const [form, setForm] = useState({
    type: 'buy' as 'buy' | 'sell',
    symbol: '', name: '', exchange: 'JSE', currency: 'ZAR',
    shares: '', price: '', date: new Date().toISOString().slice(0, 10), note: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.symbol && form.name && Number(form.shares) > 0 && Number(form.price) > 0

  function submit() {
    if (!valid) return
    onAdd({
      type:     form.type,
      symbol:   form.symbol.toUpperCase(),
      name:     form.name,
      exchange: form.exchange,
      currency: form.currency,
      shares:   Number(form.shares),
      price:    Number(form.price),
      date:     form.date,
      note:     form.note || undefined,
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Add Transaction</h2>

        {/* Buy / Sell toggle */}
        <div className="tx-type-row">
          {(['buy', 'sell'] as const).map(t => (
            <button key={t} className={`tx-type-btn ${form.type === t ? 'active-' + t : ''}`}
              onClick={() => set('type', t)}>
              {t === 'buy' ? 'Buy' : 'Sell'}
            </button>
          ))}
        </div>

        <div className="modal-grid">
          <label className="modal-field">
            <span>Symbol</span>
            <input value={form.symbol} onChange={e => set('symbol', e.target.value)}
              placeholder="e.g. NPN" className="modal-input mono" />
          </label>
          <label className="modal-field">
            <span>Exchange</span>
            <select value={form.exchange} onChange={e => set('exchange', e.target.value)} className="modal-input">
              {EXCHANGES.map(ex => <option key={ex}>{ex}</option>)}
            </select>
          </label>
          <label className="modal-field" style={{ gridColumn: '1 / -1' }}>
            <span>Company Name</span>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Naspers" className="modal-input" />
          </label>
          <label className="modal-field">
            <span>Shares</span>
            <input type="number" min="0" step="any" value={form.shares}
              onChange={e => set('shares', e.target.value)} className="modal-input mono" />
          </label>
          <label className="modal-field">
            <span>Price per share</span>
            <input type="number" min="0" step="any" value={form.price}
              onChange={e => set('price', e.target.value)} className="modal-input mono" />
          </label>
          <label className="modal-field">
            <span>Currency</span>
            <input value={form.currency} onChange={e => set('currency', e.target.value)}
              placeholder="ZAR" className="modal-input mono" />
          </label>
          <label className="modal-field">
            <span>Date</span>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
              className="modal-input mono" />
          </label>
          <label className="modal-field" style={{ gridColumn: '1 / -1' }}>
            <span>Note (optional)</span>
            <input value={form.note} onChange={e => set('note', e.target.value)}
              placeholder="Optional note" className="modal-input" />
          </label>
        </div>

        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className={`modal-submit modal-submit-${form.type}`} onClick={submit} disabled={!valid}>
            Add {form.type === 'buy' ? 'Buy' : 'Sell'}
          </button>
        </div>

        <style>{`
          .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.7);
            display: flex; align-items: center; justify-content: center; }
          .modal-box {
            background: var(--color-bg-elevated); border: 1px solid var(--color-border);
            border-radius: 6px; padding: 1.5rem; width: 440px; max-width: 92vw;
            box-shadow: 0 24px 48px rgba(0,0,0,0.6);
          }
          .modal-title { margin: 0 0 1rem; font-size: 15px; font-weight: 800; }
          .tx-type-row { display: flex; gap: 4px; margin-bottom: 1rem; }
          .tx-type-btn {
            flex: 1; padding: 5px; border-radius: 4px; font-size: 12px; font-weight: 700;
            border: 1px solid var(--color-border); background: none; cursor: pointer;
            color: var(--color-text-muted); transition: all 0.1s;
          }
          .active-buy  { background: var(--color-up-subtle); color: var(--color-up); border-color: var(--color-up); }
          .active-sell { background: var(--color-down-subtle); color: var(--color-down); border-color: var(--color-down); }
          .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
          .modal-field { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--color-text-muted); }
          .modal-input {
            background: var(--color-bg-secondary); border: 1px solid var(--color-border);
            border-radius: 3px; padding: 0.375rem 0.5rem; color: var(--color-text-primary);
            font-size: 12px; font-family: var(--font-sans); outline: none;
          }
          .modal-input.mono { font-family: var(--font-mono); }
          .modal-input:focus { border-color: var(--color-gold-dim); }
          .modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1.25rem; }
          .modal-cancel {
            padding: 5px 14px; border-radius: 4px; border: 1px solid var(--color-border);
            background: none; color: var(--color-text-muted); font-size: 12px; cursor: pointer;
          }
          .modal-submit {
            padding: 5px 14px; border-radius: 4px; font-size: 12px; font-weight: 700;
            cursor: pointer; border: 1px solid;
          }
          .modal-submit:disabled { opacity: 0.4; cursor: default; }
          .modal-submit-buy  { background: var(--color-up-subtle); color: var(--color-up); border-color: var(--color-up); }
          .modal-submit-sell { background: var(--color-down-subtle); color: var(--color-down); border-color: var(--color-down); }
        `}</style>
      </div>
    </div>
  )
}

// ── Portfolio page ────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { transactions, addTransaction, removeTransaction, getHoldings } = usePortfolio()
  const [showAdd, setShowAdd] = useState(false)
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings')

  const holdings = getHoldings()

  // Live quotes for each holding
  const quoteResults = useQueries({
    queries: holdings.map(h => ({
      queryKey:      ['quote', h.symbol],
      queryFn:       () => provider.getQuote(h.symbol),
      staleTime:     30_000,
      refetchInterval: 30_000,
    })),
  })

  // Build enriched holdings with current price / P&L
  const enriched = holdings.map((h, i) => {
    const q    = quoteResults[i]?.data as Quote | undefined
    const cur  = q?.price ?? h.avgCost
    const val  = cur * h.shares
    const cost = h.totalCost
    const pnl  = val - cost
    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0
    return { ...h, currentPrice: cur, currentValue: val, pnl, pnlPct, currency: q?.currency ?? h.currency }
  })

  const totalValue = enriched.reduce((s, h) => s + h.currentValue, 0)
  const totalCost  = enriched.reduce((s, h) => s + h.totalCost, 0)
  const totalPnl   = totalValue - totalCost
  const totalPct   = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0
  const portfolioUp = totalPnl >= 0

  // Benchmark: JSE Top 40 (^J200) return since earliest transaction
  const earliestDate = transactions.length
    ? [...transactions].sort((a, b) => a.date.localeCompare(b.date))[0].date
    : null

  const { data: benchmarkHistory } = useQuery<OHLCV[]>({
    queryKey: ['history', '^J200', 365],
    queryFn:  () => provider.getHistory('^J200', 365),
    staleTime: 60 * 60_000,
    enabled:  !!earliestDate && holdings.length > 0,
  })

  const benchmarkReturn = (() => {
    if (!benchmarkHistory?.length || !earliestDate) return null
    const startTs   = new Date(earliestDate).getTime()
    const atStart   = benchmarkHistory.find(d => d.time >= startTs)
    const atEnd     = benchmarkHistory[benchmarkHistory.length - 1]
    if (!atStart || !atEnd || atStart.close === 0) return null
    return +((atEnd.close - atStart.close) / atStart.close * 100).toFixed(2)
  })()

  // Portfolio value history (from transactions)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartData = transactions
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .reduce((acc: { date: string; value: number }[], t) => {
      const prev = acc[acc.length - 1]?.value ?? 0
      const delta = t.type === 'buy' ? t.shares * t.price : -(t.shares * t.price)
      acc.push({ date: t.date, value: +(prev + delta).toFixed(2) })
      return acc
    }, [])

  return (
    <div className="port-page">
      {/* Header */}
      <div className="port-header">
        <div>
          <h1 className="port-h1">Portfolio</h1>
          <p className="port-sub">Track your African market holdings and P&L</p>
        </div>
        <button className="port-add-btn" onClick={() => setShowAdd(true)}>
          <PlusCircle size={13} /> Add Transaction
        </button>
      </div>

      {/* Summary cards */}
      {holdings.length > 0 && (
        <div className="port-summary">
          <div className="port-stat panel">
            <div className="ps-label">Portfolio Value</div>
            <div className="ps-value num">{totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="port-stat panel">
            <div className="ps-label">Total Cost Basis</div>
            <div className="ps-value num">{totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="port-stat panel">
            <div className="ps-label">Total P&L</div>
            <div className={`ps-value num ${portfolioUp ? 'text-up' : 'text-down'}`}>
              {portfolioUp ? '+' : ''}{totalPnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span style={{ fontSize: 12, marginLeft: 6 }}>({portfolioUp ? '+' : ''}{totalPct.toFixed(2)}%)</span>
            </div>
          </div>
          <div className="port-stat panel">
            <div className="ps-label">Holdings</div>
            <div className="ps-value num">{holdings.length}</div>
          </div>
          {benchmarkReturn != null && (
            <div className="port-stat panel">
              <div className="ps-label">JSE Top 40 (same period)</div>
              <div className={`ps-value num ${benchmarkReturn >= 0 ? 'text-up' : 'text-down'}`} style={{ fontSize: 13 }}>
                {benchmarkReturn >= 0 ? '+' : ''}{benchmarkReturn.toFixed(2)}%
                <span style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)', fontWeight: 400, marginTop: 2 }}>
                  {totalPct >= benchmarkReturn ? '▲ outperforming' : '▼ underperforming'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Portfolio chart */}
      {chartData.length > 1 && (
        <div className="port-chart panel">
          <div className="section-label">Investment History</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-gold)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--color-gold)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                tickLine={false} axisLine={{ stroke: 'var(--color-border-subtle)' }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                tickLine={false} axisLine={false} width={60} orientation="right"
                tickFormatter={v => v.toLocaleString('en-US', { notation: 'compact' })} />
              <Tooltip formatter={(v: number | undefined) => [(v ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), 'Value']}
                contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 4, fontSize: 11 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-gold)" strokeWidth={1.5}
                fill="url(#portGrad)" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Allocation donut */}
      {enriched.length > 0 && (() => {
        const DONUT_COLORS = ['#c9a84c','#4ade80','#60a5fa','#f472b6','#fb923c','#a78bfa','#34d399','#f87171','#38bdf8','#facc15']
        const donutData = enriched
          .map(h => ({ name: h.symbol, value: +h.currentValue.toFixed(2) }))
          .sort((a, b) => b.value - a.value)
        return (
          <div className="port-alloc panel">
            <div className="section-label">Allocation</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={donutData} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  paddingAngle={2} isAnimationActive={false}>
                  {donutData.map((_, i) => (
                    <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number | undefined) => [(v ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), 'Value']}
                  contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 4, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'var(--font-mono)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      })()}

      {/* Monthly P&L heatmap */}
      {transactions.length > 1 && (() => {
        const byMonth: Record<string, number> = {}
        for (const t of transactions) {
          const ym = t.date.slice(0, 7) // 'YYYY-MM'
          const delta = t.type === 'buy' ? -(t.shares * t.price) : t.shares * t.price
          byMonth[ym] = (byMonth[ym] ?? 0) + delta
        }
        const monthData = Object.entries(byMonth)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([ym, pnl]) => {
            const [y, m] = ym.split('-')
            const label = new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            return { label, pnl: +pnl.toFixed(2) }
          })
        if (monthData.length < 2) return null
        return (
          <div className="port-pnl-chart panel">
            <div className="section-label">Monthly P&L</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={monthData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                  tickLine={false} axisLine={{ stroke: 'var(--color-border-subtle)' }} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                  tickLine={false} axisLine={false} width={56} orientation="right"
                  tickFormatter={v => v.toLocaleString('en-US', { notation: 'compact' })} />
                <Tooltip formatter={(v: number | undefined) => [(v ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 }), 'P&L']}
                  contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 4, fontSize: 11 }} />
                <Bar dataKey="pnl" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                  {monthData.map((d, i) => (
                    <Cell key={i} fill={d.pnl >= 0 ? 'var(--color-up)' : 'var(--color-down)'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })()}

      {/* Tabs */}
      <div className="port-tabs">
        {(['holdings', 'transactions'] as const).map(t => (
          <button key={t} className={`port-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}>
            {t === 'holdings' ? `Holdings (${holdings.length})` : `Transactions (${transactions.length})`}
          </button>
        ))}
        {enriched.length > 0 && (
          <button
            className="port-tab"
            title="Export CSV"
            onClick={() => {
              const rows: (string | number)[][] = [
                ['Symbol', 'Name', 'Exchange', 'Shares', 'Avg Cost', 'Current Price', 'Value', 'P&L', 'P&L %', 'Currency'],
                ...enriched.map(h => [h.symbol, h.name, h.exchange, h.shares, h.avgCost.toFixed(2), h.currentPrice.toFixed(2),
                  h.currentValue.toFixed(2), h.pnl.toFixed(2), h.pnlPct.toFixed(2), h.currency]),
              ]
              downloadCSV(rows, 'portfolio-holdings.csv')
            }}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <Download size={11} /> Export
          </button>
        )}
      </div>

      {/* Empty state */}
      {holdings.length === 0 && transactions.length === 0 && (
        <div className="port-empty panel">
          <Briefcase size={28} style={{ opacity: 0.2, marginBottom: '0.75rem' }} />
          <p>No transactions yet.</p>
          <p style={{ fontSize: 11 }}>Click "Add Transaction" to log your first buy or sell.</p>
        </div>
      )}

      {/* Holdings table */}
      {activeTab === 'holdings' && holdings.length > 0 && (
        <div className="panel port-table">
          <div className="pt-header">
            <span>Symbol</span>
            <span>Shares</span>
            <span className="pt-r">Avg Cost</span>
            <span className="pt-r">Current</span>
            <span className="pt-r">Value</span>
            <span className="pt-r">P&L</span>
          </div>
          {enriched.map(h => {
            const up = h.pnl >= 0
            return (
              <div key={h.symbol} className="pt-row">
                <div>
                  <div className="pt-symbol">{h.symbol}</div>
                  <div className="pt-name">{h.name} · {h.exchange}</div>
                </div>
                <span className="num">{h.shares.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                <span className="num pt-r">{h.avgCost.toFixed(2)}</span>
                <span className="num pt-r">{h.currentPrice.toFixed(2)}</span>
                <span className="num pt-r">{h.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className={`num pt-r ${up ? 'text-up' : 'text-down'}`}>
                  {up ? '+' : ''}{h.pnl.toFixed(2)}
                  <span style={{ fontSize: 10, display: 'block' }}>({up ? '+' : ''}{h.pnlPct.toFixed(2)}%)</span>
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Transactions list */}
      {activeTab === 'transactions' && transactions.length > 0 && (
        <div className="panel port-table">
          <div className="pt-header pt-tx-header">
            <span>Date</span>
            <span>Type</span>
            <span>Symbol</span>
            <span className="pt-r">Shares</span>
            <span className="pt-r">Price</span>
            <span className="pt-r">Total</span>
            <span />
          </div>
          {[...transactions].reverse().map(t => (
            <div key={t.id} className="pt-row pt-tx-row">
              <span className="num" style={{ fontSize: 11 }}>{t.date}</span>
              <span className={`pt-type-badge ${t.type}`}>{t.type.toUpperCase()}</span>
              <div>
                <div className="pt-symbol">{t.symbol}</div>
                <div className="pt-name">{t.exchange}</div>
              </div>
              <span className="num pt-r">{t.shares}</span>
              <span className="num pt-r">{t.price.toFixed(2)}</span>
              <span className="num pt-r">{(t.shares * t.price).toFixed(2)}</span>
              <button className="pt-del" onClick={() => removeTransaction(t.id)} aria-label="Delete">
                <Trash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Currency breakdown */}
      {enriched.length > 0 && (() => {
        const byCurrency = new Map<string, { value: number; cost: number; count: number }>()
        for (const h of enriched) {
          const cur = h.currency || 'USD'
          const prev = byCurrency.get(cur) ?? { value: 0, cost: 0, count: 0 }
          byCurrency.set(cur, { value: prev.value + h.currentValue, cost: prev.cost + h.totalCost, count: prev.count + 1 })
        }
        const entries = [...byCurrency.entries()].sort((a, b) => b[1].value - a[1].value)
        if (entries.length <= 1) return null
        return (
          <div>
            <div className="section-label" style={{ padding: 0 }}>By Currency</div>
            <div className="port-currency-grid">
              {entries.map(([cur, { value, cost, count }]) => {
                const pnl = value - cost
                const pct = cost > 0 ? (pnl / cost) * 100 : 0
                const up  = pnl >= 0
                return (
                  <div key={cur} className="port-cur-card panel">
                    <div className="port-cur-header">
                      <span className="port-cur-code num">{cur}</span>
                      <span className="port-cur-count">{count} holding{count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="port-cur-value num">
                      {value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`port-cur-pnl num ${up ? 'text-up' : 'text-down'}`}>
                      {up ? '+' : ''}{pnl.toFixed(2)} ({up ? '+' : ''}{pct.toFixed(2)}%)
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {showAdd && (
        <AddTxModal onClose={() => setShowAdd(false)} onAdd={addTransaction} />
      )}

      <style>{`
        .port-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .port-header { display: flex; align-items: flex-start; justify-content: space-between; }
        .port-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .port-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .port-add-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 4px;
          border: 1px solid var(--color-gold-dim);
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.1s;
        }
        .port-add-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .port-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        @media (max-width: 700px) { .port-summary { grid-template-columns: repeat(2, 1fr); } }

        .port-stat { padding: 0.75rem 1rem; }
        .ps-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.25rem; }
        .ps-value { font-size: 16px; font-weight: 800; color: var(--color-text-primary); }

        .port-chart    { padding: 0.75rem 0.5rem 0.5rem; }
        .port-alloc    { padding: 0.75rem 0.5rem 0.5rem; }
        .port-pnl-chart { padding: 0.75rem 0.5rem 0.5rem; }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
          padding: 0 0.25rem;
        }

        .port-tabs { display: flex; gap: 4px; }
        .port-tab {
          padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 600;
          border: 1px solid var(--color-border); background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s;
        }
        .port-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .port-empty {
          padding: 3rem 2rem; text-align: center; display: flex; flex-direction: column;
          align-items: center; font-size: 13px; color: var(--color-text-muted);
        }
        .port-empty p { margin: 0.125rem 0; }

        .port-table { overflow: hidden; }
        .pt-header {
          display: grid; grid-template-columns: 1fr 80px 80px 90px 100px 100px;
          gap: 0.5rem; padding: 0.25rem 0.75rem;
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .pt-tx-header { grid-template-columns: 80px 50px 1fr 70px 80px 90px 28px; }
        .pt-row {
          display: grid; grid-template-columns: 1fr 80px 80px 90px 100px 100px;
          gap: 0.5rem; padding: 0.5rem 0.75rem; align-items: center;
          border-bottom: 1px solid var(--color-border-subtle); font-size: 12px;
        }
        .pt-row:last-child { border-bottom: none; }
        .pt-tx-row { grid-template-columns: 80px 50px 1fr 70px 80px 90px 28px; }
        .pt-r { text-align: right; }
        .pt-symbol { font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: var(--color-gold); }
        .pt-name   { font-size: 10px; color: var(--color-text-muted); }
        .pt-type-badge {
          font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 3px;
          text-align: center;
        }
        .pt-type-badge.buy  { background: var(--color-up-subtle);   color: var(--color-up); }
        .pt-type-badge.sell { background: var(--color-down-subtle); color: var(--color-down); }
        .pt-del {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); padding: 3px; border-radius: 3px;
          transition: all 0.1s;
        }
        .pt-del:hover { color: var(--color-down); background: var(--color-down-subtle); }

        /* Currency breakdown */
        .port-currency-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.5rem; }
        .port-cur-card { padding: 0.625rem 0.875rem; }
        .port-cur-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
        .port-cur-code  { font-size: 13px; font-weight: 800; color: var(--color-gold); }
        .port-cur-count { font-size: 10px; color: var(--color-text-muted); }
        .port-cur-value { font-size: 15px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px; }
        .port-cur-pnl   { font-size: 10px; font-weight: 600; }
      `}</style>
    </div>
  )
}
