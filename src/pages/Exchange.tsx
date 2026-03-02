import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { provider } from '../services/api'
import type { IndexSnapshot, Quote } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import TopMovers from '../components/market/TopMovers'
import StocksTable from '../components/market/StocksTable'
import NdebelePanel from '../components/patterns/NdebelePanel'
import { ExchangeStatusBadge } from '../components/layout/MarketStatus'
import { getExchangeLocalTime } from '../utils/marketHours'

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
}

export default function Exchange() {
  const { id = '' } = useParams()
  const info = EXCHANGE_INFO[id]
  const localTime = getExchangeLocalTime(id)

  const { data: indices, isLoading: indicesLoading } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', id],
    queryFn:  () => provider.getIndices?.(id) ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  const { data: movers, isLoading: moversLoading } = useQuery({
    queryKey: ['movers', id],
    queryFn:  () => provider.getTopMovers?.(id) ?? Promise.resolve({ gainers: [], losers: [] }),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  const { data: stocks, isLoading: stocksLoading } = useQuery<Quote[]>({
    queryKey: ['stocks', id],
    queryFn:  () => provider.getExchangeStocks?.(id) ?? Promise.resolve([]),
    staleTime: 60_000,
    refetchInterval: 60_000,
  })

  if (!info) return (
    <div style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Exchange not found.</div>
  )

  const exIndices = (indices ?? []).filter(i => i.exchange.toLowerCase() === id)

  return (
    <div className="exchange-page">

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
          <div className="section-label">All Securities</div>
          <StocksTable exchangeId={id} quotes={stocks ?? []} isLoading={stocksLoading} />
        </section>
      </div>

      <style>{`
        .exchange-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; }

        .ex-header {
          padding: 1rem 1.25rem; position: relative; overflow: hidden;
          border-left: 3px solid transparent;
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

        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }

        .ex-cols {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .ex-stocks-col { min-width: 0; }

        @media (max-width: 900px) {
          .ex-cols { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
