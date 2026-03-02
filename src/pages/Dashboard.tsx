import { useQuery } from '@tanstack/react-query'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { provider } from '../services/api'
import type { IndexSnapshot, ForexRate, NewsItem } from '../services/api'
import IndexCard from '../components/market/IndexCard'
import ForexTable from '../components/market/ForexTable'
import NewsFeed from '../components/news/NewsFeed'
import NdebelePanel from '../components/patterns/NdebelePanel'

export default function Dashboard() {
  const { data: indices, isLoading: loadingIdx } = useQuery<IndexSnapshot[]>({
    queryKey: ['indices', 'all'],
    queryFn: () => provider.getIndices?.('all') ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  const { data: forex, isLoading: loadingFx } = useQuery<ForexRate[]>({
    queryKey: ['forex', 'major'],
    queryFn: () => provider.getForex?.([]) ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  const { data: news, isLoading: loadingNews } = useQuery<NewsItem[]>({
    queryKey: ['news', 'dashboard'],
    queryFn: () => provider.getNews?.('africa') ?? Promise.resolve([]),
    staleTime: 5 * 60_000,
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

      {/* Main grid: forex + news */}
      <div className="dash-grid">
        <section className="dash-section">
          <div className="section-label">Forex Rates</div>
          {loadingFx ? <Skeleton height={200} /> : <ForexTable rates={forex ?? []} />}
        </section>

        <section className="dash-section">
          <div className="section-label">Latest News</div>
          {loadingNews ? <Skeleton height={200} /> : <NewsFeed items={news ?? []} />}
        </section>
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

        .dash-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } }
      `}</style>
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
