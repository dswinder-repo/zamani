import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Bookmark, BookmarkCheck, X } from 'lucide-react'
import { provider, getUSEQuotes, getUSEIndices, getUSEMovers } from '../services/api'
import type { IndexSnapshot, Quote } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import TopMovers from '../components/market/TopMovers'
import StocksTable from '../components/market/StocksTable'
import SectorHeatmap from '../components/market/SectorHeatmap'
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
  const { presets, savePreset, deletePreset } = useScreener()
  const exchangePresets = presets.filter(p => p.exchange === id)

  const isUSE = id === 'use'

  const { data: indices, isLoading: indicesLoading } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', id],
    queryFn:  isUSE ? () => getUSEIndices() : () => provider.getIndices?.(id) ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  const { data: movers, isLoading: moversLoading } = useQuery({
    queryKey: ['movers', id],
    queryFn:  isUSE ? () => getUSEMovers() : () => provider.getTopMovers?.(id) ?? Promise.resolve({ gainers: [], losers: [] }),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  const { data: stocks, isLoading: stocksLoading } = useQuery<Quote[]>({
    queryKey: ['stocks', id],
    queryFn:  isUSE ? () => getUSEQuotes() : () => provider.getExchangeStocks?.(id) ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  // Sectors present on this exchange
  const availableSectors = useMemo(() => {
    if (!stocks?.length) return []
    const set = new Set(stocks.map(s => getSector(id, s.symbol)))
    return SECTOR_ORDER.filter(s => set.has(s))
  }, [stocks, id])

  // Filtered stocks based on active sector
  const filteredStocks = useMemo(() => {
    if (!activeSector || !stocks) return stocks ?? []
    return stocks.filter(q => getSector(id, q.symbol) === activeSector)
  }, [stocks, activeSector, id])

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
          <p className="ex-loading">No index data for {info.name} yet.</p>
        )}
      </section>

      {/* Sector heatmap */}
      {(stocks ?? []).length > 0 && (
        <section>
          <SectorHeatmap
            exchangeId={id}
            quotes={stocks ?? []}
            activeSector={activeSector}
            onSectorClick={setActiveSector}
          />
        </section>
      )}

      {/* Sector filter tabs */}
      {availableSectors.length > 0 && (
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

      {/* Two columns: Movers + Stocks table */}
      <div className="ex-cols">
        <section>
          <div className="section-label">Top Movers</div>
          {moversLoading
            ? <p className="ex-loading">Loading…</p>
            : <TopMovers gainers={movers?.gainers ?? []} losers={movers?.losers ?? []} />
          }
        </section>

        <section className="ex-stocks-col">
          <div className="section-label">
            {activeSector ? `${activeSector} Securities` : 'All Securities'}
          </div>
          <StocksTable
            exchangeId={id}
            quotes={filteredStocks}
            isLoading={stocksLoading}
            activeSector={activeSector}
          />
        </section>
      </div>

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
      `}</style>
    </div>
  )
}
