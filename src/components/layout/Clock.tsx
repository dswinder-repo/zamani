import { useState, useEffect } from 'react'

const ZONES = [
  { label: 'JHB', tz: 'Africa/Johannesburg' },
  { label: 'LAG', tz: 'Africa/Lagos' },
  { label: 'NBI', tz: 'Africa/Nairobi' },
]

function formatTime(tz: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export default function Clock() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="clock">
      {ZONES.map(z => (
        <span key={z.label} className="clock-zone">
          <span className="clock-label">{z.label}</span>
          <span className="clock-time num">{formatTime(z.tz)}</span>
        </span>
      ))}

      <style>{`
        .clock {
          display: flex;
          gap: 1rem;
          color: var(--color-text-muted);
          font-size: 11px;
        }
        .clock-zone  { display: flex; gap: 0.25rem; align-items: baseline; }
        .clock-label { color: var(--color-text-muted); }
        .clock-time  { color: var(--color-text-secondary); font-size: 11px; }
      `}</style>
    </div>
  )
}
