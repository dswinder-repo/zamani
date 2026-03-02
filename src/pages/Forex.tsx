import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { provider } from '../services/api'
import type { ForexRate, OHLCV } from '../services/api'
import ForexTable from '../components/market/ForexTable'

const PAIR_LABELS: Record<string, string> = {
  USDZAR: 'US Dollar / South African Rand',
  USDNGN: 'US Dollar / Nigerian Naira',
  USDKES: 'US Dollar / Kenyan Shilling',
  USDGHS: 'US Dollar / Ghanaian Cedi',
  USDEGP: 'US Dollar / Egyptian Pound',
  USDETB: 'US Dollar / Ethiopian Birr',
  USDXOF: 'US Dollar / West African CFA',
  ZARUSD: 'South African Rand / US Dollar',
}

function pairKey(r: ForexRate) {
  return `${r.base}${r.quote}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div style={{
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '0.375rem 0.625rem',
      fontSize: 11, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>{d?.date}</div>
      <div style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
        {Number(payload[0].value).toFixed(4)}
      </div>
    </div>
  )
}

export default function Forex() {
  const [selectedPair, setSelectedPair] = useState<string | null>(null)

  const { data: rates, isLoading } = useQuery<ForexRate[]>({
    queryKey: ['forex', 'all'],
    queryFn:  () => provider.getForex?.([]) ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  // History for selected pair (reuse getHistory with pair symbol)
  const activePair = selectedPair ?? (rates?.[0] ? pairKey(rates[0]) : null)

  const { data: history, isLoading: histLoading } = useQuery<OHLCV[]>({
    queryKey: ['forex-history', activePair],
    queryFn:  () => activePair ? provider.getHistory(activePair, 30) : Promise.resolve([]),
    staleTime: 5 * 60_000,
    enabled:  !!activePair,
  })

  const selectedRate = rates?.find(r => pairKey(r) === activePair)
  const up = (selectedRate?.changePct ?? 0) >= 0

  const chartData = (history ?? []).map(d => ({
    date:  new Date(d.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    close: d.close,
  }))

  return (
    <div className="forex-page">
      <div>
        <h1 className="fx-h1">Forex</h1>
        <p className="fx-sub">African currency exchange rates vs USD — live, refreshed every minute</p>
      </div>

      <div className="fx-body">
        {/* Rate table */}
        <div>
          <div className="section-label">Rates</div>
          {isLoading
            ? <p style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Loading…</p>
            : <div className="fx-rate-list panel">
                {(rates ?? []).map(r => {
                  const key = pairKey(r)
                  const active = key === activePair
                  const rUp = r.changePct >= 0
                  return (
                    <button
                      key={key}
                      className={`fx-rate-row ${active ? 'active' : ''}`}
                      onClick={() => setSelectedPair(key)}
                    >
                      <span className="fx-pair num">{r.base}/{r.quote}</span>
                      <span className="fx-rate num">
                        {r.rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                      </span>
                      <span className={`fx-chg num ${rUp ? 'text-up' : 'text-down'}`}>
                        {rUp ? '+' : ''}{r.changePct.toFixed(2)}%
                      </span>
                    </button>
                  )
                })}
              </div>
          }
        </div>

        {/* Chart panel */}
        <div>
          <div className="section-label">
            {activePair
              ? PAIR_LABELS[activePair] ?? activePair
              : 'Select a pair'}
          </div>
          <div className="fx-chart-card panel">
            {selectedRate && (
              <div className="fx-chart-header">
                <span className="fx-chart-pair num">{selectedRate.base}/{selectedRate.quote}</span>
                <span className="fx-chart-rate num">
                  {selectedRate.rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                </span>
                <span className={`fx-chart-chg num ${up ? 'text-up' : 'text-down'}`}>
                  {up ? '+' : ''}{selectedRate.changePct.toFixed(2)}%
                </span>
              </div>
            )}

            {histLoading ? (
              <div className="fx-chart-loading">Loading chart…</div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="fxGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={up ? 'var(--color-up)' : 'var(--color-down)'} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={up ? 'var(--color-up)' : 'var(--color-down)'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    tickLine={false} axisLine={{ stroke: 'var(--color-border-subtle)' }}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                    tickLine={false} axisLine={false} width={52} orientation="right"
                    tickFormatter={v => Number(v).toFixed(2)}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone" dataKey="close" stroke={up ? 'var(--color-up)' : 'var(--color-down)'}
                    strokeWidth={1.5} fill="url(#fxGrad)" dot={false} isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="fx-chart-loading">No history data</div>
            )}
          </div>

          {/* Also show full table below */}
          <div style={{ marginTop: '1.5rem' }}>
            <div className="section-label">All Rates</div>
            <ForexTable rates={rates ?? []} />
          </div>
        </div>
      </div>

      <style>{`
        .forex-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .fx-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .fx-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }

        .fx-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 700px) {
          .fx-body { grid-template-columns: 1fr; }
        }

        /* Rate list */
        .fx-rate-list { overflow: hidden; }
        .fx-rate-row {
          display: grid; grid-template-columns: 80px 1fr auto;
          gap: 0.5rem; align-items: center;
          padding: 0.5rem 0.75rem; width: 100%;
          background: none; border: none; cursor: pointer;
          border-bottom: 1px solid var(--color-border-subtle);
          transition: background 0.1s; text-align: left;
        }
        .fx-rate-row:last-child { border-bottom: none; }
        .fx-rate-row:hover  { background: var(--color-bg-hover); }
        .fx-rate-row.active { background: var(--color-gold-subtle); }

        .fx-pair { font-size: 11px; font-weight: 700; color: var(--color-text-primary); }
        .fx-rate { font-size: 11px; color: var(--color-text-secondary); }
        .fx-chg  { font-size: 10px; font-weight: 600; }

        /* Chart card */
        .fx-chart-card { padding: 0.75rem 0.5rem 0.5rem; }
        .fx-chart-header {
          display: flex; align-items: baseline; gap: 0.5rem;
          padding: 0 0.25rem; margin-bottom: 0.75rem;
        }
        .fx-chart-pair { font-size: 14px; font-weight: 800; color: var(--color-text-primary); }
        .fx-chart-rate { font-size: 20px; font-weight: 800; color: var(--color-text-primary); letter-spacing: -0.02em; }
        .fx-chart-chg  { font-size: 12px; font-weight: 600; }
        .fx-chart-loading {
          height: 200px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }
      `}</style>
    </div>
  )
}
