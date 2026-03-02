/**
 * Economic calendar — African market events.
 * In production, wire this to an events API (e.g. Econoday, Trading Economics).
 * For now, realistic mock events seeded around today's date.
 */

export type EventType = 'earnings' | 'rate_decision' | 'ipo' | 'dividend' | 'macro' | 'agm'
export type EventImpact = 'high' | 'medium' | 'low'

export interface CalendarEvent {
  id:       string
  date:     string        // ISO date YYYY-MM-DD
  time?:    string        // HH:MM local time
  title:    string
  type:     EventType
  impact:   EventImpact
  exchange?: string
  symbol?:  string
  country?: string
  notes?:   string
}

const TYPE_COLORS: Record<EventType, string> = {
  earnings:       '#c9a84c',
  rate_decision:  '#60a5fa',
  ipo:            '#a78bfa',
  dividend:       '#4ade80',
  macro:          '#fb923c',
  agm:            '#f472b6',
}

const TYPE_LABELS: Record<EventType, string> = {
  earnings:       'Earnings',
  rate_decision:  'Rate Decision',
  ipo:            'IPO',
  dividend:       'Dividend',
  macro:          'Macro',
  agm:            'AGM',
}

export { TYPE_COLORS, TYPE_LABELS }

// Generate events relative to today so the calendar always looks populated
function daysFrom(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export const CALENDAR_EVENTS: CalendarEvent[] = [
  // Rate decisions
  { id: 'e1',  date: daysFrom(-5),  time: '14:00', title: 'South African Reserve Bank — MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE', notes: 'Expected hold at 8.25%' },
  { id: 'e2',  date: daysFrom(3),   time: '11:00', title: 'Central Bank of Nigeria — MPC Meeting', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX', notes: 'CPI above target at 29.4%' },
  { id: 'e3',  date: daysFrom(14),  time: '09:00', title: 'Bank of Ghana — Policy Rate Announcement', type: 'rate_decision', impact: 'high', country: 'GH', exchange: 'GSE', notes: 'Rate currently at 28%' },
  { id: 'e4',  date: daysFrom(21),  time: '10:00', title: 'Central Bank of Kenya — MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },

  // Earnings
  { id: 'e5',  date: daysFrom(-2),  time: '07:30', title: 'Naspers Full-Year Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'NPN', notes: 'H1 earnings beat by 4%' },
  { id: 'e6',  date: daysFrom(1),   time: '08:00', title: 'Safaricom H1 Results', type: 'earnings', impact: 'high', exchange: 'NSE', symbol: 'SCOM' },
  { id: 'e7',  date: daysFrom(2),   time: '07:00', title: 'MTN Group Interim Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'MTN' },
  { id: 'e8',  date: daysFrom(4),   time: '08:30', title: 'Zenith Bank Q1 Earnings', type: 'earnings', impact: 'medium', exchange: 'NGX', symbol: 'ZENITH' },
  { id: 'e9',  date: daysFrom(5),   time: '09:00', title: 'Capitec Bank Full-Year Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'CPI' },
  { id: 'e10', date: daysFrom(7),   time: '08:00', title: 'Anglo American Quarterly Production', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'AGL' },
  { id: 'e11', date: daysFrom(8),   time: '07:30', title: 'Equity Group Annual Results', type: 'earnings', impact: 'high', exchange: 'NSE', symbol: 'EQTY' },
  { id: 'e12', date: daysFrom(10),  time: '09:00', title: 'FirstRand Interim Earnings', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'FSR' },
  { id: 'e13', date: daysFrom(12),  time: '08:00', title: 'Dangote Cement Annual Results', type: 'earnings', impact: 'high', exchange: 'NGX', symbol: 'DANGCEM' },
  { id: 'e14', date: daysFrom(16),  time: '07:00', title: 'Standard Bank Full-Year Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'SBK' },

  // Dividends
  { id: 'e15', date: daysFrom(0),   title: 'Shoprite Holdings — Ex-Dividend Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'SHP', notes: 'ZAR 4.50 per share' },
  { id: 'e16', date: daysFrom(3),   title: 'KCB Group — Final Dividend Payment', type: 'dividend', impact: 'low', exchange: 'NSE', symbol: 'KCB', notes: 'KES 2.00 per share' },
  { id: 'e17', date: daysFrom(9),   title: 'Vodacom Group — Interim Dividend', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'VOD', notes: 'ZAR 3.75 per share' },
  { id: 'e18', date: daysFrom(11),  title: 'MTN Nigeria — Final Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'NGX', symbol: 'MTNN' },

  // Macro
  { id: 'e19', date: daysFrom(-3),  time: '10:00', title: 'South Africa — CPI Inflation Data', type: 'macro', impact: 'high', country: 'ZA' },
  { id: 'e20', date: daysFrom(2),   time: '09:00', title: 'Nigeria — GDP Growth Q4 Release', type: 'macro', impact: 'high', country: 'NG' },
  { id: 'e21', date: daysFrom(6),   time: '11:00', title: 'Kenya — Balance of Payments Report', type: 'macro', impact: 'medium', country: 'KE' },
  { id: 'e22', date: daysFrom(13),  time: '10:00', title: 'Ghana — CPI Inflation Release', type: 'macro', impact: 'medium', country: 'GH' },
  { id: 'e23', date: daysFrom(17),  time: '08:00', title: 'AfDB — African Economic Outlook Report', type: 'macro', impact: 'medium', notes: 'Annual flagship publication' },
  { id: 'e24', date: daysFrom(20),  time: '09:30', title: 'South Africa — Q4 GDP Preliminary', type: 'macro', impact: 'high', country: 'ZA' },

  // IPOs
  { id: 'e25', date: daysFrom(15),  title: 'Aradel Holdings — NGX Main Board Listing', type: 'ipo', impact: 'medium', exchange: 'NGX', notes: 'Oil & gas company, ₦702B market cap expected' },
  { id: 'e26', date: daysFrom(22),  title: 'Tinubu Square — GSE Listing', type: 'ipo', impact: 'low', exchange: 'GSE' },

  // AGMs
  { id: 'e27', date: daysFrom(4),   time: '10:00', title: 'Naspers Annual General Meeting', type: 'agm', impact: 'low', exchange: 'JSE', symbol: 'NPN' },
  { id: 'e28', date: daysFrom(11),  time: '09:00', title: 'Safaricom AGM', type: 'agm', impact: 'low', exchange: 'NSE', symbol: 'SCOM' },
]
