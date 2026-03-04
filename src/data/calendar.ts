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

export const CALENDAR_EVENTS: CalendarEvent[] = [
  // ── Central Bank Rate Decisions ───────────────────────────────────────────
  // SARB MPC 2026: meets 6 times/year — Jan 30, Mar 27, May 29, Jul 24, Sep 18, Nov 20
  { id: 'sarb-jan26',  date: '2026-01-30', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE', notes: 'South African Reserve Bank Monetary Policy Committee' },
  { id: 'sarb-mar26',  date: '2026-03-27', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE' },
  { id: 'sarb-may26',  date: '2026-05-29', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE' },
  { id: 'sarb-jul26',  date: '2026-07-24', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE' },
  { id: 'sarb-sep26',  date: '2026-09-18', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE' },
  { id: 'sarb-nov26',  date: '2026-11-20', time: '15:00', title: 'SARB MPC Rate Decision', type: 'rate_decision', impact: 'high', country: 'ZA', exchange: 'JSE' },

  // CBN MPC 2026: bi-monthly — Feb 18, Apr 21, Jun 23, Jul 21, Sep 22, Nov 24
  { id: 'cbn-feb26',   date: '2026-02-18', time: '12:00', title: 'Central Bank of Nigeria MPC Decision', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX' },
  { id: 'cbn-apr26',   date: '2026-04-21', time: '12:00', title: 'Central Bank of Nigeria MPC Decision', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX' },
  { id: 'cbn-jun26',   date: '2026-06-23', time: '12:00', title: 'Central Bank of Nigeria MPC Decision', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX' },
  { id: 'cbn-sep26',   date: '2026-09-22', time: '12:00', title: 'Central Bank of Nigeria MPC Decision', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX' },
  { id: 'cbn-nov26',   date: '2026-11-24', time: '12:00', title: 'Central Bank of Nigeria MPC Decision', type: 'rate_decision', impact: 'high', country: 'NG', exchange: 'NGX' },

  // Bank of Ghana 2026: quarterly — Mar 24, Jun 22, Sep 21, Dec 7
  { id: 'bog-mar26',   date: '2026-03-24', time: '10:00', title: 'Bank of Ghana Policy Rate Decision', type: 'rate_decision', impact: 'high', country: 'GH', exchange: 'GSE' },
  { id: 'bog-jun26',   date: '2026-06-22', time: '10:00', title: 'Bank of Ghana Policy Rate Decision', type: 'rate_decision', impact: 'high', country: 'GH', exchange: 'GSE' },
  { id: 'bog-sep26',   date: '2026-09-21', time: '10:00', title: 'Bank of Ghana Policy Rate Decision', type: 'rate_decision', impact: 'high', country: 'GH', exchange: 'GSE' },
  { id: 'bog-dec26',   date: '2026-12-07', time: '10:00', title: 'Bank of Ghana Policy Rate Decision', type: 'rate_decision', impact: 'high', country: 'GH', exchange: 'GSE' },

  // Central Bank of Kenya MPC 2026: bi-monthly — Feb 5, Apr 7, Jun 2, Aug 4, Oct 6, Dec 1
  { id: 'cbk-feb26',   date: '2026-02-05', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },
  { id: 'cbk-apr26',   date: '2026-04-07', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },
  { id: 'cbk-jun26',   date: '2026-06-02', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },
  { id: 'cbk-aug26',   date: '2026-08-04', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },
  { id: 'cbk-oct26',   date: '2026-10-06', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },
  { id: 'cbk-dec26',   date: '2026-12-01', time: '11:00', title: 'Central Bank of Kenya MPC Decision', type: 'rate_decision', impact: 'high', country: 'KE', exchange: 'NSE' },

  // ── Earnings ─────────────────────────────────────────────────────────────
  // JSE companies — FY Dec 31 → full-year results Feb/Mar; FY Jun/Feb → varies
  { id: 'e-mtng-mar',  date: '2026-03-05', time: '07:00', title: 'MTN Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'MTN', notes: 'FY ends December 31' },
  { id: 'e-sbk-mar',   date: '2026-03-12', time: '07:30', title: 'Standard Bank Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'SBK', notes: 'FY ends December 31' },
  { id: 'e-cpi-apr',   date: '2026-04-07', time: '07:00', title: 'Capitec Bank — Full Year FY2026 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'CPI', notes: 'FY ends February 28' },
  { id: 'e-abg-mar',   date: '2026-03-20', time: '07:30', title: 'Absa Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'ABG' },
  { id: 'e-ned-mar',   date: '2026-03-17', time: '07:30', title: 'Nedbank Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'NED' },
  { id: 'e-fsr-feb',   date: '2026-02-26', time: '07:00', title: 'FirstRand — Interim Results H1 FY2026', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'FSR', notes: 'FY ends June 30' },
  { id: 'e-slm-mar',   date: '2026-03-10', time: '07:00', title: 'Sanlam — Full Year 2025 Results', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'SLM' },
  { id: 'e-dsy-mar',   date: '2026-03-24', time: '07:30', title: 'Discovery — Interim Results H1 FY2026', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'DSY' },
  { id: 'e-agl-feb',   date: '2026-02-20', time: '07:00', title: 'Anglo American — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'AGL' },
  { id: 'e-ssw-feb',   date: '2026-02-19', time: '07:00', title: 'Sibanye-Stillwater — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'SSW' },
  { id: 'e-gfi-feb',   date: '2026-02-25', time: '07:00', title: 'Gold Fields — Full Year 2025 Results', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'GFI' },
  { id: 'e-har-feb',   date: '2026-02-23', time: '07:00', title: 'Harmony Gold — Interim Results H1 FY2026', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'HAR' },
  { id: 'e-sol-mar',   date: '2026-03-09', time: '07:00', title: 'Sasol — Interim Results H1 FY2026', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'SOL' },
  { id: 'e-npn-jun',   date: '2026-06-22', time: '07:30', title: 'Naspers — Full Year FY2026 Results', type: 'earnings', impact: 'high', exchange: 'JSE', symbol: 'NPN', notes: 'FY ends March 31' },
  { id: 'e-shp-feb',   date: '2026-02-17', time: '07:00', title: 'Shoprite Holdings — Interim Results H1 FY2026', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'SHP' },
  { id: 'e-whl-feb',   date: '2026-02-25', time: '07:30', title: 'Woolworths Holdings — Interim Results H1 FY2026', type: 'earnings', impact: 'medium', exchange: 'JSE', symbol: 'WHL' },

  // NSE Kenya earnings
  { id: 'e-scom-may',  date: '2026-05-07', time: '09:00', title: 'Safaricom — Full Year FY2026 Results', type: 'earnings', impact: 'high', exchange: 'NSE', symbol: 'SCOM', notes: 'FY ends March 31' },
  { id: 'e-kbcg-mar',  date: '2026-03-26', time: '09:00', title: 'KCB Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'NSE', symbol: 'KCB' },
  { id: 'e-eqty-mar',  date: '2026-03-25', time: '09:00', title: 'Equity Group — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'NSE', symbol: 'EQTY' },

  // NGX Nigeria earnings
  { id: 'e-zen-apr',   date: '2026-04-28', time: '10:00', title: 'Zenith Bank — Q1 2026 Unaudited Results', type: 'earnings', impact: 'medium', exchange: 'NGX', symbol: 'ZENITHBANK' },
  { id: 'e-gtb-apr',   date: '2026-04-24', time: '10:00', title: 'GTCO — Q1 2026 Unaudited Results', type: 'earnings', impact: 'medium', exchange: 'NGX', symbol: 'GTCO' },
  { id: 'e-dan-apr',   date: '2026-04-09', time: '10:00', title: 'Dangote Cement — Full Year 2025 Results', type: 'earnings', impact: 'high', exchange: 'NGX', symbol: 'DANGCEM' },

  // ── Macro Releases ────────────────────────────────────────────────────────
  // SA CPI: released monthly ~3rd week
  { id: 'm-sa-cpi-feb',  date: '2026-02-18', time: '10:00', title: 'South Africa — CPI January 2026', type: 'macro', impact: 'high', country: 'ZA' },
  { id: 'm-sa-cpi-mar',  date: '2026-03-18', time: '10:00', title: 'South Africa — CPI February 2026', type: 'macro', impact: 'high', country: 'ZA' },
  { id: 'm-sa-cpi-apr',  date: '2026-04-22', time: '10:00', title: 'South Africa — CPI March 2026', type: 'macro', impact: 'high', country: 'ZA' },
  { id: 'm-sa-gdp-mar',  date: '2026-03-03', time: '11:30', title: 'South Africa — Q4 2025 GDP (Preliminary)', type: 'macro', impact: 'high', country: 'ZA' },
  { id: 'm-sa-gdp-jun',  date: '2026-06-02', time: '11:30', title: 'South Africa — Q1 2026 GDP (Preliminary)', type: 'macro', impact: 'high', country: 'ZA' },

  // Nigeria
  { id: 'm-ng-cpi-mar',  date: '2026-03-17', time: '11:00', title: 'Nigeria — CPI Inflation February 2026', type: 'macro', impact: 'high', country: 'NG' },
  { id: 'm-ng-cpi-apr',  date: '2026-04-16', time: '11:00', title: 'Nigeria — CPI Inflation March 2026', type: 'macro', impact: 'high', country: 'NG' },
  { id: 'm-ng-gdp-may',  date: '2026-05-25', time: '11:00', title: 'Nigeria — Q1 2026 GDP Growth', type: 'macro', impact: 'high', country: 'NG' },

  // Kenya
  { id: 'm-ke-gdp-apr',  date: '2026-04-30', time: '10:00', title: 'Kenya — Q4 2025 GDP', type: 'macro', impact: 'medium', country: 'KE' },
  { id: 'm-ke-cpi-apr',  date: '2026-04-01', time: '09:00', title: 'Kenya — CPI March 2026', type: 'macro', impact: 'medium', country: 'KE' },

  // Ghana
  { id: 'm-gh-cpi-mar',  date: '2026-03-12', time: '10:00', title: 'Ghana — CPI February 2026', type: 'macro', impact: 'medium', country: 'GH' },
  { id: 'm-gh-gdp-jun',  date: '2026-06-15', time: '10:00', title: 'Ghana — Q1 2026 GDP', type: 'macro', impact: 'medium', country: 'GH' },

  // AfDB
  { id: 'm-afdb-may',   date: '2026-05-27', time: '09:00', title: 'African Development Bank — African Economic Outlook 2026', type: 'macro', impact: 'medium', notes: 'Annual flagship report on African economic prospects' },

  // ── Dividends ─────────────────────────────────────────────────────────────
  { id: 'd-fsr-mar',    date: '2026-03-16', title: 'FirstRand — Interim Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'FSR' },
  { id: 'd-sbk-mar',    date: '2026-03-23', title: 'Standard Bank — Final Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'SBK' },
  { id: 'd-slm-apr',    date: '2026-04-08', title: 'Sanlam — Final Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'SLM' },
  { id: 'd-vod-may',    date: '2026-05-13', title: 'Vodacom Group — Final Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'VOD' },
  { id: 'd-shp-mar',    date: '2026-03-11', title: 'Shoprite Holdings — Interim Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'JSE', symbol: 'SHP', notes: 'Approx ZAR 2.85 per share' },
  { id: 'd-kcb-apr',    date: '2026-04-15', title: 'KCB Group — Final Dividend', type: 'dividend', impact: 'low', exchange: 'NSE', symbol: 'KCB' },
  { id: 'd-scom-jul',   date: '2026-07-10', title: 'Safaricom — Final Dividend Ex-Date', type: 'dividend', impact: 'low', exchange: 'NSE', symbol: 'SCOM' },

  // ── AGMs ─────────────────────────────────────────────────────────────────
  { id: 'agm-mtng-may', date: '2026-05-20', time: '10:00', title: 'MTN Group — Annual General Meeting', type: 'agm', impact: 'low', exchange: 'JSE', symbol: 'MTN' },
  { id: 'agm-sbk-may',  date: '2026-05-27', time: '09:00', title: 'Standard Bank — Annual General Meeting', type: 'agm', impact: 'low', exchange: 'JSE', symbol: 'SBK' },
  { id: 'agm-npn-aug',  date: '2026-08-26', time: '10:00', title: 'Naspers — Annual General Meeting', type: 'agm', impact: 'low', exchange: 'JSE', symbol: 'NPN' },
  { id: 'agm-scom-may', date: '2026-05-14', time: '09:00', title: 'Safaricom — Annual General Meeting', type: 'agm', impact: 'low', exchange: 'NSE', symbol: 'SCOM' },
  { id: 'agm-kcb-may',  date: '2026-05-08', time: '09:30', title: 'KCB Group — Annual General Meeting', type: 'agm', impact: 'low', exchange: 'NSE', symbol: 'KCB' },
]
