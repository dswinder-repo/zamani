import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Bookmark, BookmarkCheck, X, Download } from 'lucide-react'
import { provider, getUSEQuotes, getUSEIndices, getUSEMovers, YAHOO_SUPPORTED_EXCHANGES, EODHD_SUPPORTED_EXCHANGES, eodhdProvider } from '../services/api'
import { downloadCSV } from '../utils/csvExport'
import type { IndexSnapshot, Quote } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import TopMovers from '../components/market/TopMovers'
import StocksTable from '../components/market/StocksTable'
import SectorHeatmap from '../components/market/SectorHeatmap'
import SectorTreemap from '../components/market/SectorTreemap'
import NdebelePanel from '../components/patterns/NdebelePanel'
import { ExchangeStatusBadge } from '../components/layout/MarketStatus'
import { getExchangeLocalTime } from '../utils/marketHours'
import { getSector, SECTOR_ORDER } from '../data/sectors'
import { useScreener } from '../stores/screener'

const EXCHANGE_INFO: Record<string, {
  name: string; country: string; flag: string
  currency: string; accentVar: string; founded?: string; mic?: string
}> = {
  jse:  { name: 'Johannesburg Stock Exchange', country: 'South Africa', flag: '🇿🇦', currency: 'ZAR', accentVar: '--color-jse',  founded: '1887', mic: 'XJSE' },
  ngx:  { name: 'Nigerian Exchange Group',     country: 'Nigeria',      flag: '🇳🇬', currency: 'NGN', accentVar: '--color-ngx',  founded: '1960', mic: 'XLAG' },
  nse:  { name: 'Nairobi Securities Exchange', country: 'Kenya',        flag: '🇰🇪', currency: 'KES', accentVar: '--color-nse',  founded: '1954', mic: 'XNAI' },
  gse:  { name: 'Ghana Stock Exchange',        country: 'Ghana',        flag: '🇬🇭', currency: 'GHS', accentVar: '--color-gse',  founded: '1989', mic: 'XGHA' },
  brvm: { name: 'Bourse Régionale UEMOA',      country: 'West Africa',  flag: '🇨🇮', currency: 'XOF', accentVar: '--color-brvm', founded: '1998', mic: 'XBRV' },
  zse:  { name: 'Zimbabwe Stock Exchange',     country: 'Zimbabwe',     flag: '🇿🇼', currency: 'USD', accentVar: '--color-zse',  founded: '1896', mic: 'XZIM' },
  bse:  { name: 'Botswana Stock Exchange',     country: 'Botswana',     flag: '🇧🇼', currency: 'BWP', accentVar: '--color-bse',  founded: '1989', mic: 'XBOT' },
  luse: { name: 'Lusaka Securities Exchange',  country: 'Zambia',       flag: '🇿🇲', currency: 'ZMW', accentVar: '--color-luse', founded: '1994', mic: 'XLUS' },
  use:  { name: 'Uganda Securities Exchange',  country: 'Uganda',       flag: '🇺🇬', currency: 'UGX', accentVar: '--color-use',  founded: '1997', mic: 'XUGA' },
}

export default function Exchange() {
  const { id = '' } = useParams()
  const info = EXCHANGE_INFO[id]
  const localTime = getExchangeLocalTime(id)

  const [activeSector, setActiveSector] = useState<string | null>(null)
  const [screenerFilter, setScreenerFilter] = useState<'all' | 'gainers' | 'losers' | 'active'>('all')
  const { presets, savePreset, deletePreset } = useScreener()
  const exchangePresets = presets.filter(p => p.exchange === id)

  const isUSE   = id === 'use'
  const isEODHD = EODHD_SUPPORTED_EXCHANGES.includes(id)
  const isLive  = YAHOO_SUPPORTED_EXCHANGES.includes(id) || isEODHD

  // EOD data doesn't change more than once per day; poll hourly at most
  const staleMs = isEODHD ? 3_600_000 : 60_000

  const { data: indices, isLoading: indicesLoading } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', id],
    queryFn:  isUSE    ? () => getUSEIndices()
            : isEODHD  ? () => eodhdProvider.getIndices!(id)
            :             () => provider.getIndices?.(id) ?? Promise.resolve([]),
    staleTime: staleMs,
    refetchInterval: staleMs,
  })

  const { data: movers, isLoading: moversLoading } = useQuery({
    queryKey: ['movers', id],
    queryFn:  isUSE    ? () => getUSEMovers()
            : isEODHD  ? () => eodhdProvider.getTopMovers!(id)
            :             () => provider.getTopMovers?.(id) ?? Promise.resolve({ gainers: [], losers: [] }),
    staleTime: staleMs,
    refetchInterval: staleMs,
  })

  const { data: stocks, isLoading: stocksLoading } = useQuery<Quote[]>({
    queryKey: ['stocks', id],
    queryFn:  isUSE    ? () => getUSEQuotes()
            : isEODHD  ? () => eodhdProvider.getExchangeStocks!(id)
            :             () => provider.getExchangeStocks?.(id) ?? Promise.resolve([]),
    staleTime: staleMs,
    refetchInterval: staleMs,
  })

  // Sectors present on this exchange
  const availableSectors = useMemo(() => {
    if (!stocks?.length) return []
    const set = new Set(stocks.map(s => getSector(id, s.symbol)))
    return SECTOR_ORDER.filter(s => set.has(s))
  }, [stocks, id])

  // Filtered stocks based on active sector + screener filter
  const filteredStocks = useMemo(() => {
    let list = stocks ?? []
    if (activeSector) list = list.filter(q => getSector(id, q.symbol) === activeSector)
    if (screenerFilter === 'gainers') list = list.filter(q => q.changePct > 0)
    if (screenerFilter === 'losers')  list = list.filter(q => q.changePct < 0)
    if (screenerFilter === 'active')  list = [...list].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0)).slice(0, 15)
    return list
  }, [stocks, activeSector, screenerFilter, id])

  // Hot movers (|changePct| >= 2%)
  const hotMovers = useMemo(() => {
    if (!stocks?.length) return []
    return [...stocks]
      .filter(s => Math.abs(s.changePct) >= 2)
      .sort((a, b) => Math.abs(b.changePct) - Math.abs(a.changePct))
      .slice(0, 12)
  }, [stocks])

  // Market breadth stats
  const breadth = useMemo(() => {
    if (!stocks?.length) return null
    const advancing = stocks.filter(q => q.changePct > 0).length
    const declining  = stocks.filter(q => q.changePct < 0).length
    const unchanged  = stocks.length - advancing - declining
    const upVol   = stocks.filter(q => q.changePct > 0).reduce((s, q) => s + (q.volume ?? 0), 0)
    const downVol = stocks.filter(q => q.changePct < 0).reduce((s, q) => s + (q.volume ?? 0), 0)
    return { advancing, declining, unchanged, upVol, downVol, total: stocks.length }
  }, [stocks])

  if (!info) return (
    <div style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Exchange not found.</div>
  )

  const exIndices = (indices ?? []).filter(i => i.exchange.toLowerCase() === id)

  // Exchange accent — override CSS gold vars within this subtree
  const accentStyle = {
    '--color-gold':        `var(${info.accentVar})`,
    '--color-gold-dim':    `color-mix(in srgb, var(${info.accentVar}) 55%, #000)`,
    '--color-gold-bright': `color-mix(in srgb, var(${info.accentVar}) 140%, #fff)`,
    '--color-gold-subtle': `color-mix(in srgb, var(${info.accentVar}) 10%, transparent)`,
  } as React.CSSProperties

  function saveCurrentFilter() {
    if (!activeSector) return
    const name = `${id.toUpperCase()} — ${activeSector}`
    savePreset({ name, exchange: id, sectors: [activeSector] })
  }

  return (
    <div className="exchange-page" style={accentStyle}>

      {/* Header */}
      <div className="ex-header panel" style={{ borderLeftColor: `var(${info.accentVar})` }}>
        <div className="ex-header-left">
          <span className="ex-flag">{info.flag}</span>
          <div>
            <div className="ex-title-row">
              <h1 className="ex-name">{info.name}</h1>
              <ExchangeStatusBadge id={id} />
            </div>
            <p className="ex-meta">
              {info.country}
              {info.mic     && <><span className="ex-sep">·</span><span>{info.mic}</span></>}
              {info.founded && <><span className="ex-sep">·</span><span>Est. {info.founded}</span></>}
              <span className="ex-sep">·</span>
              <span className="num">{localTime} local</span>
            </p>
          </div>
        </div>
        <NdebelePanel width={80} height={80} color={`var(${info.accentVar})`} opacity={0.08}
          style={{ position: 'absolute', right: 0, top: 0 }} />
      </div>

      {/* Indices */}
      <section>
        <div className="section-label">Indices</div>
        {indicesLoading ? (
          <p className="ex-loading">Loading…</p>
        ) : exIndices.length > 0 ? (
          <div className="idx-strip">
            {exIndices.map(idx => <IndexCard key={idx.id} index={idx} />)}
          </div>
        ) : (
          <p className="ex-loading">
            {isLive
              ? `No index data available for ${info.name}.`
              : 'Live index data for this exchange is not yet connected.'}
          </p>
        )}
      </section>

      {/* Sector heatmap + treemap */}
      {isLive && (stocks ?? []).length > 0 && (
        <section>
          <SectorHeatmap
            exchangeId={id}
            quotes={stocks ?? []}
            activeSector={activeSector}
            onSectorClick={setActiveSector}
          />
        </section>
      )}
      {isLive && (stocks ?? []).length > 0 && id === 'jse' && (
        <section>
          <div className="section-label">Sector Treemap</div>
          <div className="panel" style={{ padding: '0.75rem' }}>
            <SectorTreemap exchangeId={id} quotes={stocks ?? []} />
          </div>
        </section>
      )}

      {/* Sector filter tabs */}
      {isLive && availableSectors.length > 0 && (
        <div className="ex-sector-filters">
          <button
            className={`ex-sector-btn ${!activeSector ? 'active' : ''}`}
            onClick={() => setActiveSector(null)}
          >
            All
          </button>
          {availableSectors.map(s => (
            <button
              key={s}
              className={`ex-sector-btn ${activeSector === s ? 'active' : ''}`}
              onClick={() => setActiveSector(prev => prev === s ? null : s)}
            >
              {s}
            </button>
          ))}

          {/* Screener preset controls */}
          {activeSector && (
            <button
              className="ex-save-preset-btn"
              onClick={saveCurrentFilter}
              title={`Save "${activeSector}" filter as preset`}
            >
              <Bookmark size={11} /> Save filter
            </button>
          )}

          {exchangePresets.length > 0 && (
            <div className="ex-presets">
              {exchangePresets.map(p => (
                <span
                  key={p.id}
                  className={`ex-preset-chip ${activeSector === p.sectors[0] ? 'active' : ''}`}
                  onClick={() => setActiveSector(prev => prev === p.sectors[0] ? null : p.sectors[0])}
                >
                  <BookmarkCheck size={9} />
                  {p.name.split('—')[1]?.trim() ?? p.name}
                  <button
                    className="ex-preset-del"
                    onClick={e => { e.stopPropagation(); deletePreset(p.id) }}
                    aria-label="Remove preset"
                  >
                    <X size={8} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* What's Moving banner — live exchanges only */}
      {isLive && hotMovers.length > 0 && !stocksLoading && (
        <div className="ex-moving-wrap">
          <span className="ex-moving-label">Moving</span>
          <div className="ex-moving-strip">
            {hotMovers.map(s => {
              const up = s.changePct >= 0
              return (
                <span key={s.symbol} className={`ex-moving-chip ${up ? 'up' : 'down'}`}>
                  <span className="ex-moving-sym">{s.symbol}</span>
                  <span className="ex-moving-pct">{up ? '+' : ''}{s.changePct.toFixed(2)}%</span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Market Breadth panel — live exchanges only */}
      {isLive && breadth && !stocksLoading && (
        <MarketBreadthPanel breadth={breadth} />
      )}

      {/* Two columns: Movers + Stocks table — only for live exchanges */}
      {isLive ? (
        <div className="ex-cols">
          <section>
            <div className="section-label">Top Movers</div>
            {moversLoading
              ? <p className="ex-loading">Loading…</p>
              : <TopMovers gainers={movers?.gainers ?? []} losers={movers?.losers ?? []} />
            }
          </section>

          <section className="ex-stocks-col">
            <div className="ex-stocks-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="section-label">
                  {activeSector ? `${activeSector} Securities` : 'All Securities'}
                </div>
                {isEODHD && <span className="ex-eod-badge">End-of-day</span>}
              </div>
              <div className="ex-screener-tabs">
                {(['all', 'gainers', 'losers', 'active'] as const).map(f => (
                  <button
                    key={f}
                    className={`ex-screener-tab ${screenerFilter === f ? 'active' : ''}`}
                    onClick={() => setScreenerFilter(f)}
                  >
                    {f === 'active' ? 'Most Active' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
                {filteredStocks.length > 0 && (
                  <button
                    className="ex-screener-tab"
                    title="Export CSV"
                    onClick={() => {
                      const rows: (string | number)[][] = [
                        ['Symbol', 'Name', 'Price', 'Change', 'Change %', 'Volume', 'Currency'],
                        ...filteredStocks.map(s => [s.symbol, s.name, s.price, s.change, s.changePct, s.volume ?? '', s.currency]),
                      ]
                      downloadCSV(rows, `${id.toUpperCase()}-stocks.csv`)
                    }}
                  >
                    <Download size={10} />
                  </button>
                )}
              </div>
            </div>
            <StocksTable
              exchangeId={id}
              quotes={filteredStocks}
              isLoading={stocksLoading}
              activeSector={activeSector}
            />
          </section>
        </div>
      ) : (
        <ExchangeUnavailable name={info.name} accentVar={info.accentVar} />
      )}

      <style>{`
        .exchange-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; }

        /* A 2px flag-colour gradient line runs across the very top of the header */
        .ex-header::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: var(--color-gold);
          opacity: 0.8;
        }

        .ex-header {
          padding: 1rem 1.25rem; position: relative; overflow: hidden;
          border-left: 3px solid transparent;
          background: color-mix(in srgb, var(--color-gold) 4%, var(--color-bg-secondary));
        }
        .ex-header-left { display: flex; align-items: center; gap: 1rem; }
        .ex-flag   { font-size: 32px; line-height: 1; flex-shrink: 0; }
        .ex-title-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
        .ex-name   { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .ex-meta {
          margin: 0; font-size: 11px; color: var(--color-text-muted);
          display: flex; align-items: center; gap: 0.25rem; flex-wrap: wrap;
        }
        .ex-sep { opacity: 0.4; }

        .idx-strip { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .idx-strip > * { min-width: 160px; }

        .ex-loading { font-size: 12px; color: var(--color-text-muted); margin: 0; }

        /* Section labels on exchange pages get a country-colour left tick */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
          display: flex; align-items: center; gap: 0.375rem;
        }
        .section-label::before {
          content: '';
          display: inline-block; width: 2px; height: 10px;
          background: var(--color-gold); border-radius: 1px; flex-shrink: 0;
        }

        /* Sector filter tabs */
        .ex-sector-filters {
          display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
        }
        .ex-sector-btn {
          padding: 3px 9px; border-radius: 12px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
          white-space: nowrap;
        }
        .ex-sector-btn:hover  { color: var(--color-text-primary); border-color: var(--color-text-muted); }
        .ex-sector-btn.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .ex-save-preset-btn {
          display: flex; align-items: center; gap: 4px;
          padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-gold-dim); color: var(--color-gold);
          background: var(--color-gold-subtle); cursor: pointer;
          margin-left: 4px; transition: all 0.1s;
        }
        .ex-save-preset-btn:hover { background: var(--color-gold-dim); color: var(--color-bg-primary); }

        .ex-presets {
          display: flex; align-items: center; gap: 4px;
          border-left: 1px solid var(--color-border-subtle); padding-left: 8px; margin-left: 4px;
        }
        .ex-preset-chip {
          display: inline-flex; align-items: center; gap: 3px;
          padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); color: var(--color-text-muted);
          background: var(--color-bg-elevated); cursor: pointer; transition: all 0.1s;
        }
        .ex-preset-chip:hover, .ex-preset-chip.active {
          color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle);
        }
        .ex-preset-del {
          background: none; border: none; cursor: pointer; color: inherit;
          display: flex; align-items: center; padding: 0; margin-left: 1px;
          opacity: 0.6; transition: opacity 0.1s;
        }
        .ex-preset-del:hover { opacity: 1; }

        /* What's Moving banner */
        .ex-moving-wrap {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; overflow: hidden;
        }
        .ex-moving-label {
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          font-weight: 700; color: var(--color-text-muted);
          white-space: nowrap; flex-shrink: 0;
        }
        .ex-moving-strip {
          display: flex; gap: 0.375rem; overflow-x: auto;
          scrollbar-width: none; -ms-overflow-style: none;
        }
        .ex-moving-strip::-webkit-scrollbar { display: none; }
        .ex-moving-chip {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 2px 6px; border-radius: 3px;
          font-family: var(--font-mono); font-size: 10px; white-space: nowrap;
          flex-shrink: 0;
        }
        .ex-moving-chip.up   { background: var(--color-up-subtle);   border: 1px solid rgba(74,222,128,0.2); }
        .ex-moving-chip.down { background: var(--color-down-subtle); border: 1px solid rgba(248,113,113,0.2); }
        .ex-moving-sym  { font-weight: 700; color: var(--color-text-primary); }
        .ex-moving-pct.up, .ex-moving-chip.up .ex-moving-pct   { color: var(--color-up); }
        .ex-moving-chip.up .ex-moving-pct   { color: var(--color-up); }
        .ex-moving-chip.down .ex-moving-pct { color: var(--color-down); }

        /* Market breadth */
        .ex-breadth {
          display: flex; align-items: center; gap: 1rem;
          padding: 0.625rem 0.875rem;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; flex-wrap: wrap;
        }
        .ex-breadth-stat {
          display: flex; align-items: center; gap: 0.375rem;
          font-size: 11px; font-family: var(--font-mono);
        }
        .ex-breadth-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }
        .ex-breadth-bar-wrap {
          flex: 1; min-width: 120px;
          height: 6px; background: var(--color-bg-tertiary);
          border-radius: 3px; overflow: hidden; display: flex;
        }
        .ex-breadth-seg { height: 100%; transition: width 0.3s; }
        .ex-breadth-label {
          font-size: 10px; color: var(--color-text-muted);
          letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600;
        }

        /* Screener tabs */
        .ex-stocks-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;
        }
        .ex-stocks-header .section-label { margin-bottom: 0; }
        .ex-screener-tabs { display: flex; gap: 2px; }
        .ex-screener-tab {
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          border: 1px solid transparent; border-radius: 3px;
          background: none; color: var(--color-text-muted); cursor: pointer;
          transition: all 0.1s;
        }
        .ex-screener-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-border); }
        .ex-screener-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .ex-cols {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .ex-stocks-col { min-width: 0; }

        @media (max-width: 900px) {
          .ex-cols { grid-template-columns: 1fr; gap: 1rem; }
          .exchange-page { gap: 1rem; }
          .ex-name { font-size: 15px; }
          .ex-flag { font-size: 24px; }
        }

        @media (max-width: 560px) {
          .ex-sector-filters { gap: 3px; }
          .ex-sector-btn { padding: 2px 7px; font-size: 9px; }
          .hm-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); }
        }

        /* EOD data freshness badge */
        .ex-eod-badge {
          font-size: 9px; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 1px 5px; border-radius: 3px;
          background: color-mix(in srgb, var(--color-gold) 12%, transparent);
          color: var(--color-gold); border: 1px solid var(--color-gold-dim);
        }

        /* Unavailable exchange panel */
        .ex-unavailable {
          padding: 2rem 1.5rem;
          text-align: center;
          border: 1px dashed var(--color-border);
          background: var(--color-bg-secondary);
        }
        .ex-unavail-title {
          font-size: 14px; font-weight: 600;
          color: var(--color-text-secondary); margin: 0 0 0.5rem;
        }
        .ex-unavail-body {
          font-size: 12px; color: var(--color-text-muted); margin: 0;
          max-width: 420px; margin: 0 auto; line-height: 1.6;
        }
      `}</style>
    </div>
  )
}

interface BreadthData {
  advancing: number; declining: number; unchanged: number
  upVol: number; downVol: number; total: number
}

function MarketBreadthPanel({ breadth }: { breadth: BreadthData }) {
  const advPct  = (breadth.advancing / breadth.total) * 100
  const decPct  = (breadth.declining / breadth.total) * 100
  const unchPct = 100 - advPct - decPct
  const totalVol = breadth.upVol + breadth.downVol
  const upVolPct = totalVol ? (breadth.upVol / totalVol) * 100 : 50

  return (
    <div className="ex-breadth">
      <span className="ex-breadth-label">Breadth</span>
      <div className="ex-breadth-stat">
        <span className="ex-breadth-dot" style={{ background: 'var(--color-up)' }} />
        <span style={{ color: 'var(--color-up)' }}>{breadth.advancing}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>adv</span>
      </div>
      <div className="ex-breadth-stat">
        <span className="ex-breadth-dot" style={{ background: 'var(--color-down)' }} />
        <span style={{ color: 'var(--color-down)' }}>{breadth.declining}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>dec</span>
      </div>
      {breadth.unchanged > 0 && (
        <div className="ex-breadth-stat">
          <span className="ex-breadth-dot" style={{ background: 'var(--color-text-muted)' }} />
          <span style={{ color: 'var(--color-text-muted)' }}>{breadth.unchanged} unch</span>
        </div>
      )}
      <div className="ex-breadth-bar-wrap" title={`${advPct.toFixed(0)}% advancing`}>
        <div className="ex-breadth-seg" style={{ width: `${advPct}%`, background: 'var(--color-up)', opacity: 0.7 }} />
        <div className="ex-breadth-seg" style={{ width: `${unchPct}%`, background: 'var(--color-border)' }} />
        <div className="ex-breadth-seg" style={{ width: `${decPct}%`, background: 'var(--color-down)', opacity: 0.7 }} />
      </div>
      {totalVol > 0 && (
        <>
          <span className="ex-breadth-label" style={{ marginLeft: 4 }}>Vol</span>
          <div className="ex-breadth-bar-wrap" title={`${upVolPct.toFixed(0)}% up-volume`}
            style={{ maxWidth: 80 }}>
            <div className="ex-breadth-seg" style={{ width: `${upVolPct}%`, background: 'var(--color-up)', opacity: 0.7 }} />
            <div className="ex-breadth-seg" style={{ width: `${100 - upVolPct}%`, background: 'var(--color-down)', opacity: 0.7 }} />
          </div>
        </>
      )}
    </div>
  )
}

function ExchangeUnavailable({ name, accentVar }: { name: string; accentVar: string }) {
  return (
    <div
      className="ex-unavailable"
      style={{ borderColor: `color-mix(in srgb, var(${accentVar}) 30%, var(--color-border))` }}
    >
      <p className="ex-unavail-title">Live market data for {name} is not yet available.</p>
      <p className="ex-unavail-body">
        We're working to connect a live data feed for this exchange. Check back soon.
      </p>
    </div>
  )
}
