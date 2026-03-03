/**
 * Exchange trading hours — timezone-aware open/closed detection.
 * All times are local to the exchange. We use Intl to convert.
 */

export type ExchangeStatus = 'open' | 'closed' | 'pre' | 'post'

interface ExchangeSchedule {
  id:       string
  tz:       string      // IANA timezone
  openH:    number      // local hour (24h)
  openM:    number
  closeH:   number
  closeM:   number
  days:     number[]    // 0=Sun 1=Mon … 6=Sat
}

const SCHEDULES: ExchangeSchedule[] = [
  { id: 'jse',  tz: 'Africa/Johannesburg', openH: 9,  openM: 0,  closeH: 17, closeM: 0,  days: [1,2,3,4,5] },
  { id: 'ngx',  tz: 'Africa/Lagos',        openH: 10, openM: 0,  closeH: 14, closeM: 30, days: [1,2,3,4,5] },
  { id: 'nse',  tz: 'Africa/Nairobi',      openH: 9,  openM: 0,  closeH: 15, closeM: 0,  days: [1,2,3,4,5] },
  { id: 'gse',  tz: 'Africa/Accra',        openH: 9,  openM: 30, closeH: 15, closeM: 0,  days: [1,2,3,4,5] },
  { id: 'brvm', tz: 'Africa/Abidjan',      openH: 9,  openM: 0,  closeH: 15, closeM: 30, days: [1,2,3,4,5] },
  { id: 'zse',  tz: 'Africa/Harare',       openH: 9,  openM: 0,  closeH: 16, closeM: 30, days: [1,2,3,4,5] },
  { id: 'bse',  tz: 'Africa/Gaborone',     openH: 9,  openM: 0,  closeH: 17, closeM: 0,  days: [1,2,3,4,5] },
  { id: 'luse', tz: 'Africa/Lusaka',       openH: 9,  openM: 0,  closeH: 13, closeM: 0,  days: [1,2,3,4,5] },
  { id: 'use',  tz: 'Africa/Kampala',      openH: 9,  openM: 0,  closeH: 13, closeM: 0,  days: [1,2,3,4,5] },
]

function localTime(tz: string, now = new Date()): { hour: number; minute: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric', minute: 'numeric', weekday: 'short',
    hour12: false,
  }).formatToParts(now)

  const get = (t: string) => parseInt(parts.find(p => p.type === t)?.value ?? '0', 10)
  const weekday = parts.find(p => p.type === 'weekday')?.value ?? 'Mon'
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

  return {
    hour:   get('hour') === 24 ? 0 : get('hour'),
    minute: get('minute'),
    day:    dayMap[weekday] ?? 1,
  }
}

function toMins(h: number, m: number) { return h * 60 + m }

export function getExchangeStatus(id: string, now = new Date()): ExchangeStatus {
  const sched = SCHEDULES.find(s => s.id === id)
  if (!sched) return 'closed'

  const { hour, minute, day } = localTime(sched.tz, now)
  if (!sched.days.includes(day)) return 'closed'

  const cur   = toMins(hour, minute)
  const open  = toMins(sched.openH,  sched.openM)
  const close = toMins(sched.closeH, sched.closeM)
  const preOpen = open - 30   // 30-min pre-market window

  if (cur >= open  && cur < close) return 'open'
  if (cur >= preOpen && cur < open) return 'pre'
  if (cur >= close && cur < close + 60) return 'post'
  return 'closed'
}

export function getExchangeLocalTime(id: string, now = new Date()): string {
  const sched = SCHEDULES.find(s => s.id === id)
  if (!sched) return ''
  return new Intl.DateTimeFormat('en-US', {
    timeZone: sched.tz,
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(now)
}

export function getAllStatuses(now = new Date()): Record<string, ExchangeStatus> {
  return Object.fromEntries(SCHEDULES.map(s => [s.id, getExchangeStatus(s.id, now)]))
}

export const EXCHANGE_IDS = SCHEDULES.map(s => s.id)
