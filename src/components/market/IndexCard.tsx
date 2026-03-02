import type { IndexSnapshot } from '../../services/api'
import Sparkline from '../charts/Sparkline'

interface IndexCardProps {
  index: IndexSnapshot
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000)     return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
  return n.toFixed(2)
}

export default function IndexCard({ index }: IndexCardProps) {
  const up = index.changePct >= 0
  const sign = up ? '+' : ''

  return (
    <div className="idx-card panel">
      <div className="idx-header">
        <span className="idx-exchange">{index.exchange}</span>
        <span className={`idx-badge ${up ? 'up' : 'down'}`}>
          {sign}{index.changePct.toFixed(2)}%
        </span>
      </div>

      <div className="idx-name">{index.name}</div>

      <div className="idx-body">
        <div>
          <span className="num idx-value">{fmt(index.value)}</span>
          <span className="idx-currency"> {index.currency}</span>
        </div>
        <div className={`num idx-change ${up ? 'text-up' : 'text-down'}`}>
          {sign}{fmt(index.change)}
        </div>
      </div>

      <Sparkline data={index.sparkline} up={up} height={36} />

      <style>{`
        .idx-card {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 0.75rem;
          min-width: 160px;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .idx-card:hover { border-color: var(--color-border); }

        .idx-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .idx-exchange {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .idx-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 1px 5px;
          border-radius: 3px;
          font-weight: 600;
        }
        .idx-badge.up   { color: var(--color-up);   background: var(--color-up-subtle);   }
        .idx-badge.down { color: var(--color-down); background: var(--color-down-subtle); }

        .idx-name {
          font-size: 11px;
          color: var(--color-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .idx-body {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .idx-value    { font-size: 18px; font-weight: 700; color: var(--color-text-primary); }
        .idx-currency { font-size: 10px; color: var(--color-text-muted); }
        .idx-change   { font-size: 11px; }
      `}</style>
    </div>
  )
}
