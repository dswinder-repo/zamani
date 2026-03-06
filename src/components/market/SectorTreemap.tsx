/**
 * SectorTreemap — displays JSE stocks grouped by sector as a Recharts Treemap.
 * Box size = market cap proxy (price × volume). Color = changePct.
 */
import { useMemo } from 'react'
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'
import type { Quote } from '../../services/api'
import { getSector } from '../../data/sectors'

interface Props {
  exchangeId: string
  quotes: Quote[]
}

function changePctToColor(pct: number): string {
  if (pct >=  4) return '#00c853'
  if (pct >=  2) return '#43a047'
  if (pct >=  0.5) return '#2e7d32'
  if (pct >= -0.5) return '#455a64'
  if (pct >= -2) return '#c62828'
  if (pct >= -4) return '#e53935'
  return '#b71c1c'
}

interface TreeNode {
  name: string
  size?: number
  children?: TreeNode[]
  changePct?: number
  symbol?: string
  [key: string]: unknown
}

// Custom content renderer for leaf nodes
function TreemapCell(props: {
  x?: number; y?: number; width?: number; height?: number
  name?: string; changePct?: number; symbol?: string
}) {
  const { x = 0, y = 0, width = 0, height = 0, changePct = 0, symbol, name } = props
  const fill = changePctToColor(changePct)
  const show = width > 35 && height > 20

  return (
    <g>
      <rect
        x={x + 1} y={y + 1}
        width={width - 2} height={height - 2}
        fill={fill}
        fillOpacity={0.85}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={1}
        rx={2}
      />
      {show && (
        <>
          <text
            x={x + width / 2} y={y + height / 2 - (height > 36 ? 8 : 0)}
            textAnchor="middle" dominantBaseline="middle"
            fill="#fff" fontSize={Math.min(11, width / 5)}
            fontWeight={700} fontFamily="var(--font-mono)"
          >
            {symbol ?? name}
          </text>
          {height > 36 && (
            <text
              x={x + width / 2} y={y + height / 2 + 10}
              textAnchor="middle" dominantBaseline="middle"
              fill="rgba(255,255,255,0.7)" fontSize={9}
              fontFamily="var(--font-mono)"
            >
              {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
            </text>
          )}
        </>
      )}
    </g>
  )
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: TreeNode }> }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  if (!d.symbol) return null
  const pct = d.changePct ?? 0
  const up  = pct >= 0
  return (
    <div style={{
      background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
      borderRadius: 4, padding: '6px 10px', fontSize: 11,
      fontFamily: 'var(--font-mono)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    }}>
      <div style={{ fontWeight: 700, color: 'var(--color-gold)' }}>{d.symbol}</div>
      <div style={{ color: up ? 'var(--color-up)' : 'var(--color-down)', fontWeight: 600 }}>
        {up ? '+' : ''}{pct.toFixed(2)}%
      </div>
    </div>
  )
}

export default function SectorTreemap({ exchangeId, quotes }: Props) {
  const data = useMemo<TreeNode[]>(() => {
    const bySector: Record<string, TreeNode[]> = {}
    for (const q of quotes) {
      const sector = getSector(exchangeId, q.symbol)
      if (!bySector[sector]) bySector[sector] = []
      const size = Math.max(1, Math.round(q.price * (q.volume ?? 1000)))
      bySector[sector].push({
        name:      q.name ?? q.symbol,
        symbol:    q.symbol,
        size,
        changePct: q.changePct,
      })
    }
    return Object.entries(bySector).map(([sector, children]) => ({
      name:     sector,
      children: children.sort((a, b) => (b.size ?? 0) - (a.size ?? 0)),
    }))
  }, [quotes, exchangeId])

  if (!quotes.length) return null

  return (
    <div style={{ width: '100%', height: 280 }}>
      <ResponsiveContainer>
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          content={(props: object) => {
            const p = props as {
              x?: number; y?: number; width?: number; height?: number
              name?: string; root?: TreeNode; depth?: number
              changePct?: number; symbol?: string
            }
            if ((p.depth ?? 0) < 2) return <rect x={p.x} y={p.y} width={p.width} height={p.height} fill="none" />
            return (
              <TreemapCell
                x={p.x} y={p.y} width={p.width} height={p.height}
                name={p.name} changePct={p.changePct ?? 0} symbol={p.symbol}
              />
            )
          }}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}
