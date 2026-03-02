/**
 * MarketStatus — compact status dots for the topbar.
 * Shows open/pre/post/closed for each exchange.
 */
import { useState, useEffect } from 'react'
import { getAllStatuses, type ExchangeStatus } from '../../utils/marketHours'

const STATUS_COLOR: Record<ExchangeStatus, string> = {
  open:   'var(--color-up)',
  pre:    '#facc15',     // amber
  post:   '#fb923c',     // orange
  closed: 'var(--color-text-muted)',
}

const STATUS_LABEL: Record<ExchangeStatus, string> = {
  open:   'OPEN',
  pre:    'PRE',
  post:   'POST',
  closed: 'CLOSED',
}

const EXCHANGES = ['JSE', 'NGX', 'NSE', 'GSE', 'BRVM', 'ZSE', 'BSE', 'LUSE']

export default function MarketStatus() {
  const [statuses, setStatuses] = useState<Record<string, ExchangeStatus>>(getAllStatuses)

  useEffect(() => {
    const id = setInterval(() => setStatuses(getAllStatuses()), 30_000)
    return () => clearInterval(id)
  }, [])

  const openCount   = Object.values(statuses).filter(s => s === 'open').length
  const openExchanges = EXCHANGES.filter(e => statuses[e.toLowerCase()] === 'open')

  return (
    <div className="market-status" title={openExchanges.length ? `Open: ${openExchanges.join(', ')}` : 'All markets closed'}>
      <span
        className={`ms-dot${openCount > 0 ? ' pulse-open' : ''}`}
        style={{ background: openCount > 0 ? 'var(--color-up)' : 'var(--color-text-muted)' }}
      />
      <span className="ms-count">
        {openCount > 0 ? `${openCount} open` : 'closed'}
      </span>

      <style>{`
        .market-status {
          display: flex; align-items: center; gap: 5px;
          cursor: default; user-select: none;
        }
        .ms-dot {
          width: 6px; height: 6px; border-radius: 50%;
          flex-shrink: 0;
        }
        .ms-count {
          font-size: 10px; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  )
}

/** Larger badge used on exchange pages and sidebar */
export function ExchangeStatusBadge({ id }: { id: string }) {
  const [status, setStatus] = useState<ExchangeStatus>(() => getAllStatuses()[id] ?? 'closed')

  useEffect(() => {
    const tick = () => setStatus(getAllStatuses()[id] ?? 'closed')
    const id2 = setInterval(tick, 30_000)
    return () => clearInterval(id2)
  }, [id])

  return (
    <span className={`ex-status-badge ex-status-${status}`}>
      <span className="esb-dot" />
      {STATUS_LABEL[status]}
      <style>{`
        .ex-status-badge {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
          padding: 2px 6px; border-radius: 3px;
          font-family: var(--font-mono);
        }
        .esb-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .ex-status-open   { background: var(--color-up-subtle);   color: var(--color-up);    }
        .ex-status-open .esb-dot { background: var(--color-up); animation: pulse-ring 2.2s ease-out infinite; }
        .ex-status-pre    { background: rgba(250,204,21,0.1);     color: #facc15; }
        .ex-status-pre .esb-dot  { background: #facc15; }
        .ex-status-post   { background: rgba(251,146,60,0.1);     color: #fb923c; }
        .ex-status-post .esb-dot { background: #fb923c; }
        .ex-status-closed { background: var(--color-bg-elevated); color: var(--color-text-muted); }
        .ex-status-closed .esb-dot { background: var(--color-text-muted); }
      `}</style>
    </span>
  )
}

/** Full status grid — used on dashboard or exchange overview */
export function MarketStatusGrid() {
  const [statuses, setStatuses] = useState<Record<string, ExchangeStatus>>(getAllStatuses)

  useEffect(() => {
    const id = setInterval(() => setStatuses(getAllStatuses()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="ms-grid">
      {EXCHANGES.map(ex => {
        const s = statuses[ex.toLowerCase()] ?? 'closed'
        return (
          <div key={ex} className="ms-grid-item" title={STATUS_LABEL[s]}>
            <span className={`ms-grid-dot${s === 'open' ? ' pulse-open' : ''}`} style={{ background: STATUS_COLOR[s] }} />
            <span className="ms-grid-label">{ex}</span>
          </div>
        )
      })}
      <style>{`
        .ms-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .ms-grid-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono); font-weight: 600;
          letter-spacing: 0.04em;
        }
        .ms-grid-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .ms-grid-label { text-transform: uppercase; }
      `}</style>
    </div>
  )
}
