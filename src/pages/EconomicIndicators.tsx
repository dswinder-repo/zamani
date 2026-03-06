import { useQueries } from '@tanstack/react-query'
import { TrendingUp } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'

// World Bank API — free, no auth
const WB_BASE = 'https://api.worldbank.org/v2'

const INDICATORS = [
  { id: 'NY.GDP.MKTP.KD.ZG', label: 'GDP Growth (%)',          unit: '%' },
  { id: 'FP.CPI.TOTL.ZG',    label: 'Inflation, CPI (%)',      unit: '%' },
  { id: 'SL.UEM.TOTL.ZS',    label: 'Unemployment Rate (%)',   unit: '%' },
  { id: 'BN.CAB.XOKA.GD.ZS', label: 'Current Account (% GDP)', unit: '%' },
]

const COUNTRIES = [
  { code: 'ZA', name: 'South Africa',   color: '#c9a84c' },
  { code: 'NG', name: 'Nigeria',         color: '#4ade80' },
  { code: 'KE', name: 'Kenya',           color: '#60a5fa' },
  { code: 'GH', name: 'Ghana',           color: '#f472b6' },
  { code: 'UG', name: 'Uganda',          color: '#fb923c' },
  { code: 'ET', name: 'Ethiopia',        color: '#a78bfa' },
]

interface WBValue {
  date: string
  value: number | null
}

async function fetchWBIndicator(country: string, indicator: string): Promise<WBValue[]> {
  const url = `${WB_BASE}/country/${country}/indicator/${indicator}?format=json&mrv=12&per_page=12`
  const resp = await fetch(url)
  if (!resp.ok) return []
  const json = await resp.json()
  const data = json[1] as Array<{ date: string; value: number | null }> | null
  if (!data) return []
  return data
    .filter(d => d.value != null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(d => ({ date: d.date, value: d.value }))
}

export default function EconomicIndicators() {
  // One query per (country × indicator)
  const queries = useQueries({
    queries: INDICATORS.flatMap(ind =>
      COUNTRIES.map(c => ({
        queryKey:  ['wb', c.code, ind.id],
        queryFn:   () => fetchWBIndicator(c.code, ind.id),
        staleTime: 24 * 60 * 60_000, // World Bank updates annually
      }))
    ),
  })

  const isLoading = queries.some(q => q.isLoading)

  return (
    <div className="eco-page">
      <div>
        <h1 className="eco-h1">
          <TrendingUp size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Macro — Economic Indicators
        </h1>
        <p className="eco-sub">World Bank data · Annual · {COUNTRIES.map(c => c.name).join(', ')}</p>
      </div>

      {isLoading ? (
        <div className="panel eco-loading">Loading World Bank data…</div>
      ) : (
        <div className="eco-grid">
          {INDICATORS.map((ind, indIdx) => {
            // Build chartData: [{year, ZA, NG, ...}]
            const years = new Set<string>()
            const byCountry: Record<string, Record<string, number>> = {}

            COUNTRIES.forEach((c, ci) => {
              const qIdx = indIdx * COUNTRIES.length + ci
              const data = (queries[qIdx]?.data as WBValue[]) ?? []
              byCountry[c.code] = {}
              data.forEach(d => {
                if (d.value != null) {
                  years.add(d.date)
                  byCountry[c.code][d.date] = +d.value.toFixed(2)
                }
              })
            })

            const chartData = [...years]
              .sort()
              .map(yr => {
                const row: Record<string, string | number> = { year: yr }
                COUNTRIES.forEach(c => {
                  if (byCountry[c.code][yr] != null) row[c.code] = byCountry[c.code][yr]
                })
                return row
              })

            const hasData = chartData.length > 0

            return (
              <div key={ind.id} className="panel eco-card">
                <div className="eco-card-title">{ind.label}</div>
                {!hasData ? (
                  <div className="eco-no-data">No data available</div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
                        <XAxis dataKey="year"
                          tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                          tickLine={false} axisLine={{ stroke: 'var(--color-border-subtle)' }} />
                        <YAxis
                          tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                          tickLine={false} axisLine={false} width={32} orientation="right"
                          tickFormatter={v => `${v}${ind.unit}`} />
                        <Tooltip
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(v: any, name: any) => [`${Number(v ?? 0).toFixed(2)}${ind.unit}`, COUNTRIES.find(c => c.code === name)?.name ?? name]}
                          contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 4, fontSize: 10 }}
                          labelStyle={{ color: 'var(--color-text-muted)', marginBottom: 4 }}
                        />
                        <ReferenceLine y={0} stroke="var(--color-border)" strokeOpacity={0.6} />
                        {COUNTRIES.map(c => (
                          <Line key={c.code} type="monotone" dataKey={c.code}
                            stroke={c.color} strokeWidth={1.5}
                            dot={{ r: 2, fill: c.color }}
                            connectNulls isAnimationActive={false} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="eco-legend">
                      {COUNTRIES.map(c => (
                        <span key={c.code} className="eco-legend-item" style={{ color: c.color }}>
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="eco-source">
        Source: World Bank Open Data · Last 12 years · Updated annually
      </div>

      <style>{`
        .eco-page { display: flex; flex-direction: column; gap: 1.25rem; max-width: 1100px; }
        .eco-h1 { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .eco-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .eco-loading { padding: 2.5rem; text-align: center; font-size: 12px; color: var(--color-text-muted); }

        .eco-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 800px) { .eco-grid { grid-template-columns: 1fr; } }

        .eco-card { padding: 0.875rem 0.75rem 0.625rem; }
        .eco-card-title {
          font-size: 11px; font-weight: 700; color: var(--color-text-secondary);
          text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem;
        }
        .eco-no-data { height: 220px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--color-text-muted); }

        .eco-legend {
          display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem;
          padding: 0 0.25rem; font-size: 9px; font-family: var(--font-mono);
        }
        .eco-legend-item { font-weight: 600; }

        .eco-source {
          font-size: 10px; color: var(--color-text-muted); text-align: center; padding: 0.5rem;
        }
      `}</style>
    </div>
  )
}
