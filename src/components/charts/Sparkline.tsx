/**
 * Sparkline — minimal SVG line chart for index cards and ticker strips.
 * No axes, no labels. Just the shape of movement.
 */

interface SparklineProps {
  data:   number[]
  up:     boolean
  height?: number
  width?:  number
}

export default function Sparkline({ data, up, height = 40, width = 100 }: SparklineProps) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = pad + ((max - v) / range) * (height - pad * 2)
    return `${x},${y}`
  })

  const lineColor  = up ? 'var(--color-up)'   : 'var(--color-down)'
  const fillColor  = up ? 'var(--color-up-subtle)' : 'var(--color-down-subtle)'
  const areaPoints = [...pts, `${width - pad},${height - pad}`, `${pad},${height - pad}`].join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: `${height}px` }}
      aria-hidden
    >
      <polygon points={areaPoints} fill={fillColor} />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
