import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react'
import { provider, getLiveForex } from '../services/api'
import type { IndexSnapshot, ForexRate, NewsItem, Commodity, Mover } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import ForexTable from '../components/market/ForexTable'
import NewsFeed from '../components/news/NewsFeed'
import TopMovers from '../components/market/TopMovers'
import CommoditiesPanel from '../components/market/CommoditiesPanel'
import WatchlistPanel from '../components/watchlist/WatchlistPanel'
import NdebelePanel from '../components/patterns/NdebelePanel'
import GlobalMarketsBar from '../components/market/GlobalMarketsBar'
import YieldCurvePanel from '../components/market/YieldCurvePanel'
import AfricaMap from '../components/market/AfricaMap'

export default function Dashboard() {
  const [cheatOpen, setCheatOpen] = useState(true)
  const { data: indices, isLoading: loadingIdx } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', 'all'],
    queryFn: () => provider.getIndices?.('all') ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  const { data: forex, isLoading: loadingFx } = useQuery<ForexRate[]>({
    queryKey: ['forex', 'major'],
    queryFn: () => getLiveForex(),
    staleTime: 60_000,
  })

  const { data: news, isLoading: loadingNews } = useQuery<NewsItem[]>({
    queryKey: ['news', 'dashboard'],
    queryFn: () => provider.getNews?.('africa') ?? Promise.resolve([]),
    staleTime: 5 * 60_000,
  })

  const { data: commodities, isLoading: loadingComm } = useQuery<Commodity[]>({
    queryKey: ['commodities'],
    queryFn: () => provider.getCommodities?.() ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  const { data: movers, isLoading: loadingMovers } = useQuery<{ gainers: Mover[]; losers: Mover[] }>({
    queryKey: ['movers', 'all'],
    queryFn: () => provider.getTopMovers?.('all') ?? Promise.resolve({ gainers: [], losers: [] }),
    staleTime: 60_000,
  })

  const upCount   = indices?.filter(i => i.changePct >= 0).length ?? 0
  const downCount = (indices?.length ?? 0) - upCount

  return (
    <div className="dashboard">
      {/* Page header */}
      <div className="dash-header">
        <div className="dash-title-row">
          <div>
            <h1 className="dash-title">African Markets</h1>
            <p className="dash-subtitle">
              {new Intl.DateTimeFormat('en-ZA', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              }).format(new Date())}
            </p>
          </div>
          {!loadingIdx && (
            <div className="dash-sentiment">
              <span className="sentiment-item up">
                <TrendingUp size={13} /> {upCount} up
              </span>
              <span className="sentiment-item down">
                <TrendingDown size={13} /> {downCount} down
              </span>
            </div>
          )}
          <NdebelePanel width={80} height={80} opacity={0.08} style={{ position: 'absolute', right: 0, top: 0 }} />
        </div>
      </div>

      {/* Global markets bar */}
      <GlobalMarketsBar />

      {/* Index cards strip */}
      <section className="dash-section">
        <div className="section-label">Indices</div>
        {loadingIdx ? (
          <SkeletonRow count={5} />
        ) : (
          <div className="idx-strip">
            {indices?.map(idx => <IndexCard key={idx.id} index={idx} />)}
          </div>
        )}
      </section>

      {/* Main 3-column grid */}
      <div className="dash-grid-3">

        {/* Col 1: Top Movers + Watchlist */}
        <div className="dash-col">
          <section className="dash-section">
            <div className="section-label">Top Movers</div>
            {loadingMovers
              ? <Skeleton height={180} />
              : ((movers?.gainers.length ?? 0) + (movers?.losers.length ?? 0)) > 0
                ? <TopMovers gainers={movers?.gainers ?? []} losers={movers?.losers ?? []} />
                : <DashEmpty message="Movers data not available" />}
          </section>

          <section className="dash-section">
            <div className="section-label">Watchlist</div>
            <WatchlistPanel />
          </section>

          <section className="dash-section">
            <div className="section-label">Exchanges</div>
            <div className="panel" style={{ padding: '0.5rem' }}>
              <AfricaMap />
            </div>
          </section>
        </div>

        {/* Col 2: Forex + Commodities + Yield Curve */}
        <div className="dash-col">
          <section className="dash-section">
            <div className="section-label">Forex Rates</div>
            {loadingFx ? <Skeleton height={180} /> : <ForexTable rates={forex ?? []} />}
          </section>

          <section className="dash-section">
            <div className="section-label">Commodities</div>
            {loadingComm
              ? <Skeleton height={200} />
              : (commodities?.length ?? 0) > 0
                ? <CommoditiesPanel items={commodities ?? []} />
                : <DashEmpty message="Commodity data unavailable" />}
          </section>

          <section className="dash-section">
            <div className="section-label">Yield Curve</div>
            <div className="panel" style={{ padding: '0.75rem' }}>
              <YieldCurvePanel />
            </div>
          </section>
        </div>

        {/* Col 3: News */}
        <div className="dash-col">
          <section className="dash-section">
            <div className="section-label">Latest News</div>
            {loadingNews
              ? <Skeleton height={400} />
              : (news?.length ?? 0) > 0
                ? <NewsFeed items={news ?? []} />
                : <DashEmpty message="Live news feed not yet connected" />}
          </section>
        </div>

      </div>

      {/* Cheat sheet */}
      <div className="cheat-wrap panel">
        <button className="cheat-toggle" onClick={() => setCheatOpen(v => !v)}>
          <span className="cheat-toggle-label">Quick Reference — Keyboard Shortcuts & Features</span>
          {cheatOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {cheatOpen && (
          <div className="cheat-body">
            <div className="cheat-col">
              <div className="cheat-section-title">Navigation (G + key)</div>
              {[
                ['G D', 'Dashboard'],
                ['G J', 'JSE Exchange'],
                ['G U', 'USE Exchange'],
                ['G N', 'NGX Exchange'],
                ['G F', 'Forex rates'],
                ['G W', 'Watchlist'],
                ['G P', 'Portfolio'],
                ['G A', 'Alerts'],
                ['G S', 'Screener'],
                ['G I', 'Macro indicators'],
                ['G M', 'Monitor mode'],
                ['?',   'Show all shortcuts'],
              ].map(([k, d]) => (
                <div key={k} className="cheat-row">
                  <kbd className="cheat-key">{k}</kbd>
                  <span className="cheat-desc">{d}</span>
                </div>
              ))}
            </div>
            <div className="cheat-col">
              <div className="cheat-section-title">Chart Indicators</div>
              {[
                ['MA20 / MA50', '20 & 50-day moving averages'],
                ['BB', 'Bollinger Bands (20-period)'],
                ['VWAP', 'Volume-weighted average price'],
                ['RSI', 'Relative Strength Index (14)'],
                ['MACD', 'Momentum oscillator (12/26/9)'],
                ['LR', 'Linear regression trendline'],
                ['FIB', 'Fibonacci retracement levels'],
                ['PAT', 'Candlestick pattern detection'],
                ['1D~', 'Simulated intraday view'],
              ].map(([k, d]) => (
                <div key={k} className="cheat-row">
                  <kbd className="cheat-key">{k}</kbd>
                  <span className="cheat-desc">{d}</span>
                </div>
              ))}
            </div>
            <div className="cheat-col">
              <div className="cheat-section-title">Live Data Sources</div>
              {[
                ['✅', 'JSE stocks — Yahoo Finance (.JO)'],
                ['✅', 'USE stocks — use.or.ug live feed'],
                ['✅', 'Commodities — Yahoo futures (GC=F, CL=F…)'],
                ['✅', 'Forex — open.er-api.com (9 pairs)'],
                ['✅', 'Macro — World Bank Open Data'],
                ['✅', 'News — Google News RSS'],
                ['✅', 'Yield curve — Yahoo (^IRX, ^TNX…)'],
                ['⚠', 'NGX / NSE / GSE — no free source yet'],
              ].map(([icon, d]) => (
                <div key={d} className="cheat-row cheat-row--data">
                  <span className="cheat-icon">{icon}</span>
                  <span className="cheat-desc">{d}</span>
                </div>
              ))}
            </div>
            <div className="cheat-col">
              <div className="cheat-section-title">Features</div>
              {[
                ['Screener', 'Filter & rank stocks across exchanges'],
                ['Compare', 'Normalized chart + correlation matrix'],
                ['Portfolio', 'P&L, allocation donut, risk metrics'],
                ['Monitor', 'Full-screen watchlist grid'],
                ['Alerts', 'Price & % change triggers'],
                ['Yield Curve', 'US Treasuries inversion detection'],
                ['Africa Map', 'Click exchanges on the map'],
                ['Macro', 'World Bank GDP, CPI, unemployment'],
                ['Export', 'CSV download on Exchange + Portfolio'],
              ].map(([k, d]) => (
                <div key={k} className="cheat-row">
                  <span className="cheat-feat">{k}</span>
                  <span className="cheat-desc">{d}</span>
                </div>
              ))}
            </div>

            {/* Easter Eggs — full-width secret row */}
            <div className="cheat-eggs">
            <div className="cheat-eggs-label">🥚 Secret Codes</div>
            <div className="cheat-eggs-row">
              {[
                { trigger: '↑↑↓↓←→←→BA', reveal: null,  name: 'Bloomberg Beast Mode',    desc: 'Konami code — activates a 30-day Bloomberg Terminal trial (fake)' },
                { trigger: 'G O',          reveal: null,  name: 'Oracle of Lagos',          desc: 'Summons the keeper of African market wisdom for a prophecy' },
                { trigger: 'G B',          reveal: null,  name: 'The Great Jollof War',     desc: 'Nigeria vs Ghana — the eternal rice debate, settled by markets' },
                { trigger: 'G L',          reveal: null,  name: 'SIMBA!',                   desc: 'Also fires automatically when a stock hits its 52-week high' },
                { trigger: '[???]',        reveal: 'G Z', name: 'What Would Dangote Do?',   desc: 'Wisdom from Africa\'s richest person, delivered with authority' },
                { trigger: '[???]',        reveal: 'G H', name: 'Hakuna Matata',             desc: 'Also fires automatically when your portfolio is down more than 5%' },
                { trigger: '[???]',        reveal: 'G R', name: 'Circle of Life',            desc: 'Also fires automatically when your portfolio hits a new all-time high' },
              ].map(({ trigger, reveal, name, desc }) => (
                <div key={name} className="cheat-egg-item">
                  <kbd className="cheat-egg-key" data-reveal={reveal ?? undefined}
                    style={reveal ? { cursor: 'help', position: 'relative' } : undefined}>
                    {trigger}
                    {reveal && <span className="cheat-egg-tooltip">{reveal}</span>}
                  </kbd>
                  <div className="cheat-egg-body">
                    <span className="cheat-egg-name">{name}</span>
                    <span className="cheat-egg-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .dashboard { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1400px; }

        .dash-header {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px;
          padding: 1rem 1.25rem;
          position: relative;
          overflow: hidden;
        }
        .dash-title-row { display: flex; align-items: center; gap: 1.5rem; }
        .dash-title     { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .dash-subtitle  { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .dash-sentiment {
          display: flex; gap: 0.75rem;
          margin-left: auto; padding-right: 1rem;
        }
        .sentiment-item {
          display: flex; align-items: center; gap: 0.25rem;
          font-size: 12px; font-family: var(--font-mono);
        }
        .sentiment-item.up   { color: var(--color-up); }
        .sentiment-item.down { color: var(--color-down); }

        .dash-section   { display: flex; flex-direction: column; gap: 0.5rem; }
        .section-label  {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600;
        }

        .idx-strip {
          display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.25rem;
        }
        .idx-strip > * { flex-shrink: 0; width: 160px; }

        /* 3-column main grid */
        .dash-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 1.5rem;
          align-items: start;
        }

        .dash-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (max-width: 1100px) {
          .dash-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .dash-grid-3 { grid-template-columns: 1fr; gap: 1rem; }
          .dash-title     { font-size: 16px; }
          .dash-subtitle  { display: none; }
          .dash-sentiment { gap: 0.5rem; }
          .dashboard      { gap: 1rem; }
        }

        /* ── Cheat sheet ── */
        .cheat-wrap { overflow: hidden; }
        .cheat-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.625rem 0.875rem;
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.06em;
          transition: color 0.15s; gap: 0.5rem;
        }
        .cheat-toggle:hover { color: var(--color-text-primary); }
        .cheat-toggle-label { flex: 1; text-align: left; }
        .cheat-body {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem; padding: 0.75rem 0.875rem 1rem;
          border-top: 1px solid var(--color-border-subtle);
        }
        @media (max-width: 1100px) { .cheat-body { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .cheat-body { grid-template-columns: 1fr; } }
        .cheat-section-title {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-row {
          display: flex; align-items: baseline; gap: 0.5rem;
          margin-bottom: 4px; font-size: 11px;
        }
        .cheat-row--data { align-items: center; }
        .cheat-key {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-gold); background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim); border-radius: 3px;
          padding: 1px 5px; white-space: nowrap; flex-shrink: 0; min-width: 40px;
          text-align: center;
        }
        .cheat-feat {
          font-family: var(--font-mono); font-size: 9px; font-weight: 700;
          color: var(--color-text-secondary); white-space: nowrap; flex-shrink: 0;
          min-width: 72px;
        }
        .cheat-icon { font-size: 11px; flex-shrink: 0; width: 16px; }
        .cheat-desc { color: var(--color-text-muted); font-size: 10px; line-height: 1.3; }

        /* Easter eggs row */
        .cheat-eggs {
          grid-column: 1 / -1;
          border-top: 1px solid var(--color-border-subtle);
          padding-top: 0.75rem; margin-top: 0.25rem;
        }
        .cheat-eggs-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-gold); font-weight: 700; margin-bottom: 0.5rem;
        }
        .cheat-eggs-row {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem;
        }
        .cheat-egg-item {
          display: flex; align-items: flex-start; gap: 0.5rem;
          background: var(--color-gold-subtle);
          border: 1px solid var(--color-gold-dim);
          border-radius: 4px; padding: 0.5rem 0.625rem;
        }
        .cheat-egg-key {
          font-family: var(--font-mono); font-size: 8px; font-weight: 700;
          color: var(--color-gold); white-space: nowrap; flex-shrink: 0;
          padding-top: 1px;
        }
        .cheat-egg-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .cheat-egg-name { font-size: 10px; font-weight: 700; color: var(--color-text-secondary); }
        .cheat-egg-desc { font-size: 9px; color: var(--color-text-muted); line-height: 1.4; }
        .cheat-egg-tooltip {
          display: none; position: absolute; bottom: calc(100% + 4px); left: 50%;
          transform: translateX(-50%);
          background: var(--color-bg-primary); border: 1px solid var(--color-gold);
          color: var(--color-gold); font-size: 9px; font-weight: 700;
          padding: 2px 7px; border-radius: 3px; white-space: nowrap;
          pointer-events: none; z-index: 10;
        }
        .cheat-egg-key:hover .cheat-egg-tooltip { display: block; }
      `}</style>
    </div>
  )
}

function DashEmpty({ message }: { message: string }) {
  return (
    <div style={{
      padding: '1.25rem 0.75rem',
      fontSize: '11px',
      color: 'var(--color-text-muted)',
      textAlign: 'center',
      border: '1px dashed var(--color-border)',
      borderRadius: 4,
    }}>
      {message}
    </div>
  )
}

function SkeletonRow({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} width={160} height={110} />
      ))}
    </div>
  )
}

function Skeleton({ width, height }: { width?: number; height?: number }) {
  return (
    <div
      style={{
        width: width ?? '100%', height,
        background: 'var(--color-bg-tertiary)',
        borderRadius: 4, animation: 'pulse 1.5s ease-in-out infinite',
      }}
    />
  )
}
