import { useQuery } from '@tanstack/react-query'
import { provider, getLiveForex } from '../../services/api'
import type { IndexSnapshot, ForexRate } from '../../services/api'

interface TickItem {
  label: string
  value: string
  pct:   number
}

export default function TickerStrip() {
  const { data: indices } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', 'all'],
    queryFn: () => provider.getIndices?.('all') ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  const { data: forex } = useQuery<ForexRate[]>({
    queryKey: ['forex', 'major'],
    queryFn: () => getLiveForex(),
    staleTime: 60_000,
  })

  const items: TickItem[] = [
    ...(indices ?? []).map(i => ({
      label: i.exchange,
      value: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(i.value),
      pct:   i.changePct,
    })),
    ...(forex ?? []).slice(0, 5).map(f => ({
      label: `${f.base}/${f.quote}`,
      value: f.rate >= 100
        ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(f.rate)
        : f.rate.toFixed(4),
      pct:   f.changePct,
    })),
  ]

  if (!items.length) return null

  return (
    <div className="ticker-wrap" aria-label="Live market ticker">
      <div className="ticker-label">LIVE</div>
      <div className="ticker-scroll-mask">
        {/* Duplicate items so the scroll loops seamlessly */}
        <div className="ticker-track">
          {[...items, ...items].map((it, i) => (
            <TickerItem key={i} item={it} />
          ))}
        </div>
      </div>

      <style>{`
        .ticker-wrap {
          display: flex;
          align-items: center;
          background: var(--color-bg-tertiary);
          border-bottom: 1px solid var(--color-border-subtle);
          height: 28px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .ticker-label {
          flex-shrink: 0;
          padding: 0 0.75rem;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-gold);
          border-right: 1px solid var(--color-border-subtle);
          height: 100%;
          display: flex;
          align-items: center;
          background: var(--color-bg-tertiary);
          z-index: 1;
        }

        .ticker-scroll-mask {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .ticker-track {
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          animation: ticker-scroll 40s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }

        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0 1rem;
          border-right: 1px solid var(--color-border-subtle);
          height: 28px;
          cursor: default;
        }

        .tick-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tick-value {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-text-primary);
        }
        .tick-pct {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .tick-pct.up   { color: var(--color-up); }
        .tick-pct.down { color: var(--color-down); }
      `}</style>
    </div>
  )
}

function TickerItem({ item }: { item: TickItem }) {
  const isUp  = item.pct >= 0
  const sign  = isUp ? '▲' : '▼'
  return (
    <span className="ticker-item">
      <span className="tick-label">{item.label}</span>
      <span className="tick-value">{item.value}</span>
      <span className={`tick-pct ${isUp ? 'up' : 'down'}`}>
        {sign} {Math.abs(item.pct).toFixed(2)}%
      </span>
    </span>
  )
}
