import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { provider } from '../services/api'
import type { IndexSnapshot } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import NdebelePanel from '../components/patterns/NdebelePanel'

const EXCHANGE_INFO: Record<string, { name: string; country: string; flag: string; currency: string; accentVar: string }> = {
  jse:  { name: 'Johannesburg Stock Exchange', country: 'South Africa', flag: '🇿🇦', currency: 'ZAR', accentVar: '--color-jse' },
  ngx:  { name: 'Nigerian Exchange Group',     country: 'Nigeria',      flag: '🇳🇬', currency: 'NGN', accentVar: '--color-ngx' },
  nse:  { name: 'Nairobi Securities Exchange', country: 'Kenya',        flag: '🇰🇪', currency: 'KES', accentVar: '--color-nse' },
  gse:  { name: 'Ghana Stock Exchange',        country: 'Ghana',        flag: '🇬🇭', currency: 'GHS', accentVar: '--color-gse' },
  brvm: { name: 'Bourse Régionale UEMOA',      country: 'West Africa',  flag: '🇨🇮', currency: 'XOF', accentVar: '--color-brvm' },
  zse:  { name: 'Zimbabwe Stock Exchange',     country: 'Zimbabwe',     flag: '🇿🇼', currency: 'USD', accentVar: '--color-zse' },
  bse:  { name: 'Botswana Stock Exchange',     country: 'Botswana',     flag: '🇧🇼', currency: 'BWP', accentVar: '--color-bse' },
  luse: { name: 'Lusaka Securities Exchange',  country: 'Zambia',       flag: '🇿🇲', currency: 'ZMW', accentVar: '--color-luse' },
}

export default function Exchange() {
  const { id = '' } = useParams()
  const info = EXCHANGE_INFO[id]

  const { data: indices, isLoading } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', id],
    queryFn: () => provider.getIndices?.(id) ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  const exIndices = indices?.filter(i => i.exchange.toLowerCase() === id) ?? []

  if (!info) return <div style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Exchange not found.</div>

  return (
    <div className="exchange-page">
      {/* Header with flag-tinted accent */}
      <div className="ex-header panel" style={{ borderLeftColor: `var(${info.accentVar})`, borderLeftWidth: 3 }}>
        <div className="ex-header-inner">
          <span className="ex-flag">{info.flag}</span>
          <div>
            <h1 className="ex-name">{info.name}</h1>
            <p className="ex-country">{info.country} · {info.currency}</p>
          </div>
        </div>
        <NdebelePanel width={80} height={80} color={`var(${info.accentVar})`} opacity={0.1}
          style={{ position: 'absolute', right: 0, top: 0 }} />
      </div>

      {/* Indices */}
      <section>
        <div className="section-label">Indices</div>
        {isLoading ? (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</p>
        ) : exIndices.length > 0 ? (
          <div className="idx-strip">
            {exIndices.map(idx => <IndexCard key={idx.id} index={idx} />)}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
            No index data available yet for {info.name}.
          </p>
        )}
      </section>

      <style>{`
        .exchange-page { display: flex; flex-direction: column; gap: 1.5rem; max-width: 1200px; }
        .ex-header {
          padding: 1rem 1.25rem; position: relative; overflow: hidden;
          border-left-style: solid;
        }
        .ex-header-inner { display: flex; align-items: center; gap: 1rem; }
        .ex-flag   { font-size: 32px; line-height: 1; }
        .ex-name   { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .ex-country { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .idx-strip { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .idx-strip > * { width: 160px; }
      `}</style>
    </div>
  )
}
