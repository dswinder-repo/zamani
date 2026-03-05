/**
 * Candlestick / OHLCV chart using Recharts ComposedChart.
 * Supports optional MA20, MA50 overlays and an RSI(14) sub-panel.
 */
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
         ResponsiveContainer, ReferenceLine } from 'recharts'
import type { OHLCV } from '../../services/api/types'

export interface ChartIndicators {
  ma20?: boolean
  ma50?: boolean
  rsi?:  boolean
}

interface CandlestickChartProps {
  data:        OHLCV[]
  height?:     number
  currency?:   string
  indicators?: ChartIndicators
}

function fmt(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtPrice(v: number, currency: string) {
  return `${currency} ${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// ── Technical indicator math ───────────────────────────────────────────────

function computeMA(data: OHLCV[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null
    const sum = data.slice(i - period + 1, i + 1).reduce((s, d) => s + d.close, 0)
    return +(sum / period).toFixed(2)
  })
}

function computeRSI(data: OHLCV[], period = 14): (number | null)[] {
  const result: (number | null)[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period) { result.push(null); continue }
    let gains = 0, losses = 0
    for (let j = i - period + 1; j <= i; j++) {
      const diff = data[j].close - data[j - 1].close
      if (diff > 0) gains += diff
      else losses -= diff
    }
    const avg = losses === 0 ? 100 : +(100 - 100 / (1 + gains / losses)).toFixed(1)
    result.push(avg)
  }
  return result
}

// ── Tooltip ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, currency = 'USD' }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload as OHLCV & { date: string; ma20?: number; ma50?: number; rsi?: number }
  if (!d) return null

  return (
    <div style={{
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '0.5rem 0.75rem',
      fontSize: 11, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: 4 }}>{fmt(d.time)}</div>
      {([['O', d.open], ['H', d.high], ['L', d.low], ['C', d.close]] as [string, number][]).map(([label, val]) => {
        const isClose = label === 'C'
        const isUp    = d.close >= d.open
        return (
          <div key={label} style={{
            display: 'flex', gap: '1rem', justifyContent: 'space-between',
            color: isClose ? (isUp ? 'var(--color-up)' : 'var(--color-down)') : 'var(--color-text-secondary)',
            fontWeight: isClose ? 700 : 400,
          }}>
            <span>{label}</span>
            <span>{fmtPrice(val, currency)}</span>
          </div>
        )
      })}
      {d.volume > 0 && (
        <div style={{ color: 'var(--color-text-muted)', marginTop: 4, borderTop: '1px solid var(--color-border-subtle)', paddingTop: 4 }}>
          Vol {(d.volume / 1_000).toFixed(0)}K
        </div>
      )}
      {d.ma20 != null && <div style={{ color: '#60a5fa', marginTop: 2 }}>MA20 {fmtPrice(d.ma20, currency)}</div>}
      {d.ma50 != null && <div style={{ color: '#f59e0b', marginTop: 2 }}>MA50 {fmtPrice(d.ma50, currency)}</div>}
      {d.rsi  != null && <div style={{ color: '#a78bfa', marginTop: 2 }}>RSI  {d.rsi.toFixed(1)}</div>}
    </div>
  )
}

// ── RSI sub-chart tooltip ──────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RSITooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const rsi = payload[0]?.value as number | null
  if (rsi == null) return null
  const color = rsi >= 70 ? 'var(--color-down)' : rsi <= 30 ? 'var(--color-up)' : '#a78bfa'
  return (
    <div style={{
      background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '4px 8px', fontSize: 11, fontFamily: 'var(--font-mono)', color,
    }}>
      RSI {rsi.toFixed(1)}{rsi >= 70 ? ' OB' : rsi <= 30 ? ' OS' : ''}
    </div>
  )
}

// ── Main chart ─────────────────────────────────────────────────────────────

export default function CandlestickChart({ data, height = 240, currency = 'USD', indicators = {} }: CandlestickChartProps) {
  if (!data.length) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-muted)', fontSize: 12 }}>
        No chart data
      </div>
    )
  }

  const minVal   = Math.min(...data.map(d => d.low))  * 0.999
  const maxVal   = Math.max(...data.map(d => d.high)) * 1.001
  const ma20vals = indicators.ma20 ? computeMA(data, 20) : []
  const ma50vals = indicators.ma50 ? computeMA(data, 50) : []
  const rsiVals  = indicators.rsi  ? computeRSI(data)    : []
  const showRSI  = indicators.rsi && rsiVals.some(v => v != null)

  const chartData = data.map((d, i) => ({
    ...d,
    date:      fmt(d.time),
    wickBase:  d.low - minVal,
    wickRange: d.high - d.low,
    bodyBase:  Math.min(d.open, d.close) - minVal,
    bodyRange: Math.abs(d.close - d.open) || 0.5,
    ...(indicators.ma20 && ma20vals[i] != null ? { ma20: ma20vals[i] as number - minVal, ma20abs: ma20vals[i] } : {}),
    ...(indicators.ma50 && ma50vals[i] != null ? { ma50: ma50vals[i] as number - minVal, ma50abs: ma50vals[i] } : {}),
    ...(showRSI ? { rsi: rsiVals[i] } : {}),
  }))

  const mainHeight = showRSI ? height - 80 : height

  return (
    <div>
      {/* Main OHLC chart */}
      <ResponsiveContainer width="100%" height={mainHeight}>
        <ComposedChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-border-subtle)' }}
            interval="preserveStartEnd"
            hide={showRSI}
          />
          <YAxis
            domain={[minVal, maxVal]}
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => (v + minVal).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            width={56}
            orientation="right"
          />
          <Tooltip content={<CustomTooltip currency={currency} />} />

          {/* Invisible wick base */}
          <Bar dataKey="wickBase"  stackId="wick" fill="transparent" isAnimationActive={false} />
          {/* Wick */}
          <Bar dataKey="wickRange" stackId="wick" fill="var(--color-text-muted)" opacity={0.4}
            barSize={1} isAnimationActive={false} />
          {/* Invisible body base */}
          <Bar dataKey="bodyBase"  stackId="body" fill="transparent" isAnimationActive={false} />
          {/* Candle body */}
          <Bar dataKey="bodyRange" stackId="body" barSize={Math.max(3, Math.floor(800 / data.length) - 2)}
            isAnimationActive={false}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fill="currentColor" shape={(props: any) => {
              const d = props.payload as typeof chartData[0]
              const up = d.close >= d.open
              return (
                <rect
                  x={props.x + 1} y={props.y}
                  width={Math.max(props.width - 2, 1)} height={Math.max(props.height, 1)}
                  fill={up ? 'var(--color-up)' : 'var(--color-down)'} rx={1}
                />
              )
            }}
          />

          {/* MA20 overlay */}
          {indicators.ma20 && (
            <Line type="monotone" dataKey="ma20" stroke="#60a5fa" strokeWidth={1.5}
              dot={false} isAnimationActive={false} connectNulls />
          )}
          {/* MA50 overlay */}
          {indicators.ma50 && (
            <Line type="monotone" dataKey="ma50" stroke="#f59e0b" strokeWidth={1.5}
              dot={false} isAnimationActive={false} connectNulls strokeDasharray="4 2" />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* RSI sub-panel */}
      {showRSI && (
        <ResponsiveContainer width="100%" height={76}>
          <ComposedChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--color-border-subtle)' }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              ticks={[30, 50, 70]}
              tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
              tickLine={false} axisLine={false} width={30} orientation="right"
            />
            <Tooltip content={<RSITooltip />} />
            <ReferenceLine y={70} stroke="var(--color-down)" strokeDasharray="2 2" strokeOpacity={0.5} />
            <ReferenceLine y={30} stroke="var(--color-up)"   strokeDasharray="2 2" strokeOpacity={0.5} />
            <ReferenceLine y={50} stroke="var(--color-border)" strokeOpacity={0.4} />
            <Line type="monotone" dataKey="rsi" stroke="#a78bfa" strokeWidth={1.5}
              dot={false} isAnimationActive={false} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      )}

      {/* MA legend */}
      {(indicators.ma20 || indicators.ma50) && (
        <div style={{ display: 'flex', gap: '0.75rem', padding: '4px 4px 0', fontSize: 10, fontFamily: 'var(--font-mono)' }}>
          {indicators.ma20 && <span style={{ color: '#60a5fa' }}>─ MA20</span>}
          {indicators.ma50 && <span style={{ color: '#f59e0b' }}>╌ MA50</span>}
          {showRSI         && <span style={{ color: '#a78bfa' }}>─ RSI(14)</span>}
        </div>
      )}
    </div>
  )
}
