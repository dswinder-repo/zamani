import { useQuery } from '@tanstack/react-query'
import { provider } from '../services/api'
import type { ForexRate } from '../services/api'
import ForexTable from '../components/market/ForexTable'

export default function Forex() {
  const { data: rates, isLoading } = useQuery<ForexRate[]>({
    queryKey: ['forex', 'all'],
    queryFn: () => provider.getForex?.([]) ?? Promise.resolve([]),
    staleTime: 60_000,
  })

  return (
    <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Forex</h1>
        <p style={{ margin: '0.125rem 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
          African currency exchange rates vs USD
        </p>
      </div>
      {isLoading
        ? <p style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Loading…</p>
        : <ForexTable rates={rates ?? []} />}
    </div>
  )
}
