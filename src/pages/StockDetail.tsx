import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Star, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { provider } from '../services/api'
import type { Quote, OHLCV, NewsItem } from '../services/api'
import CandlestickChart from '../components/charts/CandlestickChart'
import type { ChartIndicators } from '../components/charts/CandlestickChart'
import { useWatchlist } from '../stores/watchlist'
import { ExchangeStatusBadge } from '../components/layout/MarketStatus'

const RANGE_OPTIONS = [
  { label: '1W',  days: 7   },
  { label: '1M',  days: 30  },
  { label: '3M',  days: 90  },
  { label: '6M',  days: 180 },
  { label: '1Y',  days: 365 },
]

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-value num">{value}</span>
    </div>
  )
}

export default function StockDetail() {
  const { exchangeId = '', symbol: rawSymbol = '' } = useParams()
  const symbol = decodeURIComponent(rawSymbol)
  const [days, setDays] = useState(30)
  const [indicators, setIndicators] = useState<ChartIndicators>({})
  const { symbols: watchlistSyms, add, remove } = useWatchlist()

  function toggleIndicator(key: keyof ChartIndicators) {
    setIndicators(prev => ({ ...prev, [key]: !prev[key] }))
  }
  const inWatchlist = watchlistSyms.includes(symbol)

  const { data: quote } = useQuery<Quote>({
    queryKey: ['quote', symbol],
    queryFn:  () => provider.getQuote(symbol),
    staleTime: 30_000,
    refetchInterval: 30_000,
  })

  const { data: history, isLoading: histLoading } = useQuery<OHLCV[]>({
    queryKey: ['history', symbol, days],
    queryFn:  () => provider.getHistory(symbol, days),
    staleTime: 60_000,
  })

  const { data: news } = useQuery<NewsItem[]>({
    queryKey: ['news', symbol],
    queryFn:  () => provider.getNews?.(symbol) ?? Promise.resolve([]),
    staleTime: 5 * 60_000,
  })

  const up = (quote?.changePct ?? 0) >= 0

  // Key stats from history
  const hiLo = history?.length
    ? {
        high: Math.max(...history.map(d => d.high)),
        low:  Math.min(...history.map(d => d.low)),
        avgVol: Math.floor(history.reduce((s, d) => s + d.volume, 0) / history.length),
      }
    : null

  // 52-week range position (0–100) of current price within the period range
  const rangePos = hiLo && quote
    ? Math.max(0, Math.min(100, ((quote.price - hiLo.low) / (hiLo.high - hiLo.low)) * 100))
    : null

  return (
    <div className="stock-detail">

      {/* Breadcrumb */}
      <div className="sd-breadcrumb">
        <Link to={`/exchange/${exchangeId}`} className="sd-back">
          <ArrowLeft size={12} />
          {exchangeId.toUpperCase()}
        </Link>
        <span className="sd-sep">/</span>
        <span>{symbol}</span>
      </div>

      {/* Price header */}
      <div className="sd-header panel">
        <div className="sd-header-left">
          <div className="sd-symbol-row">
            <span className="sd-symbol">{symbol.replace(`.${exchangeId.toUpperCase()}`, '')}</span>
            <ExchangeStatusBadge id={exchangeId} />
          </div>
          <div className="sd-name">{quote?.name ?? symbol}</div>

          <div className="sd-price-row">
            <span className="sd-price num">
              {quote
                ? quote.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : '—'}
            </span>
            <span className="sd-currency">{quote?.currency ?? ''}</span>
          </div>

          <div className="sd-change-row">
            {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span className={`num ${up ? 'text-up' : 'text-down'}`}>
              {quote ? (up ? '+' : '') + quote.change.toFixed(2) : '—'}
            </span>
            <span className={`num sd-pct ${up ? 'text-up' : 'text-down'}`}>
              ({quote ? (up ? '+' : '') + quote.changePct.toFixed(2) + '%' : '—'})
            </span>
          </div>
        </div>

        {/* Watchlist toggle */}
        <button
          className={`sd-wl-btn ${inWatchlist ? 'sd-wl-active' : ''}`}
          onClick={() => inWatchlist ? remove(symbol) : add(symbol)}
        >
          <Star size={14} />
          {inWatchlist ? 'Watching' : 'Watch'}
        </button>
      </div>

      {/* Chart + Stats two-col */}
      <div className="sd-body">

        {/* Chart */}
        <div className="sd-chart-col">
          <div className="sd-chart-header">
            <span className="section-label">Price History</span>
            <div className="sd-chart-controls">
              <div className="sd-range-tabs">
                {RANGE_OPTIONS.map(r => (
                  <button
                    key={r.label}
                    className={`sd-range-tab ${days === r.days ? 'active' : ''}`}
                    onClick={() => setDays(r.days)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="sd-indicator-tabs">
                {(['ma20', 'ma50', 'bb', 'vwap', 'rsi'] as (keyof ChartIndicators)[]).map(k => (
                  <button
                    key={k}
                    className={`sd-ind-tab ${indicators[k] ? 'active' : ''}`}
                    onClick={() => toggleIndicator(k)}
                  >
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sd-chart panel">
            {histLoading
              ? <div className="sd-chart-loading">Loading chart…</div>
              : <CandlestickChart data={history ?? []} currency={quote?.currency ?? 'USD'}
                  height={280} indicators={indicators} />
            }
          </div>
        </div>

        {/* Stats sidebar */}
        <div className="sd-stats-col">
          <div className="section-label">Key Stats</div>
          <div className="sd-stats panel">
            {quote && <>
              <StatRow label="Last Price"  value={quote.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} />
              <StatRow label="Change"      value={`${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}`} />
              <StatRow label="Change %"    value={`${quote.changePct >= 0 ? '+' : ''}${quote.changePct.toFixed(2)}%`} />
              <StatRow label="Volume"      value={quote.volume ? (quote.volume / 1_000).toFixed(0) + 'K' : '—'} />
              <StatRow label="Currency"    value={quote.currency} />
              <StatRow label="Exchange"    value={quote.exchange} />
            </>}
            {hiLo && <>
              <div className="stat-divider" />
              <StatRow label={`${days}d High`} value={hiLo.high.toLocaleString('en-US', { minimumFractionDigits: 2 })} />
              <StatRow label={`${days}d Low`}  value={hiLo.low.toLocaleString('en-US',  { minimumFractionDigits: 2 })} />
              <StatRow label="Avg Volume"       value={(hiLo.avgVol / 1_000).toFixed(0) + 'K'} />
              {rangePos != null && (
                <div className="stat-range-bar">
                  <span className="stat-range-lo">{hiLo.low.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                  <div className="stat-range-track">
                    <div className="stat-range-fill" style={{ left: `${rangePos}%` }} />
                  </div>
                  <span className="stat-range-hi">{hiLo.high.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </div>
              )}
            </>}
          </div>
        </div>
      </div>

      {/* News */}
      {(news?.length ?? 0) > 0 && (
        <section>
          <div className="section-label">Related News</div>
          <div className="sd-news panel">
            {(news ?? []).map(item => (
              <a key={item.id} href={item.url} className="sd-news-item" target="_blank" rel="noopener">
                <span className="sd-news-src">{item.source}</span>
                <span className="sd-news-headline">{item.headline}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .stock-detail { display: flex; flex-direction: column; gap: 1.25rem; max-width: 1100px; }

        /* Breadcrumb */
        .sd-breadcrumb {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 11px; color: var(--color-text-muted);
        }
        .sd-back {
          display: flex; align-items: center; gap: 0.25rem;
          color: var(--color-gold); text-decoration: none; font-weight: 600;
        }
        .sd-back:hover { text-decoration: underline; }
        .sd-sep { opacity: 0.4; }

        /* Price header */
        .sd-header {
          padding: 1rem 1.25rem;
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .sd-symbol-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.125rem; }
        .sd-symbol { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; font-family: var(--font-mono); color: var(--color-gold); }
        .sd-name   { font-size: 12px; color: var(--color-text-muted); margin-bottom: 0.5rem; }

        .sd-price-row { display: flex; align-items: baseline; gap: 0.375rem; }
        .sd-price    { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
        .sd-currency { font-size: 11px; color: var(--color-text-muted); }

        .sd-change-row {
          display: flex; align-items: center; gap: 0.375rem;
          margin-top: 0.25rem; font-size: 13px;
        }
        .sd-pct { font-size: 12px; }

        /* Watchlist button */
        .sd-wl-btn {
          display: flex; align-items: center; gap: 0.375rem;
          padding: 0.375rem 0.75rem; border-radius: 4px;
          border: 1px solid var(--color-border);
          background: none; color: var(--color-text-muted);
          font-size: 11px; font-weight: 600; cursor: pointer;
          transition: all 0.15s;
        }
        .sd-wl-btn:hover   { border-color: var(--color-gold-dim); color: var(--color-gold); }
        .sd-wl-active      { border-color: var(--color-gold); color: var(--color-gold); background: var(--color-gold-subtle); }

        /* Body layout */
        .sd-body {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 1rem;
          align-items: start;
        }
        @media (max-width: 750px) {
          .sd-body { grid-template-columns: 1fr; }
        }

        /* Chart */
        .sd-chart-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .sd-chart { padding: 0.5rem 0.25rem 0.25rem; }
        .sd-chart-loading {
          height: 280px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        /* Chart controls row */
        .sd-chart-controls { display: flex; align-items: center; gap: 0.5rem; }

        /* Range tabs */
        .sd-range-tabs { display: flex; gap: 2px; }
        .sd-range-tab {
          padding: 2px 7px; font-size: 10px; font-weight: 600;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s;
        }
        .sd-range-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .sd-range-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        /* Indicator toggle tabs */
        .sd-indicator-tabs { display: flex; gap: 2px; border-left: 1px solid var(--color-border-subtle); padding-left: 0.5rem; }
        .sd-ind-tab {
          padding: 2px 6px; font-size: 9px; font-weight: 700;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.04em;
        }
        .sd-ind-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .sd-ind-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        /* Stats */
        .sd-stats { padding: 0; overflow: hidden; }
        .stat-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.375rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          font-size: 11px;
        }
        .stat-row:last-child { border-bottom: none; }
        .stat-label { color: var(--color-text-muted); }
        .stat-value { color: var(--color-text-primary); font-weight: 600; }
        .stat-divider { height: 1px; background: var(--color-border); margin: 0.25rem 0; }

        /* 52w range bar */
        .stat-range-bar {
          display: flex; align-items: center; gap: 4px;
          padding: 0.375rem 0.75rem;
          font-size: 9px; font-family: var(--font-mono);
          color: var(--color-text-muted);
        }
        .stat-range-track {
          flex: 1; height: 4px; background: var(--color-bg-tertiary);
          border-radius: 2px; position: relative;
        }
        .stat-range-fill {
          position: absolute; top: -2px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--color-gold);
          transform: translateX(-50%);
        }
        .stat-range-lo, .stat-range-hi { white-space: nowrap; }

        /* Section label */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }

        /* News */
        .sd-news { overflow: hidden; }
        .sd-news-item {
          display: flex; align-items: baseline; gap: 0.625rem;
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none; transition: background 0.1s;
        }
        .sd-news-item:last-child { border-bottom: none; }
        .sd-news-item:hover { background: var(--color-bg-hover); }
        .sd-news-src {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600; white-space: nowrap; flex-shrink: 0;
        }
        .sd-news-headline { font-size: 12px; color: var(--color-text-secondary); line-height: 1.4; }
        .sd-news-item:hover .sd-news-headline { color: var(--color-text-primary); }
      `}</style>
    </div>
  )
}
