/**
 * Uganda Securities Exchange (USE) adapter
 * Source: https://use.or.ug/api/delayed-data (public, no auth required)
 * WebSocket: wss://scd.use.or.ug/ws (real-time prices)
 *
 * API response shape:
 *   Array<{ type: 'EQUITY'|'INDEX', stock: string, price: number,
 *            market_cap: number, volume: number, deals: number }>
 *
 * NOTE: Browser CORS is required from use.or.ug. If the exchange adds
 * CORS restrictions, route through a Cloudflare Worker proxy.
 */
import type { Quote, IndexSnapshot, Mover } from './types'

const API_URL = 'https://use.or.ug/api/delayed-data'

// Company names for each USE ticker
const NAMES: Record<string, string> = {
  'AIRTEL UGANDA': 'Airtel Uganda',
  'BATU':          'BAT Uganda',
  'BOBU':          'Bank of Baroda Uganda',
  'CENT':          'Centum Investment',
  'DFCU':          'dfcu Limited',
  'EABL':          'East African Breweries',
  'EBL':           'Equity Bank Uganda',
  'JHL':           'Jubilee Holdings',
  'KA':            'Kenya Airways',
  'KCB':           'KCB Group',
  'MTNU':          'MTN Uganda',
  'NIC':           'National Insurance Corp',
  'NMG':           'Nation Media Group',
  'NVL':           'New Vision Group',
  'QCIL':          'Quality Chemical Industries',
  'SBU':           'Stanbic Uganda Holdings',
  'UCL':           'Uganda Clays',
  'UMEM':          'Umeme Limited',
}

// Fallback prices (UGX) used when the API is unreachable
const FALLBACK_PRICES: Record<string, number> = {
  'AIRTEL UGANDA': 222,  'BATU': 820,   'BOBU': 395,  'CENT': 380,
  'DFCU':          790,  'EABL': 1600,  'EBL':  380,  'JHL':  420,
  'KA':            6,    'KCB':  420,   'MTNU': 185,  'NIC':  16,
  'NMG':           180,  'NVL':  58,    'QCIL': 7800, 'SBU':  540,
  'UCL':           30,   'UMEM': 265,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type USERow = { type: string; stock: string; price: number; market_cap: number; volume: number; deals: number }

async function fetchDelayed(): Promise<USERow[]> {
  const res = await fetch(API_URL, { mode: 'cors' })
  if (!res.ok) throw new Error(`USE API ${res.status}`)
  return res.json() as Promise<USERow[]>
}

// localStorage key for previous close cache — stored as { date, prices }
// so we only use yesterday's prices (different calendar date) as the prev close.
// Same-day refreshes show 0 change (honest — no intraday reference).
const PREV_KEY = 'zamani_use_prev'

interface PrevCache { date: string; prices: Record<string, number> }

function loadPrev(): Record<string, number> {
  try {
    const raw = localStorage.getItem(PREV_KEY)
    if (!raw) return {}
    const cached: PrevCache = JSON.parse(raw)
    const today = new Date().toISOString().slice(0, 10)
    // Only use cache as previous close if it's from a different day
    return cached.date !== today ? (cached.prices ?? {}) : {}
  } catch { return {} }
}

function savePrev(prices: Record<string, number>) {
  try {
    const today = new Date().toISOString().slice(0, 10)
    localStorage.setItem(PREV_KEY, JSON.stringify({ date: today, prices }))
  } catch { /* quota */ }
}

function buildFallback(): USERow[] {
  return Object.entries(FALLBACK_PRICES).map(([stock, price]) => ({
    type: 'EQUITY', stock, price, market_cap: 0, volume: 0, deals: 0,
  }))
}

export async function getUSEQuotes(): Promise<Quote[]> {
  let rows: USERow[]
  try {
    rows = await fetchDelayed()
  } catch (err) {
    console.warn('[USE] API unreachable — using fallback prices:', err)
    rows = buildFallback()
  }

  const prev = loadPrev()
  const equities = rows.filter(r => r.type === 'EQUITY')

  // Persist current prices for next session's change calculation
  const current: Record<string, number> = {}
  for (const r of equities) current[r.stock] = r.price
  savePrev(current)

  return equities.map((r): Quote => {
    const p    = r.price
    const prev_p = prev[r.stock] ?? p
    const change    = +(p - prev_p).toFixed(2)
    const changePct = prev_p ? +((change / prev_p) * 100).toFixed(2) : 0
    return {
      symbol:    r.stock,
      name:      NAMES[r.stock] ?? r.stock,
      price:     p,
      change,
      changePct,
      volume:    r.volume,
      currency:  'UGX',
      exchange:  'USE',
      timestamp: Date.now(),
    }
  })
}

export async function getUSEIndices(): Promise<IndexSnapshot[]> {
  let rows: USERow[]
  try {
    rows = await fetchDelayed()
  } catch {
    rows = []
  }

  const indices = rows.filter(r => r.type === 'INDEX')
  const prev = loadPrev()

  if (!indices.length) {
    // Return a placeholder so the Exchange page still renders
    return [{
      id: 'use-lci', name: 'USE LCI', exchange: 'USE',
      value: 0, change: 0, changePct: 0, currency: 'UGX',
      sparkline: [], timestamp: Date.now(),
    }]
  }

  return indices.map((r): IndexSnapshot => {
    const p      = r.price
    const prev_p = prev[r.stock] ?? p
    const change    = +(p - prev_p).toFixed(2)
    const changePct = prev_p ? +((change / prev_p) * 100).toFixed(2) : 0
    return {
      id:        `use-${r.stock.toLowerCase().replace(/\s+/g, '-')}`,
      name:      r.stock === 'LCI' ? 'USE Local Company Index' : `USE ${r.stock}`,
      exchange:  'USE',
      value:     p,
      change,    changePct,
      currency:  'UGX',
      sparkline: [],
      timestamp: Date.now(),
    }
  })
}

export async function getUSEMovers(): Promise<{ gainers: Mover[]; losers: Mover[] }> {
  const quotes = await getUSEQuotes()
  const sorted = [...quotes].sort((a, b) => b.changePct - a.changePct)
  const gainers = sorted.filter(q => q.changePct > 0).slice(0, 5).map((q): Mover => ({
    symbol: q.symbol, name: q.name, exchange: 'USE', price: q.price, changePct: q.changePct,
  }))
  const losers = sorted.filter(q => q.changePct < 0).slice(-5).reverse().map((q): Mover => ({
    symbol: q.symbol, name: q.name, exchange: 'USE', price: q.price, changePct: q.changePct,
  }))
  return { gainers, losers }
}
