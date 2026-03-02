/**
 * NdebelePanel — decorative SVG panel for page headers / backgrounds.
 * Renders a larger Ndebele geometric composition: stepped diamonds + triangles.
 * Monochrome — uses CSS variable for colour, defaults to gold.
 */

interface NdebelePanelProps {
  width?: number
  height?: number
  color?: string
  opacity?: number
  className?: string
  style?: React.CSSProperties
}

export default function NdebelePanel({
  width = 120,
  height = 120,
  color = 'var(--color-gold)',
  opacity = 0.12,
  className,
  style,
}: NdebelePanelProps) {
  const cx = width / 2
  const cy = height / 2
  const u = Math.min(width, height) / 6 // unit size

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity, ...style }}
      aria-hidden
    >
      {/* Central diamond */}
      <polygon
        points={`${cx},${cy - u * 2} ${cx + u * 2},${cy} ${cx},${cy + u * 2} ${cx - u * 2},${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      {/* Inner diamond */}
      <polygon
        points={`${cx},${cy - u} ${cx + u},${cy} ${cx},${cy + u} ${cx - u},${cy}`}
        fill={color}
      />
      {/* Corner step triangles */}
      {[
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
      ].map(([x, y], i) => {
        const angle = i * 90
        const tx = x === 0 ? u * 0.5 : -u * 0.5
        const ty = y === 0 ? u * 0.5 : -u * 0.5
        return (
          <polygon
            key={i}
            points={`${x},${y} ${x + u * 1.5},${y} ${x},${y + u * 1.5}`}
            fill={color}
            transform={`rotate(${angle} ${x} ${y}) translate(${tx} ${ty})`}
          />
        )
      })}
      {/* Horizontal/vertical connecting lines */}
      <line x1={0} y1={cy} x2={cx - u * 2} y2={cy} stroke={color} strokeWidth="0.5" />
      <line x1={cx + u * 2} y1={cy} x2={width} y2={cy} stroke={color} strokeWidth="0.5" />
      <line x1={cx} y1={0} x2={cx} y2={cy - u * 2} stroke={color} strokeWidth="0.5" />
      <line x1={cx} y1={cy + u * 2} x2={cx} y2={height} stroke={color} strokeWidth="0.5" />
    </svg>
  )
}
