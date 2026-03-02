import { useQuery } from '@tanstack/react-query'
import { provider } from '../services/api'
import type { NewsItem } from '../services/api'
import NewsFeed from '../components/news/NewsFeed'

export default function News() {
  const { data: news, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['news', 'all'],
    queryFn: () => provider.getNews?.('africa markets') ?? Promise.resolve([]),
    staleTime: 5 * 60_000,
  })

  return (
    <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>News</h1>
        <p style={{ margin: '0.125rem 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
          African markets headlines
        </p>
      </div>
      {isLoading
        ? <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</p>
        : <NewsFeed items={news ?? []} />}
    </div>
  )
}
