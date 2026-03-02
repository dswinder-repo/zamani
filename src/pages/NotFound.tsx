import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '60vh', gap: '1rem',
      color: 'var(--color-text-muted)', textAlign: 'center',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 48, color: 'var(--color-gold)', opacity: 0.4 }}>404</span>
      <p style={{ margin: 0, fontSize: 13 }}>This page doesn't exist.</p>
      <Link to="/" style={{ fontSize: 12, color: 'var(--color-gold)', textDecoration: 'none' }}>
        ← Back to Dashboard
      </Link>
    </div>
  )
}
