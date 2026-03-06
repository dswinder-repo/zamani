import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { getYieldCurve } from '../../services/api'
import type { YieldPoint } from '../../services/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function YieldTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0]?.payload as YieldPoint
  if (!p) return null
  return (
    <div style={{
      background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '6px 10px', fontSize: 11, fontFamily: 'var(--font-mono)',
    }}>
      <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>{p.label}</div>
      <div style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{p.yield.toFixed(3)}%</div>
    </div>
  )
}

export default function YieldCurvePanel() {
  const { data, isLoading } = useQuery<YieldPoint[]>({
    queryKey: ['yield-curve'],
    queryFn:  getYieldCurve,
    staleTime: 60 * 60_000,   // 1 hour
    refetchInterval: 60 * 60_000,
  })

  if (isLoading) return (
    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: 'var(--color-text-muted)' }}>
      Loading yield curve…
    </div>
  )

  if (!data?.length) return (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
      Yield curve data unavailable
    </div>
  )

  const minY = Math.max(0, Math.min(...data.map(p => p.yield)) - 0.2)
  const maxY = Math.max(...data.map(p => p.yield)) + 0.2

  // Detect inversion (any point lower than previous)
  const isInverted = data.some((p, i) => i > 0 && p.yield < data[i - 1].yield)

  return (
    <div className="yc-panel">
      <div className="yc-header">
        <span className="yc-title">US Yield Curve</span>
        {isInverted && <span className="yc-inverted">⚠ Inverted</span>}
        <div className="yc-values">
          {data.map(p => (
            <span key={p.maturity} className="yc-tick">
              <span className="yc-mat">{p.maturity}</span>
              <span className="yc-yield">{p.yield.toFixed(2)}%</span>
            </span>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={90}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
          <XAxis
            dataKey="maturity"
            tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-border-subtle)' }}
          />
          <YAxis
            domain={[minY, maxY]}
            tick={{ fontSize: 9, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            tickLine={false} axisLine={false} width={32} orientation="right"
            tickFormatter={v => `${v.toFixed(1)}%`}
          />
          <Tooltip content={<YieldTooltip />} />
          <Line
            type="monotone" dataKey="yield"
            stroke={isInverted ? 'var(--color-down)' : 'var(--color-gold)'}
            strokeWidth={2} dot={{ fill: 'var(--color-gold)', r: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <style>{`
        .yc-panel { display: flex; flex-direction: column; gap: 0.25rem; }
        .yc-header { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .yc-title {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .yc-inverted {
          font-size: 10px; font-weight: 700; color: var(--color-down);
          padding: 1px 5px; border-radius: 3px; background: var(--color-down-subtle);
        }
        .yc-values { display: flex; gap: 0.5rem; margin-left: auto; flex-wrap: wrap; }
        .yc-tick { display: flex; flex-direction: column; align-items: center; gap: 1px; }
        .yc-mat  { font-size: 9px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .yc-yield { font-size: 10px; color: var(--color-gold); font-family: var(--font-mono); font-weight: 600; }
      `}</style>
    </div>
  )
}
