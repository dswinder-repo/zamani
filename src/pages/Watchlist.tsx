import { Star } from 'lucide-react'
import { useWatchlist } from '../stores/watchlist'

export default function Watchlist() {
  const { symbols, remove } = useWatchlist()

  return (
    <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Watchlist</h1>
        <p style={{ margin: '0.125rem 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
          Your tracked securities
        </p>
      </div>

      {symbols.length === 0 ? (
        <div className="panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 12 }}>
          <Star size={24} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
          <p style={{ margin: 0 }}>No securities in your watchlist yet.<br />Use ⌘K to search and add.</p>
        </div>
      ) : (
        <div className="panel">
          {symbols.map((sym, i) => (
            <div
              key={sym}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                borderBottom: i < symbols.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
              }}
            >
              <Star size={12} style={{ color: 'var(--color-gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, flex: 1 }}>{sym}</span>
              <button
                onClick={() => remove(sym)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-text-muted)', fontSize: 11,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
