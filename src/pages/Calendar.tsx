import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CALENDAR_EVENTS, TYPE_COLORS, TYPE_LABELS, type EventType } from '../data/calendar'

const ALL_TYPES: EventType[] = ['earnings', 'rate_decision', 'ipo', 'dividend', 'macro', 'agm']

function EventPill({ type }: { type: EventType }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: 9, fontWeight: 700,
      padding: '1px 5px', borderRadius: 3,
      background: TYPE_COLORS[type] + '22',
      color: TYPE_COLORS[type],
      letterSpacing: '0.04em', textTransform: 'uppercase',
    }}>
      {TYPE_LABELS[type]}
    </span>
  )
}

function ImpactDot({ impact }: { impact: 'high' | 'medium' | 'low' }) {
  const colors = { high: 'var(--color-down)', medium: '#fb923c', low: 'var(--color-text-muted)' }
  return (
    <span style={{
      display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
      background: colors[impact], flexShrink: 0,
    }} title={`${impact} impact`} />
  )
}

export default function Calendar() {
  const today = new Date().toISOString().slice(0, 10)
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState<Set<EventType>>(new Set(ALL_TYPES))
  const [selectedDate, setSelectedDate] = useState<string | null>(today)

  // Build week grid (Mon–Sun)
  const weekDays = useMemo(() => {
    const now = new Date()
    const dayOfWeek = now.getDay() || 7   // 1=Mon
    const monday = new Date(now)
    monday.setDate(now.getDate() - (dayOfWeek - 1) + weekOffset * 7)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return d.toISOString().slice(0, 10)
    })
  }, [weekOffset])

  function toggleType(t: EventType) {
    setSelectedTypes(s => {
      const n = new Set(s)
      if (n.has(t)) { if (n.size > 1) n.delete(t) } else n.add(t)
      return n
    })
  }

  const filtered = CALENDAR_EVENTS.filter(e => selectedTypes.has(e.type))
  const byDate   = useMemo(() => {
    const m = new Map<string, typeof CALENDAR_EVENTS>()
    for (const e of filtered) {
      const arr = m.get(e.date) ?? []
      arr.push(e)
      m.set(e.date, arr)
    }
    return m
  }, [filtered])

  const dayEvents = selectedDate ? (byDate.get(selectedDate) ?? []) : []

  const allInRange = filtered.filter(e => e.date >= weekDays[0] && e.date <= weekDays[6])

  const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="cal-page">
      <div className="cal-header">
        <div>
          <h1 className="cal-h1">Economic Calendar</h1>
          <p className="cal-sub">Earnings, rate decisions, IPOs, dividends and macro events</p>
        </div>
      </div>

      {/* Type filters */}
      <div className="cal-filters">
        {ALL_TYPES.map(t => (
          <button key={t}
            className={`cal-filter-btn ${selectedTypes.has(t) ? 'active' : ''}`}
            style={selectedTypes.has(t) ? {
              background: TYPE_COLORS[t] + '22',
              color: TYPE_COLORS[t],
              borderColor: TYPE_COLORS[t] + '66',
            } : {}}
            onClick={() => toggleType(t)}>
            {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {/* Week navigator */}
      <div className="cal-week-nav">
        <button className="cal-nav-btn" onClick={() => setWeekOffset(w => w - 1)}>
          <ChevronLeft size={14} />
        </button>
        <span className="cal-week-label">
          {new Date(weekDays[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          {' — '}
          {new Date(weekDays[6]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <button className="cal-nav-btn" onClick={() => setWeekOffset(w => w + 1)}>
          <ChevronRight size={14} />
        </button>
        {weekOffset !== 0 && (
          <button className="cal-today-btn" onClick={() => { setWeekOffset(0); setSelectedDate(today) }}>
            Today
          </button>
        )}
      </div>

      {/* Week grid */}
      <div className="cal-grid">
        {weekDays.map((date, i) => {
          const dayEvts = byDate.get(date) ?? []
          const isToday = date === today
          const isSel   = date === selectedDate
          const isWknd  = i >= 5

          return (
            <button
              key={date}
              className={`cal-day ${isToday ? 'today' : ''} ${isSel ? 'selected' : ''} ${isWknd ? 'weekend' : ''}`}
              onClick={() => setSelectedDate(isSel ? null : date)}
            >
              <div className="cal-day-header">
                <span className="cal-day-name">{DAY_NAMES[i]}</span>
                <span className="cal-day-num">{new Date(date + 'T12:00:00').getDate()}</span>
              </div>
              <div className="cal-day-dots">
                {dayEvts.slice(0, 3).map(e => (
                  <span key={e.id} style={{ width: 6, height: 6, borderRadius: '50%', background: TYPE_COLORS[e.type], flexShrink: 0 }} />
                ))}
                {dayEvts.length > 3 && (
                  <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>+{dayEvts.length - 3}</span>
                )}
              </div>
              {dayEvts.length > 0 && (
                <div className="cal-day-count">{dayEvts.length} event{dayEvts.length > 1 ? 's' : ''}</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected day events */}
      {selectedDate && (
        <section>
          <div className="section-label">
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {' · '}{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
          </div>
          {dayEvents.length === 0 ? (
            <div className="cal-no-events panel">No events on this day.</div>
          ) : (
            <div className="cal-events panel">
              {dayEvents
                .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'))
                .map(e => (
                <div key={e.id} className={`cal-event impact-${e.impact}`}
                  style={{ borderLeftColor: TYPE_COLORS[e.type] }}>
                  <div className="ce-top">
                    {e.time && <span className="ce-time num">{e.time}</span>}
                    <EventPill type={e.type} />
                    <ImpactDot impact={e.impact} />
                    {e.exchange && <span className="ce-tag">{e.exchange}</span>}
                    {e.symbol  && <span className="ce-sym">{e.symbol}</span>}
                  </div>
                  <div className="ce-title">{e.title}</div>
                  {e.notes && <div className="ce-notes">{e.notes}</div>}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* This week list (when no date selected) */}
      {!selectedDate && allInRange.length > 0 && (
        <section>
          <div className="section-label">This week — {allInRange.length} events</div>
          <div className="cal-events panel">
            {allInRange
              .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
              .map(e => (
              <div key={e.id} className={`cal-event impact-${e.impact}`}
                style={{ borderLeftColor: TYPE_COLORS[e.type] }}>
                <div className="ce-top">
                  <span className="ce-date num">
                    {new Date(e.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {e.time && ` · ${e.time}`}
                  </span>
                  <EventPill type={e.type} />
                  <ImpactDot impact={e.impact} />
                  {e.exchange && <span className="ce-tag">{e.exchange}</span>}
                  {e.symbol   && <span className="ce-sym">{e.symbol}</span>}
                </div>
                <div className="ce-title">{e.title}</div>
                {e.notes && <div className="ce-notes">{e.notes}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .cal-page { display: flex; flex-direction: column; gap: 1rem; max-width: 1000px; }
        .cal-h1  { margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .cal-sub { margin: 0.125rem 0 0; font-size: 11px; color: var(--color-text-muted); }

        /* Filters */
        .cal-filters { display: flex; gap: 4px; flex-wrap: wrap; }
        .cal-filter-btn {
          padding: 3px 9px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-border); border-radius: 3px;
          background: none; color: var(--color-text-muted);
          cursor: pointer; transition: all 0.1s; letter-spacing: 0.03em;
        }
        .cal-filter-btn:hover { color: var(--color-text-secondary); }

        /* Week nav */
        .cal-week-nav {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .cal-nav-btn {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 4px;
          border: 1px solid var(--color-border); background: none;
          color: var(--color-text-muted); cursor: pointer; transition: all 0.1s;
        }
        .cal-nav-btn:hover { color: var(--color-text-primary); background: var(--color-bg-hover); }
        .cal-week-label { font-size: 12px; font-weight: 600; color: var(--color-text-secondary); }
        .cal-today-btn {
          padding: 2px 8px; font-size: 10px; font-weight: 600;
          border: 1px solid var(--color-gold-dim); border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          cursor: pointer;
        }

        /* Week grid */
        .cal-grid {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;
        }
        @media (max-width: 600px) {
          .cal-grid { grid-template-columns: repeat(7, 1fr); }
        }

        .cal-day {
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-subtle);
          border-radius: 4px; padding: 0.5rem 0.5rem 0.375rem;
          cursor: pointer; text-align: left; transition: all 0.1s;
          min-height: 72px; display: flex; flex-direction: column; gap: 4px;
        }
        .cal-day:hover   { background: var(--color-bg-hover); border-color: var(--color-border); }
        .cal-day.today   { border-color: var(--color-gold-dim); background: var(--color-gold-subtle); }
        .cal-day.selected { border-color: var(--color-gold); background: var(--color-gold-subtle); }
        .cal-day.weekend { opacity: 0.6; }

        .cal-day-header { display: flex; flex-direction: column; }
        .cal-day-name { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); font-weight: 600; }
        .cal-day-num  { font-size: 16px; font-weight: 800; color: var(--color-text-primary); letter-spacing: -0.02em; line-height: 1.1; }
        .cal-day.today .cal-day-num { color: var(--color-gold); }

        .cal-day-dots { display: flex; align-items: center; gap: 3px; flex-wrap: wrap; }
        .cal-day-count { font-size: 9px; color: var(--color-text-muted); font-weight: 600; margin-top: auto; }

        /* Events */
        .section-label {
          font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.5rem;
        }
        .cal-no-events { padding: 1.5rem; text-align: center; font-size: 12px; color: var(--color-text-muted); }
        .cal-events { overflow: hidden; }

        .cal-event {
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid var(--color-border-subtle);
          border-left: 3px solid transparent;
        }
        .cal-event:last-child { border-bottom: none; }
        .cal-event.impact-high   { background: rgba(248,113,113,0.02); }
        .cal-event.impact-medium { }
        .cal-event.impact-low    { }

        .ce-top {
          display: flex; align-items: center; gap: 0.375rem;
          flex-wrap: wrap; margin-bottom: 0.25rem;
        }
        .ce-time { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .ce-date { font-size: 10px; color: var(--color-text-muted); font-family: var(--font-mono); }
        .ce-tag  {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-bg-elevated); color: var(--color-text-muted);
          font-weight: 600; letter-spacing: 0.04em;
        }
        .ce-sym  {
          font-size: 9px; padding: 1px 4px; border-radius: 3px;
          background: var(--color-gold-subtle); color: var(--color-gold);
          font-family: var(--font-mono); font-weight: 700;
        }
        .ce-title { font-size: 13px; font-weight: 600; color: var(--color-text-primary); line-height: 1.3; }
        .ce-notes { font-size: 11px; color: var(--color-text-muted); margin-top: 0.2rem; }
      `}</style>
    </div>
  )
}
