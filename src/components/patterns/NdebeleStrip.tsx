/**
 * NdebeleStrip — a horizontal decorative strip using Ndebele geometric motifs.
 * Monochrome/duotone only. Gold on dark. SVG-based, repeating tile.
 */

interface NdebeleStripProps {
  height?: number
  color?: string
  bg?: string
  className?: string
}

export default function NdebeleStrip({
  height = 4,
  color = 'var(--color-gold)',
  bg = 'transparent',
  className,
}: NdebeleStripProps) {
  // SVG tile: 20×20 Ndebele step-triangle motif
  const tileW = 20
  const tileH = height > 0 ? height : 4
  const scaledH = tileH

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: `${scaledH}px`,
        background: bg,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <svg
        width="100%"
        height={scaledH}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ndebele-strip"
            x="0"
            y="0"
            width={tileW}
            height={scaledH}
            patternUnits="userSpaceOnUse"
          >
            {/* Ndebele-inspired stepped chevron / triangles repeating tile */}
            <rect width={tileW} height={scaledH} fill={bg} />
            {/* Two triangles forming a chevron */}
            <polygon
              points={`0,${scaledH} ${tileW / 2},0 ${tileW},${scaledH}`}
              fill={color}
              opacity="0.9"
            />
            <polygon
              points={`0,${scaledH} ${tileW / 2},${scaledH * 0.4} ${tileW},${scaledH}`}
              fill={bg === 'transparent' ? 'var(--color-bg-secondary)' : bg}
              opacity="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height={scaledH} fill="url(#ndebele-strip)" />
      </svg>
    </div>
  )
}
