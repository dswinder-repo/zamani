import type { ForexRate } from '../../services/api'

interface ForexTableProps {
  rates: ForexRate[]
}

export default function ForexTable({ rates }: ForexTableProps) {
  return (
    <div className="panel fx-table-wrap">
      <table className="fx-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th className="num">Rate</th>
            <th className="num">Chg%</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(r => {
            const up = r.changePct >= 0
            const pair = `${r.base}/${r.quote}`
            return (
              <tr key={pair} className="fx-row">
                <td className="fx-pair">{pair}</td>
                <td className="num fx-rate">{r.rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                <td className={`num fx-chg ${up ? 'text-up' : 'text-down'}`}>
                  {up ? '+' : ''}{r.changePct.toFixed(2)}%
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <style>{`
        .fx-table-wrap { overflow: hidden; }
        .fx-table {
          width: 100%; border-collapse: collapse; font-size: 12px;
        }
        .fx-table th {
          padding: 0.5rem 0.75rem;
          text-align: left; font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.06em; color: var(--color-text-muted);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .fx-table th.num { text-align: right; }
        .fx-row { border-bottom: 1px solid var(--color-border-subtle); }
        .fx-row:last-child { border-bottom: none; }
        .fx-row:hover td { background: var(--color-bg-hover); }
        .fx-row td { padding: 0.4375rem 0.75rem; }

        .fx-pair { font-family: var(--font-mono); font-weight: 600; font-size: 12px; }
        .fx-rate { text-align: right; font-size: 12px; }
        .fx-chg  { text-align: right; font-weight: 500; }
      `}</style>
    </div>
  )
}
