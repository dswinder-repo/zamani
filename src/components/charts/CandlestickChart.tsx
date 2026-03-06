/**
 * Candlestick / OHLCV chart using Recharts ComposedChart.
 * Supports optional MA20, MA50 overlays and an RSI(14) sub-panel.
 */
import { useRef } from 'react'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
         ResponsiveContainer, ReferenceLine } from 'recharts'
import { Download } from 'lucide-react'
import type { OHLCV } from '../../services/api/types'

export interface ChartIndicators {
  ma20?:     boolean
  ma50?:     boolean
  rsi?:      boolean
  bb?:       boolean
  vwap?:     boolean
  linreg?:   boolean
  patterns?: boolean
}

interface CandlestickChartProps {
  data:        OHLCV[]
  height?:     number
  currency?:   string
  indicators?: ChartIndicators
  symbol?:     string
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

function computeBB(data: OHLCV[], period = 20): { upper: (number | null)[]; lower: (number | null)[] } {
  const upper: (number | null)[] = []
  const lower: (number | null)[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { upper.push(null); lower.push(null); continue }
    const slice = data.slice(i - period + 1, i + 1).map(d => d.close)
    const ma    = slice.reduce((s, v) => s + v, 0) / period
    const stddev = Math.sqrt(slice.reduce((s, v) => s + (v - ma) ** 2, 0) / period)
    upper.push(+(ma + 2 * stddev).toFixed(2))
    lower.push(+(ma - 2 * stddev).toFixed(2))
  }
  return { upper, lower }
}

function computeVWAP(data: OHLCV[]): (number | null)[] {
  let cumTPV = 0, cumVol = 0
  return data.map(d => {
    if (!d.volume) return null
    cumTPV += ((d.high + d.low + d.close) / 3) * d.volume
    cumVol += d.volume
    return cumVol > 0 ? +(cumTPV / cumVol).toFixed(2) : null
  })
}

function computeLinReg(data: OHLCV[]): number[] {
  const n   = data.length
  const ys  = data.map(d => d.close)
  const sumX  = (n * (n - 1)) / 2
  const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6
  const sumY  = ys.reduce((s, v) => s + v, 0)
  const sumXY = ys.reduce((s, v, i) => s + i * v, 0)
  const denom = n * sumX2 - sumX * sumX
  if (denom === 0) return ys
  const slope     = (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n
  return ys.map((_, i) => +(slope * i + intercept).toFixed(2))
}

type PatternLabel = 'doji' | 'hammer' | 'shooting_star' | 'bullish_engulfing' | 'bearish_engulfing' | null

function detectPattern(data: OHLCV[], i: number): PatternLabel {
  const d = data[i]
  const body   = Math.abs(d.close - d.open)
  const range  = d.high - d.low
  if (range === 0) return null

  // Doji: very small body relative to range
  if (body / range < 0.1 && range > 0) return 'doji'

  const upperShadow = d.high - Math.max(d.open, d.close)
  const lowerShadow = Math.min(d.open, d.close) - d.low

  // Hammer: lower shadow > 2× body, tiny upper shadow, bearish prior candle
  if (lowerShadow > 2 * body && upperShadow < body * 0.5 && body > 0) return 'hammer'

  // Shooting star: upper shadow > 2× body, tiny lower shadow
  if (upperShadow > 2 * body && lowerShadow < body * 0.5 && body > 0) return 'shooting_star'

  if (i > 0) {
    const prev = data[i - 1]
    const prevBearish = prev.close < prev.open
    const prevBullish = prev.close > prev.open

    // Bullish engulfing: prev bearish, current bullish and engulfs
    if (prevBearish && d.close > d.open && d.open < prev.close && d.close > prev.open) {
      return 'bullish_engulfing'
    }
    // Bearish engulfing: prev bullish, current bearish and engulfs
    if (prevBullish && d.close < d.open && d.open > prev.close && d.close < prev.open) {
      return 'bearish_engulfing'
    }
  }
  return null
}

function isBullishPattern(p: PatternLabel): boolean {
  return p === 'hammer' || p === 'bullish_engulfing'
}

function patternShortLabel(p: PatternLabel): string {
  switch (p) {
    case 'doji':              return 'D'
    case 'hammer':            return 'H'
    case 'shooting_star':     return 'SS'
    case 'bullish_engulfing': return 'BE'
    case 'bearish_engulfing': return 'BE'
    default: return ''
  }
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
  const d = payload[0]?.payload as OHLCV & {
    date: string; ma20?: number; ma50?: number; rsi?: number
    bbUpperAbs?: number; bbLowerAbs?: number; vwapAbs?: number
    linregAbs?: number; patternLabel?: string
  }
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
      {d.bbUpperAbs != null && d.bbLowerAbs != null && (
        <div style={{ color: '#06b6d4', marginTop: 2 }}>BB {d.bbLowerAbs.toFixed(2)}–{d.bbUpperAbs.toFixed(2)}</div>
      )}
      {d.vwapAbs != null && <div style={{ color: '#8b5cf6', marginTop: 2 }}>VWAP {fmtPrice(d.vwapAbs, currency)}</div>}
      {d.linregAbs != null && <div style={{ color: '#fb923c', marginTop: 2 }}>LinReg {fmtPrice(d.linregAbs, currency)}</div>}
      {d.patternLabel != null && <div style={{ color: 'var(--color-text-muted)', marginTop: 2 }}>Pattern: {d.patternLabel.replace(/_/g, ' ')}</div>}
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

export default function CandlestickChart({ data, height = 240, currency = 'USD', indicators = {}, symbol = 'chart' }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  function downloadSVG() {
    const svgEl = containerRef.current?.querySelector('svg')
    if (!svgEl) return
    const clone = svgEl.cloneNode(true) as SVGElement
    clone.setAttribute('style', 'background:#0a0a0a')
    const svgStr = new XMLSerializer().serializeToString(clone)
    const img = new Image()
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url  = URL.createObjectURL(blob)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth  || svgEl.clientWidth  || 800
      canvas.height = img.naturalHeight || svgEl.clientHeight || 400
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(b => {
        if (!b) return
        const a = document.createElement('a')
        a.href = URL.createObjectURL(b)
        a.download = `${symbol}-chart.png`
        a.click()
      })
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  if (!data.length) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-muted)', fontSize: 12 }}>
        No chart data
      </div>
    )
  }

  const minVal    = Math.min(...data.map(d => d.low))  * 0.999
  const maxVal    = Math.max(...data.map(d => d.high)) * 1.001
  const priceSpan = maxVal - minVal
  const ma20vals  = indicators.ma20     ? computeMA(data, 20) : []
  const ma50vals  = indicators.ma50     ? computeMA(data, 50) : []
  const rsiVals   = indicators.rsi      ? computeRSI(data)    : []
  const bbVals    = indicators.bb       ? computeBB(data)     : { upper: [] as (number|null)[], lower: [] as (number|null)[] }
  const vwapVals  = indicators.vwap     ? computeVWAP(data)   : []
  const linregVals = indicators.linreg  ? computeLinReg(data) : []
  const showRSI   = indicators.rsi && rsiVals.some(v => v != null)

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
    ...(indicators.bb && bbVals.upper[i] != null ? {
      bbUpper:    (bbVals.upper[i] as number) - minVal,
      bbLower:    Math.max(0, (bbVals.lower[i] as number) - minVal),
      bbUpperAbs: bbVals.upper[i],
      bbLowerAbs: bbVals.lower[i],
    } : {}),
    ...(indicators.vwap && vwapVals[i] != null ? {
      vwap:    (vwapVals[i] as number) - minVal,
      vwapAbs: vwapVals[i],
    } : {}),
    ...(indicators.linreg ? { linreg: linregVals[i] - minVal, linregAbs: linregVals[i] } : {}),
    ...(indicators.patterns ? (() => {
      const pat = detectPattern(data, i)
      if (!pat) return {}
      const bullish = isBullishPattern(pat)
      return {
        patternPrice: bullish ? d.low - minVal - priceSpan * 0.03 : d.high - minVal + priceSpan * 0.03,
        patternLabel: pat,
        patternBull:  bullish,
      }
    })() : {}),
  }))

  const mainHeight = showRSI ? height - 80 : height

  return (
    <div ref={containerRef}>
      {/* Download button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <button onClick={downloadSVG} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
          color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 3,
          fontSize: 10, borderRadius: 3, transition: 'color 0.1s',
        }}
        title="Download chart as PNG"
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
        >
          <Download size={10} /> PNG
        </button>
      </div>
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
          {/* Bollinger Bands */}
          {indicators.bb && (
            <>
              <Line type="monotone" dataKey="bbUpper" stroke="#06b6d4" strokeWidth={1}
                dot={false} isAnimationActive={false} connectNulls strokeDasharray="3 2" />
              <Line type="monotone" dataKey="bbLower" stroke="#06b6d4" strokeWidth={1}
                dot={false} isAnimationActive={false} connectNulls strokeDasharray="3 2" />
            </>
          )}
          {/* VWAP */}
          {indicators.vwap && (
            <Line type="monotone" dataKey="vwap" stroke="#8b5cf6" strokeWidth={1.5}
              dot={false} isAnimationActive={false} connectNulls />
          )}
          {/* Linear regression trendline */}
          {indicators.linreg && (
            <Line type="monotone" dataKey="linreg" stroke="#fb923c" strokeWidth={1.5}
              dot={false} isAnimationActive={false} strokeDasharray="6 3" />
          )}
          {/* Candlestick pattern markers */}
          {indicators.patterns && (
            <Line
              type="linear"
              dataKey="patternPrice"
              stroke="transparent"
              dot={(props: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                if (!props.payload?.patternLabel) return <g key={props.key} />
                const { cx, cy, payload } = props
                const bull  = payload.patternBull
                const label = patternShortLabel(payload.patternLabel)
                const color = bull ? 'var(--color-up)' : 'var(--color-down)'
                return (
                  <g key={props.key}>
                    <circle cx={cx} cy={cy} r={4} fill={color} fillOpacity={0.8} />
                    <text x={cx} y={bull ? cy + 11 : cy - 6} fontSize={7}
                      textAnchor="middle" fill={color} fontFamily="var(--font-mono)" fontWeight="700">
                      {label}
                    </text>
                  </g>
                )
              }}
              isAnimationActive={false}
              legendType="none"
            />
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

      {/* Indicator legend */}
      {(indicators.ma20 || indicators.ma50 || indicators.bb || indicators.vwap || indicators.linreg || indicators.patterns) && (
        <div style={{ display: 'flex', gap: '0.75rem', padding: '4px 4px 0', fontSize: 10, fontFamily: 'var(--font-mono)', flexWrap: 'wrap' }}>
          {indicators.ma20     && <span style={{ color: '#60a5fa' }}>─ MA20</span>}
          {indicators.ma50     && <span style={{ color: '#f59e0b' }}>╌ MA50</span>}
          {indicators.bb       && <span style={{ color: '#06b6d4' }}>╌ BB(20)</span>}
          {indicators.vwap     && <span style={{ color: '#8b5cf6' }}>─ VWAP</span>}
          {showRSI             && <span style={{ color: '#a78bfa' }}>─ RSI(14)</span>}
          {indicators.linreg   && <span style={{ color: '#fb923c' }}>╌ LinReg</span>}
          {indicators.patterns && <span style={{ color: 'var(--color-text-muted)' }}>● Patterns</span>}
        </div>
      )}
    </div>
  )
}
