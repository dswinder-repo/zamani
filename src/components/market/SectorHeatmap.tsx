import { useMemo } from 'react'
import type { Quote } from '../../services/api/types'
import { getSector, SECTOR_ORDER } from '../../data/sectors'

interface SectorHeatmapProps {
  exchangeId:   string
  quotes:       Quote[]
  activeSector?: string | null
  onSectorClick?: (sector: string | null) => void
}

export default function SectorHeatmap({ exchangeId, quotes, activeSector, onSectorClick }: SectorHeatmapProps) {
  const sectors = useMemo(() => {
    const map = new Map<string, { total: number; count: number }>()
    for (const q of quotes) {
      const s = getSector(exchangeId, q.symbol)
      const prev = map.get(s) ?? { total: 0, count: 0 }
      map.set(s, { total: prev.total + q.changePct, count: prev.count + 1 })
    }
    return SECTOR_ORDER
      .filter(s => map.has(s))
      .map(s => {
        const { total, count } = map.get(s)!
        const avg = total / count
        return { sector: s, avg, count }
      })
  }, [quotes, exchangeId])

  if (sectors.length === 0) return null

  const maxAbs = Math.max(...sectors.map(s => Math.abs(s.avg)), 1)

  return (
    <div>
      <div className="section-label">Sector Performance</div>
      <div className="hm-grid">
        {sectors.map(({ sector, avg, count }) => {
          const intensity = Math.min(Math.abs(avg) / maxAbs, 1)
          const up = avg >= 0
          const bg     = up ? `rgba(74,222,128,${0.05 + intensity * 0.20})` : `rgba(248,113,113,${0.05 + intensity * 0.20})`
          const border = up ? `rgba(74,222,128,${0.18 + intensity * 0.40})` : `rgba(248,113,113,${0.18 + intensity * 0.40})`
          const active = activeSector === sector
          return (
            <button
              key={sector}
              className={`hm-cell ${active ? 'hm-cell--active' : ''}`}
              style={{ background: bg, borderColor: active ? (up ? 'var(--color-up)' : 'var(--color-down)') : border }}
              onClick={() => onSectorClick?.(active ? null : sector)}
              title={`${sector}: avg ${up ? '+' : ''}${avg.toFixed(2)}% across ${count} stock${count !== 1 ? 's' : ''}`}
            >
              <span className="hm-name">{sector}</span>
              <span className={`hm-pct num ${up ? 'text-up' : 'text-down'}`}>
                {up ? '+' : ''}{avg.toFixed(2)}%
              </span>
              <span className="hm-count num">{count}</span>
            </button>
          )
        })}
      </div>

      <style>{`
        .hm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 5px;
        }
        .hm-cell {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0.5rem 0.625rem; border-radius: 4px;
          border: 1px solid transparent;
          background: transparent; cursor: pointer; text-align: left;
          transition: filter 0.15s, transform 0.12s;
          outline: none;
        }
        .hm-cell:hover { filter: brightness(1.25); transform: translateY(-1px); }
        .hm-cell--active { box-shadow: 0 0 0 2px currentColor; }
        .hm-name  { font-size: 10px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
        .hm-pct   { font-size: 13px; font-weight: 800; }
        .hm-count { font-size: 9px; color: var(--color-text-muted); margin-top: 2px; }
      `}</style>
    </div>
  )
}
