import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutDashboard, Newspaper, DollarSign, Star, X, TrendingUp,
         Briefcase, Bell, Calendar, Building2 } from 'lucide-react'
import { useWatchlist } from '../../stores/watchlist'
import { useAlerts } from '../../stores/alerts'

const PAGE_ITEMS = [
  { label: 'Dashboard',  to: '/',          icon: LayoutDashboard, hint: 'Market overview',            group: 'Pages' },
  { label: 'News',       to: '/news',       icon: Newspaper,       hint: 'African markets news',       group: 'Pages' },
  { label: 'Forex',      to: '/forex',      icon: DollarSign,      hint: 'Currency exchange rates',    group: 'Pages' },
  { label: 'Watchlist',  to: '/watchlist',  icon: Star,            hint: 'Your tracked securities',   group: 'Pages' },
  { label: 'Portfolio',  to: '/portfolio',  icon: Briefcase,       hint: 'Holdings & P&L tracker',    group: 'Pages' },
  { label: 'Alerts',     to: '/alerts',     icon: Bell,            hint: 'Price alerts',              group: 'Pages' },
  { label: 'Calendar',   to: '/calendar',   icon: Calendar,        hint: 'Earnings & events calendar', group: 'Pages' },
]

const EXCHANGE_ITEMS = [
  { label: 'JSE',  name: 'Johannesburg Stock Exchange', to: '/exchange/jse',  flag: '🇿🇦', group: 'Exchanges' },
  { label: 'NGX',  name: 'Nigerian Exchange Group',     to: '/exchange/ngx',  flag: '🇳🇬', group: 'Exchanges' },
  { label: 'NSE',  name: 'Nairobi Securities Exchange', to: '/exchange/nse',  flag: '🇰🇪', group: 'Exchanges' },
  { label: 'GSE',  name: 'Ghana Stock Exchange',        to: '/exchange/gse',  flag: '🇬🇭', group: 'Exchanges' },
  { label: 'BRVM', name: 'Bourse Régionale UEMOA',      to: '/exchange/brvm', flag: '🇨🇮', group: 'Exchanges' },
  { label: 'ZSE',  name: 'Zimbabwe Stock Exchange',     to: '/exchange/zse',  flag: '🇿🇼', group: 'Exchanges' },
  { label: 'BSE',  name: 'Botswana Stock Exchange',     to: '/exchange/bse',  flag: '🇧🇼', group: 'Exchanges' },
  { label: 'LUSE', name: 'Lusaka Securities Exchange',  to: '/exchange/luse', flag: '🇿🇲', group: 'Exchanges' },
]

const STOCK_INDEX = [
  // JSE
  { symbol: 'NPN',       name: 'Naspers',                    exchange: 'jse'  },
  { symbol: 'PRX',       name: 'Prosus',                     exchange: 'jse'  },
  { symbol: 'MTN',       name: 'MTN Group',                  exchange: 'jse'  },
  { symbol: 'VOD',       name: 'Vodacom Group',              exchange: 'jse'  },
  { symbol: 'TKG',       name: 'Telkom SA',                  exchange: 'jse'  },
  { symbol: 'AGL',       name: 'Anglo American',             exchange: 'jse'  },
  { symbol: 'BHP',       name: 'BHP Group',                  exchange: 'jse'  },
  { symbol: 'AMS',       name: 'Anglo American Platinum',    exchange: 'jse'  },
  { symbol: 'IMP',       name: 'Impala Platinum',            exchange: 'jse'  },
  { symbol: 'SSW',       name: 'Sibanye-Stillwater',         exchange: 'jse'  },
  { symbol: 'GFI',       name: 'Gold Fields',                exchange: 'jse'  },
  { symbol: 'HAR',       name: 'Harmony Gold',               exchange: 'jse'  },
  { symbol: 'SOL',       name: 'Sasol',                      exchange: 'jse'  },
  { symbol: 'SBK',       name: 'Standard Bank Group',        exchange: 'jse'  },
  { symbol: 'FSR',       name: 'FirstRand',                  exchange: 'jse'  },
  { symbol: 'CPI',       name: 'Capitec Bank',               exchange: 'jse'  },
  { symbol: 'ABG',       name: 'Absa Group',                 exchange: 'jse'  },
  { symbol: 'NED',       name: 'Nedbank Group',              exchange: 'jse'  },
  { symbol: 'INL',       name: 'Investec',                   exchange: 'jse'  },
  { symbol: 'SLM',       name: 'Sanlam',                     exchange: 'jse'  },
  { symbol: 'DSY',       name: 'Discovery',                  exchange: 'jse'  },
  { symbol: 'OMU',       name: 'Old Mutual',                 exchange: 'jse'  },
  { symbol: 'MMH',       name: 'Momentum Metropolitan',      exchange: 'jse'  },
  { symbol: 'SHP',       name: 'Shoprite Holdings',          exchange: 'jse'  },
  { symbol: 'WHL',       name: 'Woolworths Holdings',        exchange: 'jse'  },
  { symbol: 'PIK',       name: 'Pick n Pay',                 exchange: 'jse'  },
  { symbol: 'MRP',       name: 'Mr Price Group',             exchange: 'jse'  },
  { symbol: 'TFG',       name: 'The Foschini Group',         exchange: 'jse'  },
  { symbol: 'CLS',       name: 'Clicks Group',               exchange: 'jse'  },
  { symbol: 'PPH',       name: 'Pepkor Holdings',            exchange: 'jse'  },
  { symbol: 'BID',       name: 'Bid Corporation',            exchange: 'jse'  },
  { symbol: 'REM',       name: 'Remgro',                     exchange: 'jse'  },
  { symbol: 'MNP',       name: 'Mondi',                      exchange: 'jse'  },
  { symbol: 'AVI',       name: 'AVI Limited',                exchange: 'jse'  },
  { symbol: 'LHC',       name: 'Life Healthcare',            exchange: 'jse'  },
  { symbol: 'SNT',       name: 'Santam',                     exchange: 'jse'  },
  { symbol: 'GRT',       name: 'Growthpoint Properties',     exchange: 'jse'  },
  { symbol: 'RDF',       name: 'Redefine Properties',        exchange: 'jse'  },
  // NGX
  { symbol: 'DANGCEM',   name: 'Dangote Cement',             exchange: 'ngx'  },
  { symbol: 'BUACEMENT', name: 'BUA Cement',                 exchange: 'ngx'  },
  { symbol: 'BUAFOODS',  name: 'BUA Foods',                  exchange: 'ngx'  },
  { symbol: 'GTCO',      name: 'Guaranty Trust Holding',     exchange: 'ngx'  },
  { symbol: 'ZENITH',    name: 'Zenith Bank',                exchange: 'ngx'  },
  { symbol: 'ACCESS',    name: 'Access Holdings',            exchange: 'ngx'  },
  { symbol: 'UBA',       name: 'United Bank for Africa',     exchange: 'ngx'  },
  { symbol: 'FBNH',      name: 'FBN Holdings',               exchange: 'ngx'  },
  { symbol: 'STANBIC',   name: 'Stanbic IBTC Holdings',      exchange: 'ngx'  },
  { symbol: 'FIDELITY',  name: 'Fidelity Bank Nigeria',      exchange: 'ngx'  },
  { symbol: 'FCMB',      name: 'FCMB Group',                 exchange: 'ngx'  },
  { symbol: 'MTNN',      name: 'MTN Nigeria',                exchange: 'ngx'  },
  { symbol: 'AIRTELAFRI',name: 'Airtel Africa',              exchange: 'ngx'  },
  { symbol: 'SEPLAT',    name: 'Seplat Energy',              exchange: 'ngx'  },
  { symbol: 'TOTAL',     name: 'TotalEnergies Nigeria',      exchange: 'ngx'  },
  { symbol: 'NESTLE',    name: 'Nestlé Nigeria',             exchange: 'ngx'  },
  { symbol: 'NB',        name: 'Nigerian Breweries',         exchange: 'ngx'  },
  { symbol: 'GUINNESS',  name: 'Guinness Nigeria',           exchange: 'ngx'  },
  { symbol: 'FLOURMILL', name: 'Flour Mills of Nigeria',     exchange: 'ngx'  },
  { symbol: 'DANGSUGAR', name: 'Dangote Sugar Refinery',     exchange: 'ngx'  },
  { symbol: 'PRESCO',    name: 'Presco Plc',                 exchange: 'ngx'  },
  { symbol: 'OKOMUOIL',  name: 'Okomu Oil Palm',            exchange: 'ngx'  },
  { symbol: 'JBERGER',   name: 'Julius Berger Nigeria',      exchange: 'ngx'  },
  { symbol: 'TRANSCORP', name: 'Transcorp Group',            exchange: 'ngx'  },
  // NSE
  { symbol: 'SCOM',      name: 'Safaricom',                  exchange: 'nse'  },
  { symbol: 'EQTY',      name: 'Equity Group Holdings',      exchange: 'nse'  },
  { symbol: 'KCB',       name: 'KCB Group',                  exchange: 'nse'  },
  { symbol: 'COOP',      name: 'Co-operative Bank',          exchange: 'nse'  },
  { symbol: 'NCBA',      name: 'NCBA Group',                 exchange: 'nse'  },
  { symbol: 'DTK',       name: 'Diamond Trust Bank',         exchange: 'nse'  },
  { symbol: 'ABSA',      name: 'ABSA Bank Kenya',            exchange: 'nse'  },
  { symbol: 'SBIC',      name: 'Stanbic Holdings Kenya',     exchange: 'nse'  },
  { symbol: 'SCBK',      name: 'Standard Chartered Kenya',   exchange: 'nse'  },
  { symbol: 'IMB',       name: 'I&M Group',                  exchange: 'nse'  },
  { symbol: 'HF',        name: 'HF Group',                   exchange: 'nse'  },
  { symbol: 'NBK',       name: 'National Bank of Kenya',     exchange: 'nse'  },
  { symbol: 'BRIT',      name: 'Britam Holdings',            exchange: 'nse'  },
  { symbol: 'JUB',       name: 'Jubilee Holdings',           exchange: 'nse'  },
  { symbol: 'CIC',       name: 'CIC Insurance Group',        exchange: 'nse'  },
  { symbol: 'SLAM',      name: 'Sanlam Kenya',               exchange: 'nse'  },
  { symbol: 'LIB',       name: 'Liberty Kenya Holdings',     exchange: 'nse'  },
  { symbol: 'CTUM',      name: 'Centum Investment',          exchange: 'nse'  },
  { symbol: 'KNRE',      name: 'Kenya Re',                   exchange: 'nse'  },
  { symbol: 'KPLC',      name: 'Kenya Power',                exchange: 'nse'  },
  { symbol: 'KEGN',      name: 'KenGen',                     exchange: 'nse'  },
  { symbol: 'TOTL',      name: 'TotalEnergies Kenya',        exchange: 'nse'  },
  { symbol: 'EABL',      name: 'East African Breweries',     exchange: 'nse'  },
  { symbol: 'BAT',       name: 'BAT Kenya',                  exchange: 'nse'  },
  { symbol: 'UNGA',      name: 'Unga Group',                 exchange: 'nse'  },
  { symbol: 'CGEN',      name: 'Car & General Kenya',        exchange: 'nse'  },
  { symbol: 'BAMB',      name: 'Bamburi Cement',             exchange: 'nse'  },
  { symbol: 'KQ',        name: 'Kenya Airways',              exchange: 'nse'  },
  { symbol: 'SASN',      name: 'Sasini',                     exchange: 'nse'  },
  { symbol: 'WTK',       name: 'Williamson Tea Kenya',       exchange: 'nse'  },
  { symbol: 'KAPC',      name: 'Kapchorua Tea',              exchange: 'nse'  },
  { symbol: 'KUKUZI',    name: 'Kakuzi',                     exchange: 'nse'  },
  { symbol: 'NMG',       name: 'Nation Media Group',         exchange: 'nse'  },
  { symbol: 'SGL',       name: 'Standard Group',             exchange: 'nse'  },
  { symbol: 'LHBL',      name: 'Longhorn Publishers',        exchange: 'nse'  },
  { symbol: 'SCAN',      name: 'Scangroup',                  exchange: 'nse'  },
  { symbol: 'ILAM',      name: 'Ilam Fahari I-REIT',         exchange: 'nse'  },
  { symbol: 'TPS',       name: 'TPS Eastern Africa',         exchange: 'nse'  },
  // GSE
  { symbol: 'GCB',       name: 'GCB Bank',                   exchange: 'gse'  },
  { symbol: 'EGH',       name: 'Ecobank Ghana',              exchange: 'gse'  },
  { symbol: 'SCB',       name: 'Standard Chartered Ghana',   exchange: 'gse'  },
  { symbol: 'MTN',       name: 'MTN Ghana',                  exchange: 'gse'  },
  { symbol: 'GGBL',      name: 'Guinness Ghana Breweries',   exchange: 'gse'  },
  { symbol: 'UNIL',      name: 'Unilever Ghana',             exchange: 'gse'  },
  { symbol: 'GOIL',      name: 'GOIL',                       exchange: 'gse'  },
  { symbol: 'BOPP',      name: 'Benso Oil Palm Plantation',  exchange: 'gse'  },
  { symbol: 'EGL',       name: 'Enterprise Group',           exchange: 'gse'  },
  { symbol: 'SOGEGH',    name: 'Société Générale Ghana',     exchange: 'gse'  },
  // BRVM
  { symbol: 'SNTS',      name: 'Sonatel Senegal',            exchange: 'brvm' },
  { symbol: 'ORAC',      name: 'Orange Côte d\'Ivoire',     exchange: 'brvm' },
  { symbol: 'ONTBF',     name: 'Onatel Burkina Faso',        exchange: 'brvm' },
  { symbol: 'ETIT',      name: 'Ecobank Transnational',      exchange: 'brvm' },
  { symbol: 'SGBCI',     name: 'Société Générale CI',        exchange: 'brvm' },
  { symbol: 'PALC',      name: 'Palm CI',                    exchange: 'brvm' },
  { symbol: 'SOLIBRA',   name: 'Solibra (Brasseries CI)',    exchange: 'brvm' },
  { symbol: 'BOABF',     name: 'Bank of Africa Burkina',     exchange: 'brvm' },
  { symbol: 'SIFCA',     name: 'SIFCA Group',                exchange: 'brvm' },
  { symbol: 'UNXC',      name: 'Unilever CI',                exchange: 'brvm' },
  // ZSE
  { symbol: 'DELTA',     name: 'Delta Corporation',          exchange: 'zse'  },
  { symbol: 'INNSCOR',   name: 'Innscor Africa',             exchange: 'zse'  },
  { symbol: 'ECONET',    name: 'Econet Wireless Zimbabwe',   exchange: 'zse'  },
  { symbol: 'CBZ',       name: 'CBZ Holdings',               exchange: 'zse'  },
  { symbol: 'SEEDCO',    name: 'SeedCo International',       exchange: 'zse'  },
  { symbol: 'HIPPO',     name: 'Hippo Valley Estates',       exchange: 'zse'  },
  { symbol: 'FBC',       name: 'FBC Holdings',               exchange: 'zse'  },
  { symbol: 'OK',        name: 'OK Zimbabwe',                exchange: 'zse'  },
  { symbol: 'MASIMBA',   name: 'Masimba Holdings',           exchange: 'zse'  },
  { symbol: 'PADENGA',   name: 'Padenga Holdings',           exchange: 'zse'  },
  // BSE
  { symbol: 'FNBB',      name: 'First National Bank Botswana', exchange: 'bse' },
  { symbol: 'STANBIC',   name: 'Stanbic Bank Botswana',      exchange: 'bse'  },
  { symbol: 'LETSHEGO',  name: 'Letshego Holdings',          exchange: 'bse'  },
  { symbol: 'SEFALANA',  name: 'Sefalana Holdings',          exchange: 'bse'  },
  { symbol: 'BIHL',      name: 'Botswana Insurance Holdings', exchange: 'bse' },
  { symbol: 'CHOBE',     name: 'Chobe Holdings',             exchange: 'bse'  },
  { symbol: 'SB',        name: 'Sechaba Brewery Holdings',   exchange: 'bse'  },
  { symbol: 'BTCL',      name: 'Botswana Telecommunications', exchange: 'bse' },
  { symbol: 'WILDERNESS', name: 'Wilderness Holdings',       exchange: 'bse'  },
  // LUSE
  { symbol: 'ZCCM',      name: 'ZCCM Investments',           exchange: 'luse' },
  { symbol: 'ZANACO',    name: 'Zanaco',                      exchange: 'luse' },
  { symbol: 'ZAMBEEF',   name: 'Zambeef Products',           exchange: 'luse' },
  { symbol: 'ZSUG',      name: 'Zambia Sugar',               exchange: 'luse' },
  { symbol: 'CEC',       name: 'Copperbelt Energy Corporation', exchange: 'luse' },
  { symbol: 'NATBREW',   name: 'National Breweries Zambia',  exchange: 'luse' },
  { symbol: 'LAFARGE',   name: 'Lafarge Zambia',             exchange: 'luse' },
]

type ResultItem = {
  key: string; label: string; hint: string; to: string; group: string
  icon?: React.ComponentType<{ size?: number }>; flag?: string; symbol?: string
}

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { symbols: watchlistSymbols, add: addToWatchlist } = useWatchlist()
  const { addAlert } = useAlerts()

  useEffect(() => { inputRef.current?.focus() }, [])
  useEffect(() => { setSelected(0) }, [query])

  const results: ResultItem[] = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) {
      return [
        ...PAGE_ITEMS.map(p => ({ key: p.to, label: p.label, hint: p.hint, to: p.to, group: p.group, icon: p.icon })),
        ...watchlistSymbols.slice(0, 5).map(sym => {
          const s = STOCK_INDEX.find(x => x.symbol === sym)
          return { key: `wl-${sym}`, label: sym, hint: s?.name ?? sym,
            to: `/exchange/${s?.exchange ?? 'jse'}/stock/${encodeURIComponent(sym)}`, group: 'Watchlist', icon: Star, symbol: sym }
        }),
      ]
    }
    const items: ResultItem[] = []
    PAGE_ITEMS.forEach(p => {
      if (p.label.toLowerCase().includes(q) || p.hint.toLowerCase().includes(q))
        items.push({ key: p.to, label: p.label, hint: p.hint, to: p.to, group: 'Pages', icon: p.icon })
    })
    EXCHANGE_ITEMS.forEach(e => {
      if (e.label.toLowerCase().includes(q) || e.name.toLowerCase().includes(q))
        items.push({ key: e.to, label: e.label, hint: e.name, to: e.to, group: 'Exchanges', flag: e.flag })
    })
    STOCK_INDEX.forEach(s => {
      if (s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
        items.push({ key: `stock-${s.exchange}-${s.symbol}`, label: s.symbol,
          hint: `${s.name} · ${s.exchange.toUpperCase()}`,
          to: `/exchange/${s.exchange}/stock/${encodeURIComponent(s.symbol)}`,
          group: 'Securities', icon: TrendingUp, symbol: s.symbol })
    })
    return items.slice(0, 20)
  }, [query, watchlistSymbols])

  const groups = useMemo(() => {
    const g = new Map<string, ResultItem[]>()
    for (const r of results) { const a = g.get(r.group) ?? []; a.push(r); g.set(r.group, a) }
    return g
  }, [results])

  function go(item: ResultItem) { navigate(item.to); onClose() }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) go(results[selected])
  }

  let flatIdx = 0

  return (
    <div className="cp-overlay" onClick={onClose}>
      <div className="cp-dialog" onClick={e => e.stopPropagation()} onKeyDown={onKey}>
        <div className="cp-input-row">
          <Search size={14} />
          <input ref={inputRef} className="cp-input"
            placeholder="Search securities, exchanges, pages…"
            value={query} onChange={e => setQuery(e.target.value)} />
          {query && <button className="cp-btn" onClick={() => setQuery('')}><X size={12} /></button>}
          <button className="cp-btn cp-esc" onClick={onClose}><kbd>esc</kbd></button>
        </div>

        <div className="cp-results">
          {results.length === 0 && <div className="cp-empty">No results for "{query}"</div>}
          {[...groups.entries()].map(([groupName, items]) => (
            <div key={groupName}>
              <div className="cp-group-label">{groupName}</div>
              {items.map(item => {
                const idx = flatIdx++
                const Icon = item.icon
                const isActive = idx === selected
                const inWl = item.symbol ? watchlistSymbols.includes(item.symbol) : false
                return (
                  <button key={item.key}
                    className={`cp-item ${isActive ? 'cp-item--active' : ''}`}
                    onClick={() => go(item)} onMouseEnter={() => setSelected(idx)}>
                    <span className="cp-item-icon">
                      {item.flag ? <span style={{ fontSize: 14 }}>{item.flag}</span>
                        : Icon ? <Icon size={13} /> : <Building2 size={13} />}
                    </span>
                    <span className="cp-item-label">{item.label}</span>
                    <span className="cp-item-hint">{item.hint}</span>
                    {item.symbol && isActive && (
                      <span className="cp-qa" onClick={e => e.stopPropagation()}>
                        <button className="cp-qa-btn" title={inWl ? 'In watchlist' : 'Watch'}
                          onClick={e => { e.stopPropagation(); if (!inWl) addToWatchlist(item.symbol!) }}>
                          <Star size={10} style={{ fill: inWl ? 'currentColor' : 'none' }} />
                        </button>
                        <button className="cp-qa-btn" title="Set alert"
                          onClick={e => {
                            e.stopPropagation()
                            addAlert({ symbol: item.symbol!, name: item.hint.split(' · ')[0],
                              condition: 'above', threshold: 0, currency: 'USD', enabled: false })
                            navigate('/alerts'); onClose()
                          }}>
                          <Bell size={10} />
                        </button>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="cp-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          {query && <span style={{ marginLeft: 'auto' }}>{results.length} results</span>}
        </div>
      </div>

      <style>{`
        .cp-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(2px);
          display: flex; align-items: flex-start; justify-content: center; padding-top: 12vh;
        }
        .cp-dialog {
          width: 580px; max-width: 90vw;
          background: var(--color-bg-elevated); border: 1px solid var(--color-border);
          border-radius: 8px; overflow: hidden; box-shadow: 0 32px 64px rgba(0,0,0,0.7);
        }
        .cp-input-row {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.875rem 1rem; border-bottom: 1px solid var(--color-border-subtle);
          color: var(--color-text-muted);
        }
        .cp-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--color-text-primary); font-size: 15px; font-family: var(--font-sans);
        }
        .cp-input::placeholder { color: var(--color-text-muted); }
        .cp-btn {
          background: none; border: none; cursor: pointer; color: var(--color-text-muted);
          padding: 2px; display: flex; align-items: center;
        }
        .cp-btn:hover { color: var(--color-text-primary); }
        .cp-esc kbd {
          font-family: var(--font-mono); font-size: 9px;
          background: var(--color-bg-secondary); padding: 2px 5px;
          border-radius: 3px; border: 1px solid var(--color-border);
        }
        .cp-results { max-height: 400px; overflow-y: auto; padding: 0.25rem 0; }
        .cp-empty { padding: 1.5rem; text-align: center; color: var(--color-text-muted); font-size: 12px; }
        .cp-group-label {
          padding: 0.5rem 1rem 0.2rem;
          font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 700;
        }
        .cp-item {
          display: flex; align-items: center; gap: 0.625rem;
          width: 100%; padding: 0.45rem 1rem;
          background: transparent; border: none; cursor: pointer;
          color: var(--color-text-secondary); font-size: 13px; text-align: left;
          transition: background 0.08s;
        }
        .cp-item--active { background: var(--color-bg-hover); color: var(--color-text-primary); }
        .cp-item-icon { flex-shrink: 0; width: 18px; display: flex; align-items: center; justify-content: center; }
        .cp-item-label { font-weight: 600; min-width: 60px; }
        .cp-item--active .cp-item-label { color: var(--color-gold); }
        .cp-item-hint { flex: 1; font-size: 11px; color: var(--color-text-muted); }
        .cp-qa { display: flex; gap: 2px; margin-left: auto; }
        .cp-qa-btn {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 3px;
          background: none; border: 1px solid var(--color-border);
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
        }
        .cp-qa-btn:hover { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }
        .cp-footer {
          display: flex; gap: 1rem; align-items: center;
          padding: 0.5rem 1rem; border-top: 1px solid var(--color-border-subtle);
          font-size: 11px; color: var(--color-text-muted);
        }
        .cp-footer kbd {
          font-family: var(--font-mono); font-size: 10px;
          background: var(--color-bg-secondary); padding: 1px 4px;
          border-radius: 3px; margin-right: 3px; border: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  )
}
