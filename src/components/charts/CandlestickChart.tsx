/**
 * Candlestick / OHLCV chart using Recharts ComposedChart.
 * Falls back to a line chart for low-volume or single-candle data.
 */
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { OHLCV } from '../../services/api/types'

interface CandlestickChartProps {
  data:      OHLCV[]
  height?:   number
  currency?: string
}

function fmt(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtPrice(v: number, currency: string) {
  return `${currency} ${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, currency = 'USD' }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload as OHLCV & { date: string }
  if (!d) return null

  return (
    <div style={{
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '0.5rem 0.75rem',
      fontSize: 11, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: 4 }}>{fmt(d.time)}</div>
      {[
        ['O', d.open], ['H', d.high], ['L', d.low], ['C', d.close],
      ].map(([label, val]) => {
        const isClose = label === 'C'
        const isUp    = d.close >= d.open
        return (
          <div key={String(label)} style={{
            display: 'flex', gap: '1rem', justifyContent: 'space-between',
            color: isClose ? (isUp ? 'var(--color-up)' : 'var(--color-down)') : 'var(--color-text-secondary)',
            fontWeight: isClose ? 700 : 400,
          }}>
            <span>{label}</span>
            <span>{fmtPrice(Number(val), currency)}</span>
          </div>
        )
      })}
      {d.volume > 0 && (
        <div style={{ color: 'var(--color-text-muted)', marginTop: 4, borderTop: '1px solid var(--color-border-subtle)', paddingTop: 4 }}>
          Vol {(d.volume / 1_000).toFixed(0)}K
        </div>
      )}
    </div>
  )
}

export default function CandlestickChart({ data, height = 240, currency = 'USD' }: CandlestickChartProps) {
  if (!data.length) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-muted)', fontSize: 12 }}>
        No chart data
      </div>
    )
  }

  // For candlestick we transform data: each bar represents [low, high] range,
  // with a custom shape overlaying the open/close body.
  // Simpler approach: use two stacked bars (invisible bottom + range) + custom shape.
  // But Recharts doesn't support custom candle natively well.
  // Instead: use Line for close price + custom bar for high-low range, tinted by direction.

  const isUp = (d: OHLCV) => d.close >= d.open
  const minVal = Math.min(...data.map(d => d.low))  * 0.999
  const maxVal = Math.max(...data.map(d => d.high)) * 1.001

  // Build chart data: bottom (invisible) + wickRange + bodyRange
  const chartData = data.map(d => ({
    ...d,
    date:      fmt(d.time),
    wickBase:  d.low - minVal,                // bottom of wick above minVal
    wickRange: d.high - d.low,               // full wick height
    bodyBase:  Math.min(d.open, d.close) - minVal,
    bodyRange: Math.abs(d.close - d.open) || 0.5,
    color:     isUp(d) ? 'var(--color-up)' : 'var(--color-down)',
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={chartData} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />

        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          tickLine={false}
          axisLine={{ stroke: 'var(--color-border-subtle)' }}
          interval="preserveStartEnd"
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

        {/* Invisible base stack */}
        <Bar dataKey="wickBase"  stackId="wick" fill="transparent" isAnimationActive={false} />
        {/* Wick */}
        <Bar dataKey="wickRange" stackId="wick" fill="var(--color-text-muted)" opacity={0.4}
          barSize={1} isAnimationActive={false} />

        {/* Invisible base for body */}
        <Bar dataKey="bodyBase"  stackId="body" fill="transparent" isAnimationActive={false} />
        {/* Body — colored by direction */}
        <Bar dataKey="bodyRange" stackId="body" barSize={Math.max(3, Math.floor(800 / data.length) - 2)}
          isAnimationActive={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fill="currentColor" shape={(props: any) => {
            const d = props.payload as typeof chartData[0]
            const up = d.close >= d.open
            return (
              <rect
                x={props.x + 1}
                y={props.y}
                width={Math.max(props.width - 2, 1)}
                height={Math.max(props.height, 1)}
                fill={up ? 'var(--color-up)' : 'var(--color-down)'}
                rx={1}
              />
            )
          }}
        />

        {/* Close price line overlay */}
        <Line
          type="monotone"
          dataKey="close"
          stroke="var(--color-gold)"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
          // Hide the line — it's just for tooltip reference; remove if you want a visible MA line
          strokeOpacity={0}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
