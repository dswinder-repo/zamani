import type { NewsItem } from '../../services/api'

interface NewsFeedProps {
  items: NewsItem[]
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

export default function NewsFeed({ items }: NewsFeedProps) {
  return (
    <div className="panel news-feed">
      {items.map((item) => (
        <a key={item.id} className="news-item" href={item.url} target="_blank" rel="noopener">
          <div className="news-meta">
            <span className="news-source">{item.source}</span>
            {item.exchange && <span className="news-tag">{item.exchange}</span>}
            <span className="news-time">{timeAgo(item.publishedAt)}</span>
          </div>
          <div className="news-headline">{item.headline}</div>
        </a>
      ))}

      <style>{`
        .news-feed { overflow: hidden; }
        .news-item {
          display: block;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          text-decoration: none;
          transition: background 0.1s;
        }
        .news-item:last-child { border-bottom: none; }
        .news-item:hover { background: var(--color-bg-hover); }

        .news-meta {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .news-source {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--color-text-muted); font-weight: 600;
        }
        .news-tag {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .news-time {
          margin-left: auto; font-size: 10px; color: var(--color-text-muted);
          font-family: var(--font-mono);
        }
        .news-headline {
          font-size: 12px; color: var(--color-text-secondary); line-height: 1.45;
        }
        .news-item:hover .news-headline { color: var(--color-text-primary); }
      `}</style>
    </div>
  )
}
