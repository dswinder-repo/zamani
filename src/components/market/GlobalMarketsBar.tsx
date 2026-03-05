/**
 * GlobalMarketsBar — Bloomberg-style world markets strip.
 * Shows S&P 500, NASDAQ, DOW, VIX, DXY, US 10Y, FTSE, DAX, NIKKEI, HANG SENG.
 * Data from Yahoo Finance via Cloudflare Worker proxy (no API key needed).
 */
import { useQuery } from '@tanstack/react-query'
import { getGlobalMarkets } from '../../services/api'
import type { GlobalMarket } from '../../services/api'

function fmtValue(m: GlobalMarket): string {
  if (m.id === 'us10y') return m.value.toFixed(2) + '%'
  if (m.id === 'vix' || m.id === 'dxy') return m.value.toFixed(2)
  if (m.value >= 10_000) return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(m.value)
  if (m.value >= 1_000)  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(m.value)
  return m.value.toFixed(2)
}

function MarketItem({ m }: { m: GlobalMarket }) {
  // VIX: higher is worse (fear) — invert colour
  const up = m.id === 'vix' ? m.changePct <= 0 : m.changePct >= 0
  const sign = m.changePct >= 0 ? '+' : ''
  return (
    <div className="gm-item">
      <span className="gm-name">{m.name}</span>
      <span className="gm-value">{fmtValue(m)}</span>
      <span className={`gm-pct ${up ? 'up' : 'down'}`}>
        {sign}{m.changePct.toFixed(2)}%
      </span>
    </div>
  )
}

export default function GlobalMarketsBar() {
  const { data: markets } = useQuery<GlobalMarket[]>({
    queryKey: ['global-markets'],
    queryFn:  getGlobalMarkets,
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  if (!markets?.length) return null

  return (
    <div className="gm-bar">
      <div className="gm-label">GLOBAL</div>
      <div className="gm-scroll">
        {markets.map(m => <MarketItem key={m.id} m={m} />)}
      </div>

      <style>{`
        .gm-bar {
          display: flex;
          align-items: stretch;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .gm-bar::-webkit-scrollbar { display: none; }

        .gm-label {
          flex-shrink: 0;
          padding: 0 0.75rem;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-text-muted);
          border-right: 1px solid var(--color-border-subtle);
          display: flex; align-items: center;
          background: var(--color-bg-tertiary);
        }

        .gm-scroll {
          display: flex;
          align-items: stretch;
          flex: 1;
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gm-scroll::-webkit-scrollbar { display: none; }

        .gm-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-right: 1px solid var(--color-border-subtle);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .gm-item:last-child { border-right: none; }

        .gm-name {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .gm-value {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-primary);
        }
        .gm-pct {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
        }
        .gm-pct.up   { color: var(--color-up); }
        .gm-pct.down { color: var(--color-down); }
      `}</style>
    </div>
  )
}
