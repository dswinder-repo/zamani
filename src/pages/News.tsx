import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { provider } from '../services/api'
import type { NewsItem } from '../services/api'

const EXCHANGE_FILTERS = ['All', 'JSE', 'NGX', 'NSE', 'GSE', 'BRVM', 'ZSE', 'BSE', 'LUSE']

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a href={item.url} target="_blank" rel="noopener" className="news-card">
      <div className="nc-meta">
        <span className="nc-source">{item.source}</span>
        {item.exchange && <span className="nc-tag">{item.exchange}</span>}
        {(item.symbols ?? []).slice(0, 2).map(s => (
          <span key={s} className="nc-sym">{s.split('.')[0]}</span>
        ))}
        <span className="nc-time">{timeAgo(item.publishedAt)}</span>
      </div>
      <div className="nc-headline">{item.headline}</div>
      {item.summary && <div className="nc-summary">{item.summary}</div>}
    </a>
  )
}

export default function News() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const { data: news, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['news', 'all'],
    queryFn:  () => provider.getNews?.('africa markets') ?? Promise.resolve([]),
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  })

  const filtered = (news ?? []).filter(item => {
    const exchangeMatch = filter === 'All' || item.exchange === filter || (item.symbols ?? []).some(s => s.includes(filter))
    const searchMatch   = !search || item.headline.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase())
    return exchangeMatch && searchMatch
  })

  return (
    <div className="news-page">
      <div>
        <h1 className="news-h1">Market News</h1>
        <p className="news-sub">African markets headlines — auto-refreshes every 5 minutes</p>
      </div>

      <div className="news-controls">
        <div className="news-filters">
          {EXCHANGE_FILTERS.map(ex => (
            <button
              key={ex}
              className={`nf-tab ${filter === ex ? 'active' : ''}`}
              onClick={() => setFilter(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
        <div className="news-search-wrap">
          <Search size={11} className="news-search-icon" />
          <input
            className="news-search-input"
            placeholder="Search headlines…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="news-search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
      </div>

      <div className="news-count">
        {isLoading ? 'Loading…' : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
      </div>

      {!isLoading && filtered.length === 0 ? (
        <div className="news-empty panel">No news for {filter} right now.</div>
      ) : (
        <div className="news-grid">
          {filtered.map(item => <NewsCard key={item.id} item={item} />)}
        </div>
      )}

      <style>{`
        .news-page { display: flex; flex-direction: column; gap: 1rem; max-width: 860px; }
        .news-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .news-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        .news-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .news-filters { display: flex; gap: 4px; flex-wrap: wrap; flex: 1; }

        .news-search-wrap {
          display: flex; align-items: center; gap: 0.375rem;
          background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: 4px; padding: 0.25rem 0.5rem; min-width: 180px;
        }
        .news-search-icon { color: var(--color-text-muted); flex-shrink: 0; }
        .news-search-input {
          flex: 1; background: none; border: none; outline: none;
          font-size: 11px; color: var(--color-text-primary);
        }
        .news-search-input::placeholder { color: var(--color-text-muted); }
        .news-search-clear {
          background: none; border: none; cursor: pointer;
          color: var(--color-text-muted); font-size: 10px; padding: 0;
          transition: color 0.1s;
        }
        .news-search-clear:hover { color: var(--color-down); }
        .nf-tab {
          padding: 3px 9px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.03em;
        }
        .nf-tab:hover  { color: var(--color-text-secondary); border-color: var(--color-text-muted); }
        .nf-tab.active { color: var(--color-gold); border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }

        .news-count { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .news-grid { display: flex; flex-direction: column; }
        .news-empty {
          padding: 2rem; text-align: center;
          font-size: 12px; color: var(--color-text-muted);
        }

        .news-card {
          display: block; padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-border-subtle);
          background: var(--color-bg-secondary);
          text-decoration: none; transition: background 0.1s;
        }
        .news-card:first-child { border-radius: 4px 4px 0 0; border: 1px solid var(--color-border-subtle); border-bottom-color: transparent; }
        .news-card:last-child  { border-radius: 0 0 4px 4px; border: 1px solid var(--color-border-subtle); }
        .news-card:only-child  { border-radius: 4px; border: 1px solid var(--color-border-subtle); }
        .news-card:hover { background: var(--color-bg-hover); }

        .nc-meta { display: flex; align-items: center; gap: 0.375rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
        .nc-source {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .nc-tag {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-weight: 700; letter-spacing: 0.04em;
        }
        .nc-sym {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-bg-elevated); color: var(--color-text-muted);
          font-family: var(--font-mono); font-weight: 600;
        }
        .nc-time { margin-left: auto; font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }

        .nc-headline {
          font-size: 13px; font-weight: 600; color: var(--color-text-primary);
          line-height: 1.4; letter-spacing: -0.01em;
        }
        .news-card:hover .nc-headline { color: var(--color-gold-bright); }

        .nc-summary {
          margin-top: 0.25rem; font-size: 11px;
          color: var(--color-text-muted); line-height: 1.5;
        }
      `}</style>
    </div>
  )
}
