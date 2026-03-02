import type { Commodity } from '../../services/api/types'

interface Props {
  items: Commodity[]
}

const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function formatPrice(price: number): string {
  if (price >= 1_000) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price)
  }
  return fmt.format(price)
}

export default function CommoditiesPanel({ items }: Props) {
  return (
    <div className="comm-table">
      {items.map(c => (
        <div key={c.id} className="comm-row">
          <div className="comm-name">{c.name}</div>
          <div className="comm-unit">/{c.unit}</div>
          <div className="comm-price">${formatPrice(c.price)}</div>
          <div className={`comm-chg ${c.changePct >= 0 ? 'up' : 'down'}`}>
            {c.changePct >= 0 ? '+' : ''}{c.changePct.toFixed(2)}%
          </div>
        </div>
      ))}

      <style>{`
        .comm-table {
          display: flex;
          flex-direction: column;
        }

        .comm-row {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .comm-row:last-child { border-bottom: none; }

        .comm-name {
          font-size: 12px;
          color: var(--color-text-primary);
          font-weight: 500;
        }
        .comm-unit {
          font-size: 10px;
          color: var(--color-text-muted);
          text-align: right;
        }
        .comm-price {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--color-text-secondary);
          text-align: right;
          min-width: 60px;
        }
        .comm-chg {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-align: right;
          min-width: 52px;
        }
        .comm-chg.up   { color: var(--color-up); }
        .comm-chg.down { color: var(--color-down); }
      `}</style>
    </div>
  )
}
