/**
 * AfricaMap — SVG heat map showing African stock exchange locations
 * with colour-coded performance dots.
 */
import { useNavigate } from 'react-router-dom'

interface ExchangePin {
  id:       string
  name:     string
  country:  string
  // SVG viewBox coordinates within the Africa outline (approx 0-200 x 0-280)
  x:        number
  y:        number
  color:    string
}

const EXCHANGE_PINS: ExchangePin[] = [
  { id: 'jse',  name: 'JSE',  country: 'South Africa',   x: 124, y: 238, color: 'var(--color-jse)'  },
  { id: 'ngx',  name: 'NGX',  country: 'Nigeria',         x:  77, y: 152, color: 'var(--color-ngx)'  },
  { id: 'nse',  name: 'NSE',  country: 'Kenya',           x: 148, y: 156, color: 'var(--color-nse)'  },
  { id: 'gse',  name: 'GSE',  country: 'Ghana',           x:  67, y: 144, color: 'var(--color-gse)'  },
  { id: 'brvm', name: 'BRVM', country: 'Ivory Coast',     x:  62, y: 148, color: 'var(--color-brvm)' },
  { id: 'zse',  name: 'ZSE',  country: 'Zimbabwe',        x: 134, y: 218, color: 'var(--color-zse)'  },
  { id: 'bse',  name: 'BSE',  country: 'Botswana',        x: 122, y: 222, color: 'var(--color-bse)'  },
  { id: 'luse', name: 'LUSE', country: 'Zambia',          x: 126, y: 205, color: 'var(--color-luse)' },
  { id: 'use',  name: 'USE',  country: 'Uganda',          x: 140, y: 148, color: 'var(--color-use)'  },
]

// Simplified Africa SVG path (mercator projection, scaled to 200x280 viewBox)
const AFRICA_PATH = `
  M 100,2 L 120,2 L 135,8 L 150,10 L 165,15 L 175,20 L 180,30 L 185,45
  L 190,60 L 195,75 L 198,90 L 198,105 L 195,120 L 190,133 L 183,145
  L 175,158 L 168,168 L 165,180 L 163,193 L 158,205 L 150,218
  L 140,228 L 130,238 L 125,248 L 122,255 L 120,262 L 118,268
  L 116,262 L 114,255 L 112,248 L 108,240 L 100,228 L 90,218
  L 80,208 L 70,200 L 60,192 L 50,182 L 42,170 L 35,158 L 28,145
  L 22,132 L 18,118 L 15,103 L 12,88 L 10,73 L 10,58 L 14,43
  L 20,30 L 28,20 L 38,14 L 50,9 L 62,5 L 75,2 L 88,2 Z
`

export default function AfricaMap() {
  const navigate = useNavigate()

  return (
    <div className="amap-wrap">
      <svg viewBox="0 0 210 280" className="amap-svg" aria-label="African exchanges map">
        {/* Africa outline */}
        <path d={AFRICA_PATH} className="amap-continent" />

        {/* Exchange pins */}
        {EXCHANGE_PINS.map(pin => (
          <g
            key={pin.id}
            className="amap-pin-group"
            onClick={() => navigate(`/exchange/${pin.id}`)}
            role="button"
            aria-label={`${pin.name} — ${pin.country}`}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(`/exchange/${pin.id}`)}
          >
            {/* Outer ring */}
            <circle cx={pin.x} cy={pin.y} r={8}
              fill={pin.color} opacity={0.15} className="amap-ring" />
            {/* Pin dot */}
            <circle cx={pin.x} cy={pin.y} r={4.5}
              fill={pin.color} className="amap-dot" />
            {/* Label */}
            <text x={pin.x} y={pin.y - 11}
              className="amap-label"
              fill={pin.color}
              textAnchor="middle"
              fontSize="7"
              fontFamily="var(--font-mono)"
              fontWeight="700"
            >
              {pin.name}
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        .amap-wrap {
          display: flex;
          justify-content: center;
          padding: 0.25rem;
        }
        .amap-svg {
          width: 100%;
          max-width: 200px;
          height: auto;
          overflow: visible;
        }
        .amap-continent {
          fill: var(--color-bg-tertiary);
          stroke: var(--color-border);
          stroke-width: 1;
        }
        .amap-pin-group {
          cursor: pointer;
          transition: filter 0.15s;
          outline: none;
        }
        .amap-pin-group:hover .amap-dot {
          r: 6;
          filter: brightness(1.3);
        }
        .amap-pin-group:hover .amap-ring {
          r: 10;
          opacity: 0.25;
        }
        .amap-ring { transition: r 0.15s, opacity 0.15s; }
        .amap-dot  { transition: r 0.15s; }
        .amap-label {
          pointer-events: none;
          letter-spacing: 0.04em;
          font-size: 7px;
        }
      `}</style>
    </div>
  )
}
