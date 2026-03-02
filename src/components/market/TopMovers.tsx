import type { Mover } from '../../services/api/types'

interface Props {
  gainers: Mover[]
  losers:  Mover[]
}

export default function TopMovers({ gainers, losers }: Props) {
  return (
    <div className="movers-wrap">
      <div className="movers-col">
        <div className="movers-header up">Gainers</div>
        {gainers.map(m => <MoverRow key={m.symbol} mover={m} direction="up" />)}
      </div>
      <div className="movers-col">
        <div className="movers-header down">Losers</div>
        {losers.map(m => <MoverRow key={m.symbol} mover={m} direction="down" />)}
      </div>

      <style>{`
        .movers-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .movers-header {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid var(--color-border-subtle);
          margin-bottom: 0.25rem;
        }
        .movers-header.up   { color: var(--color-up); }
        .movers-header.down { color: var(--color-down); }

        .mover-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.3rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
          gap: 0.5rem;
        }
        .mover-row:last-child { border-bottom: none; }

        .mover-left { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .mover-sym  {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-primary);
          white-space: nowrap;
        }
        .mover-exch {
          font-size: 9px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mover-right { text-align: right; flex-shrink: 0; }
        .mover-pct {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
        }
        .mover-pct.up   { color: var(--color-up); }
        .mover-pct.down { color: var(--color-down); }
      `}</style>
    </div>
  )
}

function MoverRow({ mover, direction }: { mover: Mover; direction: 'up' | 'down' }) {
  const sign = direction === 'up' ? '+' : ''
  return (
    <div className="mover-row">
      <div className="mover-left">
        <span className="mover-sym">{mover.symbol}</span>
        <span className="mover-exch">{mover.exchange}</span>
      </div>
      <div className="mover-right">
        <span className={`mover-pct ${direction}`}>
          {sign}{mover.changePct.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}
